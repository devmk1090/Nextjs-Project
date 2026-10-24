"use client";

import { useState } from "react";

// 대한비만학회 비만 진료지침(2022) 기준
const bmiCategories = [
  { name: "저체중", range: "18.5 미만", max: 18.5, color: "text-blue-600", emoji: "😰" },
  { name: "정상", range: "18.5 ~ 22.9", max: 23, color: "text-green-600", emoji: "😊" },
  { name: "비만 전단계", range: "23.0 ~ 24.9", max: 25, color: "text-yellow-600", emoji: "😅" },
  { name: "1단계 비만", range: "25.0 ~ 29.9", max: 30, color: "text-orange-600", emoji: "😰" },
  { name: "2단계 비만", range: "30.0 ~ 34.9", max: 35, color: "text-red-500", emoji: "😱" },
  { name: "3단계 비만 (고도비만)", range: "35.0 이상", max: Infinity, color: "text-red-700", emoji: "😱" },
];

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

    const { name: category, color: categoryColor, emoji: categoryEmoji } =
      bmiCategories.find((c) => bmi < c.max)!;

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
                  {bmiResult.category === "비만 전단계" && (
                    <>
                      <p>
                        • 정상 체중보다 약간 높습니다. 식단 조절과 운동을 통해
                        관리가 필요합니다.
                      </p>
                      <p>• 건강 유지를 위해 체중 감량을 고려해보세요.</p>
                    </>
                  )}
                  {bmiResult.category.includes("단계 비만") && (
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

          {/* BMI 기준표 */}
          <section className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              BMI 기준 (대한비만학회 2022)
            </h2>
            <div className="space-y-2 text-sm">
              {bmiCategories.map((c) => (
                <div
                  key={c.name}
                  className={`flex justify-between items-center p-2 rounded ${
                    bmiResult?.category === c.name ? "bg-yellow-100 ring-2 ring-yellow-400" : "bg-white"
                  }`}
                >
                  <span className={`${c.color} font-medium`}>{c.name}</span>
                  <span className="text-gray-600">{c.range}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 space-y-3 text-gray-700">
            <h2 className="text-2xl font-bold text-gray-800">BMI 계산 방법</h2>
            <p className="text-sm">
              BMI(체질량지수)는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다. 예를 들어 키 170cm, 몸무게
              65kg이면 65 ÷ (1.7 × 1.7) = 22.5로 정상 범위입니다. 표준체중은 브로카 변형식인
              (키 − 100) × 0.9로 계산합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 pt-4">
              한국 기준이 서양보다 낮은 이유
            </h2>
            <p className="text-sm">
              세계보건기구(WHO) 국제 기준은 BMI 25 이상을 과체중, 30 이상을 비만으로 봅니다. 하지만
              아시아인은 같은 BMI에서도 체지방 비율이 높고 당뇨병·고혈압 같은 대사질환 위험이 더 일찍
              커지기 때문에, 대한비만학회는 23 이상을 비만 전단계, 25 이상을 비만으로 분류합니다.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 pt-4">허리둘레도 함께 확인하세요</h2>
            <p className="text-sm">
              BMI가 정상이어도 뱃살이 많으면 건강 위험이 커질 수 있습니다. 대한비만학회는 허리둘레가
              남성 90cm 이상, 여성 85cm 이상이면 복부비만으로 봅니다.
            </p>
          </section>

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
