"use client";

import { useState } from "react";
import { Lunar } from "lunar-typescript";

export default function LunarCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [lunarDate, setLunarDate] = useState<string | null>(null);
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

  const calculateLunarDate = () => {
    if (!year || !month || !day) {
      setError("날짜를 모두 입력해주세요.");
      return;
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    // 날짜 유효성 검사 개선
    if (yearNum < 1900 || yearNum > 2100) {
      setError("1900년에서 2100년 사이의 날짜만 계산할 수 있습니다.");
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError("올바른 월을 입력해주세요 (1-12).");
      return;
    }

    // 각 월의 마지막 날짜 확인
    const lastDayOfMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum < 1 || dayNum > lastDayOfMonth) {
      setError(`올바른 일을 입력해주세요 (1-${lastDayOfMonth}).`);
      return;
    }

    try {
      // 양력 날짜를 음력으로 변환
      const lunar = Lunar.fromDate(new Date(yearNum, monthNum - 1, dayNum));
      
      // 음력 날짜 문자열 생성 (윤달 여부 포함)
      const lunarDateStr = `음력 ${lunar.getYear()}년 ${lunar.getMonth()}월 ${lunar.getDay()}일`;

      // 간지 정보 추가
      const ganZhi = `(${lunar.getYearInGanZhi()}년)`;
      
      setLunarDate(`${lunarDateStr} ${ganZhi}`);
      setError(null);
    } catch (err) {
      setError("날짜 변환 중 오류가 발생했습니다. 올바른 날짜를 입력해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          음력 날짜 계산기
        </h1>

        {/* 소개 섹션 */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">음력이란?</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            음력(陰曆)은 달의 차고 기우는 주기를 기준으로 만든 달력입니다.
            한 달은 약 29.5일이며, 12개월은 약 354일로 양력보다 약 11일 짧습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            한국을 비롯한 동아시아에서는 전통적으로 음력을 사용해왔으며,
            현재도 설날, 추석 등 주요 명절과 전통 행사를 음력 날짜로 지킵니다.
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
            onClick={calculateLunarDate}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            음력으로 변환하기
          </button>

          {error && (
            <div className="mt-4 text-center text-red-500">
              {error}
            </div>
          )}

          {lunarDate && !error && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {lunarDate}
              </h2>
              <p className="mt-2 text-gray-600">
                * 음력 생일은 매년 양력으로 환산했을 때 다른 날짜가 될 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 음력과 양력의 차이 */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">음력과 양력의 차이</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🌙 음력 (太陰曆)</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>기준:</strong> 달의 차고 기우는 주기</li>
                <li>• <strong>한 달:</strong> 약 29~30일</li>
                <li>• <strong>1년:</strong> 약 354일 (12개월)</li>
                <li>• <strong>윤달:</strong> 약 3년마다 한 번씩 추가</li>
                <li>• <strong>사용:</strong> 전통 명절, 제사, 생일</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">☀️ 양력 (太陽曆)</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>기준:</strong> 지구의 공전 주기</li>
                <li>• <strong>한 달:</strong> 28~31일 (고정)</li>
                <li>• <strong>1년:</strong> 365일 (윤년 366일)</li>
                <li>• <strong>윤년:</strong> 4년마다 한 번씩</li>
                <li>• <strong>사용:</strong> 공식 문서, 일상생활</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 한국의 주요 음력 명절 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">한국의 주요 음력 명절</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🎊 설날 (음력 1월 1일)</h3>
              <p className="text-sm text-gray-700">
                한국의 가장 큰 명절로, 새해의 첫날입니다. 떡국을 먹고 세배를 드리며,
                가족들이 모여 차례를 지냅니다.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🌕 대보름 (음력 1월 15일)</h3>
              <p className="text-sm text-gray-700">
                한 해의 첫 보름달이 뜨는 날로, 오곡밥과 나물을 먹고 부럼을 깨며 건강을 기원합니다.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🌸 삼짇날 (음력 3월 3일)</h3>
              <p className="text-sm text-gray-700">
                봄을 맞이하는 명절로, 진달래전을 먹고 봄나들이를 떠나는 풍습이 있습니다.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🪷 초파일 (음력 4월 8일)</h3>
              <p className="text-sm text-gray-700">
                부처님 오신 날로, 사찰에서는 연등을 밝히고 법회를 엽니다.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🌾 단오 (음력 5월 5일)</h3>
              <p className="text-sm text-gray-700">
                창포물에 머리를 감고 그네뛰기, 씨름 등의 민속놀이를 즐기는 명절입니다.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🌕 추석 (음력 8월 15일)</h3>
              <p className="text-sm text-gray-700">
                설날과 함께 한국의 2대 명절로, 햅쌀로 송편을 빚고 차례를 지냅니다.
                한가위라고도 부르며, 풍성한 수확을 감사하는 날입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 음력 생일의 의미 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">음력 생일의 의미</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              <strong>전통적 의미:</strong> 한국에서는 전통적으로 음력 생일을 중요하게 여겨왔습니다.
              특히 환갑, 칠순 등 중요한 생일은 음력으로 계산하여 큰 잔치를 열곤 했습니다.
            </p>
            <p>
              <strong>현대의 변화:</strong> 현재는 양력 생일을 주로 사용하지만,
              어르신들은 여전히 음력 생일을 더 의미있게 여기는 경우가 많습니다.
            </p>
            <p>
              <strong>날짜 변동:</strong> 음력 생일을 양력으로 환산하면 매년 날짜가 달라집니다.
              예를 들어, 음력 3월 15일생은 양력으로는 어떤 해는 4월, 어떤 해는 5월이 될 수 있습니다.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 윤달이란 무엇인가요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 음력은 1년이 약 354일로 양력보다 11일 짧습니다. 이 차이를 보정하기 위해
                약 3년마다 한 번씩 한 달을 추가하는데, 이를 윤달(閏月)이라고 합니다.
                윤달에 태어난 사람은 윤달이 없는 해에는 평달로 생일을 지냅니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 음력 생일은 어떻게 챙기나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 매년 음력 생일에 해당하는 양력 날짜를 찾아야 합니다.
                이 계산기를 사용하여 해당 연도의 음력 생일을 양력으로 변환할 수 있습니다.
                또는 음력 달력을 참고하실 수도 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 공식 문서에는 어떤 생일을 쓰나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 주민등록, 여권 등 모든 공식 문서에는 양력 생일을 사용합니다.
                음력 생일은 개인적인 의미나 전통 행사에서만 사용됩니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 띠는 음력과 양력 중 무엇으로 계산하나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 띠는 음력 설날(정월 초하루)을 기준으로 바뀝니다.
                따라서 양력 1~2월 출생자는 음력 설날 전후를 확인하여 띠를 정확히 알아야 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 사용 팁 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">💡 계산기 사용 팁</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 양력 생년월일을 입력하면 음력 날짜로 변환됩니다.</li>
            <li>• 1900년부터 2100년까지의 날짜를 계산할 수 있습니다.</li>
            <li>• 결과에 간지(干支) 정보도 함께 표시됩니다.</li>
            <li>• 윤달 여부도 확인할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 