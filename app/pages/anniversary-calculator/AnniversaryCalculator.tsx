"use client";

import { useState, useEffect } from "react";

export default function AnniversaryCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [anniversaries, setAnniversaries] = useState<
    Array<{ name: string; date: Date; daysFrom: number }>
  >([]);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear().toString());
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
  }, []);

  const calculateAnniversaries = () => {
    if (!year || !month || !day) {
      alert("년, 월, 일을 모두 입력해주세요.");
      return;
    }

    const startYear = parseInt(year);
    const startMonth = parseInt(month);
    const startDay = parseInt(day);

    if (
      startYear < 1900 ||
      startYear > 2100 ||
      startMonth < 1 ||
      startMonth > 12 ||
      startDay < 1 ||
      startDay > 31
    ) {
      alert("올바른 날짜를 입력해주세요.");
      return;
    }

    const start = new Date(startYear, startMonth - 1, startDay);

    if (
      start.getFullYear() !== startYear ||
      start.getMonth() !== startMonth - 1 ||
      start.getDate() !== startDay
    ) {
      alert("유효하지 않은 날짜입니다.");
      return;
    }

    setStartDate(start);

    const anniversaryList = [
      { name: "100일", days: 100 },
      { name: "200일", days: 200 },
      { name: "300일", days: 300 },
      { name: "1년 (365일)", days: 365 },
      { name: "500일", days: 500 },
      { name: "2년 (730일)", days: 730 },
      { name: "1000일", days: 1000 },
      { name: "3년 (1095일)", days: 1095 },
      { name: "5년 (1825일)", days: 1825 },
      { name: "2000일", days: 2000 },
      { name: "10년 (3650일)", days: 3650 },
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const calculatedAnniversaries = anniversaryList.map((anniversary) => {
      const anniversaryDate = new Date(
        start.getTime() + anniversary.days * 24 * 60 * 60 * 1000
      );
      const daysFromToday = Math.ceil(
        (anniversaryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        name: anniversary.name,
        date: anniversaryDate,
        daysFrom: daysFromToday,
      };
    });

    setAnniversaries(calculatedAnniversaries);
  };

  const getStatusBadge = (daysFrom: number) => {
    if (daysFrom < 0) {
      return (
        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
          지남
        </span>
      );
    } else if (daysFrom === 0) {
      return (
        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
          오늘!
        </span>
      );
    } else if (daysFrom <= 7) {
      return (
        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
          임박
        </span>
      );
    } else if (daysFrom <= 30) {
      return (
        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
          다가옴
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
          예정
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          기념일 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          시작일로부터 100일, 200일, 1년 등 기념일을 확인하세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작 날짜
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="년"
                className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="월"
                className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="일"
                className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={calculateAnniversaries}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            기념일 계산하기
          </button>

          {startDate && anniversaries.length > 0 && (
            <div className="mt-8">
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <p className="text-center text-lg font-semibold text-gray-800">
                  시작일: {startDate.getFullYear()}년{" "}
                  {startDate.getMonth() + 1}월 {startDate.getDate()}일
                </p>
              </div>

              <div className="space-y-3">
                {anniversaries.map((anniversary, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {anniversary.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {anniversary.date.getFullYear()}년{" "}
                          {anniversary.date.getMonth() + 1}월{" "}
                          {anniversary.date.getDate()}일
                        </p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(anniversary.daysFrom)}
                        <p className="text-sm text-gray-600 mt-2">
                          {anniversary.daysFrom < 0
                            ? `${Math.abs(anniversary.daysFrom)}일 전`
                            : anniversary.daysFrom === 0
                            ? "오늘"
                            : `${anniversary.daysFrom}일 후`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">사용 예시</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 연애 시작일로부터 100일, 200일 계산</li>
              <li>• 결혼기념일 1주년, 2주년 확인</li>
              <li>• 아기 출생일로부터 100일, 200일</li>
              <li>• 회사 입사일로부터 기념일 확인</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
