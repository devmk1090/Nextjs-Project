"use client";

import { useState } from "react";

export default function ConstellationCalculator() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [constellation, setConstellation] = useState<string | null>(null);

  const handleMonthDayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length <= 2) {
      setter(value);
    }
  };

  const calculateConstellation = () => {
    if (!month || !day) return;

    const monthNum = Number(month);
    const dayNum = Number(day);
    let sign = "";

    if ((monthNum === 1 && dayNum >= 20) || (monthNum === 2 && dayNum <= 18)) {
      sign = "물병자리";
    } else if ((monthNum === 2 && dayNum >= 19) || (monthNum === 3 && dayNum <= 20)) {
      sign = "물고기자리";
    } else if ((monthNum === 3 && dayNum >= 21) || (monthNum === 4 && dayNum <= 19)) {
      sign = "양자리";
    } else if ((monthNum === 4 && dayNum >= 20) || (monthNum === 5 && dayNum <= 20)) {
      sign = "황소자리";
    } else if ((monthNum === 5 && dayNum >= 21) || (monthNum === 6 && dayNum <= 20)) {
      sign = "쌍둥이자리";
    } else if ((monthNum === 6 && dayNum >= 21) || (monthNum === 7 && dayNum <= 22)) {
      sign = "게자리";
    } else if ((monthNum === 7 && dayNum >= 23) || (monthNum === 8 && dayNum <= 22)) {
      sign = "사자자리";
    } else if ((monthNum === 8 && dayNum >= 23) || (monthNum === 9 && dayNum <= 22)) {
      sign = "처녀자리";
    } else if ((monthNum === 9 && dayNum >= 23) || (monthNum === 10 && dayNum <= 22)) {
      sign = "천칭자리";
    } else if ((monthNum === 10 && dayNum >= 23) || (monthNum === 11 && dayNum <= 21)) {
      sign = "전갈자리";
    } else if ((monthNum === 11 && dayNum >= 22) || (monthNum === 12 && dayNum <= 21)) {
      sign = "사수자리";
    } else if ((monthNum === 12 && dayNum >= 22) || (monthNum === 1 && dayNum <= 19)) {
      sign = "염소자리";
    }

    setConstellation(sign);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          별자리 계산기
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="month"
                  type="text"
                  value={month}
                  onChange={(e) => handleMonthDayChange(e, setMonth)}
                  placeholder="MM"
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg whitespace-nowrap">
                  월
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="day"
                  type="text"
                  value={day}
                  onChange={(e) => handleMonthDayChange(e, setDay)}
                  placeholder="DD"
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg whitespace-nowrap">
                  일
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={calculateConstellation}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            계산하기
          </button>

          {constellation && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                당신의 별자리는 <span className="text-blue-500">{constellation}</span>입니다.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
