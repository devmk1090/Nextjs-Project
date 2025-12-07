"use client";

import { useState } from "react";

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    standardWeight: number;
    weightDiff: number;
    categoryColor: string;
    categoryEmoji: string;
  } | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("키와 몸무게를 모두 입력해주세요.");
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum <= 0 || heightNum > 300) {
      alert("올바른 키를 입력해주세요. (1-300cm)");
      return;
    }

    if (weightNum <= 0 || weightNum > 500) {
      alert("올바른 몸무게를 입력해주세요. (1-500kg)");
      return;
    }

    // BMI 계산 (kg/m^2)
    const heightInMeters = heightNum / 100;
    const bmi = weightNum / (heightInMeters * heightInMeters);

    // 표준체중 계산 (브로카 변형 공식)
    const standardWeight = (heightNum - 100) * 0.9;

    // 체중 차이
    const weightDiff = weightNum - standardWeight;

    // BMI 분류 (WHO 아시아-태평양 기준)
    let category = "";
    let categoryColor = "";
    let categoryEmoji = "";

    if (bmi < 18.5) {
      category = "저체중";
      categoryColor = "text-blue-600";
      categoryEmoji = "😰";
    } else if (bmi < 23) {
      category = "정상";
      categoryColor = "text-green-600";
      categoryEmoji = "😊";
    } else if (bmi < 25) {
      category = "과체중";
      categoryColor = "text-yellow-600";
      categoryEmoji = "😅";
    } else if (bmi < 30) {
      category = "비만";
      categoryColor = "text-orange-600";
      categoryEmoji = "😰";
    } else {
      category = "고도비만";
      categoryColor = "text-red-600";
      categoryEmoji = "😱";
    }

    setBmiResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      standardWeight: parseFloat(standardWeight.toFixed(1)),
      weightDiff: parseFloat(weightDiff.toFixed(1)),
      categoryColor,
      categoryEmoji,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          BMI 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          체질량지수(BMI)와 표준체중을 계산해보세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              키 (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="예: 170"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              몸무게 (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="예: 65"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            계산하기
          </button>

          {bmiResult && (
            <div className="mt-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-2">
                    키: {height}cm | 몸무게: {weight}kg
                  </p>
                  <div className="text-6xl my-4">{bmiResult.categoryEmoji}</div>
                  <div className="text-5xl font-bold text-blue-600 my-2">
                    BMI {bmiResult.bmi}
                  </div>
                  <p
                    className={`text-3xl font-bold ${bmiResult.categoryColor} mt-2`}
                  >
                    {bmiResult.category}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-green-200 rounded-lg p-5">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      표준체중
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {bmiResult.standardWeight}kg
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-200 rounded-lg p-5">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      표준체중과의 차이
                    </h3>
                    <p
                      className={`text-3xl font-bold ${
                        bmiResult.weightDiff > 0
                          ? "text-orange-600"
                          : bmiResult.weightDiff < 0
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {bmiResult.weightDiff > 0 ? "+" : ""}
                      {bmiResult.weightDiff}kg
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  BMI 기준 (WHO 아시아-태평양)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-blue-600 font-medium">저체중</span>
                    <span className="text-gray-600">18.5 미만</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-green-600 font-medium">정상</span>
                    <span className="text-gray-600">18.5 ~ 22.9</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-yellow-600 font-medium">과체중</span>
                    <span className="text-gray-600">23.0 ~ 24.9</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-orange-600 font-medium">비만</span>
                    <span className="text-gray-600">25.0 ~ 29.9</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-red-600 font-medium">고도비만</span>
                    <span className="text-gray-600">30.0 이상</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  {bmiResult.category}에 대한 정보
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  {bmiResult.category === "저체중" && (
                    <>
                      <p>
                        • 체중이 정상 범위보다 낮습니다. 균형 잡힌 식사와 적절한
                        운동이 필요합니다.
                      </p>
                      <p>
                        • 영양 섭취가 부족할 수 있으니 전문가와 상담을
                        권장합니다.
                      </p>
                    </>
                  )}
                  {bmiResult.category === "정상" && (
                    <>
                      <p>
                        • 건강한 체중 범위입니다. 현재 상태를 유지하도록
                        노력하세요.
                      </p>
                      <p>
                        • 규칙적인 운동과 균형 잡힌 식습관을 계속 유지하세요.
                      </p>
                    </>
                  )}
                  {bmiResult.category === "과체중" && (
                    <>
                      <p>
                        • 정상 체중보다 약간 높습니다. 식단 조절과 운동을 통해
                        관리가 필요합니다.
                      </p>
                      <p>• 건강 유지를 위해 체중 감량을 고려해보세요.</p>
                    </>
                  )}
                  {(bmiResult.category === "비만" ||
                    bmiResult.category === "고도비만") && (
                    <>
                      <p>
                        • 건강에 위험이 될 수 있는 체중 범위입니다. 전문가의
                        도움을 받는 것이 좋습니다.
                      </p>
                      <p>
                        • 규칙적인 운동과 식단 관리를 통해 체중 감량이
                        필요합니다.
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
              <li>• BMI는 체지방을 직접 측정하는 것이 아닙니다</li>
              <li>• 근육량이 많은 경우 BMI가 높게 나올 수 있습니다</li>
              <li>• 어린이, 청소년, 임산부는 다른 기준이 적용됩니다</li>
              <li>• 정확한 건강 상태는 전문의와 상담하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
