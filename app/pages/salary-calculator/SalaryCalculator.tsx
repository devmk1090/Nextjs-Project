"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BulletList,
  Card,
  FaqList,
  Field,
  ResultHero,
  Segmented,
  StatGrid,
  ToolPage,
  inputClass,
} from "../../components/tool/ToolUI";
import { digitsOnly, koreanWon } from "../../lib/format";
import { SALARY_RULES, calculateSalary } from "../../lib/salary";
import SalaryBreakdown from "./SalaryBreakdown";
import { manLabel, salaryAmounts, salaryPath } from "./amounts";

type Family = 1 | 2 | 3 | 4;

const familyOptions: { id: string; name: string }[] = [1, 2, 3, 4].map((n) => ({ id: String(n), name: `${n}명` }));
const childOptions: { id: string; name: string }[] = [0, 1, 2, 3].map((n) => ({ id: String(n), name: `${n}명` }));
const severanceOptions: { id: "separate" | "included"; name: string }[] = [
  { id: "separate", name: "퇴직금 별도" },
  { id: "included", name: "퇴직금 포함" },
];

const won = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;

// 표에 보여 줄 대표 연봉 (만원)
const tableAmounts = [2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000];

export default function SalaryCalculator() {
  const [salary, setSalary] = useState("");
  const [nonTaxable, setNonTaxable] = useState(String(SALARY_RULES.defaultNonTaxable));
  const [family, setFamily] = useState<Family>(1);
  const [children, setChildren] = useState(0);
  const [severance, setSeverance] = useState<"separate" | "included">("separate");

  const annual = Number(salary);
  const result =
    annual >= 1_000_000
      ? calculateSalary({
          annualSalary: annual,
          nonTaxableMonthly: Number(nonTaxable) || 0,
          family,
          children: Math.min(children, family - 1),
          severanceIncluded: severance === "included",
        })
      : null;

  return (
    <ToolPage
      slug="salary-calculator"
      subtitle={`${SALARY_RULES.year}년 4대보험 요율과 근로소득 간이세액표로 연봉의 월 실수령액을 계산합니다.`}
    >
      <Card className="flex flex-col gap-5">
        <Field
          label="연봉 (세전)"
          htmlFor="salary-annual"
          hint={annual > 0 ? koreanWon(annual) : "계약서의 연봉을 원 단위로 입력하세요"}
        >
          <input
            id="salary-annual"
            inputMode="numeric"
            value={salary ? annual.toLocaleString("ko-KR") : ""}
            onChange={(e) => setSalary(digitsOnly(e.target.value).slice(0, 11))}
            placeholder="40,000,000"
            className={inputClass}
          />
        </Field>
        <Segmented label="퇴직금" options={severanceOptions} value={severance} onChange={setSeverance} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Segmented
            label="부양가족 수 (본인 포함)"
            options={familyOptions}
            value={String(family)}
            onChange={(v) => {
              const n = Number(v) as Family;
              setFamily(n);
              setChildren((c) => Math.min(c, n - 1));
            }}
          />
          <Segmented
            label="8세~20세 자녀 수"
            options={childOptions.filter((o) => Number(o.id) <= family - 1)}
            value={String(Math.min(children, family - 1))}
            onChange={(v) => setChildren(Number(v))}
          />
        </div>
        <Field
          label="월 비과세액"
          htmlFor="salary-nontaxable"
          hint="식대는 월 20만 원까지 비과세입니다. 회사에서 비과세로 처리하는 금액이 다르면 바꾸세요."
        >
          <input
            id="salary-nontaxable"
            inputMode="numeric"
            value={nonTaxable ? Number(nonTaxable).toLocaleString("ko-KR") : ""}
            onChange={(e) => setNonTaxable(digitsOnly(e.target.value).slice(0, 9))}
            placeholder="200,000"
            className={inputClass}
          />
        </Field>
      </Card>

      {result && (
        <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero
            label="월 실수령액"
            value={won(result.net)}
            sub={`${koreanWon(result.net)} · 1년 약 ${koreanWon(result.annualNet)}`}
          />
          <StatGrid
            items={[
              { label: "월급 (세전)", value: won(result.monthly) },
              { label: "월 공제 합계", value: won(result.deductions), tone: "warn" },
              { label: "실수령 비율", value: `${((result.net / result.monthly) * 100).toFixed(1)}%` },
            ]}
          />
          <SalaryBreakdown result={result} />
        </Card>
      )}

      <Card title={`연봉별 실수령액 표 (${SALARY_RULES.year}년)`}>
        <p className="text-sm text-ink-3 -mt-2 mb-3">
          부양가족 1명(본인), 비과세 식대 월 20만 원, 퇴직금 별도 기준입니다. 연봉을 누르면 공제 내역을 볼
          수 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[360px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">연봉</th>
                <th className="py-2.5 px-3 font-medium text-right">월 실수령액</th>
                <th className="py-2.5 pl-3 font-medium text-right">월 공제액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {tableAmounts.map((man) => {
                const r = calculateSalary({ annualSalary: man * 10000 });
                return (
                  <tr key={man}>
                    <td className="py-3 pr-3">
                      <Link href={salaryPath(man)} className="text-brand font-bold">
                        {manLabel(man)}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-ink">{won(r.net)}</td>
                    <td className="py-3 pl-3 text-right text-ink-3">{won(r.deductions)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {salaryAmounts
            .filter((man) => !tableAmounts.includes(man))
            .map((man) => (
              <Link
                key={man}
                href={salaryPath(man)}
                className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
              >
                {manLabel(man)}
              </Link>
            ))}
        </div>
      </Card>

      <Card title={`월급에서 빠지는 항목 (${SALARY_RULES.year}년 근로자 부담)`}>
        <BulletList
          items={[
            <>
              <strong className="text-ink">국민연금 4.75%:</strong> 2025년 연금개혁으로 보험료율이 9%에서
              2026년 9.5%로 올랐고, 2033년까지 해마다 0.5%포인트씩 올라 13%가 됩니다. 회사와 절반씩
              냅니다. 기준소득월액은 41만~659만 원(2026년 7월~2027년 6월)이라 월급이 659만 원을 넘어도
              보험료는 더 늘지 않습니다.
            </>,
            <>
              <strong className="text-ink">건강보험 3.595%:</strong> 보험료율 7.19%를 회사와 절반씩
              냅니다.
            </>,
            <>
              <strong className="text-ink">장기요양보험:</strong> 건강보험료에 13.14%(장기요양보험료율
              0.9448% ÷ 건강보험료율 7.19%)를 곱한 금액입니다.
            </>,
            <>
              <strong className="text-ink">고용보험 0.9%</strong>
            </>,
            <>
              <strong className="text-ink">소득세·지방소득세:</strong> 국세청 근로소득 간이세액표(2026년
              3월 1일 이후 지급분)에 따라 매달 떼고, 지방소득세는 소득세의 10%입니다.
            </>,
          ]}
        />
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "'퇴직금 포함' 연봉은 어떻게 계산하나요?",
              "연봉에 퇴직금이 포함돼 있으면 연봉을 13으로 나눈 금액이 월급이고, 나머지 1/13은 퇴직할 때 퇴직금으로 받습니다. 그래서 같은 연봉이라도 월 실수령액이 더 적습니다.",
            ],
            [
              "비과세 식대는 꼭 넣어야 하나요?",
              "식대는 월 20만 원까지 소득세와 4대보험이 붙지 않습니다. 회사가 급여 명세서에 식대를 따로 비과세로 처리한다면 그 금액을 넣고, 없다면 0으로 바꾸세요.",
            ],
            [
              "실제 월급과 몇 천 원 차이가 나요.",
              "회사마다 보험료 계산 기준(전년도 소득으로 정한 보수월액 등)과 원 단위 처리 방식이 조금씩 다릅니다. 또 간이세액표의 80%·120%를 고른 경우 소득세가 달라집니다. 정확한 금액은 급여 명세서를 확인하세요.",
            ],
            [
              "연말정산을 하면 금액이 바뀌나요?",
              "매달 떼는 소득세는 간이세액표에 따른 예납액입니다. 연말정산에서 카드 사용액, 보험료, 의료비 등 공제를 반영해 1년 세금을 다시 계산하므로 일부를 돌려받거나 더 낼 수 있습니다.",
            ],
          ]}
        />
      </Card>
    </ToolPage>
  );
}
