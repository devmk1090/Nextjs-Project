// 대출 상환 계산 (원리금균등·원금균등·만기일시). 계산기 화면과 대출 금액별 페이지에서 함께 사용합니다.

export type RepaymentType = "equal-installment" | "equal-principal" | "bullet";

export type MonthlyPayment = {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  remaining: number;
};

// 상환 방식별 월별 상환 일정
export function buildSchedule(
  type: RepaymentType,
  principal: number,
  monthlyRate: number,
  months: number
): MonthlyPayment[] {
  const payments: MonthlyPayment[] = [];
  let remaining = principal;
  // 원리금균등: 매월 상환액 = 원금 × r × (1+r)^n / ((1+r)^n - 1)
  const installment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  for (let i = 1; i <= months; i++) {
    const interest = remaining * monthlyRate;
    let principalPart: number;
    if (type === "equal-installment") {
      principalPart = installment - interest;
    } else if (type === "equal-principal") {
      principalPart = principal / months;
    } else {
      // 만기일시: 매월 이자만 내고 마지막 달에 원금 전액 상환
      principalPart = i === months ? principal : 0;
    }
    remaining -= principalPart;
    payments.push({
      month: i,
      principal: principalPart,
      interest,
      payment: principalPart + interest,
      remaining: Math.max(0, remaining),
    });
  }
  return payments;
}

export const summarize = (payments: MonthlyPayment[]) => ({
  totalPayment: payments.reduce((sum, p) => sum + p.payment, 0),
  totalInterest: payments.reduce((sum, p) => sum + p.interest, 0),
  firstPayment: payments[0].payment,
  lastPayment: payments[payments.length - 1].payment,
});

// 원리금균등 월 상환액 (공식으로 바로 계산)
export function installmentPayment(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

// 원금균등 총 이자 = 원금 × 월이율 × (개월 + 1) ÷ 2
export const equalPrincipalInterest = (principal: number, annualRate: number, months: number) =>
  (principal * (annualRate / 12) * (months + 1)) / 2;
