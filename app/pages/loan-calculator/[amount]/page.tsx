import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPage, { subPageCard } from "../../../components/SubPage";
import { Faq } from "../../../lib/structuredData";
import { koreanWon, manLabel } from "../../../lib/format";
import { equalPrincipalInterest, installmentPayment } from "../../../lib/loan";
import { toolPath } from "../../../tools";
import { loanAmountPath, loanAmounts, loanRates, periodsFor } from "../amounts";

export const dynamicParams = false;

export function generateStaticParams() {
  return loanAmounts.map((man) => ({ amount: String(man) }));
}

type Props = { params: Promise<{ amount: string }> };

const won = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;
// 한 달 이자 = 원금 × 연 금리 ÷ 12
const monthlyInterest = (principal: number, rate: number) => (principal * rate) / 100 / 12;

const BASE_RATE = 4; // 대표 금리 (%)

function parseAmount(value: string) {
  const man = Number(value);
  return loanAmounts.includes(man) ? man : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const man = parseAmount((await params).amount);
  if (!man) return {};
  const principal = man * 10000;
  const label = manLabel(man).replace(/원$/, "");
  const period = periodsFor(man)[2];
  return {
    title: {
      absolute: `${label} 대출 한 달 이자 - 연 ${BASE_RATE}% 월 ${won(monthlyInterest(principal, BASE_RATE))}, 금리별 이자표`,
    },
    description: `${label} 대출의 한 달 이자는 연 ${BASE_RATE}%일 때 ${won(monthlyInterest(principal, BASE_RATE))}입니다. 금리 3~7%별 월 이자와 ${period}년 원리금균등 월 상환액(연 ${BASE_RATE}% ${won(installmentPayment(principal, BASE_RATE / 100, period * 12))}), 상환 방식별 총 이자를 표로 정리했습니다.`,
    alternates: { canonical: loanAmountPath(man) },
  };
}

