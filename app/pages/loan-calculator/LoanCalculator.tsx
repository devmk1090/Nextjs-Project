"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BulletList,
  Card,
  ErrorText,
  Field,
  PrimaryButton,
  ResultHero,
  Segmented,
  StatGrid,
  ToolPage,
  inputClass,
} from "../../components/tool/ToolUI";
import { digitsOnly, koreanWon, manLabel, monthsText, won } from "../../lib/format";
import { loanAmountPath, loanAmounts } from "./amounts";
import { MonthlyPayment, RepaymentType, buildSchedule, summarize } from "../../lib/loan";

type PeriodUnit = "year" | "month";

const repaymentTypes: { id: RepaymentType; name: string }[] = [
  { id: "equal-installment", name: "원리금균등" },
  { id: "equal-principal", name: "원금균등" },
  { id: "bullet", name: "만기일시" },
];

const periodUnits: { id: PeriodUnit; name: string }[] = [
  { id: "year", name: "년" },
  { id: "month", name: "개월" },
];

type Result = {
  type: RepaymentType;
  principal: number;
  months: number;
  annualRate: number;
  payments: MonthlyPayment[];
  comparison: ({ id: RepaymentType; name: string } & ReturnType<typeof summarize>)[];
} & ReturnType<typeof summarize>;

