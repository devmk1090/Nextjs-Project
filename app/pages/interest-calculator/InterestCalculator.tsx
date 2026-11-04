"use client";

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
import { digitsOnly, koreanWon, monthsText, won } from "../../lib/format";

type CalculatorType = "deposit" | "savings";
type InterestMethod = "simple" | "compound";
type TaxType = "general" | "exempt" | "custom";

const calculatorTypes: { id: CalculatorType; name: string }[] = [
  { id: "deposit", name: "예금" },
  { id: "savings", name: "적금" },
];
const interestMethods: { id: InterestMethod; name: string }[] = [
  { id: "simple", name: "단리" },
  { id: "compound", name: "월복리" },
];
const taxTypes: { id: TaxType; name: string }[] = [
  { id: "general", name: "일반 15.4%" },
  { id: "exempt", name: "비과세" },
  { id: "custom", name: "직접 입력" },
];

type Result = {
  type: CalculatorType;
  method: InterestMethod;
  months: number;
  totalPrincipal: number;
  totalInterest: number;
  taxAmount: number;
  finalAmount: number;
  taxRate: number;
};

export default function InterestCalculator() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>("deposit");
  const [interestMethod, setInterestMethod] = useState<InterestMethod>("simple");
  const [taxType, setTaxType] = useState<TaxType>("general");
  const [customTaxRate, setCustomTaxRate] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const amountValue = Number(amount);
  const isDeposit = calculatorType === "deposit";

  // 이자소득세율: 일반과세 15.4%(소득세 14% + 지방소득세 1.4%), 비과세 0%
  const getTaxRate = () => {
    if (taxType === "general") return 0.154;
    if (taxType === "exempt") return 0;
    return (parseFloat(customTaxRate) || 0) / 100;
  };

  const calculateInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const annualRate = parseFloat(interestRate) / 100;
    const n = parseInt(period);
    if (!(amountValue > 0) || !(annualRate > 0) || !(n > 0)) {
      setResult(null);
      setError("금액, 연 이자율, 기간을 모두 0보다 큰 값으로 입력하세요.");
      return;
    }

    let totalPrincipal: number;
    let totalInterest = 0;
    if (isDeposit) {
      // 단리: 원금 × 연이율 × (개월/12), 월복리: 원금 × ((1 + 연이율/12)^개월 - 1)
      totalPrincipal = amountValue;
      totalInterest =
        interestMethod === "simple"
          ? amountValue * annualRate * (n / 12)
          : amountValue * (Math.pow(1 + annualRate / 12, n) - 1);
    } else {
      // 적금 이자: i회차 납입금은 (n - i + 1)개월 동안 예치됨
      // 단리: 납입금 × 월이율 × 예치개월, 월복리: 납입금 × ((1 + 월이율)^예치개월 - 1)
      const r = annualRate / 12;
      for (let i = 1; i <= n; i++) {
        const months = n - i + 1;
        totalInterest +=
          interestMethod === "simple"
            ? amountValue * r * months
            : amountValue * (Math.pow(1 + r, months) - 1);
      }
      totalPrincipal = amountValue * n;
    }

    const taxRate = getTaxRate();
    const taxAmount = totalInterest * taxRate;
    setError("");
    setResult({
      type: calculatorType,
      method: interestMethod,
      months: n,
      totalPrincipal,
      totalInterest,
      taxAmount,
      finalAmount: totalPrincipal + totalInterest - taxAmount,
      taxRate,
    });
  };

  // 조건을 바꾸면 이전 결과는 지움
  const reset = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setResult(null);
  };

  const taxPercent = result ? +(result.taxRate * 100).toFixed(2) : 0;

  return (
    <ToolPage
      slug="interest-calculator"
      subtitle="예금·적금의 만기 이자와 이자소득세를 뺀 세후 수령액을 계산합니다."
    >
      <form onSubmit={calculateInterest} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <Segmented
          label="계산 종류"
          options={calculatorTypes}
          value={calculatorType}
          onChange={(type) => {
            // 예치금액과 월 납입금액은 의미가 달라 종류를 바꾸면 비움
            setCalculatorType(type);
            setAmount("");
            setResult(null);
          }}
        />

        <Field
          label={isDeposit ? "예치금액" : "월 납입금액"}
          htmlFor="interest-amount"
          hint={amountValue > 0 ? koreanWon(amountValue) : "원 단위로 입력하세요"}
        >
          <input
            id="interest-amount"
            inputMode="numeric"
            value={amount ? amountValue.toLocaleString("ko-KR") : ""}
            onChange={(e) => setAmount(digitsOnly(e.target.value).slice(0, 13))}
            placeholder={isDeposit ? "10,000,000" : "500,000"}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="연 이자율 (%)" htmlFor="interest-rate">
            <input
              id="interest-rate"
              type="number"
              inputMode="decimal"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="3.5"
              step="0.01"
              min="0"
              className={inputClass}
            />
          </Field>
          <Field
            label="기간 (개월)"
            htmlFor="interest-period"
            hint={Number(period) >= 12 ? monthsText(Number(period)) : undefined}
          >
            <input
              id="interest-period"
              type="number"
              inputMode="numeric"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="12"
              min="1"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2">
          <Segmented
            label="이자 계산 방식"
            options={interestMethods}
            value={interestMethod}
            onChange={reset(setInterestMethod)}
          />
          <p className="text-sm text-ink-4">
            대부분의 시중은행 예·적금은 단리입니다. 상품설명서에서 이자 지급 방식을 확인하세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Segmented label="과세 방식" options={taxTypes} value={taxType} onChange={reset(setTaxType)} />
          {taxType === "custom" && (
            <input
              type="number"
              inputMode="decimal"
              aria-label="세율 (%)"
              value={customTaxRate}
              onChange={(e) => setCustomTaxRate(e.target.value)}
              placeholder="세율 (%) 예: 1.4"
              step="0.1"
              min="0"
              className={inputClass}
            />
          )}
        </div>

        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">계산하기</PrimaryButton>
      </form>

      {result && (
        <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero
            label={`${result.type === "deposit" ? "예금" : "적금"} 만기 세후 수령액`}
            value={`${won(result.finalAmount)}원`}
            sub={`${koreanWon(result.finalAmount)} · 이자소득세 ${taxPercent}% 공제 후`}
          />
          <StatGrid
            items={[
              {
                label: result.type === "deposit" ? "예치금액" : "총 납입금액",
                value: `${won(result.totalPrincipal)}원`,
              },
              { label: "세전 이자", value: `${won(result.totalInterest)}원` },
              { label: `이자소득세 ${taxPercent}%`, value: `−${won(result.taxAmount)}원`, tone: "warn" },
              { label: "세후 이자", value: `${won(result.totalInterest - result.taxAmount)}원` },
            ]}
          />
          <div className="border-t border-line pt-5 text-[15px]">
            <BulletList
              items={
                result.type === "deposit"
                  ? [
                      "예금은 목돈을 한 번에 맡기고 만기까지 기다리는 상품입니다.",
                      result.method === "simple"
                        ? "단리: 원금에 대해서만 이자가 붙습니다."
                        : "월복리: 매월 발생한 이자가 원금에 더해져 다음 달 이자 계산에 포함됩니다.",
                      "중도 해지하면 약정 이자율보다 낮은 이자가 적용됩니다.",
                    ]
                  : [
                      `먼저 낸 납입금일수록 오래 예치되어 이자가 많이 붙습니다. 그래서 ${monthsText(result.months)} 적금 이자는 같은 금리 예금보다 적습니다.`,
                      result.method === "simple"
                        ? "단리: 각 회차 납입금에 예치 개월수만큼 이자가 붙습니다."
                        : "월복리: 각 회차 납입금의 이자가 매월 원금에 더해집니다.",
                      "중도 해지하면 약정 이자율보다 낮은 이자가 적용됩니다.",
                    ]
              }
            />
          </div>
        </Card>
      )}

      <Card title="적금 이자가 생각보다 적은 이유">
        <p className="mb-4">
          적금 금리가 연 4%라고 해서 납입한 돈 전체에 4% 이자가 붙는 것은 아닙니다. 첫 달 납입금은
          12개월 동안 예치되지만 마지막 달 납입금은 1개월만 예치되기 때문입니다.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full min-w-[420px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">연 4%, 12개월, 단리</th>
                <th className="py-2.5 px-3 font-medium text-right">원금</th>
                <th className="py-2.5 pl-3 font-medium text-right">세전 이자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              <tr>
                <td className="py-3.5 pr-3">예금: 1,200만원 한 번에 예치</td>
                <td className="py-3.5 px-3 text-right">12,000,000원</td>
                <td className="py-3.5 pl-3 text-right font-bold text-ink">480,000원</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-3">적금: 매월 100만원씩 납입</td>
                <td className="py-3.5 px-3 text-right">12,000,000원</td>
                <td className="py-3.5 pl-3 text-right font-bold text-ink">260,000원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          12개월 적금의 이자는 100만원 × (4% ÷ 12) × (12 + 11 + … + 1개월) = 100만원 × 0.333% × 78 =
          260,000원입니다. 같은 금리의 예금 이자와 비교하면 약 54% 수준입니다. 그래서 적금 금리가 예금
          금리의 약 1.85배(144 ÷ 78)를 넘지 않는다면, 이미 목돈이 있을 때는 예금에 넣는 쪽이 이자가 더
          많습니다.
        </p>
      </Card>

      <Card title="단리와 월복리">
        <p>
          단리는 원금에만 이자가 붙고, 월복리는 매월 생긴 이자가 원금에 더해져 다음 달 이자에도 이자가
          붙습니다. 기간이 짧을 때는 차이가 크지 않지만 기간이 길수록 벌어집니다. 시중은행 예·적금은
          대부분 단리이므로, 상품설명서의 이자 지급 방식을 확인하고 선택하세요.
        </p>
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            "일반과세 이자소득세는 15.4% (소득세 14% + 지방소득세 1.4%)입니다.",
            "비과세종합저축, 상호금융 조합원 예탁금 등은 가입 자격과 한도가 정해져 있으니 금융기관에 확인하세요.",
            "실제 이자는 금융기관과 상품에 따라 다를 수 있습니다.",
            "예금자보호법에 따라 금융기관별 1인당 원금과 이자를 합쳐 1억원까지 보호됩니다 (2025년 9월 1일부터).",
            "중도 해지 시 약정 이자율보다 낮은 이자가 적용됩니다.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
