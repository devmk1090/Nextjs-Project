"use client";

import { useState } from "react";

type RepaymentType = "equal-installment" | "equal-principal" | "bullet";

type MonthlyPayment = {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  remaining: number;
};

const repaymentTypes: { id: RepaymentType; name: string }[] = [
  { id: "equal-installment", name: "원리금균등상환" },
  { id: "equal-principal", name: "원금균등상환" },
  { id: "bullet", name: "만기일시상환" },
];

// 상환 방식별 월별 상환 일정
function buildSchedule(
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

const summarize = (payments: MonthlyPayment[]) => ({
  totalPayment: payments.reduce((sum, p) => sum + p.payment, 0),
  totalInterest: payments.reduce((sum, p) => sum + p.interest, 0),
  firstPayment: payments[0].payment,
  lastPayment: payments[payments.length - 1].payment,
});

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanPeriod, setLoanPeriod] = useState<string>("");
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("equal-installment");
  const [result, setResult] = useState<{
    type: RepaymentType;
    totalPayment: number;
    totalInterest: number;
    monthlyPayments: MonthlyPayment[];
    comparison: ({ id: RepaymentType; name: string } & ReturnType<typeof summarize>)[];
  } | null>(null);

  const calculateLoan = () => {
    const principal = parseInt(loanAmount.replace(/,/g, ""));
    const annualRate = parseFloat(interestRate);
    const months = parseInt(loanPeriod);

    if (!principal || !annualRate || !months || principal <= 0 || annualRate <= 0 || months <= 0) {
      alert("올바른 값을 입력해주세요.");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const payments = buildSchedule(repaymentType, principal, monthlyRate, months);
    const { totalPayment, totalInterest } = summarize(payments);

    setResult({
      type: repaymentType,
      totalPayment,
      totalInterest,
      monthlyPayments: payments,
      comparison: repaymentTypes.map((t) => ({
        ...t,
        ...summarize(buildSchedule(t.id, principal, monthlyRate, months)),
      })),
    });
  };

  const formatCurrency = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          대출 이자 계산기
        </h1>

        <div className="space-y-6">
          {/* 대출 금액 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">대출 금액 (원)</label>
            <input
              type="text"
              value={loanAmount ? parseInt(loanAmount.replace(/,/g, "")).toLocaleString() : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (value === "" || /^\d+$/.test(value)) {
                  setLoanAmount(value);
                }
              }}
              placeholder="예: 100,000,000"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          {/* 연이자율 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">연이자율 (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="예: 3.5"
              step="0.01"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          {/* 대출 기간 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">대출 기간 (개월)</label>
            <input
              type="number"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
              placeholder="예: 360"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          {/* 상환 방식 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">상환 방식</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {repaymentTypes.map((t) => (
                <label key={t.id} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value={t.id}
                    checked={repaymentType === t.id}
                    onChange={() => setRepaymentType(t.id)}
                    className="mr-2 w-4 h-4"
                  />
                  <span className="text-gray-700">{t.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 계산 버튼 */}
          <button
            onClick={calculateLoan}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            계산하기
          </button>
        </div>

        {/* 결과 */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">대출 요약</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">대출 원금:</span>
                  <span className="text-xl font-bold text-gray-800">{formatCurrency(parseInt(loanAmount.replace(/,/g, "")))}원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">총 이자:</span>
                  <span className="text-xl font-bold text-red-600">{formatCurrency(result.totalInterest)}원</span>
                </div>
                <div className="flex justify-between items-center border-t-2 border-gray-300 pt-3">
                  <span className="text-gray-800 font-bold">총 상환액:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(result.totalPayment)}원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">첫 달 상환액:</span>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(result.monthlyPayments[0].payment)}원</span>
                </div>
                {result.type !== "equal-installment" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">마지막 달 상환액:</span>
                    <span className="text-xl font-bold text-purple-600">
                      {formatCurrency(result.monthlyPayments[result.monthlyPayments.length - 1].payment)}원
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 상환 일정표 */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">상환 일정표</h2>
              <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200 sticky top-0">
                      <tr>
                        <th className="px-2 py-2 text-center">회차</th>
                        <th className="px-2 py-2 text-right">원금</th>
                        <th className="px-2 py-2 text-right">이자</th>
                        <th className="px-2 py-2 text-right">월 상환액</th>
                        <th className="px-2 py-2 text-right">잔액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyPayments.map((payment) => (
                        <tr key={payment.month} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="px-2 py-2 text-center">{payment.month}</td>
                          <td className="px-2 py-2 text-right">{formatCurrency(payment.principal)}</td>
                          <td className="px-2 py-2 text-right text-red-600">{formatCurrency(payment.interest)}</td>
                          <td className="px-2 py-2 text-right font-semibold">{formatCurrency(payment.payment)}</td>
                          <td className="px-2 py-2 text-right text-gray-600">{formatCurrency(payment.remaining)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 상환 방식 비교 */}
        {result && (
          <div className="mt-6 bg-white rounded-xl p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">상환 방식별 비교</h2>
            <p className="text-sm text-gray-600 mb-4">같은 금액·금리·기간일 때 상환 방식에 따른 차이입니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 text-left">상환 방식</th>
                    <th className="px-2 py-2 text-right">첫 달 상환액</th>
                    <th className="px-2 py-2 text-right">마지막 달 상환액</th>
                    <th className="px-2 py-2 text-right">총 이자</th>
                  </tr>
                </thead>
                <tbody>
                  {result.comparison.map((c) => {
                    const minInterest = Math.min(...result.comparison.map((x) => x.totalInterest));
                    return (
                      <tr
                        key={c.id}
                        className={`border-b border-gray-200 ${c.id === result.type ? "bg-blue-50 font-semibold" : ""}`}
                      >
                        <td className="px-2 py-2">{c.name}</td>
                        <td className="px-2 py-2 text-right">{formatCurrency(c.firstPayment)}</td>
                        <td className="px-2 py-2 text-right">{formatCurrency(c.lastPayment)}</td>
                        <td className="px-2 py-2 text-right text-red-600">
                          {formatCurrency(c.totalInterest)}
                          {c.totalInterest > minInterest && (
                            <span className="block text-xs text-gray-500 font-normal">
                              +{formatCurrency(c.totalInterest - minInterest)}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 상환 방식 설명 */}
        <section className="mt-10 space-y-4 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800">대출 상환 방식 3가지</h2>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-1">원리금균등상환</h3>
            <p className="text-sm">
              원금과 이자를 합친 금액을 매월 똑같이 냅니다. 초기에는 이자 비중이 크고 갈수록 원금 비중이
              커집니다. 월 상환액이 일정해 자금 계획을 세우기 쉬워 주택담보대출에서 가장 많이 쓰입니다.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-1">원금균등상환</h3>
            <p className="text-sm">
              원금을 매월 똑같이 나눠 갚고, 남은 원금에 대한 이자를 더해 냅니다. 원금이 빨리 줄어 총 이자가
              세 방식 중 가장 적지만, 첫 달 상환액이 가장 큽니다.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-1">만기일시상환</h3>
            <p className="text-sm">
              대출 기간 동안 매월 이자만 내고 원금은 만기에 한 번에 갚습니다. 매월 부담은 가장 작지만 원금이
              줄지 않아 총 이자가 가장 많습니다. 신용대출, 전세자금대출에서 주로 쓰입니다.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 pt-4">계산 방법</h2>
          <ul className="text-sm space-y-1 list-disc pl-5">
            <li>월 이자율 = 연 이자율 ÷ 12</li>
            <li>매월 이자 = 남은 원금 × 월 이자율</li>
            <li>
              원리금균등 월 상환액 = 원금 × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1)
              (r: 월 이자율, n: 상환 개월수)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 pt-4">참고 사항</h2>
          <ul className="text-sm space-y-1 list-disc pl-5">
            <li>고정금리 기준 계산입니다. 변동금리 대출은 금리가 바뀌면 상환액도 달라집니다.</li>
            <li>거치기간, 중도상환수수료, 보증료 등은 반영하지 않았습니다.</li>
            <li>실제 상환액은 금융기관의 일할 계산 방식이나 반올림에 따라 몇 원 정도 차이가 날 수 있습니다.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
