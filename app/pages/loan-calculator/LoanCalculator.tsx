"use client";

import { useState } from "react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanPeriod, setLoanPeriod] = useState<string>("");
  const [repaymentType, setRepaymentType] = useState<"equal-principal" | "equal-installment">("equal-installment");
  const [result, setResult] = useState<{
    totalPayment: number;
    totalInterest: number;
    monthlyPayments: { month: number; principal: number; interest: number; payment: number; remaining: number }[];
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
    const payments: { month: number; principal: number; interest: number; payment: number; remaining: number }[] = [];

    if (repaymentType === "equal-principal") {
      // 원금균등상환
      const monthlyPrincipal = principal / months;
      let remaining = principal;

      for (let i = 1; i <= months; i++) {
        const monthlyInterest = remaining * monthlyRate;
        const monthlyPayment = monthlyPrincipal + monthlyInterest;
        remaining -= monthlyPrincipal;

        payments.push({
          month: i,
          principal: monthlyPrincipal,
          interest: monthlyInterest,
          payment: monthlyPayment,
          remaining: Math.max(0, remaining),
        });
      }
    } else {
      // 원리금균등상환
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      let remaining = principal;

      for (let i = 1; i <= months; i++) {
        const monthlyInterest = remaining * monthlyRate;
        const monthlyPrincipal = monthlyPayment - monthlyInterest;
        remaining -= monthlyPrincipal;

        payments.push({
          month: i,
          principal: monthlyPrincipal,
          interest: monthlyInterest,
          payment: monthlyPayment,
          remaining: Math.max(0, remaining),
        });
      }
    }

    const totalPayment = payments.reduce((sum, p) => sum + p.payment, 0);
    const totalInterest = payments.reduce((sum, p) => sum + p.interest, 0);

    setResult({
      totalPayment,
      totalInterest,
      monthlyPayments: payments,
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
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="equal-installment"
                  checked={repaymentType === "equal-installment"}
                  onChange={(e) => setRepaymentType(e.target.value as "equal-installment")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">원리금균등상환</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="equal-principal"
                  checked={repaymentType === "equal-principal"}
                  onChange={(e) => setRepaymentType(e.target.value as "equal-principal")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">원금균등상환</span>
              </label>
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
                {repaymentType === "equal-principal" && (
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

            {/* 설명 */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-gray-800 mb-2">상환 방식 설명</h3>
              {repaymentType === "equal-installment" ? (
                <div className="text-gray-700 text-sm space-y-2">
                  <p>
                    <strong>원리금균등상환:</strong> 매월 동일한 금액을 상환하는 방식입니다.
                  </p>
                  <p>초기에는 이자 비중이 높고, 시간이 지날수록 원금 비중이 높아집니다.</p>
                  <p>월 상환액이 일정하여 자금 계획을 세우기 편리합니다.</p>
                </div>
              ) : (
                <div className="text-gray-700 text-sm space-y-2">
                  <p>
                    <strong>원금균등상환:</strong> 매월 동일한 원금에 이자를 더해 상환하는 방식입니다.
                  </p>
                  <p>초기 상환액이 높지만, 시간이 지날수록 상환액이 줄어듭니다.</p>
                  <p>총 이자 부담이 원리금균등상환보다 적습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
