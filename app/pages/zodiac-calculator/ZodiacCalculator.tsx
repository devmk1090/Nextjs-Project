"use client";

import { useState } from "react";

export default function ZodiacCalculator() {
  const [year, setYear] = useState("");

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setYear(value);
    }
  };

  const getZodiacSign = (year: number) => {
    const zodiacSigns = [
      "쥐",
      "소",
      "호랑이",
      "토끼",
      "용",
      "뱀",
      "말",
      "양",
      "원숭이",
      "닭",
      "개",
      "돼지",
    ];
    return zodiacSigns[(year - 4) % 12];
  };

  const calculateZodiac = () => {
    if (!year || year.length !== 4) return null;

    const birthYear = parseInt(year);
    if (birthYear < 1900 || birthYear > 2100) return null;

    return getZodiacSign(birthYear);
  };

  const zodiacResult = calculateZodiac();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          띠 계산기
        </h1>

        {/* 소개 섹션 */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">십이지(十二支) 띠란?</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            십이지는 12년을 주기로 반복되는 동양의 전통 천간지지(天干地支) 체계 중 지지(地支)를 동물로 표현한 것입니다.
            쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지의 12가지 동물로 구성되어 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            한국에서는 태어난 해의 띠를 통해 성격, 운세, 궁합 등을 해석하는 전통이 있으며,
            일상 대화에서 나이를 우회적으로 물어볼 때도 "무슨 띠세요?"라고 물어보곤 합니다.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid justify-center">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="year"
                  type="text"
                  value={year}
                  onChange={handleYearChange}
                  placeholder="YYYY"
                  maxLength={4}
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg"
                />
                <span className="inline-flex items-center px-3 py-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-lg rounded-r-md">
                  년
                </span>
              </div>
            </div>
          </div>

          {zodiacResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-center text-xl text-gray-800">
                <span className="font-semibold">{year}년</span>은{" "}
                <span className="font-bold text-blue-600">
                  {zodiacResult}띠
                </span>{" "}
                입니다
              </p>
            </div>
          )}
        </div>

        {/* 12가지 띠 상세 설명 */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">12가지 띠의 성격과 특징</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 쥐띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐭 쥐띠 (子)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2020, 2008, 1996, 1984, 1972...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 영리하고 재치있으며 적응력이 뛰어남. 근면하고 절약 정신이 강함.
                <br /><strong>장점:</strong> 순발력, 통찰력, 사교성
                <br /><strong>주의:</strong> 때때로 소심하거나 지나치게 신중할 수 있음
              </p>
            </div>

            {/* 소띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐂 소띠 (丑)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2021, 2009, 1997, 1985, 1973...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 성실하고 근면하며 책임감이 강함. 인내심이 뛰어나고 신뢰할 수 있음.
                <br /><strong>장점:</strong> 끈기, 정직함, 안정성
                <br /><strong>주의:</strong> 고집이 세고 변화를 받아들이기 어려울 수 있음
              </p>
            </div>

            {/* 호랑이띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐯 호랑이띠 (寅)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2022, 2010, 1998, 1986, 1974...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 용감하고 자신감 넘치며 리더십이 강함. 정의감이 뛰어남.
                <br /><strong>장점:</strong> 추진력, 카리스마, 열정
                <br /><strong>주의:</strong> 충동적이거나 지나치게 경쟁적일 수 있음
              </p>
            </div>

            {/* 토끼띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐰 토끼띠 (卯)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2023, 2011, 1999, 1987, 1975...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 온화하고 섬세하며 예술적 감각이 뛰어남. 평화를 사랑함.
                <br /><strong>장점:</strong> 배려심, 우아함, 창의력
                <br /><strong>주의:</strong> 우유부단하거나 갈등 회피 성향이 있을 수 있음
              </p>
            </div>

            {/* 용띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐲 용띠 (辰)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2024, 2012, 2000, 1988, 1976...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 강인하고 카리스마 넘치며 야망이 큼. 행운의 상징.
                <br /><strong>장점:</strong> 자신감, 창의력, 리더십
                <br /><strong>주의:</strong> 오만하거나 완벽주의 성향이 강할 수 있음
              </p>
            </div>

            {/* 뱀띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐍 뱀띠 (巳)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2025, 2013, 2001, 1989, 1977...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 지혜롭고 직관력이 뛰어나며 신비로움. 깊이있는 사고를 함.
                <br /><strong>장점:</strong> 통찰력, 침착함, 결단력
                <br /><strong>주의:</strong> 의심이 많거나 질투심이 강할 수 있음
              </p>
            </div>

            {/* 말띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐴 말띠 (午)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2026, 2014, 2002, 1990, 1978...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 활발하고 자유로우며 열정적임. 사교적이고 낙천적.
                <br /><strong>장점:</strong> 에너지, 독립성, 유머감각
                <br /><strong>주의:</strong> 조급하거나 집중력이 부족할 수 있음
              </p>
            </div>

            {/* 양띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐑 양띠 (未)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2027, 2015, 2003, 1991, 1979...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 부드럽고 온순하며 예술적 감성이 풍부함. 타인을 배려함.
                <br /><strong>장점:</strong> 친절함, 예술성, 공감능력
                <br /><strong>주의:</strong> 소극적이거나 의존적일 수 있음
              </p>
            </div>

            {/* 원숭이띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐵 원숭이띠 (申)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2028, 2016, 2004, 1992, 1980...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 영리하고 재치있으며 호기심이 많음. 문제 해결 능력이 뛰어남.
                <br /><strong>장점:</strong> 창의력, 유머, 적응력
                <br /><strong>주의:</strong> 장난기가 많거나 경솔할 수 있음
              </p>
            </div>

            {/* 닭띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-600">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐔 닭띠 (酉)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2029, 2017, 2005, 1993, 1981...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 정확하고 체계적이며 관찰력이 뛰어남. 자신감이 강함.
                <br /><strong>장점:</strong> 정직함, 근면성, 분석력
                <br /><strong>주의:</strong> 비판적이거나 완벽주의 성향이 있을 수 있음
              </p>
            </div>

            {/* 개띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐕 개띠 (戌)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2030, 2018, 2006, 1994, 1982...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 충성스럽고 정직하며 책임감이 강함. 정의감이 뛰어남.
                <br /><strong>장점:</strong> 신뢰성, 헌신적, 용기
                <br /><strong>주의:</strong> 걱정이 많거나 비관적일 수 있음
              </p>
            </div>

            {/* 돼지띠 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-rose-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🐷 돼지띠 (亥)</h3>
              <p className="text-sm text-gray-600 mb-2">해당 연도: 2031, 2019, 2007, 1995, 1983...</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 관대하고 솔직하며 낙천적임. 성실하고 인내심이 강함.
                <br /><strong>장점:</strong> 친절함, 관용, 정직함
                <br /><strong>주의:</strong> 순진하거나 자기관리가 부족할 수 있음
              </p>
            </div>
          </div>
        </div>

        {/* 띠별 궁합 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">띠별 궁합</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">최고의 궁합</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>쥐띠:</strong> 용띠, 원숭이띠, 소띠</li>
                <li>• <strong>소띠:</strong> 쥐띠, 뱀띠, 닭띠</li>
                <li>• <strong>호랑이띠:</strong> 말띠, 개띠, 돼지띠</li>
                <li>• <strong>토끼띠:</strong> 양띠, 돼지띠, 개띠</li>
                <li>• <strong>용띠:</strong> 쥐띠, 원숭이띠, 닭띠</li>
                <li>• <strong>뱀띠:</strong> 소띠, 닭띠</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">주의가 필요한 궁합</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 쥐띠 ↔ 말띠 (서로 상반된 성격)</li>
                <li>• 소띠 ↔ 양띠 (가치관 충돌 가능)</li>
                <li>• 호랑이띠 ↔ 원숭이띠 (경쟁 관계)</li>
                <li>• 토끼띠 ↔ 닭띠 (의견 차이)</li>
                <li>• 용띠 ↔ 개띠 (성격 차이)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 문화적 의미 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">한국 문화 속 띠의 의미</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              <strong>전통 명절과 띠:</strong> 설날이나 추석 같은 명절에 띠를 통해 나이를 물어보는 것은
              한국의 오래된 전통입니다. 직접적으로 나이를 묻는 것보다 더 예의바른 방법으로 여겨집니다.
            </p>
            <p>
              <strong>띠와 운세:</strong> 매년 새해가 되면 그 해의 띠를 기준으로 운세를 점치는 풍습이 있습니다.
              특히 본인의 띠 해(본띠해)에는 조심해야 한다는 속설이 있어 빨간 속옷을 입거나
              빨간 물건을 지니는 전통이 있습니다.
            </p>
            <p>
              <strong>결혼과 궁합:</strong> 예로부터 결혼할 때 신랑과 신부의 띠 궁합을 살펴보는 전통이 있었습니다.
              현대에는 과학적 근거가 없다고 여겨지지만, 여전히 참고하는 사람들이 있습니다.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 띠는 언제부터 바뀌나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 띠는 양력 1월 1일이 아닌 음력 설날(정월 초하루)을 기준으로 바뀝니다.
                따라서 양력 1~2월에 태어난 사람은 음력 달력을 확인해야 정확한 띠를 알 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 본띠해는 왜 조심해야 하나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 전통적으로 자신의 띠 해에는 큰 변화가 있거나 조심해야 한다는 속설이 있습니다.
                이는 미신이지만, 많은 사람들이 빨간 속옷이나 빨간 물건으로 액운을 막으려고 합니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 띠 궁합은 정말 중요한가요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 띠 궁합은 전통적인 믿음일 뿐 과학적 근거는 없습니다.
                실제 관계는 서로의 성격, 가치관, 노력 등이 훨씬 더 중요합니다.
                재미있는 참고 정도로만 여기는 것이 좋습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 사용 팁 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">💡 계산기 사용 팁</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 태어난 해(연도)만 입력하면 띠를 바로 확인할 수 있습니다.</li>
            <li>• 1900년부터 2100년까지의 연도를 계산할 수 있습니다.</li>
            <li>• 음력 1~2월 출생자는 음력 설날 전후를 확인해보세요.</li>
            <li>• 띠는 12년 주기로 반복되므로 ±12년 단위로 같은 띠입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
