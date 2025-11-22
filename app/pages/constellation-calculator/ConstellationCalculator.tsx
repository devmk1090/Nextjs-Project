"use client";

import { useState } from "react";

export default function ConstellationCalculator() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [constellation, setConstellation] = useState<string | null>(null);

  const handleMonthDayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length <= 2) {
      setter(value);
    }
  };

  const calculateConstellation = () => {
    if (!month || !day) return;

    const monthNum = Number(month);
    const dayNum = Number(day);
    let sign = "";

    if ((monthNum === 1 && dayNum >= 20) || (monthNum === 2 && dayNum <= 18)) {
      sign = "물병자리";
    } else if ((monthNum === 2 && dayNum >= 19) || (monthNum === 3 && dayNum <= 20)) {
      sign = "물고기자리";
    } else if ((monthNum === 3 && dayNum >= 21) || (monthNum === 4 && dayNum <= 19)) {
      sign = "양자리";
    } else if ((monthNum === 4 && dayNum >= 20) || (monthNum === 5 && dayNum <= 20)) {
      sign = "황소자리";
    } else if ((monthNum === 5 && dayNum >= 21) || (monthNum === 6 && dayNum <= 20)) {
      sign = "쌍둥이자리";
    } else if ((monthNum === 6 && dayNum >= 21) || (monthNum === 7 && dayNum <= 22)) {
      sign = "게자리";
    } else if ((monthNum === 7 && dayNum >= 23) || (monthNum === 8 && dayNum <= 22)) {
      sign = "사자자리";
    } else if ((monthNum === 8 && dayNum >= 23) || (monthNum === 9 && dayNum <= 22)) {
      sign = "처녀자리";
    } else if ((monthNum === 9 && dayNum >= 23) || (monthNum === 10 && dayNum <= 22)) {
      sign = "천칭자리";
    } else if ((monthNum === 10 && dayNum >= 23) || (monthNum === 11 && dayNum <= 21)) {
      sign = "전갈자리";
    } else if ((monthNum === 11 && dayNum >= 22) || (monthNum === 12 && dayNum <= 21)) {
      sign = "사수자리";
    } else if ((monthNum === 12 && dayNum >= 22) || (monthNum === 1 && dayNum <= 19)) {
      sign = "염소자리";
    }

    setConstellation(sign);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          별자리 계산기
        </h1>

        {/* 소개 섹션 */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">12 별자리란?</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            12 별자리는 서양 점성술에서 사용하는 황도대(Zodiac)의 12개 구역을 의미합니다.
            태양이 1년 동안 지나가는 길인 황도를 12등분하여, 각 구간마다 별자리를 배치한 것입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            자신이 태어난 날짜의 태양 위치에 따라 별자리가 결정되며, 각 별자리는 고유한 성격과 특징을 가지고 있다고 믿어집니다.
            별자리는 성격 분석, 궁합, 운세 등을 해석하는 데 사용됩니다.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  id="month"
                  type="text"
                  value={month}
                  onChange={(e) => handleMonthDayChange(e, setMonth)}
                  placeholder="MM"
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                  className="border border-gray-300 rounded-l-md px-3 py-3 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-lg whitespace-nowrap">
                  일
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={calculateConstellation}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            계산하기
          </button>

          {constellation && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                당신의 별자리는 <span className="text-blue-500">{constellation}</span>입니다.
              </h2>
            </div>
          )}
        </div>

        {/* 12별자리 상세 정보 */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">12 별자리 상세 정보</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 양자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♈ 양자리 (Aries)</h3>
              <p className="text-sm text-gray-600 mb-2">3월 21일 ~ 4월 19일 | 원소: 불</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 열정적이고 용감하며 리더십이 강함. 도전을 즐기고 새로운 시작을 두려워하지 않음.
                <br /><strong>장점:</strong> 추진력, 솔직함, 독립심
                <br /><strong>궁합:</strong> 사자자리, 사수자리
              </p>
            </div>

            {/* 황소자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♉ 황소자리 (Taurus)</h3>
              <p className="text-sm text-gray-600 mb-2">4월 20일 ~ 5월 20일 | 원소: 흙</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 안정적이고 실용적이며 인내심이 강함. 물질적 안정과 편안함을 중시함.
                <br /><strong>장점:</strong> 신뢰성, 인내, 충성심
                <br /><strong>궁합:</strong> 처녀자리, 염소자리
              </p>
            </div>

            {/* 쌍둥이자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♊ 쌍둥이자리 (Gemini)</h3>
              <p className="text-sm text-gray-600 mb-2">5월 21일 ~ 6월 20일 | 원소: 공기</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 호기심 많고 다재다능하며 사교적임. 의사소통 능력이 뛰어나고 적응력이 빠름.
                <br /><strong>장점:</strong> 유연성, 지적 능력, 재치
                <br /><strong>궁합:</strong> 천칭자리, 물병자리
              </p>
            </div>

            {/* 게자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-400">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♋ 게자리 (Cancer)</h3>
              <p className="text-sm text-gray-600 mb-2">6월 21일 ~ 7월 22일 | 원소: 물</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 감성적이고 배려심 깊으며 가정적임. 직관력이 뛰어나고 보호 본능이 강함.
                <br /><strong>장점:</strong> 공감 능력, 충성심, 직관
                <br /><strong>궁합:</strong> 전갈자리, 물고기자리
              </p>
            </div>

            {/* 사자자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♌ 사자자리 (Leo)</h3>
              <p className="text-sm text-gray-600 mb-2">7월 23일 ~ 8월 22일 | 원소: 불</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 자신감 넘치고 카리스마 있으며 관대함. 주목받기를 좋아하고 창의적임.
                <br /><strong>장점:</strong> 리더십, 열정, 관대함
                <br /><strong>궁합:</strong> 양자리, 사수자리
              </p>
            </div>

            {/* 처녀자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-emerald-600">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♍ 처녀자리 (Virgo)</h3>
              <p className="text-sm text-gray-600 mb-2">8월 23일 ~ 9월 22일 | 원소: 흙</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 분석적이고 완벽주의적이며 실용적임. 세심하고 책임감이 강함.
                <br /><strong>장점:</strong> 정확성, 근면성, 분석력
                <br /><strong>궁합:</strong> 황소자리, 염소자리
              </p>
            </div>

            {/* 천칭자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♎ 천칭자리 (Libra)</h3>
              <p className="text-sm text-gray-600 mb-2">9월 23일 ~ 10월 22일 | 원소: 공기</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 균형감각이 뛰어나고 사교적이며 공정함. 조화와 미를 추구함.
                <br /><strong>장점:</strong> 외교력, 균형감, 사교성
                <br /><strong>궁합:</strong> 쌍둥이자리, 물병자리
              </p>
            </div>

            {/* 전갈자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-purple-700">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♏ 전갈자리 (Scorpio)</h3>
              <p className="text-sm text-gray-600 mb-2">10월 23일 ~ 11월 21일 | 원소: 물</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 강렬하고 열정적이며 신비로움. 결단력이 강하고 깊이 있는 감정을 가짐.
                <br /><strong>장점:</strong> 집중력, 통찰력, 결단력
                <br /><strong>궁합:</strong> 게자리, 물고기자리
              </p>
            </div>

            {/* 사수자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♐ 사수자리 (Sagittarius)</h3>
              <p className="text-sm text-gray-600 mb-2">11월 22일 ~ 12월 21일 | 원소: 불</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 낙천적이고 자유로우며 모험적임. 철학적이고 진리를 탐구함.
                <br /><strong>장점:</strong> 낙관성, 정직함, 모험심
                <br /><strong>궁합:</strong> 양자리, 사자자리
              </p>
            </div>

            {/* 염소자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♑ 염소자리 (Capricorn)</h3>
              <p className="text-sm text-gray-600 mb-2">12월 22일 ~ 1월 19일 | 원소: 흙</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 야심차고 규율적이며 현실적임. 목표 지향적이고 책임감이 강함.
                <br /><strong>장점:</strong> 야망, 인내, 실용성
                <br /><strong>궁합:</strong> 황소자리, 처녀자리
              </p>
            </div>

            {/* 물병자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♒ 물병자리 (Aquarius)</h3>
              <p className="text-sm text-gray-600 mb-2">1월 20일 ~ 2월 18일 | 원소: 공기</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 독창적이고 진보적이며 인도주의적임. 독립적이고 혁신을 추구함.
                <br /><strong>장점:</strong> 창의성, 독립심, 인도주의
                <br /><strong>궁합:</strong> 쌍둥이자리, 천칭자리
              </p>
            </div>

            {/* 물고기자리 */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-600">
              <h3 className="text-lg font-bold text-gray-800 mb-2">♓ 물고기자리 (Pisces)</h3>
              <p className="text-sm text-gray-600 mb-2">2월 19일 ~ 3월 20일 | 원소: 물</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>성격:</strong> 감성적이고 예술적이며 직관적임. 공감 능력이 뛰어나고 상상력이 풍부함.
                <br /><strong>장점:</strong> 예술성, 공감, 직관력
                <br /><strong>궁합:</strong> 게자리, 전갈자리
              </p>
            </div>
          </div>
        </div>

        {/* 4원소 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">별자리의 4원소</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-red-600 mb-2">🔥 불 (Fire)</h3>
              <p className="text-sm text-gray-700 mb-2">양자리, 사자자리, 사수자리</p>
              <p className="text-sm text-gray-600">열정적, 활동적, 자신감 넘침. 에너지가 넘치고 도전적.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-green-700 mb-2">🌍 흙 (Earth)</h3>
              <p className="text-sm text-gray-700 mb-2">황소자리, 처녀자리, 염소자리</p>
              <p className="text-sm text-gray-600">실용적, 안정적, 현실적. 신뢰할 수 있고 근면함.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-sky-600 mb-2">💨 공기 (Air)</h3>
              <p className="text-sm text-gray-700 mb-2">쌍둥이자리, 천칭자리, 물병자리</p>
              <p className="text-sm text-gray-600">지적, 사교적, 소통 능력 뛰어남. 논리적이고 객관적.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-blue-600 mb-2">💧 물 (Water)</h3>
              <p className="text-sm text-gray-700 mb-2">게자리, 전갈자리, 물고기자리</p>
              <p className="text-sm text-gray-600">감성적, 직관적, 공감 능력 강함. 깊은 감정과 상상력.</p>
            </div>
          </div>
        </div>

        {/* 별자리 궁합 */}
        <div className="mt-8 p-6 bg-pink-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">별자리 궁합 가이드</h2>
          <div className="space-y-3 text-gray-700">
            <p className="leading-relaxed">
              <strong>같은 원소끼리:</strong> 불-불, 흙-흙, 공기-공기, 물-물은 서로를 잘 이해하고 편안한 관계를 유지합니다.
            </p>
            <p className="leading-relaxed">
              <strong>보완 관계:</strong> 불과 공기, 흙과 물은 서로 다르지만 보완적인 관계를 형성합니다.
            </p>
            <p className="leading-relaxed">
              <strong>도전 관계:</strong> 불과 물, 흙과 공기는 가치관 차이로 인해 갈등이 생길 수 있으나, 서로 배우고 성장할 수 있습니다.
            </p>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                💡 별자리 궁합은 참고용일 뿐, 실제 관계는 개인의 노력과 이해가 더 중요합니다.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 별자리는 어떻게 결정되나요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 별자리는 태어난 날짜(월, 일)를 기준으로 결정됩니다.
                태양이 그 날 어느 별자리 구간에 있었는지에 따라 정해지며, 연도는 상관없습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 경계일에 태어났어요. 어느 별자리인가요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 별자리가 바뀌는 경계일(예: 3월 20~21일)에 태어났다면, 정확한 출생 시간을 확인해야 합니다.
                일반적으로는 가장 가까운 날짜의 별자리를 따릅니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 별자리와 띠의 차이는 무엇인가요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 별자리는 서양 점성술로 생일(월, 일)로 결정되며, 띠는 동양 점성술로 태어난 해(연도)로 결정됩니다.
                두 시스템은 완전히 다른 문화적 배경을 가지고 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q. 별자리 성격은 정확한가요?</h3>
              <p className="text-gray-700 leading-relaxed">
                A. 별자리 성격은 오랜 시간 축적된 관찰과 상징에 기반하지만, 과학적 근거는 없습니다.
                재미있는 참고 자료로 활용하되, 사람은 별자리보다 훨씬 복잡하고 다양하다는 점을 기억하세요.
              </p>
            </div>
          </div>
        </div>

        {/* 사용 팁 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">💡 계산기 사용 팁</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 생일의 월과 일만 입력하면 별자리를 바로 확인할 수 있습니다.</li>
            <li>• 연도는 별자리 결정에 영향을 주지 않습니다.</li>
            <li>• 경계일 출생자는 정확한 시간을 확인해보세요.</li>
            <li>• 별자리는 양력 기준으로 계산됩니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
