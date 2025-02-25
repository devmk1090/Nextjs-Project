"use client";

import { useState } from "react";

export default function ZodiacCalculator() {
  const [year, setYear] = useState("");

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setYear(value);
    }
  };

  const getZodiacSign = (year: number) => {
    const zodiacSigns = [
      "닭",
      "개",
      "돼지",
      "쥐",
      "소",
      "호랑이",
      "토끼",
      "용",
      "뱀",
      "말",
      "양",
    ];
    return zodiacSigns[year % 12];
  };

  const calculateZodiac = () => {
    if (!year || year.length !== 4) return null;

    const birthYear = parseInt(year);
    if (birthYear < 1900 || birthYear > 2100) return null;

    return getZodiacSign(birthYear);
  };

  const zodiacResult = calculateZodiac();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          띠 계산기
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="year"
                  type="text"
                  value={year}
                  onChange={handleYearChange}
                  placeholder="YYYY"
                  maxLength={4}
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg"
                />
                <span className="inline-flex items-center px-3 py-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-lg rounded-r-md">
                  년
                </span>
              </div>
            </div>
          </div>

          {zodiacResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-center text-xl text-gray-800">
                <span className="font-semibold">{year}년</span>은{" "}
                <span className="font-bold text-blue-600">
                  {zodiacResult}띠
                </span>{" "}
                입니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
