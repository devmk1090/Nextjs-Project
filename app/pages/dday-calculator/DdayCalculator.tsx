"use client";

import { useState, useEffect } from "react";

export default function DdayCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dday, setDday] = useState<number | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear().toString());
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
  }, []);

  const calculateDday = () => {
    if (!year || !month || !day) {
      alert("년, 월, 일을 모두 입력해주세요.");
      return;
    }

    const targetYear = parseInt(year);
    const targetMonth = parseInt(month);
    const targetDay = parseInt(day);

    if (
      targetYear < 1900 ||
      targetYear > 2100 ||
      targetMonth < 1 ||
      targetMonth > 12 ||
      targetDay < 1 ||
      targetDay > 31
    ) {
      alert("올바른 날짜를 입력해주세요.");
      return;
    }

    const target = new Date(targetYear, targetMonth - 1, targetDay);
    target.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setTargetDate(target);
    setDday(Math.abs(diffDays));
    setIsPast(diffDays < 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          디데이 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          특정 날짜까지 남은 일수를 계산해보세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 날짜
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
            onClick={calculateDday}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            계산하기
          </button>

          {dday !== null && targetDate && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  {targetDate.getFullYear()}년 {targetDate.getMonth() + 1}월{" "}
                  {targetDate.getDate()}일
                </p>
                <div className="text-5xl font-bold text-blue-600 my-4">
                  {isPast ? "D+" : "D-"}
                  {dday}
                </div>
                <p className="text-gray-600">
                  {isPast
                    ? `${dday}일이 지났습니다`
                    : dday === 0
                    ? "오늘이 바로 그날입니다!"
                    : `${dday}일 남았습니다`}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <h3 className="font-semibold text-gray-700 mb-3">주요 기념일</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">100일:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 100 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">200일:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 200 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">300일:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 300 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">1년:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 365 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">사용 예시</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 수능, 입시일까지 남은 일수</li>
              <li>• 결혼식, 돌잔치까지 카운트다운</li>
              <li>• 제대일, 퇴사일까지 남은 일수</li>
              <li>• 시험일, 여행일까지 D-day 확인</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
