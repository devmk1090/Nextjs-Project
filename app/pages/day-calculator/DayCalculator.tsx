"use client";

import { useState, useEffect } from "react";

export default function DayCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const daysInKorean = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const daysInEnglish = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear().toString());
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
  }, []);

  const calculateDayOfWeek = () => {
    if (!year || !month || !day) {
      alert("년, 월, 일을 모두 입력해주세요.");
      return;
    }

    const targetYear = parseInt(year);
    const targetMonth = parseInt(month);
    const targetDay = parseInt(day);

    if (
      targetYear < 1 ||
      targetYear > 9999 ||
      targetMonth < 1 ||
      targetMonth > 12 ||
      targetDay < 1 ||
      targetDay > 31
    ) {
      alert("올바른 날짜를 입력해주세요.");
      return;
    }

    const date = new Date(targetYear, targetMonth - 1, targetDay);

    if (
      date.getFullYear() !== targetYear ||
      date.getMonth() !== targetMonth - 1 ||
      date.getDate() !== targetDay
    ) {
      alert("유효하지 않은 날짜입니다.");
      return;
    }

    const dayIndex = date.getDay();
    setDayOfWeek(daysInKorean[dayIndex]);
    setTargetDate(date);
  };

  const getDayColor = (day: string) => {
    if (day === "일요일") return "text-red-600";
    if (day === "토요일") return "text-blue-600";
    return "text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          요일 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          특정 날짜의 요일을 확인해보세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              날짜 입력
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
            onClick={calculateDayOfWeek}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            요일 확인하기
          </button>

          {dayOfWeek && targetDate && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  {targetDate.getFullYear()}년 {targetDate.getMonth() + 1}월{" "}
                  {targetDate.getDate()}일은
                </p>
                <div
                  className={`text-6xl font-bold my-4 ${getDayColor(
                    dayOfWeek
                  )}`}
                >
                  {dayOfWeek}
                </div>
                <p className="text-gray-600 text-sm">
                  {daysInEnglish[daysInKorean.indexOf(dayOfWeek)]}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <h3 className="font-semibold text-gray-700 mb-3 text-center">
                  이 날의 정보
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">연도:</span>
                    <span className="font-medium text-gray-800">
                      {targetDate.getFullYear()}년
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">월:</span>
                    <span className="font-medium text-gray-800">
                      {targetDate.getMonth() + 1}월
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">일:</span>
                    <span className="font-medium text-gray-800">
                      {targetDate.getDate()}일
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">주말 여부:</span>
                    <span className="font-medium text-gray-800">
                      {dayOfWeek === "토요일" || dayOfWeek === "일요일"
                        ? "주말"
                        : "평일"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">사용 예시</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 내가 태어난 날은 무슨 요일?</li>
              <li>• 우리 결혼기념일은 무슨 요일?</li>
              <li>• 역사적 사건이 일어난 날의 요일</li>
              <li>• 미래의 특정 날짜 요일 확인</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
