"use client";

import { useState } from "react";
import { Lunar } from "lunar-typescript";

export default function SolarCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [solarDate, setSolarDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setYear(value);
    }
  };

  const handleMonthDayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 2) {
      setter(value);
    }
  };

  const calculateSolarDate = () => {
    if (!year || !month || !day) {
      setError("날짜를 모두 입력해주세요.");
      return;
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    // 날짜 유효성 검사
    if (yearNum < 1900 || yearNum > 2100) {
      setError("1900년에서 2100년 사이의 날짜만 계산할 수 있습니다.");
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError("올바른 월을 입력해주세요 (1-12).");
      return;
    }

    if (dayNum < 1 || dayNum > 30) {
      setError("올바른 일을 입력해주세요 (1-30).");
      return;
    }

    try {
      // 음력 날짜 생성
      const lunar = Lunar.fromYmd(yearNum, monthNum, dayNum);
      // 양력으로 변환
      const solar = lunar.getSolar();
      
      const solarDateStr = `양력 ${solar.getYear()}년 ${solar.getMonth()}월 ${solar.getDay()}일`;
      
      setSolarDate(solarDateStr);
      setError(null);
    } catch (err) {
      setError("날짜 변환 중 오류가 발생했습니다. 올바른 날짜를 입력해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          양력 변환 계산기
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
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg whitespace-nowrap">
                  년
                </span>
              </div>
            </div>

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
            onClick={calculateSolarDate}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            양력으로 변환하기
          </button>

          {error && (
            <div className="mt-4 text-center text-red-500">
              {error}
            </div>
          )}

          {solarDate && !error && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {solarDate}
              </h2>
              <p className="mt-2 text-gray-600">
                * 음력 날짜를 양력으로 변환한 결과입니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 