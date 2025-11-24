"use client";

import { useState } from "react";

export default function AgeCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length <= 4) {
      setYear(value);
    }
  };

  const handleMonthDayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length <= 2) {
      setter(value);
    }
  };

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
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          만 나이 계산기
        </h1>

        {/* 소개 섹션 */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">만 나이란?</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            만 나이는 국제적으로 통용되는 나이 계산 방식으로, 태어난 날을 0세로 시작하여 생일이 지날 때마다 1살씩 나이가 증가하는 방식입니다.
            2023년 6월부터 한국에서도 공식적으로 만 나이를 사용하게 되었습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            기존에 한국에서 사용하던 세는 나이(태어나자마자 1세, 1월 1일마다 증가)와 달리, 만 나이는 실제로 살아온 기간을 정확하게 반영합니다.
          </p>
        </div>

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
                  min="1900"
                  max="2100"
                  maxLength={4}
                  pattern="[0-9]{4}"
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
                  min="1"
                  max="12"
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
                  min="1"
                  max="31"
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-full sm:w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg whitespace-nowrap">
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

        {/* 한국 나이 체계 설명 */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">한국의 세 가지 나이 계산법</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. 만 나이 (국제 나이)</h3>
              <p className="text-gray-700 leading-relaxed">
                태어난 날을 0세로 시작하여 생일이 돌아올 때마다 1살씩 증가합니다.
                2023년 6월 28일부터 대한민국에서 법적으로 사용하는 공식 나이 계산법입니다.
                법률, 의료, 행정 등 모든 공식 문서에서 만 나이를 사용합니다.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. 세는 나이 (한국식 나이)</h3>
              <p className="text-gray-700 leading-relaxed">
                태어나자마자 1세가 되고, 1월 1일이 되면 나이가 1살 증가합니다.
                과거 한국에서 전통적으로 사용하던 방식으로, 현재는 일상 대화에서만 간혹 사용됩니다.
                만 나이보다 1~2살 많게 계산됩니다.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. 연 나이</h3>
              <p className="text-gray-700 leading-relaxed">
                현재 연도에서 출생 연도를 뺀 나이입니다. 생일이 지났는지 여부와 관계없이 계산됩니다.
                주로 학년을 구분하거나 병역 판정 등에 사용되었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 만 나이 통일법 설명 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">만 나이 통일법 (2023년 시행)</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            2023년 6월 28일부터 「행정기본법」 개정으로 대한민국에서는 모든 법령과 공식 문서에서
            만 나이를 사용하도록 통일되었습니다. 이는 국제 기준에 맞추고 나이 계산의 혼란을 없애기 위한 조치입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            다만 일부 법률(예: 청소년보호법, 병역법 등)은 특정 연도 출생자를 기준으로 하는 연 나이를
            계속 사용할 수 있으며, 전통적인 관습에서는 세는 나이를 사용할 수 있습니다.
          </p>
        </div>

        {/* 실생활 활용 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">만 나이가 필요한 경우</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <span className="font-semibold text-gray-800">공식 문서 작성:</span>
                <span className="text-gray-700"> 주민등록, 여권, 운전면허증 등 모든 신분증과 공식 서류</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <span className="font-semibold text-gray-800">의료 기록:</span>
                <span className="text-gray-700"> 병원 진료, 건강검진, 예방접종 등 의료 관련 기록</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <span className="font-semibold text-gray-800">법적 계약:</span>
                <span className="text-gray-700"> 보험 가입, 부동산 계약, 금융 거래 등</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <span className="font-semibold text-gray-800">국제 교류:</span>
                <span className="text-gray-700"> 해외 유학, 이민, 국제결혼 등 외국과의 소통</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <div>
                <span className="font-semibold text-gray-800">복지 혜택:</span>
                <span className="text-gray-700"> 각종 정부 지원금, 노인 복지, 아동 수당 등의 연령 기준</span>
              </div>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 생일이 지나지 않았으면 어떻게 계산하나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 생일이 지나지 않았다면 현재 연도에서 출생 연도를 뺀 값에서 1을 뺍니다.
                예를 들어 2000년생이 2024년 2월에는 만 23세이지만, 생일 이후에는 만 24세가 됩니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 윤년 2월 29일생은 어떻게 계산하나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 윤년이 아닌 해에는 보통 2월 28일이나 3월 1일을 생일로 간주합니다.
                법적으로는 2월 28일 24시에 나이가 증가하는 것으로 봅니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 만 나이와 세는 나이의 차이는 얼마인가요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 생일이 지났다면 1살, 생일이 지나지 않았다면 2살 차이가 납니다.
                예를 들어 생일이 지난 사람이 만 20세라면 세는 나이로는 21세,
                생일 전이라면 세는 나이로는 22세입니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 일상 대화에서도 만 나이를 써야 하나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 법적으로 강제되는 것은 공식 문서와 행정 절차입니다.
                일상 대화에서는 개인의 선택이지만, 혼란을 줄이기 위해 만 나이 사용을 권장합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 사용 팁 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">💡 계산기 사용 팁</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 정확한 만 나이를 알고 싶다면 생년월일을 정확히 입력하세요.</li>
            <li>• 1900년부터 2100년까지의 날짜를 계산할 수 있습니다.</li>
            <li>• 계산 결과는 오늘 날짜를 기준으로 자동 계산됩니다.</li>
            <li>• 공식 문서 작성 시 이 계산기로 확인한 만 나이를 사용하시면 됩니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
