"use client";

import { useState } from "react";

type UnitType = "length" | "weight" | "volume" | "temperature";

export default function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [result, setResult] = useState<number | null>(null);

  const units = {
    length: {
      m: { name: "미터(m)", toBase: 1 },
      cm: { name: "센티미터(cm)", toBase: 0.01 },
      mm: { name: "밀리미터(mm)", toBase: 0.001 },
      km: { name: "킬로미터(km)", toBase: 1000 },
      inch: { name: "인치(in)", toBase: 0.0254 },
      ft: { name: "피트(ft)", toBase: 0.3048 },
      yard: { name: "야드(yd)", toBase: 0.9144 },
      mile: { name: "마일(mi)", toBase: 1609.344 },
    },
    weight: {
      kg: { name: "킬로그램(kg)", toBase: 1 },
      g: { name: "그램(g)", toBase: 0.001 },
      mg: { name: "밀리그램(mg)", toBase: 0.000001 },
      ton: { name: "톤(t)", toBase: 1000 },
      lb: { name: "파운드(lb)", toBase: 0.453592 },
      oz: { name: "온스(oz)", toBase: 0.0283495 },
    },
    volume: {
      l: { name: "리터(L)", toBase: 1 },
      ml: { name: "밀리리터(mL)", toBase: 0.001 },
      m3: { name: "세제곱미터(m³)", toBase: 1000 },
      gal: { name: "갤런(gal)", toBase: 3.78541 },
      qt: { name: "쿼트(qt)", toBase: 0.946353 },
      pt: { name: "파인트(pt)", toBase: 0.473176 },
      cup: { name: "컵(cup)", toBase: 0.236588 },
    },
    temperature: {
      c: { name: "섭씨(°C)", toBase: 1 },
      f: { name: "화씨(°F)", toBase: 1 },
      k: { name: "켈빈(K)", toBase: 1 },
    },
  };

  const convertTemperature = (
    value: number,
    from: string,
    to: string
  ): number => {
    let celsius: number;

    // Convert to Celsius first
    if (from === "c") {
      celsius = value;
    } else if (from === "f") {
      celsius = ((value - 32) * 5) / 9;
    } else if (from === "k") {
      celsius = value - 273.15;
    } else {
      celsius = value;
    }

    // Convert from Celsius to target unit
    if (to === "c") {
      return celsius;
    } else if (to === "f") {
      return (celsius * 9) / 5 + 32;
    } else if (to === "k") {
      return celsius + 273.15;
    }

    return celsius;
  };

  const convert = () => {
    if (!inputValue) {
      alert("변환할 값을 입력해주세요.");
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      alert("올바른 숫자를 입력해주세요.");
      return;
    }

    let convertedValue: number;

    if (unitType === "temperature") {
      convertedValue = convertTemperature(value, fromUnit, toUnit);
    } else {
      const currentUnits = units[unitType] as Record<
        string,
        { name: string; toBase: number }
      >;
      const baseValue = value * currentUnits[fromUnit].toBase;
      convertedValue = baseValue / currentUnits[toUnit].toBase;
    }

    setResult(convertedValue);
  };

  const handleUnitTypeChange = (type: UnitType) => {
    setUnitType(type);
    setInputValue("");
    setResult(null);

    // Set default units for each type
    if (type === "length") {
      setFromUnit("m");
      setToUnit("cm");
    } else if (type === "weight") {
      setFromUnit("kg");
      setToUnit("g");
    } else if (type === "volume") {
      setFromUnit("l");
      setToUnit("ml");
    } else if (type === "temperature") {
      setFromUnit("c");
      setToUnit("f");
    }
  };

  const currentUnits = units[unitType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          단위 변환 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          길이, 무게, 부피, 온도 단위를 변환해보세요
        </p>

        <div className="space-y-6">
          {/* 단위 타입 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              변환 종류
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleUnitTypeChange("length")}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  unitType === "length"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                길이
              </button>
              <button
                onClick={() => handleUnitTypeChange("weight")}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  unitType === "weight"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                무게
              </button>
              <button
                onClick={() => handleUnitTypeChange("volume")}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  unitType === "volume"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                부피
              </button>
              <button
                onClick={() => handleUnitTypeChange("temperature")}
                className={`py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                  unitType === "temperature"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                온도
              </button>
            </div>
          </div>

          {/* 입력 값 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              변환할 값
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="예: 100"
              step="any"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* From Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              변환 전 단위
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(currentUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              변환 후 단위
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(currentUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={convert}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            변환하기
          </button>

          {result !== null && (
            <div className="mt-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-2">변환 결과</p>
                  <div className="text-4xl font-bold text-blue-600 my-4">
                    {result.toFixed(6).replace(/\.?0+$/, "")}
                  </div>
                  <p className="text-gray-600">
                    {
                      (
                        currentUnits as Record<
                          string,
                          { name: string; toBase: number }
                        >
                      )[toUnit].name
                    }
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-200">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">입력 값</span>
                    <span className="font-bold text-gray-800">
                      {inputValue}{" "}
                      {
                        (
                          currentUnits as Record<
                            string,
                            { name: string; toBase: number }
                          >
                        )[fromUnit].name
                      }
                    </span>
                  </div>
                  <div className="flex justify-center my-2">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">변환 결과</span>
                    <span className="font-bold text-blue-600">
                      {result.toFixed(6).replace(/\.?0+$/, "")}{" "}
                      {
                        (
                          currentUnits as Record<
                            string,
                            { name: string; toBase: number }
                          >
                        )[toUnit].name
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">참고 사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • 길이: 미터(m), 센티미터(cm), 밀리미터(mm), 킬로미터(km),
                인치(in), 피트(ft), 야드(yd), 마일(mi)
              </li>
              <li>
                • 무게: 킬로그램(kg), 그램(g), 밀리그램(mg), 톤(t),
                파운드(lb), 온스(oz)
              </li>
              <li>
                • 부피: 리터(L), 밀리리터(mL), 세제곱미터(m³), 갤런(gal),
                쿼트(qt), 파인트(pt), 컵(cup)
              </li>
              <li>• 온도: 섭씨(°C), 화씨(°F), 켈빈(K)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
