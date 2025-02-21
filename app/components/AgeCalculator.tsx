"use client";

import { useState } from "react";

export default function AgeCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const calculateAge = () => {
    if (!year || !month || !day) return;
    
    const birth = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    setAge(age);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">만 나이 계산기</h1>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  className="border border-gray-300 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg">
                  년
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="month"
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  className="border border-gray-300 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg">
                  월
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="day"
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className="border border-gray-300 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg">
                  일
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={calculateAge}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            계산하기
          </button>
          
          {age !== null && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                만 나이는 <span className="text-blue-500">{age}</span>세 입니다.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
