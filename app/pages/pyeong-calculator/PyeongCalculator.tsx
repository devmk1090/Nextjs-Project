"use client";

import { useState } from "react";

type ConversionType = "toSquareMeter" | "toPyeong";

// 1평 = 400/121 m² (약 3.3058 m²)
const M2_PER_PYEONG = 400 / 121;

// 주요 아파트 전용면적(m²)
const commonExclusiveAreas = [39, 49, 59, 74, 84, 101, 114, 135];

export default function PyeongCalculator() {
  const [conversionType, setConversionType] = useState<ConversionType>("toPyeong");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<{
    squareMeter: number;
    pyeong: number;
  } | null>(null);
  const [exclusiveArea, setExclusiveArea] = useState("84");
  const [exclusiveRatio, setExclusiveRatio] = useState("75");

  // 공급면적 = 전용면적 ÷ 전용률
  const exclusiveValue = parseFloat(exclusiveArea);
  const ratioValue = parseFloat(exclusiveRatio);
  const supplyArea =
    exclusiveValue > 0 && ratioValue > 0 && ratioValue <= 100
      ? exclusiveValue / (ratioValue / 100)
      : null;

  const convert = () => {
    if (!inputValue) {
      alert("값을 입력해주세요.");
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      alert("올바른 숫자를 입력해주세요.");
      return;
    }

    let squareMeter: number;
    let pyeong: number;

    if (conversionType === "toSquareMeter") {
      // 평 → m²
      pyeong = value;
      squareMeter = value * M2_PER_PYEONG;
    } else {
      // m² → 평
      squareMeter = value;
      pyeong = value / M2_PER_PYEONG;
    }

    setResult({
      squareMeter,
      pyeong,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          평형/평수 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          평형(평)과 제곱미터(m²)를 변환해보세요
        </p>

        <div className="space-y-6">
          {/* 변환 타입 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              변환 방향
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setConversionType("toPyeong");
                  setInputValue("");
                  setResult(null);
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  conversionType === "toPyeong"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                m² → 평
              </button>
              <button
                onClick={() => {
                  setConversionType("toSquareMeter");
                  setInputValue("");
                  setResult(null);
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  conversionType === "toSquareMeter"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                평 → m²
              </button>
            </div>
          </div>

          {/* 입력 값 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {conversionType === "toPyeong" ? "제곱미터 (m²)" : "평"}
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                conversionType === "toPyeong" ? "예: 84.5" : "예: 25.5"
              }
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={convert}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            변환하기
          </button>

          {result && (
            <div className="mt-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">변환 결과</p>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">제곱미터</p>
                      <div className="text-4xl font-bold text-blue-600">
                        {result.squareMeter.toFixed(2)} m²
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">평</p>
                      <div className="text-4xl font-bold text-purple-600">
                        {result.pyeong.toFixed(2)}평
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-200">
                  <h3 className="font-semibold text-gray-700 mb-3 text-center">
                    상세 정보
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-600">제곱미터(m²)</span>
                      <span className="font-medium text-gray-800">
                        {result.squareMeter.toFixed(4)} m²
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-600">평(정확한 값)</span>
                      <span className="font-medium text-gray-800">
                        {result.pyeong.toFixed(4)}평
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-600">변환 비율</span>
                      <span className="font-medium text-gray-800">
                        1평 ≈ 3.3058 m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                ※ 아파트 분양 광고의 &quot;OO평형&quot;은 전용면적이 아니라 공급면적 기준입니다.
                아래 평형 계산기를 이용하세요.
              </p>
            </div>
          )}

          {/* 아파트 평형 계산 */}
          <section className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              아파트 평형 계산 (전용면적 → 평형)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              &quot;전용 84m²가 왜 34평형이지?&quot; 평형은 전용면적에 계단·복도 같은 주거공용면적을
              더한 공급면적 기준이기 때문입니다. 전용면적과 전용률을 넣으면 평형을 추정합니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전용면적 (m²)
                </label>
                <input
                  type="number"
                  value={exclusiveArea}
                  onChange={(e) => setExclusiveArea(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전용률 (%)
                </label>
                <input
                  type="number"
                  value={exclusiveRatio}
                  onChange={(e) => setExclusiveRatio(e.target.value)}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              아파트 전용률은 보통 계단식 75~80%, 복도식 70~75% 정도입니다. 정확한 값은 분양공고나
              건축물대장의 공급면적으로 확인하세요.
            </p>
            {supplyArea && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-600">전용면적</p>
                  <p className="font-bold text-gray-800">
                    {(exclusiveValue / M2_PER_PYEONG).toFixed(1)}평
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">추정 공급면적</p>
                  <p className="font-bold text-gray-800">{supplyArea.toFixed(1)} m²</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">추정 평형</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(supplyArea / M2_PER_PYEONG)}평형
                  </p>
                </div>
              </div>
            )}

            <h3 className="font-semibold text-gray-800 mt-8 mb-3">
              주요 전용면적별 평형 (전용률 70~80% 기준)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 text-left">전용면적</th>
                    <th className="px-2 py-2 text-right">전용 평수</th>
                    <th className="px-2 py-2 text-right">공급면적 평형</th>
                  </tr>
                </thead>
                <tbody>
                  {commonExclusiveAreas.map((area) => (
                    <tr key={area} className="border-b border-gray-200">
                      <td className="px-2 py-2">{area} m²</td>
                      <td className="px-2 py-2 text-right">
                        {(area / M2_PER_PYEONG).toFixed(1)}평
                      </td>
                      <td className="px-2 py-2 text-right font-semibold">
                        약 {Math.round(area / 0.8 / M2_PER_PYEONG)}~
                        {Math.round(area / 0.7 / M2_PER_PYEONG)}평형
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 면적 용어 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">아파트 면적 용어 정리</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong>전용면적</strong>: 현관문 안쪽, 세대가 혼자 쓰는 공간의 면적입니다. 방, 거실,
                주방, 욕실이 포함되며 발코니는 제외됩니다. 국민주택 규모(85m² 이하)나 각종 세금 기준은
                전용면적으로 판단합니다.
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <strong>주거공용면적</strong>: 계단, 복도, 엘리베이터, 1층 현관처럼 같은 동 주민이 함께
                쓰는 공간을 세대별로 나눈 면적입니다.
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <strong>공급면적</strong> = 전용면적 + 주거공용면적. 흔히 말하는 &quot;34평형&quot; 같은
                아파트 평형의 기준입니다.
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <strong>계약면적</strong> = 공급면적 + 기타공용면적(지하주차장, 관리사무소, 노인정 등).
                오피스텔은 보통 계약면적 기준으로 표시해 전용률이 50% 안팎으로 낮게 나옵니다.
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <strong>서비스면적</strong>: 발코니처럼 면적 계산에서 빠지는 공간입니다. 발코니를 확장하면
                실제 사용 공간은 전용면적보다 넓어집니다.
              </div>
            </div>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">참고 사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 1평 = 400/121 m² ≈ 3.3058 m², 1m² ≈ 0.3025평</li>
              <li>
                • 2007년 7월부터 법정 계량 단위는 제곱미터(m²)이지만, 일상에서는 평도 여전히 많이
                쓰입니다
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
