"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BulletList,
  Card,
  Field,
  ResultHero,
  Segmented,
  ToolPage,
  inputClass,
} from "../../components/tool/ToolUI";
import { toolPath } from "../../tools";

type UnitType = "length" | "weight" | "volume" | "temperature";
type Unit = { name: string; symbol: string; toBase: number };

// toBase: 기준 단위(m, kg, L)로 바꾸는 배수. 온도는 별도 계산
const units: Record<UnitType, Record<string, Unit>> = {
  length: {
    m: { name: "미터", symbol: "m", toBase: 1 },
    cm: { name: "센티미터", symbol: "cm", toBase: 0.01 },
    mm: { name: "밀리미터", symbol: "mm", toBase: 0.001 },
    km: { name: "킬로미터", symbol: "km", toBase: 1000 },
    inch: { name: "인치", symbol: "in", toBase: 0.0254 },
    ft: { name: "피트", symbol: "ft", toBase: 0.3048 },
    yard: { name: "야드", symbol: "yd", toBase: 0.9144 },
    mile: { name: "마일", symbol: "mi", toBase: 1609.344 },
    // 한국 전통 단위 (1자 = 10/33 m)
    chi: { name: "치(寸)", symbol: "치", toBase: 1 / 33 },
    ja: { name: "자(尺)", symbol: "자", toBase: 10 / 33 },
    ri: { name: "리(里)", symbol: "리", toBase: (1296 * 10) / 33 },
  },
  weight: {
    kg: { name: "킬로그램", symbol: "kg", toBase: 1 },
    g: { name: "그램", symbol: "g", toBase: 0.001 },
    mg: { name: "밀리그램", symbol: "mg", toBase: 0.000001 },
    ton: { name: "톤", symbol: "t", toBase: 1000 },
    lb: { name: "파운드", symbol: "lb", toBase: 0.453592 },
    oz: { name: "온스", symbol: "oz", toBase: 0.0283495 },
    // 한국 전통 단위 (1돈 = 3.75 g)
    don: { name: "돈", symbol: "돈", toBase: 0.00375 },
    nyang: { name: "냥", symbol: "냥", toBase: 0.0375 },
    geun: { name: "근 (육류, 600g)", symbol: "근", toBase: 0.6 },
    geunVeg: { name: "근 (채소·과일, 375g)", symbol: "근", toBase: 0.375 },
    gwan: { name: "관", symbol: "관", toBase: 3.75 },
  },
  volume: {
    l: { name: "리터", symbol: "L", toBase: 1 },
    ml: { name: "밀리리터", symbol: "mL", toBase: 0.001 },
    m3: { name: "세제곱미터", symbol: "m³", toBase: 1000 },
    gal: { name: "갤런(미국)", symbol: "gal", toBase: 3.78541 },
    qt: { name: "쿼트(미국)", symbol: "qt", toBase: 0.946353 },
    pt: { name: "파인트(미국)", symbol: "pt", toBase: 0.473176 },
    cup: { name: "컵(미국)", symbol: "cup", toBase: 0.236588 },
    // 한국 전통 단위 (1되 ≈ 1.8039 L)
    hop: { name: "홉(合)", symbol: "홉", toBase: 0.18039 },
    doe: { name: "되(升)", symbol: "되", toBase: 1.8039 },
    mal: { name: "말(斗)", symbol: "말", toBase: 18.039 },
  },
  temperature: {
    c: { name: "섭씨", symbol: "°C", toBase: 1 },
    f: { name: "화씨", symbol: "°F", toBase: 1 },
    k: { name: "켈빈", symbol: "K", toBase: 1 },
  },
};

const unitTypes: { id: UnitType; name: string }[] = [
  { id: "length", name: "길이" },
  { id: "weight", name: "무게" },
  { id: "volume", name: "부피" },
  { id: "temperature", name: "온도" },
];

