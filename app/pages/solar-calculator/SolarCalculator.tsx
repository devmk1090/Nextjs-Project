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
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          양력 날짜 계산기
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="year"
                  type="text"
                  value={year}
                  onChange={handleYearChange}
                  placeholder="YYYY"
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-full sm:w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-full sm:w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-full sm:w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

        {/* 양력이란? */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">양력이란?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            양력(陽曆)은 태양의 움직임을 기준으로 만든 달력으로, 전 세계 대부분의 나라에서 공식적으로 사용하는 달력 체계입니다.
            현재 우리가 사용하는 양력은 그레고리력(Gregorian Calendar)으로, 1582년 교황 그레고리우스 13세가 제정했습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            한국은 1896년(고종 33년)에 공식적으로 양력을 도입했으며, 현재는 공공기관, 공식 문서, 법정 기념일 등 대부분의 공식적인 날짜 표기에 양력을 사용합니다.
            그러나 전통 명절인 설날, 추석, 대보름 등은 여전히 음력을 기준으로 하고 있습니다.
          </p>
        </div>

        {/* 양력과 음력의 차이 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">양력과 음력의 차이</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">구분</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">양력</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">음력</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">기준</td>
                  <td className="border border-gray-300 px-4 py-3">태양의 움직임</td>
                  <td className="border border-gray-300 px-4 py-3">달의 움직임</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">1년 길이</td>
                  <td className="border border-gray-300 px-4 py-3">약 365.25일</td>
                  <td className="border border-gray-300 px-4 py-3">약 354일 (윤달 없을 때)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">1개월 길이</td>
                  <td className="border border-gray-300 px-4 py-3">28~31일 (고정)</td>
                  <td className="border border-gray-300 px-4 py-3">29~30일 (달의 주기)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">주요 사용</td>
                  <td className="border border-gray-300 px-4 py-3">공식 문서, 공공기관, 국제 표준</td>
                  <td className="border border-gray-300 px-4 py-3">전통 명절, 제사, 민속 행사</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 양력이 필요한 경우 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">양력이 필요한 경우</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-xl">📅</span>
              <div>
                <span className="font-semibold text-gray-800">공식 문서 작성:</span>
                <span className="text-gray-700 ml-2">주민등록증, 여권, 각종 증명서 등 모든 공식 문서는 양력을 사용합니다.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">🏢</span>
              <div>
                <span className="font-semibold text-gray-800">업무 및 일정 관리:</span>
                <span className="text-gray-700 ml-2">회사 업무, 학사 일정, 공공기관 업무는 모두 양력 기준입니다.</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">🎉</span>
              <div>
                <span className="font-semibold text-gray-800">양력 기념일:</span>
                <span className="text-gray-700 ml-2">신정(1월 1일), 삼일절(3월 1일), 어린이날(5월 5일), 광복절(8월 15일), 개천절(10월 3일), 크리스마스(12월 25일) 등</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">🌍</span>
              <div>
                <span className="font-semibold text-gray-800">국제 교류:</span>
                <span className="text-gray-700 ml-2">해외 여행, 국제 행사, 외국과의 비즈니스 등은 양력을 기준으로 합니다.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 음력 생일을 양력으로 바꾸면 매년 날짜가 다른가요?</h3>
              <p className="text-gray-700">A. 네, 맞습니다. 음력과 양력의 1년 길이 차이로 인해 음력 생일을 양력으로 변환하면 매년 약 20일 정도 날짜가 달라집니다.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 한국에서 양력은 언제부터 사용했나요?</h3>
              <p className="text-gray-700">A. 한국은 1896년 고종 33년에 공식적으로 양력을 도입했습니다. 하지만 일상생활에서 전통 명절 등은 여전히 음력을 사용합니다.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 왜 음력과 양력을 같이 사용하나요?</h3>
              <p className="text-gray-700">A. 양력은 국제 표준과 공식 업무에 효율적이며, 음력은 농경 사회의 계절 변화와 전통문화를 반영하기 때문에 두 가지를 병행하여 사용합니다.</p>
            </div>
          </div>
        </div>

        {/* 사용 팁 */}
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">사용 팁</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>음력 생일을 양력으로 변환하면 매년 다른 날짜가 나옵니다.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>윤달이 있는 해는 13개월이므로 날짜 변환 시 주의가 필요합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>전통 명절 날짜를 확인하고 싶을 때 음력 날짜를 양력으로 변환해보세요.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>1900년부터 2100년까지의 날짜 변환을 지원합니다.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 