const SCHEDULE_PREVIEW = 12;

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState<PeriodUnit>("year");
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("equal-installment");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [showAllSchedule, setShowAllSchedule] = useState(false);

  const principalInput = Number(loanAmount);
  const periodInput = Number(period);
  const monthsInput = periodUnit === "year" ? periodInput * 12 : periodInput;

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const annualRate = parseFloat(interestRate);
    if (!principalInput || !(annualRate > 0) || !Number.isInteger(monthsInput) || monthsInput <= 0) {
      setResult(null);
      setError("대출 금액, 연이자율, 기간을 모두 0보다 큰 값으로 입력하세요. 기간은 개월 단위로 나누어떨어져야 합니다.");
      return;
    }
    if (monthsInput > 600) {
      setResult(null);
      setError("대출 기간은 50년(600개월) 이하로 입력하세요.");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const payments = buildSchedule(repaymentType, principalInput, monthlyRate, monthsInput);
    setError("");
    setShowAllSchedule(false);
    setResult({
      type: repaymentType,
      principal: principalInput,
      months: monthsInput,
      annualRate,
      payments,
      ...summarize(payments),
      comparison: repaymentTypes.map((t) => ({
        ...t,
        ...summarize(buildSchedule(t.id, principalInput, monthlyRate, monthsInput)),
      })),
    });
  };

  const hero = result && {
    "equal-installment": {
      label: "매월 상환액",
      sub: `${koreanWon(result.firstPayment)} · ${monthsText(result.months)} 동안 같은 금액`,
    },
    "equal-principal": {
      label: "첫 달 상환액",
      sub: `매월 줄어들어 마지막 달에는 ${won(result.lastPayment)}원`,
    },
    bullet: {
      label: "매월 이자",
      sub: `만기(${monthsText(result.months)} 후)에 원금 ${koreanWon(result.principal)}을 한 번에 상환`,
    },
  }[result.type];

  const minInterest = result ? Math.min(...result.comparison.map((c) => c.totalInterest)) : 0;
  const schedule = result
    ? showAllSchedule
      ? result.payments
      : result.payments.slice(0, SCHEDULE_PREVIEW)
    : [];

  return (
    <ToolPage
      slug="loan-calculator"
      subtitle="주택담보대출(주담대), 전세자금대출, 신용대출의 상환 방식별 월 상환액과 총 이자를 계산합니다."
    >
      <form onSubmit={calculateLoan} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <Field
          label="대출 금액"
          htmlFor="loan-amount"
          hint={principalInput > 0 ? koreanWon(principalInput) : "원 단위로 입력하세요"}
        >
          <input
            id="loan-amount"
            inputMode="numeric"
            value={loanAmount ? principalInput.toLocaleString("ko-KR") : ""}
            onChange={(e) => setLoanAmount(digitsOnly(e.target.value).slice(0, 13))}
            placeholder="100,000,000"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="연이자율 (%)" htmlFor="loan-rate">
            <input
              id="loan-rate"
              type="number"
              inputMode="decimal"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="4.0"
              step="0.01"
              min="0"
              className={inputClass}
            />
          </Field>
          <Field
            label="대출 기간"
            htmlFor="loan-period"
            hint={periodUnit === "year" && periodInput > 0 ? `${monthsInput}개월` : undefined}
          >
            <div className="flex gap-2">
              <input
                id="loan-period"
                type="number"
                inputMode="numeric"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder={periodUnit === "year" ? "30" : "360"}
                min="1"
                className={inputClass}
              />
              <div role="radiogroup" aria-label="기간 단위" className="flex shrink-0 p-1.5 bg-canvas rounded-2xl">
                {periodUnits.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    role="radio"
                    aria-checked={periodUnit === unit.id}
                    onClick={() => setPeriodUnit(unit.id)}
                    className={`px-3 rounded-xl text-[15px] font-bold ${
                      periodUnit === unit.id ? "bg-white text-brand shadow-sm" : "text-ink-3"
                    }`}
                  >
                    {unit.name}
                  </button>
                ))}
              </div>
            </div>
          </Field>
        </div>

        <Segmented
          label="상환 방식"
          options={repaymentTypes}
          value={repaymentType}
          onChange={setRepaymentType}
        />

        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">계산하기</PrimaryButton>
      </form>

      {result && hero && (
        <>
          <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
            <ResultHero label={hero.label} value={`${won(result.firstPayment)}원`} sub={hero.sub} />
            <StatGrid
              items={[
                { label: "총 이자", value: `${won(result.totalInterest)}원`, tone: "warn" },
                { label: "총 상환액", value: `${won(result.totalPayment)}원` },
                { label: "대출 원금", value: `${won(result.principal)}원` },
              ]}
            />
            <p className="text-sm text-ink-4 border-t border-line pt-4">
              {koreanWon(result.principal)} · 연 {result.annualRate}% · {monthsText(result.months)} 기준
            </p>
          </Card>

          <Card title="상환 방식별 비교">
            <p className="text-sm text-ink-3 -mt-2 mb-4">
              같은 금액·금리·기간일 때 상환 방식에 따른 차이입니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-[15px]">
                <thead className="text-ink-3 text-left">
                  <tr className="border-b border-line">
                    <th className="py-2.5 pr-3 font-medium">상환 방식</th>
                    <th className="py-2.5 px-3 font-medium text-right">첫 달</th>
                    <th className="py-2.5 px-3 font-medium text-right">마지막 달</th>
                    <th className="py-2.5 pl-3 font-medium text-right">총 이자</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-canvas">
                  {result.comparison.map((c) => {
                    const selected = c.id === result.type;
                    return (
                      <tr key={c.id} className={selected ? "text-ink font-bold" : ""}>
                        <td className="py-3.5 pr-3">
                          {c.name}
                          {selected && (
                            <span className="ml-2 text-xs font-bold text-brand bg-brand-soft rounded-md px-1.5 py-0.5">
                              선택
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">{won(c.firstPayment)}원</td>
                        <td className="py-3.5 px-3 text-right">{won(c.lastPayment)}원</td>
                        <td className="py-3.5 pl-3 text-right">
                          {won(c.totalInterest)}원
                          {c.totalInterest > minInterest && (
                            <span className="block text-xs text-ink-4 font-normal">
                              최소보다 +{won(c.totalInterest - minInterest)}원
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="상환 일정표">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="text-ink-3">
                  <tr className="border-b border-line">
                    <th className="py-2.5 pr-2 font-medium text-center">회차</th>
                    <th className="py-2.5 px-2 font-medium text-right">원금</th>
                    <th className="py-2.5 px-2 font-medium text-right">이자</th>
                    <th className="py-2.5 px-2 font-medium text-right">월 상환액</th>
                    <th className="py-2.5 pl-2 font-medium text-right">잔액</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-canvas">
                  {schedule.map((p) => (
                    <tr key={p.month}>
                      <td className="py-2.5 pr-2 text-center text-ink-3">{p.month}</td>
                      <td className="py-2.5 px-2 text-right">{won(p.principal)}</td>
                      <td className="py-2.5 px-2 text-right">{won(p.interest)}</td>
                      <td className="py-2.5 px-2 text-right font-bold text-ink">{won(p.payment)}</td>
                      <td className="py-2.5 pl-2 text-right text-ink-3">{won(p.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.payments.length > SCHEDULE_PREVIEW && (
              <button
                type="button"
                onClick={() => setShowAllSchedule((v) => !v)}
                className="mt-4 w-full h-12 rounded-2xl bg-canvas text-ink-2 font-bold hover:bg-line"
              >
                {showAllSchedule
                  ? "처음 12회차만 보기"
                  : `전체 ${result.payments.length}회차 보기`}
              </button>
            )}
          </Card>
        </>
      )}

      <Card title="금액별 대출 이자표">
        <p className="text-sm text-ink-3 -mt-2 mb-3">
          금액을 누르면 금리별 한 달 이자와 기간별 월 상환액을 표로 볼 수 있습니다.
        </p>
        <div className="flex flex-wrap gap-2">
          {loanAmounts.map((man) => (
            <Link
              key={man}
              href={loanAmountPath(man)}
              className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
            >
              {manLabel(man).replace(/원$/, "")} 대출
            </Link>
          ))}
        </div>
      </Card>

      <Card title="대출 상환 방식 3가지">
        <div className="flex flex-col gap-3">
          {[
            [
              "원리금균등상환",
              "원금과 이자를 합친 금액을 매월 똑같이 냅니다. 초기에는 이자 비중이 크고 갈수록 원금 비중이 커집니다. 월 상환액이 일정해 자금 계획을 세우기 쉬워 주택담보대출에서 가장 많이 쓰입니다.",
            ],
            [
              "원금균등상환",
              "원금을 매월 똑같이 나눠 갚고, 남은 원금에 대한 이자를 더해 냅니다. 원금이 빨리 줄어 총 이자가 세 방식 중 가장 적지만, 첫 달 상환액이 가장 큽니다.",
            ],
            [
              "만기일시상환",
              "대출 기간 동안 매월 이자만 내고 원금은 만기에 한 번에 갚습니다. 매월 부담은 가장 작지만 원금이 줄지 않아 총 이자가 가장 많습니다. 신용대출, 전세자금대출에서 주로 쓰입니다.",
            ],
          ].map(([title, desc]) => (
            <div key={title} className="bg-canvas rounded-2xl p-5">
              <h3 className="font-bold text-ink mb-1">{title}</h3>
              <p className="text-[15px]">{desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="주택담보대출(주담대) 이자 계산 예시">
        <p className="mb-4">
          3억 원을 연 4% 고정금리로 빌렸을 때 상환 방식과 기간에 따라 달라지는 금액입니다(거치기간 없음).
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full min-w-[480px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">조건</th>
                <th className="py-2.5 px-3 font-medium text-right">월 상환액</th>
                <th className="py-2.5 pl-3 font-medium text-right">총 이자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {[
                ["30년 원리금균등", "1,432,246원", "215,608,519원"],
                ["30년 원금균등", "1,833,333원 → 836,111원", "180,500,000원"],
                ["40년 원리금균등", "1,253,815원", "301,831,396원"],
              ].map(([label, monthly, interest]) => (
                <tr key={label}>
                  <td className="py-3 pr-3 font-bold text-ink">{label}</td>
                  <td className="py-3 px-3 text-right">{monthly}</td>
                  <td className="py-3 pl-3 text-right">{interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BulletList
          items={[
            "같은 30년이라도 원금균등은 첫 달 부담이 약 40만 원 더 크지만 총 이자가 약 3,500만 원 적습니다.",
            "기간을 40년으로 늘리면 월 상환액은 약 18만 원 줄지만 총 이자는 약 8,600만 원 늘어납니다.",
            "자동차담보대출, 전세자금대출, 신용대출도 금리와 기간을 넣으면 같은 방식으로 계산할 수 있습니다. 전세자금대출과 신용대출은 만기일시상환이 흔합니다.",
          ]}
        />
      </Card>

      <Card title="계산 방법">
        <BulletList
          items={[
            "월 이자율 = 연 이자율 ÷ 12",
            "매월 이자 = 남은 원금 × 월 이자율",
            <>
              원리금균등 월 상환액 = 원금 × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1) (r: 월
              이자율, n: 상환 개월수)
            </>,
          ]}
        />
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            "고정금리 기준 계산입니다. 변동금리 대출은 금리가 바뀌면 상환액도 달라집니다.",
            "거치기간, 중도상환수수료, 보증료 등은 반영하지 않았습니다.",
            "실제 상환액은 금융기관의 일할 계산 방식이나 반올림에 따라 몇 원 정도 차이가 날 수 있습니다.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
