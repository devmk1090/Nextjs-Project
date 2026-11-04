"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BulletList,
  Card,
  Field,
  ResultHero,
  Segmented,
  StatGrid,
  ToolPage,
  inputClass,
} from "../../components/tool/ToolUI";
import {
  M2_PER_PYEONG,
  areaPageLabel,
  areaPagePath,
  areaPages,
  commonExclusiveAreas,
} from "./areas";

type ConversionType = "toPyeong" | "toSquareMeter";

const conversionTypes: { id: ConversionType; name: string }[] = [
  { id: "toPyeong", name: "m² → 평" },
  { id: "toSquareMeter", name: "평 → m²" },
];

const fixed = (n: number, digits: number) =>
  n.toLocaleString("ko-KR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export default function PyeongCalculator() {
  const [conversionType, setConversionType] = useState<ConversionType>("toPyeong");
  const [inputValue, setInputValue] = useState("");
  const [exclusiveArea, setExclusiveArea] = useState("84");
  const [exclusiveRatio, setExclusiveRatio] = useState("75");

  // 입력하는 즉시 변환
  const value = parseFloat(inputValue);
  const converted =
    value > 0
      ? conversionType === "toPyeong"
        ? { squareMeter: value, pyeong: value / M2_PER_PYEONG }
        : { squareMeter: value * M2_PER_PYEONG, pyeong: value }
      : null;

  // 공급면적 = 전용면적 ÷ 전용률
  const exclusiveValue = parseFloat(exclusiveArea);
  const ratioValue = parseFloat(exclusiveRatio);
  const supplyArea =
    exclusiveValue > 0 && ratioValue > 0 && ratioValue <= 100
      ? exclusiveValue / (ratioValue / 100)
      : null;

  return (
    <ToolPage
      slug="pyeong-calculator"
      subtitle="평과 제곱미터(m²)를 바꾸고, 아파트 전용면적으로 몇 평형인지 계산합니다."
    >
      <Card className="flex flex-col gap-5">
        <Segmented
          label="변환 방향"
          options={conversionTypes}
          value={conversionType}
          onChange={(type) => {
            setConversionType(type);
            setInputValue("");
          }}
        />
        <Field label={conversionType === "toPyeong" ? "제곱미터 (m²)" : "평"} htmlFor="pyeong-input">
          <input
            id="pyeong-input"
            type="number"
            inputMode="decimal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={conversionType === "toPyeong" ? "84" : "34"}
            step="0.01"
            min="0"
            className={inputClass}
          />
        </Field>
      </Card>

      {converted && (
        <Card aria-label="변환 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero
            label={
              conversionType === "toPyeong"
                ? `${inputValue}m²를 평으로`
                : `${inputValue}평을 제곱미터로`
            }
            value={
              conversionType === "toPyeong"
                ? `${fixed(converted.pyeong, 2)}평`
                : `${fixed(converted.squareMeter, 2)}m²`
            }
            sub={`정확한 값 ${fixed(converted.squareMeter, 4)}m² = ${fixed(converted.pyeong, 4)}평`}
          />
          <StatGrid
            items={[
              { label: "제곱미터", value: `${fixed(converted.squareMeter, 2)}m²` },
              { label: "평", value: `${fixed(converted.pyeong, 2)}평` },
              { label: "정사각형 한 변", value: `${fixed(Math.sqrt(converted.squareMeter), 1)}m` },
            ]}
          />
          <p className="text-sm text-ink-3 border-t border-line pt-4">
            아파트 분양 광고의 &quot;OO평형&quot;은 전용면적이 아니라 공급면적 기준입니다. 아래 평형
            계산을 이용하세요.
          </p>
        </Card>
      )}

      <Card title="아파트 평형 계산 (전용면적 → 평형)">
        <p className="mb-4">
          &quot;전용 84m²가 왜 34평형이지?&quot; 평형은 전용면적에 계단·복도 같은 주거공용면적을 더한
          공급면적 기준이기 때문입니다. 전용면적과 전용률을 넣으면 평형을 추정합니다.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="전용면적 (m²)" htmlFor="exclusive-area">
            <input
              id="exclusive-area"
              type="number"
              inputMode="decimal"
              value={exclusiveArea}
              onChange={(e) => setExclusiveArea(e.target.value)}
              step="0.01"
              min="0"
              className={inputClass}
            />
          </Field>
          <Field label="전용률 (%)" htmlFor="exclusive-ratio">
            <input
              id="exclusive-ratio"
              type="number"
              inputMode="decimal"
              value={exclusiveRatio}
              onChange={(e) => setExclusiveRatio(e.target.value)}
              min="1"
              max="100"
              className={inputClass}
            />
          </Field>
        </div>
        <p className="text-sm text-ink-4 mt-2">
          아파트 전용률은 보통 계단식 75~80%, 복도식 70~75% 정도입니다. 정확한 값은 분양공고나
          건축물대장의 공급면적으로 확인하세요.
        </p>
        {supplyArea && (
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <div className="bg-canvas rounded-2xl p-4">
              <p className="text-[13px] text-ink-3">전용면적</p>
              <p className="text-lg font-extrabold text-ink">
                {fixed(exclusiveValue / M2_PER_PYEONG, 1)}평
              </p>
            </div>
            <div className="bg-canvas rounded-2xl p-4">
              <p className="text-[13px] text-ink-3">추정 공급면적</p>
              <p className="text-lg font-extrabold text-ink">{fixed(supplyArea, 1)}m²</p>
            </div>
            <div className="bg-brand-soft rounded-2xl p-4">
              <p className="text-[13px] text-ink-3">추정 평형</p>
              <p className="text-lg font-extrabold text-brand">
                {Math.round(supplyArea / M2_PER_PYEONG)}평형
              </p>
            </div>
          </div>
        )}

        <h3 className="font-bold text-ink mt-8 mb-2">주요 전용면적별 평형 (전용률 70~80% 기준)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">전용면적</th>
                <th className="py-2.5 px-3 font-medium text-right">전용 평수</th>
                <th className="py-2.5 pl-3 font-medium text-right">공급면적 평형</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {commonExclusiveAreas.map((area) => (
                <tr key={area}>
                  <td className="py-3 pr-3">
                    <Link href={areaPagePath(`${area}-m2`)} className="text-brand font-bold">
                      {area}m²
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-right">{fixed(area / M2_PER_PYEONG, 1)}평</td>
                  <td className="py-3 pl-3 text-right font-bold text-ink">
                    약 {Math.round(area / 0.8 / M2_PER_PYEONG)}~{Math.round(area / 0.7 / M2_PER_PYEONG)}
                    평형
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card id="areas" title="자주 찾는 면적" className="scroll-mt-4">
        <p className="mb-4">평형별 전용면적, 전용면적별 평형을 표로 정리한 페이지입니다.</p>
        {(["pyeong", "m2"] as const).map((kind) => (
          <div key={kind} className="mb-4 last:mb-0">
            <h3 className="font-bold text-ink mb-2">{kind === "pyeong" ? "평 → m²" : "m² → 평"}</h3>
            <div className="flex flex-wrap gap-2">
              {areaPages
                .filter((page) => page.kind === kind)
                .map((page) => (
                  <Link
                    key={page.slug}
                    href={areaPagePath(page)}
                    className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
                  >
                    {areaPageLabel(page)}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </Card>

      <Card title="아파트 면적 용어 정리">
        <div className="flex flex-col gap-3 text-[15px]">
          {[
            [
              "전용면적",
              "현관문 안쪽, 세대가 혼자 쓰는 공간의 면적입니다. 방, 거실, 주방, 욕실이 포함되며 발코니는 제외됩니다. 국민주택 규모(85m² 이하)나 각종 세금 기준은 전용면적으로 판단합니다.",
            ],
            [
              "주거공용면적",
              "계단, 복도, 엘리베이터, 1층 현관처럼 같은 동 주민이 함께 쓰는 공간을 세대별로 나눈 면적입니다.",
            ],
            ["공급면적", "전용면적 + 주거공용면적. 흔히 말하는 \"34평형\" 같은 아파트 평형의 기준입니다."],
            [
              "계약면적",
              "공급면적 + 기타공용면적(지하주차장, 관리사무소, 노인정 등). 오피스텔은 보통 계약면적 기준으로 표시해 전용률이 50% 안팎으로 낮게 나옵니다.",
            ],
            [
              "서비스면적",
              "발코니처럼 면적 계산에서 빠지는 공간입니다. 발코니를 확장하면 실제 사용 공간은 전용면적보다 넓어집니다.",
            ],
          ].map(([term, desc]) => (
            <div key={term} className="bg-canvas rounded-2xl p-4">
              <strong className="text-ink">{term}</strong>: {desc}
            </div>
          ))}
        </div>
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            "1평 = 400/121 m² ≈ 3.3058 m², 1m² ≈ 0.3025평",
            "2007년 7월부터 법정 계량 단위는 제곱미터(m²)이지만, 일상에서는 평도 여전히 많이 쓰입니다.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
