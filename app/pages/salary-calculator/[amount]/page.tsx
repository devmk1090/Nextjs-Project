import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPage, { subPageCard } from "../../../components/SubPage";
import { Faq } from "../../../lib/structuredData";
import { koreanWon } from "../../../lib/format";
import { SALARY_RULES, calculateSalary } from "../../../lib/salary";
import { toolPath } from "../../../tools";
import SalaryBreakdown from "../SalaryBreakdown";
import { manLabel, salaryAmounts, salaryPath } from "../amounts";

export const dynamicParams = false;

export function generateStaticParams() {
  return salaryAmounts.map((man) => ({ amount: String(man) }));
}

type Props = { params: Promise<{ amount: string }> };

const won = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;

function parseAmount(value: string) {
  const man = Number(value);
  return salaryAmounts.includes(man) ? man : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const man = parseAmount((await params).amount);
  if (!man) return {};
  const r = calculateSalary({ annualSalary: man * 10000 });
  return {
    title: { absolute: `연봉 ${manLabel(man)} 실수령액 (${SALARY_RULES.year}년) - 월 ${won(r.net)}` },
    description: `연봉 ${manLabel(man)}의 ${SALARY_RULES.year}년 월 실수령액은 약 ${won(r.net)}입니다(부양가족 1명, 비과세 식대 20만 원). 국민연금 ${won(r.pension)}, 건강보험 ${won(r.health)}, 소득세 ${won(r.incomeTax)} 등 공제 내역과 부양가족 수별 실수령액을 정리했습니다.`,
    alternates: { canonical: salaryPath(man) },
  };
}

export default async function SalaryAmountPage({ params }: Props) {
  const man = parseAmount((await params).amount);
  if (!man) notFound();

  const annual = man * 10000;
  const r = calculateSalary({ annualSalary: annual });
  const withSeverance = calculateSalary({ annualSalary: annual, severanceIncluded: true });
  const byFamily = ([1, 2, 3, 4] as const).map((family) => ({
    family,
    result: calculateSalary({ annualSalary: annual, family }),
  }));
  const index = salaryAmounts.indexOf(man);
  const nearby = salaryAmounts.slice(Math.max(0, index - 3), index + 4).filter((m) => m !== man);
  const label = manLabel(man);

  const faqs: Faq[] = [
    {
      question: `연봉 ${label}이면 월급 실수령액은 얼마인가요?`,
      answer: `${SALARY_RULES.year}년 기준 부양가족 1명, 비과세 식대 월 20만 원이면 세전 월급 ${won(r.monthly)}에서 4대보험과 소득세 ${won(r.deductions)}를 빼고 약 ${won(r.net)}을 받습니다. 1년으로는 약 ${koreanWon(r.annualNet)}입니다.`,
    },
    {
      question: `연봉 ${label}에 퇴직금이 포함돼 있으면요?`,
      answer: `퇴직금 포함 연봉이면 13으로 나눈 ${won(withSeverance.monthly)}이 월급이 되어 실수령액은 약 ${won(withSeverance.net)}입니다. 나머지 1/13은 퇴직할 때 퇴직금으로 받습니다.`,
    },
    {
      question: "부양가족이 많으면 실수령액이 늘어나나요?",
      answer: `소득세가 줄어 실수령액이 늘어납니다. 연봉 ${label} 기준 부양가족이 1명이면 ${won(byFamily[0].result.net)}, 4명이면 ${won(byFamily[3].result.net)}입니다. 8세 이상 20세 이하 자녀가 있으면 소득세가 더 줄어듭니다.`,
    },
  ];

  return (
    <SubPage
      crumbs={[
        { name: "홈", path: "/" },
        { name: "연봉 실수령액 계산기", path: toolPath("salary-calculator") },
        { name: `연봉 ${label}`, path: salaryPath(man) },
      ]}
      title={`연봉 ${label} 실수령액 (${SALARY_RULES.year}년)`}
      lead={`연봉 ${label}을 받을 때 매달 통장에 들어오는 금액과 빠지는 4대보험·세금을 ${SALARY_RULES.year}년 요율과 국세청 근로소득 간이세액표로 계산했습니다.`}
      faqs={faqs}
    >
      <section className={subPageCard}>
        <p className="text-[15px] text-ink-3">월 실수령액 (부양가족 1명, 비과세 식대 20만 원)</p>
        <p className="text-5xl font-extrabold tracking-tight text-brand mt-1">{won(r.net)}</p>
        <p className="text-sm text-ink-3 mt-2">
          {koreanWon(r.net)} · 1년 약 {koreanWon(r.annualNet)}
        </p>
        <div className="mt-5">
          <SalaryBreakdown result={r} />
        </div>
      </section>

      <section className={subPageCard}>
        <h2>부양가족 수별 실수령액</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">부양가족 (본인 포함)</th>
                <th className="py-2.5 px-3 font-medium text-right">소득세</th>
                <th className="py-2.5 pl-3 font-medium text-right">월 실수령액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {byFamily.map(({ family, result }) => (
                <tr key={family}>
                  <td className="py-3 pr-3">{family}명</td>
                  <td className="py-3 px-3 text-right">{won(result.incomeTax)}</td>
                  <td className="py-3 pl-3 text-right font-bold text-ink">{won(result.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-3 mt-3">
          부양가족은 본인과 배우자를 포함해 기본공제를 받는 가족 수입니다. 자녀 공제나 비과세 금액을 바꿔
          보려면{" "}
          <Link href={toolPath("salary-calculator")} className="text-brand font-bold">
            연봉 실수령액 계산기
          </Link>
          를 이용하세요.
        </p>
      </section>

      <section className={subPageCard}>
        <h2>퇴직금 포함 연봉이라면</h2>
        <p>
          연봉 {label}에 퇴직금이 포함돼 있으면 월급은 연봉을 13으로 나눈 {won(withSeverance.monthly)}이고,
          월 실수령액은 약 <strong className="text-ink">{won(withSeverance.net)}</strong>입니다. 퇴직금 별도
          연봉보다 매달 {won(r.net - withSeverance.net)} 적게 받는 대신, 1년마다 약{" "}
          {won(withSeverance.monthly)}이 퇴직금으로 쌓입니다.
        </p>
      </section>

      <section className={subPageCard}>
        <h2>다른 연봉 실수령액</h2>
        <div className="flex flex-wrap gap-2">
          {nearby.map((m) => (
            <Link
              key={m}
              href={salaryPath(m)}
              className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
            >
              연봉 {manLabel(m)}
            </Link>
          ))}
        </div>
        <p className="text-sm text-ink-3 mt-4">
          {SALARY_RULES.year}년 기준: 국민연금 4.75%(기준소득월액 상한 659만 원), 건강보험 3.595%,
          장기요양보험 건강보험료의 13.14%, 고용보험 0.9%, 소득세는 근로소득 간이세액표(100%). 회사의 보험료
          산정 방식에 따라 실제 급여와 몇 천 원 차이가 날 수 있습니다.
        </p>
      </section>
    </SubPage>
  );
}
