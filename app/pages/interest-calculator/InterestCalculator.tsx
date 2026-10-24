"use client";

import { useState } from "react";

export default function InterestCalculator() {
  const [calculatorType, setCalculatorType] = useState<"deposit" | "savings">(
    "deposit"
  );
  const [interestMethod, setInterestMethod] = useState<"simple" | "compound">(
    "simple"
  );
  const [taxType, setTaxType] = useState<"general" | "exempt" | "custom">(
    "general"
  );
  const [customTaxRate, setCustomTaxRate] = useState("");
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
    taxRate: number;
  } | null>(null);

  // 이자소득세율: 일반과세 15.4%(소득세 14% + 지방소득세 1.4%), 비과세 0%
  const getTaxRate = () => {
    if (taxType === "general") return 0.154;
    if (taxType === "exempt") return 0;
    return (parseFloat(customTaxRate) || 0) / 100;
  };

  const calculateInterest = () => {
    if (calculatorType === "deposit") {
      // 예금 계산
      if (!principal || !interestRate || !period) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      const p = parseFloat(principal.replace(/,/g, ""));
      const r = parseFloat(interestRate) / 100;
      const n = parseFloat(period);

      if (p <= 0 || r <= 0 || n <= 0) {
        alert("올바른 값을 입력해주세요.");
        return;
      }

      // 단리: 원금 × 연이율 × (개월/12), 월복리: 원금 × ((1 + 연이율/12)^개월 - 1)
      const totalInterest =
        interestMethod === "simple"
          ? p * r * (n / 12)
          : p * (Math.pow(1 + r / 12, n) - 1);
      const totalAmount = p + totalInterest;
      const taxRate = getTaxRate();
      const taxAmount = totalInterest * taxRate;
      const finalAmount = totalAmount - taxAmount;

      setResult({
        totalAmount,
        totalPrincipal: p,
        totalInterest,
        taxAmount,
        finalAmount,
        taxRate,
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

      // 적금 이자: i회차 납입금은 (n - i + 1)개월 동안 예치됨
      // 단리: 납입금 × 월이율 × 예치개월, 월복리: 납입금 × ((1 + 월이율)^예치개월 - 1)
      let totalInterest = 0;
      for (let i = 1; i <= n; i++) {
        const months = n - i + 1;
        totalInterest +=
          interestMethod === "simple"
            ? m * r * months
            : m * (Math.pow(1 + r, months) - 1);
      }

      const totalPrincipal = m * n;
      const totalAmount = totalPrincipal + totalInterest;
      const taxRate = getTaxRate();
      const taxAmount = totalInterest * taxRate;
      const finalAmount = totalAmount - taxAmount;

      setResult({
        totalAmount,
        totalPrincipal,
        totalInterest,
        taxAmount,
        finalAmount,
        taxRate,
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

          {/* 이자 계산 방식 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이자 계산 방식
            </label>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  { id: "simple", name: "단리" },
                  { id: "compound", name: "월복리" },
                ] as const
              ).map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setInterestMethod(method.id);
                    setResult(null);
                  }}
                  className={`py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                    interestMethod === method.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              대부분의 시중은행 예·적금은 단리입니다. 상품설명서에서 이자 지급 방식을 확인하세요.
            </p>
          </div>

          {/* 과세 방식 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              과세 방식
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "general", name: "일반과세 15.4%" },
                  { id: "exempt", name: "비과세" },
                  { id: "custom", name: "직접 입력" },
                ] as const
              ).map((tax) => (
                <button
                  key={tax.id}
                  onClick={() => {
                    setTaxType(tax.id);
                    setResult(null);
                  }}
                  className={`py-2 px-2 rounded-lg text-sm font-semibold transition duration-200 ${
                    taxType === tax.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tax.name}
                </button>
              ))}
            </div>
            {taxType === "custom" && (
              <input
                type="number"
                value={customTaxRate}
                onChange={(e) => setCustomTaxRate(e.target.value)}
                placeholder="세율 (%) 예: 1.4"
                step="0.1"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
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
                    세후 최종 수령액 (이자소득세{" "}
                    {+(result.taxRate * 100).toFixed(2)}% 공제)
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
                    <span className="text-red-600">
                      이자소득세 ({+(result.taxRate * 100).toFixed(2)}%)
                    </span>
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
                        {interestMethod === "simple"
                          ? "• 단리: 원금에 대해서만 이자가 붙습니다"
                          : "• 월복리: 매월 발생한 이자가 원금에 더해져 다음 달 이자 계산에 포함됩니다"}
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
                        • 먼저 낸 납입금일수록 예치 기간이 길어 이자가 많이 붙습니다.
                        그래서 적금 이자는 같은 금리의 예금보다 적습니다
                      </p>
                      <p>
                        {interestMethod === "simple"
                          ? "• 단리: 각 회차 납입금에 예치 개월수만큼 이자가 붙습니다"
                          : "• 월복리: 각 회차 납입금의 이자가 매월 원금에 더해집니다"}
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

          {/* 예금과 적금 이자 차이 */}
          <section className="mt-10 space-y-3 text-gray-700">
            <h2 className="text-2xl font-bold text-gray-800">
              적금 이자가 생각보다 적은 이유
            </h2>
            <p className="text-sm">
              적금 금리가 연 4%라고 해서 납입한 돈 전체에 4% 이자가 붙는 것은 아닙니다. 첫 달 납입금은
              12개월 동안 예치되지만 마지막 달 납입금은 1개월만 예치되기 때문입니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 text-left">연 4%, 12개월, 단리</th>
                    <th className="px-2 py-2 text-right">원금</th>
                    <th className="px-2 py-2 text-right">세전 이자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-2">예금: 1,200만원 한 번에 예치</td>
                    <td className="px-2 py-2 text-right">12,000,000원</td>
                    <td className="px-2 py-2 text-right">480,000원</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-2 py-2">적금: 매월 100만원씩 납입</td>
                    <td className="px-2 py-2 text-right">12,000,000원</td>
                    <td className="px-2 py-2 text-right">260,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              12개월 적금의 이자는 100만원 × (4% ÷ 12) × (12 + 11 + … + 1개월) = 100만원 × 0.333% × 78 =
              260,000원입니다. 같은 금리의 예금 이자와 비교하면 약 54% 수준입니다. 그래서 적금 금리가 예금
              금리의 약 1.85배(144 ÷ 78)를 넘지 않는다면, 이미 목돈이 있을 때는 예금에 넣는 쪽이 이자가 더
              많습니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 pt-4">단리와 월복리</h2>
            <p className="text-sm">
              단리는 원금에만 이자가 붙고, 월복리는 매월 생긴 이자가 원금에 더해져 다음 달 이자에도 이자가
              붙습니다. 기간이 짧을 때는 차이가 크지 않지만 기간이 길수록 벌어집니다. 시중은행 예·적금은
              대부분 단리이므로, 상품설명서의 이자 지급 방식을 확인하고 선택하세요.
            </p>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">참고 사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 일반과세 이자소득세는 15.4% (소득세 14% + 지방소득세 1.4%)입니다</li>
              <li>
                • 비과세종합저축, 상호금융 조합원 예탁금 등은 가입 자격과 한도가 정해져 있으니 금융기관에
                확인하세요
              </li>
              <li>
                • 실제 이자는 금융기관과 상품에 따라 다를 수 있습니다
              </li>
              <li>
                • 예금자보호법에 따라 금융기관별 1인당 원금과 이자를 합쳐 1억원까지
                보호됩니다 (2025년 9월 1일부터)
              </li>
              <li>• 중도 해지 시 약정 이자율보다 낮은 이자가 적용됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
