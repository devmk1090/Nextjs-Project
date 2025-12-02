"use client";

import { useState, useEffect } from "react";

export default function WorkPeriodCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [workPeriod, setWorkPeriod] = useState<{
    totalDays: number;
    years: number;
    months: number;
    days: number;
    annualLeave: number;
    estimatedSeverance: number;
  } | null>(null);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear().toString());
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
  }, []);

  const calculateWorkPeriod = () => {
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

    const today = new Date();

    if (start > today) {
      alert("입사일은 오늘보다 이전 날짜여야 합니다.");
      return;
    }

    setStartDate(start);

    // 총 근무 일수 계산
    const totalDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // 년, 월, 일 계산
    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // 연차 계산 (1년 미만: 월차 1개씩, 1년 이상: 15개 + 2년마다 1개 추가)
    let annualLeave = 0;
    if (totalDays < 365) {
      annualLeave = Math.floor(totalDays / 30);
    } else {
      annualLeave = 15;
      const additionalYears = Math.floor((totalDays - 365) / 365);
      if (additionalYears >= 1) {
        annualLeave += Math.floor(additionalYears / 2);
      }
      annualLeave = Math.min(annualLeave, 25); // 최대 25개
    }

    // 퇴직금 예상 계산 (연봉 입력 시 해당 연봉 기준, 미입력 시 0)
    const salary = annualSalary ? parseInt(annualSalary) : 0;
    const averageMonthlySalary = salary / 12;
    const workYears = totalDays / 365;
    const estimatedSeverance = salary > 0 ? Math.floor(averageMonthlySalary * workYears) : 0;

    setWorkPeriod({
      totalDays,
      years,
      months,
      days,
      annualLeave,
      estimatedSeverance,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          근무일수 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          입사일 기준으로 근무 기간과 연차를 계산해보세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              입사일
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연봉 (선택사항)
            </label>
            <input
              type="text"
              value={
                annualSalary
                  ? parseInt(annualSalary.replace(/,/g, "")).toLocaleString()
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, "");
                if (value === "" || /^\d+$/.test(value)) {
                  setAnnualSalary(value);
                }
              }}
              placeholder="예: 40,000,000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              연봉을 입력하면 예상 퇴직금을 계산할 수 있습니다 (단위: 원)
            </p>
          </div>

          <button
            onClick={calculateWorkPeriod}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            계산하기
          </button>

          {workPeriod && startDate && (
            <div className="mt-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <div className="text-center mb-4">
                  <p className="text-lg text-gray-700 mb-2">
                    입사일: {startDate.getFullYear()}년{" "}
                    {startDate.getMonth() + 1}월 {startDate.getDate()}일
                  </p>
                  <div className="text-5xl font-bold text-blue-600 my-4">
                    {workPeriod.years}년 {workPeriod.months}개월{" "}
                    {workPeriod.days}일
                  </div>
                  <p className="text-gray-600">
                    총 {workPeriod.totalDays.toLocaleString()}일 근무
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="bg-white border-2 border-green-200 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        연차 개수
                      </h3>
                      <p className="text-3xl font-bold text-green-600 mt-1">
                        {workPeriod.annualLeave}개
                      </p>
                    </div>
                    <div className="text-4xl">🏖️</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    {workPeriod.totalDays < 365
                      ? "1년 미만: 월 1개씩 발생"
                      : "1년 이상: 15개 기본 + 2년마다 1개 추가 (최대 25개)"}
                  </p>
                </div>

                <div className="bg-white border-2 border-purple-200 rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-600">
                        예상 퇴직금 (세전)
                      </h3>
                      {workPeriod.estimatedSeverance > 0 ? (
                        <p className="text-2xl font-bold text-purple-600 mt-1">
                          약 {workPeriod.estimatedSeverance.toLocaleString()}원
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">
                          연봉을 입력해주세요
                        </p>
                      )}
                    </div>
                    <div className="text-4xl">💰</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    {annualSalary
                      ? `연봉 ${parseInt(annualSalary).toLocaleString()}원 기준`
                      : "연봉을 입력하면 정확한 퇴직금을 계산할 수 있습니다"}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">
                  주요 근무 기간 정보
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 근무 주수:</span>
                    <span className="font-medium text-gray-800">
                      약 {Math.floor(workPeriod.totalDays / 7).toLocaleString()}
                      주
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 근무 개월수:</span>
                    <span className="font-medium text-gray-800">
                      약{" "}
                      {Math.floor(workPeriod.totalDays / 30).toLocaleString()}
                      개월
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">퇴직금 수령 가능:</span>
                    <span className="font-medium text-gray-800">
                      {workPeriod.totalDays >= 365 ? "가능 ✓" : "불가능 (1년 이상 필요)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">참고 사항</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 연차는 근로기준법에 따라 계산됩니다</li>
              <li>• 퇴직금은 1년 이상 근무 시 지급됩니다</li>
              <li>• 퇴직금은 연봉 ÷ 12 × 근속년수 방식으로 계산됩니다</li>
              <li>• 실제 퇴직금은 상여금, 수당 등에 따라 달라질 수 있습니다</li>
              <li>• 연차 사용 및 이월 규정은 회사마다 다릅니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