export default async function LoanAmountPage({ params }: Props) {
  const man = parseAmount((await params).amount);
  if (!man) notFound();

  const principal = man * 10000;
  const label = manLabel(man).replace(/원$/, "");
  const periods = periodsFor(man);
  const mainPeriod = periods[2];
  const months = mainPeriod * 12;
  const r = BASE_RATE / 100;
  const installment = installmentPayment(principal, r, months);
  const installmentInterest = installment * months - principal;
  const principalInterest = equalPrincipalInterest(principal, r, months);
  const bulletInterest = monthlyInterest(principal, BASE_RATE) * months;
  const isMortgageSize = man >= 10000;
  const index = loanAmounts.indexOf(man);
  const nearby = loanAmounts.slice(Math.max(0, index - 3), index + 4).filter((m) => m !== man);

  const faqs: Faq[] = [
    {
      question: `${label} 대출하면 한 달 이자는 얼마인가요?`,
      answer: `원금은 그대로 두고 이자만 낸다면 한 달 이자는 원금 × 연 금리 ÷ 12입니다. ${label}을 연 ${BASE_RATE}%로 빌리면 ${won(monthlyInterest(principal, BASE_RATE))}, 연 5%면 ${won(monthlyInterest(principal, 5))}입니다.`,
    },
    {
      question: `${label}을 ${mainPeriod}년 동안 갚으면 매달 얼마씩 내나요?`,
      answer: `연 ${BASE_RATE}% 원리금균등상환이면 매달 ${won(installment)}씩 ${mainPeriod}년 동안 내고, 총 이자는 약 ${koreanWon(installmentInterest)}입니다. 원금균등상환이면 첫 달 ${won(principal / months + principal * (r / 12))}부터 점점 줄어듭니다.`,
    },
    {
      question: "금리가 1%포인트 오르면 이자가 얼마나 늘어나나요?",
      answer: `${label} 기준으로 한 달 이자가 ${won(monthlyInterest(principal, 1))}씩 늘어납니다. 1년이면 ${koreanWon(monthlyInterest(principal, 1) * 12)}입니다.`,
    },
  ];

  return (
    <SubPage
      crumbs={[
        { name: "홈", path: "/" },
        { name: "대출 이자 계산기", path: toolPath("loan-calculator") },
        { name: `${label} 대출`, path: loanAmountPath(man) },
      ]}
      title={`${label} 대출 이자 계산`}
      lead={`${label}을 빌렸을 때 금리별 한 달 이자와 상환 기간별 월 상환액, 상환 방식에 따른 총 이자를 정리했습니다. ${
        isMortgageSize ? "주택담보대출(주담대)" : "신용대출·전세자금대출"
      }을 알아볼 때 참고하세요.`}
      faqs={faqs}
    >
      <section className={subPageCard}>
        <p className="text-[15px] text-ink-3">
          {label} · 연 {BASE_RATE}% · 이자만 낼 때
        </p>
        <p className="text-5xl font-extrabold tracking-tight text-brand mt-1">
          월 {won(monthlyInterest(principal, BASE_RATE))}
        </p>
        <p className="text-sm text-ink-3 mt-2">
          1년 이자 {koreanWon(monthlyInterest(principal, BASE_RATE) * 12)} · 원금은 만기에 한 번에 상환
        </p>
      </section>

      <section className={subPageCard}>
        <h2>금리별 한 달 이자</h2>
        <p className="mb-3 text-[15px]">
          원금을 줄이지 않고 이자만 내는 경우(만기일시상환, 거치기간)의 한 달 이자입니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">연 금리</th>
                <th className="py-2.5 px-3 font-medium text-right">한 달 이자</th>
                <th className="py-2.5 pl-3 font-medium text-right">1년 이자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {loanRates.map((rate) => (
                <tr key={rate} className={rate === BASE_RATE ? "font-bold text-ink" : ""}>
                  <td className="py-3 pr-3">{rate}%</td>
                  <td className="py-3 px-3 text-right">{won(monthlyInterest(principal, rate))}</td>
                  <td className="py-3 pl-3 text-right">{won(monthlyInterest(principal, rate) * 12)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={subPageCard}>
        <h2>원리금균등 월 상환액</h2>
        <p className="mb-3 text-[15px]">원금과 이자를 합쳐 매달 같은 금액을 낼 때의 월 상환액입니다.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">연 금리</th>
                {periods.map((p) => (
                  <th key={p} className="py-2.5 px-2 font-medium text-right">
                    {p}년
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {[3, 4, 5, 6].map((rate) => (
                <tr key={rate} className={rate === BASE_RATE ? "font-bold text-ink" : ""}>
                  <td className="py-3 pr-3">{rate}%</td>
                  {periods.map((p) => (
                    <td key={p} className="py-3 px-2 text-right">
                      {won(installmentPayment(principal, rate / 100, p * 12))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={subPageCard}>
        <h2>
          상환 방식별 총 이자 (연 {BASE_RATE}%, {mainPeriod}년)
        </h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full min-w-[420px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">상환 방식</th>
                <th className="py-2.5 px-3 font-medium text-right">첫 달 상환액</th>
                <th className="py-2.5 pl-3 font-medium text-right">총 이자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              <tr>
                <td className="py-3 pr-3 font-bold text-ink">원리금균등</td>
                <td className="py-3 px-3 text-right">{won(installment)}</td>
                <td className="py-3 pl-3 text-right">{won(installmentInterest)}</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-bold text-ink">원금균등</td>
                <td className="py-3 px-3 text-right">{won(principal / months + principal * (r / 12))}</td>
                <td className="py-3 pl-3 text-right">{won(principalInterest)}</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-bold text-ink">만기일시</td>
                <td className="py-3 px-3 text-right">{won(monthlyInterest(principal, BASE_RATE))}</td>
                <td className="py-3 pl-3 text-right">{won(bulletInterest)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-3">
          원금균등은 첫 달 부담이 가장 크지만 총 이자가 가장 적고, 만기일시는 매달 부담이 가장 작지만 원금이
          줄지 않아 총 이자가 가장 많습니다. 다른 금리·기간은{" "}
          <Link href={toolPath("loan-calculator")} className="text-brand font-bold">
            대출 이자 계산기
          </Link>
          에서 계산해 보세요.
        </p>
      </section>

      <section className={subPageCard}>
        <h2>다른 금액 대출 이자</h2>
        <div className="flex flex-wrap gap-2">
          {nearby.map((m) => (
            <Link
              key={m}
              href={loanAmountPath(m)}
              className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
            >
              {manLabel(m).replace(/원$/, "")} 대출
            </Link>
          ))}
        </div>
        <p className="text-sm text-ink-3 mt-4">
          고정금리, 거치기간 없음 기준입니다. 실제 대출은 중도상환수수료, 보증료, 금리 변동에 따라 금액이
          달라질 수 있습니다.
        </p>
      </section>
    </SubPage>
  );
}