const defaultUnits: Record<UnitType, [string, string]> = {
  length: ["m", "cm"],
  weight: ["kg", "g"],
  volume: ["l", "ml"],
  temperature: ["c", "f"],
};

function convertTemperature(value: number, from: string, to: string) {
  // 섭씨로 바꾼 뒤 목표 단위로
  const celsius = from === "f" ? ((value - 32) * 5) / 9 : from === "k" ? value - 273.15 : value;
  if (to === "f") return (celsius * 9) / 5 + 32;
  if (to === "k") return celsius + 273.15;
  return celsius;
}

function convert(type: UnitType, value: number, from: string, to: string) {
  if (type === "temperature") return convertTemperature(value, from, to);
  return (value * units[type][from].toBase) / units[type][to].toBase;
}

// 유효숫자 위주로 보기 좋게 (아주 크거나 작은 값은 지수 표기)
function formatNumber(n: number) {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-6) return n.toExponential(4);
  // 1 이상은 소수 넷째 자리까지, 1 미만은 유효숫자 5자리 (0.26667)
  return abs >= 1
    ? n.toLocaleString("ko-KR", { maximumFractionDigits: 4 })
    : n.toLocaleString("ko-KR", { maximumSignificantDigits: 5 });
}

const selectClass =
  "w-full h-14 rounded-2xl bg-canvas px-4 text-[17px] font-bold text-ink outline-none focus:ring-2 focus:ring-brand";

