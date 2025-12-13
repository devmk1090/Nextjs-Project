"use client";

import { useState } from "react";

type ConversionType = "toSquareMeter" | "toPyeong";

export default function PyeongCalculator() {
  const [conversionType, setConversionType] = useState<ConversionType>("toPyeong");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<{
    squareMeter: number;
    pyeong: number;
    pyeongFloor: number;
  } | null>(null);

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
      squareMeter = value * 3.3058;
    } else {
      // m² → 평
      squareMeter = value;
      pyeong = value / 3.3058;
    }

    const pyeongFloor = Math.floor(pyeong);

    setResult({
      squareMeter,
      pyeong,
      pyeongFloor,
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
                      <p className="text-sm text-gray-500 mt-2">
                        (약 {result.pyeongFloor}평형)
                      </p>
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
                      <span className="text-gray-600">평형(정수)</span>
                      <span className="font-medium text-gray-800">
                        {result.pyeongFloor}평형
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-600">변환 비율</span>
                      <span className="font-medium text-gray-800">
                        1평 = 3.3058 m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 일반적인 아파트 평수 참고표 */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  일반적인 아파트 평수
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-medium text-gray-800">15평형</div>
                    <div className="text-gray-600">약 49.6 m²</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-medium text-gray-800">20평형</div>
                    <div className="text-gray-600">약 66.1 m²</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-medium text-gray-800">25평형</div>
                    <div className="text-gray-600">약 82.6 m²</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-medium text-gray-800">30평형</div>
                    <div className="text-gray-600">약 99.2 m²</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-medium text-gray-800">35평형</div>
                    <div className="text-gray-600">약 115.7 m²</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-medium text-gray-800">40평형</div>
                    <div className="text-gray-600">약 132.2 m²</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">참고 사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 1평 = 3.3058 제곱미터(m²)</li>
              <li>• 평형은 일반적으로 소수점을 버린 정수로 표현합니다</li>
              <li>
                • 전용면적과 공급면적이 다르므로 계약 시 확인이 필요합니다
              </li>
              <li>
                • 2007년부터 공식 단위는 제곱미터(m²)지만 평도 여전히 사용됩니다
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
