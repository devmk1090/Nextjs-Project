"use client";

import { useState } from "react";
import {
  BulletList,
  Card,
  ErrorText,
  Field,
  PrimaryButton,
  ResultHero,
  StatGrid,
  ToolPage,
  inputClass,
} from "../../components/tool/ToolUI";

// 대한비만학회 비만 진료지침(2022) 기준
const bmiCategories = [
  { name: "저체중", range: "18.5 미만", min: 0, max: 18.5, bar: "bg-sky-400", text: "text-sky-700" },
  { name: "정상", range: "18.5 ~ 22.9", min: 18.5, max: 23, bar: "bg-green-500", text: "text-green-700" },
  { name: "비만 전단계", range: "23.0 ~ 24.9", min: 23, max: 25, bar: "bg-yellow-400", text: "text-yellow-700" },
  { name: "1단계 비만", range: "25.0 ~ 29.9", min: 25, max: 30, bar: "bg-orange-400", text: "text-orange-700" },
  { name: "2단계 비만", range: "30.0 ~ 34.9", min: 30, max: 35, bar: "bg-red-500", text: "text-red-700" },
  { name: "3단계 비만 (고도비만)", range: "35.0 이상", min: 35, max: Infinity, bar: "bg-red-700", text: "text-red-800" },
];

