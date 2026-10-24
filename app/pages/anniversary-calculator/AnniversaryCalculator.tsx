"use client";

import { useState, useEffect } from "react";

export default function AnniversaryCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [todayCount, setTodayCount] = useState(0);
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = (date: Date) =>
      Math.round((date.getTime() - today.getTime()) / msPerDay);

    // 일수 기념일: 한국식으로 시작일을 1일째로 셈 (100일 = 시작일 + 99일)
    const dayAnniversaries = [100, 200, 300, 500, 1000, 2000, 3000].map(
      (days) => {
        const date = new Date(startYear, startMonth - 1, startDay + days - 1);
        return { name: `${days}일`, date, daysFrom: diffDays(date) };
      }
    );

    // 주년: 달력 기준 같은 날짜 (2월 29일 시작이면 평년에는 2월 28일)
    const yearAnniversaries = [1, 2, 3, 5, 10].map((years) => {
      const date = new Date(startYear + years, startMonth - 1, startDay);
      if (date.getMonth() !== startMonth - 1) date.setDate(0);
      return { name: `${years}주년`, date, daysFrom: diffDays(date) };
    });

    const calculatedAnniversaries = [...dayAnniversaries, ...yearAnniversaries].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    // 오늘이 시작일로부터 며칠째인지 (시작일 = 1일째)
    setTodayCount(-diffDays(start) + 1);

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
                {todayCount > 0 && (
                  <p className="text-center text-gray-700 mt-1">
                    오늘은 <span className="font-bold text-blue-600">{todayCount.toLocaleString()}일째</span>입니다
                  </p>
                )}
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

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">기념일 계산 기준</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>100일, 200일 등 일수 기념일</strong>은 시작일을 1일째로 세는 한국식
                계산법을 따릅니다. 예를 들어 1월 1일에 시작했다면 100일은 4월 10일입니다
                (윤년이 아닌 해 기준).
              </li>
              <li>
                • <strong>1주년, 2주년 등 주년</strong>은 일수가 아니라 달력상 같은 날짜로
                계산합니다. 윤년이 끼어도 날짜가 밀리지 않습니다.
              </li>
              <li>
                • 2월 29일에 시작했다면 평년의 주년은 2월 28일로 표시합니다.
              </li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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