export default function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");

  const currentUnits = units[unitType];
  const value = parseFloat(inputValue);
  const hasValue = inputValue.trim() !== "" && !isNaN(value);
  const result = hasValue ? convert(unitType, value, fromUnit, toUnit) : null;

  const changeType = (type: UnitType) => {
    setUnitType(type);
    setInputValue("");
    setFromUnit(defaultUnits[type][0]);
    setToUnit(defaultUnits[type][1]);
  };

  return (
    <ToolPage
      slug="unit-converter"
      subtitle="길이, 무게, 부피, 온도와 돈·근·자·되 같은 한국 전통 단위를 바로 변환합니다."
    >
      <Card className="flex flex-col gap-5">
        <Segmented label="변환 종류" options={unitTypes} value={unitType} onChange={changeType} />
        <Field label="변환할 값" htmlFor="unit-value">
          <input
            id="unit-value"
            type="number"
            inputMode="decimal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="100"
            step="any"
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <Field label="변환 전" htmlFor="unit-from">
            <select id="unit-from" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className={selectClass}>
              {Object.entries(currentUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </Field>
          <button
            type="button"
            onClick={() => {
              setFromUnit(toUnit);
              setToUnit(fromUnit);
            }}
            aria-label="변환 전·후 단위 바꾸기"
            className="h-14 w-11 rounded-2xl bg-canvas text-ink-3 hover:text-brand flex items-center justify-center"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />
            </svg>
          </button>
          <Field label="변환 후" htmlFor="unit-to">
            <select id="unit-to" value={toUnit} onChange={(e) => setToUnit(e.target.value)} className={selectClass}>
              {Object.entries(currentUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      {result !== null && (
        <>
          <Card aria-label="변환 결과" aria-live="polite">
            <ResultHero
              label={`${formatNumber(value)} ${currentUnits[fromUnit].symbol} (${currentUnits[fromUnit].name})`}
              value={`${formatNumber(result)} ${currentUnits[toUnit].symbol}`}
              sub={currentUnits[toUnit].name}
            />
          </Card>
          <Card title={`${formatNumber(value)} ${currentUnits[fromUnit].symbol} 환산표`}>
            <ul className="divide-y divide-canvas">
              {Object.entries(currentUnits)
                .filter(([key]) => key !== fromUnit)
                .map(([key, unit]) => (
                  <li
                    key={key}
                    className={`flex items-center justify-between gap-3 py-3 ${key === toUnit ? "text-brand" : ""}`}
                  >
                    <span className={key === toUnit ? "font-bold" : "text-ink-3"}>{unit.name}</span>
                    <span className="font-bold text-right break-all">
                      {formatNumber(convert(unitType, value, fromUnit, key))} {unit.symbol}
                    </span>
                  </li>
                ))}
            </ul>
          </Card>
        </>
      )}

      <Card title="한국 전통 단위 환산표">
        <p className="mb-4">
          척관법에서 유래한 전통 단위는 2007년 7월부터 상거래에서 법정 단위(g, m, L 등)를 쓰도록
          바뀌었지만, 금 거래나 시장, 요리 레시피에서는 여전히 자주 쓰입니다.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full min-w-[480px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">단위</th>
                <th className="py-2.5 px-3 font-medium">환산</th>
                <th className="py-2.5 pl-3 font-medium">주로 쓰는 곳</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {[
                ["1돈", "3.75g", "금·은 거래 (금 1돈, 돌반지)"],
                ["1냥", "10돈 = 37.5g", "한약재, 금"],
                ["1근 (육류)", "16냥 = 600g", "정육점 고기"],
                ["1근 (채소·과일)", "10냥 = 375g", "시장 채소·과일"],
                ["1관", "1,000돈 = 3.75kg", "과일·채소 대량 거래"],
                ["1자 (척)", "10치 ≈ 30.3cm", "목공, 한옥, 옷감"],
                ["1치 (촌)", "≈ 3.03cm", "목재 두께, 한복 치수"],
                ["1리", "≈ 392.7m (10리 ≈ 4km)", "거리 표현 (십 리)"],
                ["1홉", "≈ 180mL", "쌀, 술 (소주 1홉)"],
                ["1되", "10홉 ≈ 1.8L", "쌀, 잡곡"],
                ["1말", "10되 ≈ 18L", "쌀, 곡물 (쌀 1말은 보통 8kg으로 거래)"],
              ].map(([unit, conversion, usage]) => (
                <tr key={unit}>
                  <td className="py-3 pr-3 font-bold text-ink">{unit}</td>
                  <td className="py-3 px-3">{conversion}</td>
                  <td className="py-3 pl-3 text-ink-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BulletList
          items={[
            "근은 품목에 따라 기준이 다릅니다. 고기는 600g, 채소·과일은 375g으로 계산하는 것이 일반적이지만 지역·가게마다 다를 수 있습니다.",
            "되와 말은 부피 단위라 같은 1말이라도 곡물 종류와 도정 상태에 따라 무게가 다릅니다.",
            <>
              넓이 단위인 평(1평 ≈ 3.3058m²)은{" "}
              <Link href={toolPath("pyeong-calculator")} className="text-brand font-bold">
                평수 계산기
              </Link>
              에서 변환할 수 있습니다.
            </>,
          ]}
        />
      </Card>

      <Card title="온도 변환 공식">
        <BulletList
          items={[
            "화씨(°F) = 섭씨(°C) × 9 ÷ 5 + 32. 예: 체온 36.5°C = 97.7°F",
            "섭씨(°C) = (화씨(°F) − 32) × 5 ÷ 9. 예: 오븐 350°F ≈ 176.7°C",
            "켈빈(K) = 섭씨(°C) + 273.15. 0K(−273.15°C)는 절대영도입니다.",
          ]}
        />
      </Card>

      <Card title="지원하는 단위">
        <BulletList
          items={[
            "길이: 미터, 센티미터, 밀리미터, 킬로미터, 인치, 피트, 야드, 마일, 치, 자, 리",
            "무게: 킬로그램, 그램, 밀리그램, 톤, 파운드, 온스, 돈, 냥, 근, 관",
            "부피: 리터, 밀리리터, 세제곱미터, 갤런·쿼트·파인트·컵(미국 단위), 홉, 되, 말",
            "온도: 섭씨, 화씨, 켈빈",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
