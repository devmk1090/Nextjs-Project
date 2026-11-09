import { TAX_AT_10000, TAX_TABLE, TAX_TABLE_LAST_UPPER } from "./salaryTaxTable";

// 연봉 실수령액 계산 (2026년 기준, 근로자 부담분)
// - 국민연금 4.75% (보험료율 9.5%의 절반, 2026년 연금개혁 첫해)
//   기준소득월액 하한 41만 원·상한 659만 원 (2026. 7. ~ 2027. 6.)
// - 건강보험 3.595% (보험료율 7.19%의 절반)
// - 장기요양보험: 건강보험료 × (장기요양보험료율 0.9448% ÷ 건강보험료율 7.19%)
// - 고용보험 0.9%
// - 소득세: 근로소득 간이세액표(2026. 3. 1. 이후), 지방소득세는 소득세의 10%

export const SALARY_RULES = {
  year: 2026,
  pensionRate: 0.0475,
  pensionBaseMin: 410_000,
  pensionBaseMax: 6_590_000,
  healthRate: 0.03595,
  longTermCareRatio: 0.9448 / 7.19,
  employmentRate: 0.009,
  defaultNonTaxable: 200_000, // 식대 비과세 한도 (월 20만 원)
} as const;

const floor10 = (n: number) => Math.floor(n / 10) * 10;

// 8세 이상 20세 이하 자녀 수별 공제 (간이세액표 비고 3)
function childDeduction(children: number) {
  if (children <= 0) return 0;
  if (children === 1) return 20_830;
  return 45_830 + (children - 2) * 33_330;
}

// 월 소득세 (간이세액표). taxableMonthly: 비과세를 뺀 월급여(원), family: 공제대상가족 수 1~4
export function monthlyIncomeTax(taxableMonthly: number, family: 1 | 2 | 3 | 4, children = 0) {
  const col = family; // 행의 1~4번째 값
  const thousand = Math.floor(taxableMonthly / 1000);
  let tax: number;
  if (thousand < TAX_TABLE[0][0]) {
    tax = 0;
  } else if (thousand < TAX_TABLE_LAST_UPPER) {
    // 하한 이하인 마지막 행 찾기 (이분 탐색)
    let lo = 0;
    let hi = TAX_TABLE.length - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (TAX_TABLE[mid][0] <= thousand) lo = mid;
      else hi = mid - 1;
    }
    tax = TAX_TABLE[lo][col];
  } else {
    // 월 1,000만 원 이상: 간이세액표 비고의 계산식
    const base = TAX_AT_10000[col - 1];
    const x = taxableMonthly;
    const M = 1_000_000;
    if (x <= 10 * M) tax = base;
    else if (x <= 14 * M) tax = base + (x - 10 * M) * 0.98 * 0.35 + 25_000;
    else if (x <= 28 * M) tax = base + 1_397_000 + (x - 14 * M) * 0.98 * 0.38;
    else if (x <= 30 * M) tax = base + 6_610_600 + (x - 28 * M) * 0.98 * 0.4;
    else if (x <= 45 * M) tax = base + 7_394_600 + (x - 30 * M) * 0.4;
    else if (x <= 87 * M) tax = base + 13_394_600 + (x - 45 * M) * 0.42;
    else tax = base + 31_034_600 + (x - 87 * M) * 0.45;
  }
  return Math.max(0, floor10(tax) - childDeduction(children));
}

export type SalaryInput = {
  annualSalary: number; // 연봉 (원)
  nonTaxableMonthly?: number; // 월 비과세액 (식대 등)
  family?: 1 | 2 | 3 | 4; // 본인 포함 공제대상가족 수
  children?: number; // 8세 이상 20세 이하 자녀 수
  severanceIncluded?: boolean; // 연봉에 퇴직금이 포함된 경우 13으로 나눔
};

export function calculateSalary({
  annualSalary,
  nonTaxableMonthly = SALARY_RULES.defaultNonTaxable,
  family = 1,
  children = 0,
  severanceIncluded = false,
}: SalaryInput) {
  const r = SALARY_RULES;
  const monthly = Math.floor(annualSalary / (severanceIncluded ? 13 : 12));
  const nonTaxable = Math.min(nonTaxableMonthly, monthly);
  const taxable = monthly - nonTaxable;

  const pensionBase = Math.floor(Math.min(Math.max(taxable, r.pensionBaseMin), r.pensionBaseMax) / 1000) * 1000;
  const pension = floor10(pensionBase * r.pensionRate);
  const health = floor10(taxable * r.healthRate);
  const longTermCare = floor10(health * r.longTermCareRatio);
  const employment = floor10(taxable * r.employmentRate);
  const incomeTax = monthlyIncomeTax(taxable, family, children);
  const localTax = floor10(incomeTax * 0.1);

  const deductions = pension + health + longTermCare + employment + incomeTax + localTax;
  const net = monthly - deductions;
  return {
    monthly,
    nonTaxable,
    taxable,
    pension,
    health,
    longTermCare,
    employment,
    incomeTax,
    localTax,
    deductions,
    net,
    annualNet: net * 12,
  };
}

export type SalaryResult = ReturnType<typeof calculateSalary>;
