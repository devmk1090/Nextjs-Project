"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomeContent() {
  const [activeTab, setActiveTab] = useState("calculator");

  // 탭 데이터
  const tabs = [
    { id: "calculator", name: "계산기", emoji: "📊" },
    { id: "developer", name: "개발자 도구", emoji: "🛠️" },
    { id: "text", name: "텍스트 도구", emoji: "📝" },
    { id: "color", name: "색상 도구", emoji: "🎨" },
    { id: "random", name: "랜덤 생성기", emoji: "🎲" }
  ];

  // URL 해시로 탭 전환
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && tabs.some(tab => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          올인원 유틸리티 도구
        </h1>

        {/* 탭 버튼 */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {tab.emoji} {tab.name}
            </button>
          ))}
        </div>

        {/* 계산기 섹션 */}
        {activeTab === "calculator" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/pages/age-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">📅 만 나이 계산기</h3>
                <p className="text-sm text-gray-700">
                  2023년 만 나이 통일법에 따른 정확한 만 나이를 계산합니다. 한국 나이, 세는 나이와의 차이점도 자세히 설명합니다.
                </p>
              </Link>

              <Link
                href="/pages/zodiac-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🐉 띠 계산기</h3>
                <p className="text-sm text-gray-700">
                  12가지 십이지 띠를 확인하고, 각 띠의 성격과 특징, 띠별 궁합 정보를 제공합니다.
                </p>
              </Link>

              <Link
                href="/pages/constellation-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">⭐ 별자리 계산기</h3>
                <p className="text-sm text-gray-700">
                  12 별자리를 확인하고 각 별자리의 기간, 4원소(불/흙/공기/물), 성격 특징과 궁합을 알아봅니다.
                </p>
              </Link>

              <Link
                href="/pages/lunar-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🌙 음력 변환 계산기</h3>
                <p className="text-sm text-gray-700">
                  양력을 음력으로 간편하게 변환합니다. 전통 명절 날짜 확인과 음력 생일 계산에 유용합니다.
                </p>
              </Link>

              <Link
                href="/pages/solar-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">☀️ 양력 변환 계산기</h3>
                <p className="text-sm text-gray-700">
                  음력을 양력으로 간편하게 변환합니다. 음력 생일을 양력으로 확인할 때 유용합니다.
                </p>
              </Link>

              <Link
                href="/pages/dday-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">⏰ 디데이 계산기</h3>
                <p className="text-sm text-gray-700">
                  목표 날짜까지 남은 일수를 계산합니다. 수능, 결혼식, 제대일 등 중요한 날까지 D-day를 확인하세요.
                </p>
              </Link>

              <Link
                href="/pages/day-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">📆 요일 계산기</h3>
                <p className="text-sm text-gray-700">
                  특정 날짜의 요일을 확인합니다. 내가 태어난 날, 기념일의 요일을 쉽게 찾아보세요.
                </p>
              </Link>

              <Link
                href="/pages/anniversary-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🎉 기념일 계산기</h3>
                <p className="text-sm text-gray-700">
                  시작일로부터 100일, 200일, 1년 등 주요 기념일을 자동으로 계산합니다. 연애, 결혼, 출생 기념일에 유용합니다.
                </p>
              </Link>

              <Link
                href="/pages/work-period-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">💼 근무일수 계산기</h3>
                <p className="text-sm text-gray-700">
                  입사일 기준으로 근무 기간, 연차 개수, 예상 퇴직금을 계산합니다. 직장인을 위한 필수 도구입니다.
                </p>
              </Link>

              <Link
                href="/pages/bmi-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">⚖️ BMI 계산기</h3>
                <p className="text-sm text-gray-700">
                  체질량지수(BMI)와 표준체중을 계산합니다. 건강한 체중 관리와 비만도 확인에 유용합니다.
                </p>
              </Link>

              <Link
                href="/pages/interest-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">💰 예금/적금 이자 계산기</h3>
                <p className="text-sm text-gray-700">
                  예금과 적금의 이자를 계산합니다. 세전/세후 금액과 이자소득세까지 자동으로 계산합니다.
                </p>
              </Link>

              <Link
                href="/pages/unit-converter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔄 단위 변환 계산기</h3>
                <p className="text-sm text-gray-700">
                  길이, 무게, 부피, 온도 단위를 변환합니다. 미터, 킬로그램, 리터, 섭씨 등 다양한 단위를 쉽게 변환하세요.
                </p>
              </Link>

              <Link
                href="/pages/pyeong-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🏠 평형/평수 계산기</h3>
                <p className="text-sm text-gray-700">
                  평형(평)과 제곱미터(m²)를 변환합니다. 아파트 면적 계산, 부동산 평수 확인에 유용합니다.
                </p>
              </Link>

              <Link
                href="/pages/loan-calculator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🏦 대출 이자 계산기</h3>
                <p className="text-sm text-gray-700">
                  대출 원금, 이자율, 기간을 입력하여 원리금균등상환과 원금균등상환 방식의 월별 상환액과 총 이자를 계산합니다.
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* 개발자 도구 섹션 */}
        {activeTab === "developer" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/pages/json-formatter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">📋 JSON 포매터/검증기</h3>
                <p className="text-sm text-gray-700">
                  JSON 문법을 검사하고 예쁘게 포맷팅합니다. 들여쓰기 조정, 축소, 복사 기능을 제공합니다.
                </p>
              </Link>

              <Link
                href="/pages/base64-converter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔐 Base64 인코더/디코더</h3>
                <p className="text-sm text-gray-700">
                  텍스트를 Base64로 인코딩하거나 Base64를 텍스트로 디코딩합니다. 한글 지원, 복사 기능 제공.
                </p>
              </Link>

              <Link
                href="/pages/url-encoder"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔗 URL 인코더/디코더</h3>
                <p className="text-sm text-gray-700">
                  URL에 한글이나 특수문자를 안전하게 포함시킵니다. 퍼센트 인코딩, 쿼리 문자열 인코딩 지원.
                </p>
              </Link>

              <Link
                href="/pages/regex-tester"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔍 정규식 테스터</h3>
                <p className="text-sm text-gray-700">
                  정규표현식을 실시간으로 테스트하고 검증합니다. 매칭 결과, 하이라이트, 캡처 그룹 확인 가능.
                </p>
              </Link>

              <Link
                href="/pages/hash-generator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔐 해시 생성기</h3>
                <p className="text-sm text-gray-700">
                  SHA-1, SHA-256, SHA-384, SHA-512 해시를 생성합니다. 데이터 무결성 검증, 비밀번호 해싱에 활용.
                </p>
              </Link>

              <Link
                href="/pages/qr-generator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">📱 QR 코드 생성기</h3>
                <p className="text-sm text-gray-700">
                  텍스트나 URL을 QR 코드로 변환합니다. 색상, 크기 조정 가능. URL, Wi-Fi, 전화번호 등 템플릿 제공.
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* 텍스트 도구 섹션 */}
        {activeTab === "text" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/pages/char-counter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔢 글자 수 세기</h3>
                <p className="text-sm text-gray-700">
                  문자, 단어, 문장, 공백 수를 세고 예상 읽기 시간을 계산합니다. 실시간 통계 제공.
                </p>
              </Link>

              <Link
                href="/pages/case-converter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔤 케이스 변환기</h3>
                <p className="text-sm text-gray-700">
                  대문자, 소문자, 카멜케이스, 스네이크케이스 등 다양한 케이스로 변환합니다.
                </p>
              </Link>

              <Link
                href="/pages/text-diff"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔍 텍스트 비교</h3>
                <p className="text-sm text-gray-700">
                  두 텍스트의 차이점을 비교하고 하이라이트합니다. 문자, 단어, 줄 단위 비교 지원.
                </p>
              </Link>

              <Link
                href="/pages/duplicate-remover"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🗑️ 중복 제거기</h3>
                <p className="text-sm text-gray-700">
                  중복된 줄을 제거합니다. 대소문자 구분 옵션 제공. 제거된 중복 수 통계 표시.
                </p>
              </Link>

              <Link
                href="/pages/text-sorter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">↕️ 정렬 도구</h3>
                <p className="text-sm text-gray-700">
                  가나다순, ABC순, 길이순, 무작위 등 다양한 방식으로 텍스트를 정렬합니다.
                </p>
              </Link>

              <Link
                href="/pages/random-string"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🎲 랜덤 문자열 생성기</h3>
                <p className="text-sm text-gray-700">
                  안전한 비밀번호, UUID, Nano ID를 생성합니다. 길이 및 문자 종류 조정 가능.
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* 색상 도구 섹션 */}
        {activeTab === "color" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/pages/color-converter"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔄 색상 변환기</h3>
                <p className="text-sm text-gray-700">
                  HEX, RGB, HSL 색상 형식을 상호 변환합니다. 실시간 미리보기, 슬라이더 조정 지원.
                </p>
              </Link>

              <Link
                href="/pages/gradient-generator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🌈 그라디언트 생성기</h3>
                <p className="text-sm text-gray-700">
                  CSS 그라디언트 코드를 생성합니다. 선형, 방사형 지원. 프리셋 제공.
                </p>
              </Link>

              <Link
                href="/pages/color-palette"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🎨 컬러 팔레트 생성기</h3>
                <p className="text-sm text-gray-700">
                  조화로운 색상 조합을 추천합니다. 단색, 유사, 보색, 삼각, 사각 조화 팔레트 제공.
                </p>
              </Link>

              <Link
                href="/pages/color-extractor"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">📸 색상 추출기</h3>
                <p className="text-sm text-gray-700">
                  이미지에서 주요 색상을 추출합니다. 상위 10개 색상 자동 추출, HEX 코드 복사.
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* 랜덤 생성기 섹션 */}
        {activeTab === "random" && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/pages/timer-stopwatch"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">⏱️ 타이머 & 스톱워치</h3>
                <p className="text-sm text-gray-700">
                  타이머, 스톱워치, 포모도로 기법을 한 곳에서. 알람 기능, 랩타임 기록, 집중 시간 관리에 유용합니다.
                </p>
              </Link>

              <Link
                href="/pages/random-number"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🔢 랜덤 숫자 생성기</h3>
                <p className="text-sm text-gray-700">
                  범위 내 난수를 생성합니다. 최솟값/최댓값 설정, 중복 허용/불가 선택, 여러 개 생성 지원.
                </p>
              </Link>

              <Link
                href="/pages/random-name"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">👤 랜덤 이름 생성기</h3>
                <p className="text-sm text-gray-700">
                  한국 이름과 영어 이름을 무작위로 생성합니다. 남/여 성별 선택 가능.
                </p>
              </Link>

              <Link
                href="/pages/dice-coin"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🎲 주사위/동전 던지기</h3>
                <p className="text-sm text-gray-700">
                  주사위 굴리기와 동전 던지기 시뮬레이터. 4~100면 주사위 지원, 히스토리 및 통계 제공.
                </p>
              </Link>

              <Link
                href="/pages/lotto-generator"
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-bold text-gray-800 mb-2">🎰 로또 번호 생성기</h3>
                <p className="text-sm text-gray-700">
                  자동 로또 번호 추천. 1~45 중 6개 생성, 포함/제외 번호 설정, 즐겨찾기 기능.
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* 이용 방법 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">이용 방법</h2>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <span className="text-gray-700">위에서 원하는 도구를 선택합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <span className="text-gray-700">필요한 정보를 입력하고 결과를 확인합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <span className="text-gray-700">탭을 전환하여 다른 카테고리의 도구도 이용해보세요.</span>
            </li>
          </ol>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 회원가입이 필요한가요?</h3>
              <p className="text-gray-700">A. 아니요, 모든 도구는 회원가입 없이 무료로 이용할 수 있습니다.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 입력한 정보가 저장되나요?</h3>
              <p className="text-gray-700">A. 아니요, 입력한 정보는 서버에 저장되지 않으며 브라우저에서만 처리됩니다. 개인정보 보호를 최우선으로 합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