// 눈금 막대에 표시할 BMI 범위
const SCALE_MIN = 15;
const SCALE_MAX = 40;
const scalePercent = (bmi: number) =>
  ((Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;

const categoryAdvice: Record<string, string[]> = {
  저체중: [
    "체중이 정상 범위보다 낮습니다. 균형 잡힌 식사와 적절한 운동이 필요합니다.",
    "영양 섭취가 부족할 수 있으니 전문가와 상담을 권장합니다.",
  ],
  정상: [
    "건강한 체중 범위입니다. 현재 상태를 유지하도록 노력하세요.",
    "규칙적인 운동과 균형 잡힌 식습관을 계속 유지하세요.",
  ],
  "비만 전단계": [
    "정상 체중보다 약간 높습니다. 식단 조절과 운동을 통해 관리가 필요합니다.",
    "건강 유지를 위해 체중 감량을 고려해보세요.",
  ],
};
const obesityAdvice = [
  "건강에 위험이 될 수 있는 체중 범위입니다. 전문가의 도움을 받는 것이 좋습니다.",
  "규칙적인 운동과 식단 관리를 통해 체중 감량이 필요합니다.",
];

type Result = {
  height: number;
  weight: number;
  bmi: number;
  category: (typeof bmiCategories)[number];
  standardWeight: number;
  weightDiff: number;
  normalMin: number;
  normalMax: number;
};

const one = (n: number) => n.toFixed(1);

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    if (!(heightNum > 0 && heightNum <= 300) || !(weightNum > 0 && weightNum <= 500)) {
      setResult(null);
      setError("키는 1~300cm, 몸무게는 1~500kg 사이로 입력하세요.");
      return;
    }

    // BMI = 체중(kg) ÷ 키(m)²
    const meters = heightNum / 100;
    const bmi = weightNum / (meters * meters);
    // 표준체중: 브로카 변형식 (키 - 100) × 0.9
    const standardWeight = (heightNum - 100) * 0.9;

    setError("");
    setResult({
      height: heightNum,
      weight: weightNum,
      bmi,
      category: bmiCategories.find((c) => bmi < c.max)!,
      standardWeight,
      weightDiff: weightNum - standardWeight,
      // 정상 범위(18.5 이상 23 미만)에 해당하는 몸무게
      normalMin: 18.5 * meters * meters,
      normalMax: 22.9 * meters * meters,
    });
  };

  return (
    <ToolPage
      slug="bmi-calculator"
      subtitle="키와 몸무게로 체질량지수(BMI)와 비만도를 대한비만학회 2022 기준으로 계산합니다."
    >
      <form onSubmit={calculateBMI} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="키 (cm)" htmlFor="bmi-height">
            <input
              id="bmi-height"
              type="number"
              inputMode="decimal"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              min="0"
              step="0.1"
              className={inputClass}
            />
          </Field>
          <Field label="몸무게 (kg)" htmlFor="bmi-weight">
            <input
              id="bmi-weight"
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="65"
              min="0"
              step="0.1"
              className={inputClass}
            />
          </Field>
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">계산하기</PrimaryButton>
      </form>

      {result && (
        <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero
            label={`키 ${result.height}cm · 몸무게 ${result.weight}kg의 BMI`}
            value={
              <>
                {one(result.bmi)}{" "}
                <span className={`text-2xl sm:text-3xl align-middle ${result.category.text}`}>
                  {result.category.name}
                </span>
              </>
            }
          />

          <div>
            <div className="relative pt-7">
              <span
                className="absolute top-0 -translate-x-1/2 text-xs font-bold text-ink bg-canvas rounded-md px-1.5 py-0.5"
                style={{ left: `${scalePercent(result.bmi)}%` }}
              >
                {one(result.bmi)}
              </span>
              <div className="flex h-3 rounded-full overflow-hidden" aria-hidden="true">
                {bmiCategories.map((c) => (
                  <div
                    key={c.name}
                    className={c.bar}
                    style={{
                      width: `${scalePercent(Math.min(c.max, SCALE_MAX)) - scalePercent(Math.max(c.min, SCALE_MIN))}%`,
                    }}
                  />
                ))}
              </div>
              <span
                className="absolute top-6 -translate-x-1/2 w-1 h-5 rounded-full bg-ink"
                style={{ left: `${scalePercent(result.bmi)}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="relative h-5 mt-1.5 text-xs text-ink-4" aria-hidden="true">
              {[18.5, 23, 25, 30, 35].map((v) => (
                <span key={v} className="absolute -translate-x-1/2" style={{ left: `${scalePercent(v)}%` }}>
                  {v}
                </span>
              ))}
            </div>
          </div>

          <StatGrid
            items={[
              { label: "정상 체중 범위", value: `${one(result.normalMin)}~${one(result.normalMax)}kg` },
              { label: "표준체중", value: `${one(result.standardWeight)}kg` },
              {
                label: "표준체중과 차이",
                value: `${result.weightDiff > 0 ? "+" : ""}${one(result.weightDiff)}kg`,
              },
            ]}
          />
          <div className="border-t border-line pt-5 text-[15px]">
            <BulletList items={categoryAdvice[result.category.name] ?? obesityAdvice} />
          </div>
        </Card>
      )}

      <Card title="BMI 기준 (대한비만학회 2022)">
        <div className="divide-y divide-canvas">
          {bmiCategories.map((c) => {
            const current = result?.category.name === c.name;
            return (
              <div
                key={c.name}
                className={`flex items-center justify-between gap-3 py-3 px-3 -mx-3 rounded-xl ${
                  current ? "bg-brand-soft" : ""
                }`}
              >
                <span className="flex items-center gap-2.5 font-bold text-ink">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.bar}`} aria-hidden="true" />
                  {c.name}
                  {current && (
                    <span className="text-xs font-bold text-brand bg-white rounded-md px-1.5 py-0.5">현재</span>
                  )}
                </span>
                <span className="text-ink-3">{c.range}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="BMI 계산 방법">
        <p>
          BMI(체질량지수)는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다. 예를 들어 키 170cm, 몸무게
          65kg이면 65 ÷ (1.7 × 1.7) = 22.5로 정상 범위입니다. 표준체중은 브로카 변형식인 (키 − 100) ×
          0.9로 계산합니다.
        </p>
      </Card>

      <Card title="한국 기준이 서양보다 낮은 이유">
        <p>
          세계보건기구(WHO) 국제 기준은 BMI 25 이상을 과체중, 30 이상을 비만으로 봅니다. 하지만
          아시아인은 같은 BMI에서도 체지방 비율이 높고 당뇨병·고혈압 같은 대사질환 위험이 더 일찍
          커지기 때문에, 대한비만학회는 23 이상을 비만 전단계, 25 이상을 비만으로 분류합니다.
        </p>
      </Card>

      <Card title="허리둘레도 함께 확인하세요">
        <p>
          BMI가 정상이어도 뱃살이 많으면 건강 위험이 커질 수 있습니다. 대한비만학회는 허리둘레가 남성
          90cm 이상, 여성 85cm 이상이면 복부비만으로 봅니다.
        </p>
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            "BMI는 체지방을 직접 측정하는 것이 아닙니다.",
            "근육량이 많은 경우 BMI가 높게 나올 수 있습니다.",
            "어린이, 청소년, 임산부는 다른 기준이 적용됩니다.",
            "정확한 건강 상태는 전문의와 상담하세요.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
