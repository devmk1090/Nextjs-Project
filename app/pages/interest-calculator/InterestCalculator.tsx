"use client";

import { useState } from "react";

export default function InterestCalculator() {
  const [calculatorType, setCalculatorType] = useState<"deposit" | "savings">(
    "deposit"
  );
  const [principal, setPrincipal] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState<{
    totalAmount: number;
    totalPrincipal: number;
    totalInterest: number;
    taxAmount: number;
    finalAmount: number;
  } | null>(null);

  const calculateInterest = () => {
    if (calculatorType === "deposit") {
      // 예금 계산
      if (!principal || !interestRate || !period) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      const p = parseFloat(principal.replace(/,/g, ""));
      const r = parseFloat(interestRate) / 100;
      const t = parseFloat(period) / 12;

      if (p <= 0 || r <= 0 || t <= 0) {
        alert("올바른 값을 입력해주세요.");
        return;
      }

      // 단리 계산
      const totalInterest = p * r * t;
      const totalAmount = p + totalInterest;
      const taxAmount = totalInterest * 0.154; // 이자소득세 15.4%
      const finalAmount = totalAmount - taxAmount;

      setResult({
        totalAmount,
        totalPrincipal: p,
        totalInterest,
        taxAmount,
        finalAmount,
      });
    } else {
      // 적금 계산
      if (!monthlyDeposit || !interestRate || !period) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      const m = parseFloat(monthlyDeposit.replace(/,/g, ""));
      const r = parseFloat(interestRate) / 100 / 12;
      const n = parseFloat(period);

      if (m <= 0 || r <= 0 || n <= 0) {
        alert("올바른 값을 입력해주세요.");
        return;
      }

      // 적금 이자 계산 (월복리)
      let totalInterest = 0;
      for (let i = 1; i <= n; i++) {
        totalInterest += m * r * (n - i + 1);
      }

      const totalPrincipal = m * n;
      const totalAmount = totalPrincipal + totalInterest;
      const taxAmount = totalInterest * 0.154; // 이자소득세 15.4%
      const finalAmount = totalAmount - taxAmount;

      setResult({
        totalAmount,
        totalPrincipal,
        totalInterest,
        taxAmount,
        finalAmount,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          예금/적금 이자 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          예금과 적금의 이자를 계산해보세요 (세전 기준)
        </p>

        <div className="space-y-6">
          {/* 계산기 타입 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              계산 종류
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCalculatorType("deposit");
                  setResult(null);
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  calculatorType === "deposit"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                예금
              </button>
              <button
                onClick={() => {
                  setCalculatorType("savings");
                  setResult(null);
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  calculatorType === "savings"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                적금
              </button>
            </div>
          </div>

          {calculatorType === "deposit" ? (
            // 예금 입력 필드
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  예치금액 (원)
                </label>
                <input
                  type="text"
                  value={
                    principal
                      ? parseInt(principal.replace(/,/g, "")).toLocaleString()
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    if (value === "" || /^\d+$/.test(value)) {
                      setPrincipal(value);
                    }
                  }}
                  placeholder="예: 10,000,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          ) : (
            // 적금 입력 필드
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  월 납입금액 (원)
                </label>
                <input
                  type="text"
                  value={
                    monthlyDeposit
                      ? parseInt(
                          monthlyDeposit.replace(/,/g, "")
                        ).toLocaleString()
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    if (value === "" || /^\d+$/.test(value)) {
                      setMonthlyDeposit(value);
                    }
                  }}
                  placeholder="예: 500,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연 이자율 (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="예: 3.5"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기간 (개월)
            </label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="예: 12"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={calculateInterest}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            계산하기
          </button>

          {result && (
            <div className="mt-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="text-center mb-6">
                  <p className="text-lg text-gray-700 mb-2">
                    {calculatorType === "deposit" ? "예금" : "적금"} 만기 시
                  </p>
                  <div className="text-5xl font-bold text-blue-600 my-4">
                    {Math.floor(result.finalAmount).toLocaleString()}원
                  </div>
                  <p className="text-gray-600 text-sm">
                    세후 최종 수령액 (이자소득세 15.4% 공제)
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">
                      {calculatorType === "deposit"
                        ? "예치금액"
                        : "총 납입금액"}
                    </span>
                    <span className="font-bold text-gray-800">
                      {Math.floor(result.totalPrincipal).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">이자 (세전)</span>
                    <span className="font-bold text-green-600">
                      +{Math.floor(result.totalInterest).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">만기 금액 (세전)</span>
                    <span className="font-bold text-blue-600">
                      {Math.floor(result.totalAmount).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-red-600">이자소득세 (15.4%)</span>
                    <span className="font-bold text-red-600">
                      -{Math.floor(result.taxAmount).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300">
                    <span className="text-purple-700 font-semibold">
                      세후 수령액
                    </span>
                    <span className="font-bold text-purple-700 text-xl">
                      {Math.floor(result.finalAmount).toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  {calculatorType === "deposit" ? "예금" : "적금"} 정보
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  {calculatorType === "deposit" ? (
                    <>
                      <p>
                        • 예금은 일시금을 예치하고 만기까지 기다리는 상품입니다
                      </p>
                      <p>
                        • 이자는 단리로 계산됩니다 (원금에 대해서만 이자 발생)
                      </p>
                      <p>
                        • 중도 해지 시 이자율이 낮아지거나 이자를 받지 못할 수
                        있습니다
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        • 적금은 매월 일정 금액을 납입하는 저축 상품입니다
                      </p>
                      <p>
                        • 이자는 월복리로 계산되며, 납입 시기에 따라 이자가
                        다릅니다
                      </p>
                      <p>
                        • 중도 해지 시 약정 이자율보다 낮은 이자를 받게 됩니다
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">참고 사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 이자소득세는 15.4% (소득세 14% + 지방소득세 1.4%)입니다</li>
              <li>
                • 실제 이자는 금융기관과 상품에 따라 다를 수 있습니다
              </li>
              <li>
                • 예금자보호법에 따라 1인당 5천만원까지 보호됩니다
              </li>
              <li>• 중도 해지 시 약정 이자율보다 낮은 이자가 적용됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
