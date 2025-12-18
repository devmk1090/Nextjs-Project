import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "계산기 & 개발자 도구 모음 - 만 나이, 띠, 별자리, 디데이, 요일, 기념일, 근무일수, BMI, 예금/적금 이자, 대출 이자, 단위 변환, 음력/양력 변환, JSON 포매터",
  description: "만 나이 계산기, 띠 계산기, 별자리 계산기, 디데이 계산기, 요일 계산기, 기념일 계산기, 근무일수 계산기, BMI 계산기, 예금/적금 이자 계산기, 대출 이자 계산기, 단위 변환 계산기, 음력/양력 변환기, JSON 포매터/검증기를 한 곳에서 무료로 이용하세요. 2023년 만 나이 통일법 적용, 십이지 띠 궁합, 12 별자리 정보, D-day 계산, 요일 확인, 기념일 자동 계산, 재직기간 및 연차 계산, 체질량지수 및 표준체중, 예금 적금 이자 및 세후 금액, 대출 원리금 상환 계산, 길이 무게 부피 온도 단위 변환, 한국 전통 명절 음력 날짜 확인, JSON 문법 검사 및 예쁘게 만들기까지 모든 서비스를 제공합니다.",
  keywords: ["만 나이 계산기", "띠 계산기", "별자리 계산기", "디데이 계산기", "요일 계산기", "기념일 계산기", "근무일수 계산기", "연차 계산기", "재직기간 계산기", "퇴직금 계산기", "BMI 계산기", "체질량지수", "표준체중", "비만도", "예금 이자 계산기", "적금 이자 계산기", "대출 이자 계산기", "원리금균등상환", "원금균등상환", "이자소득세", "복리 계산", "단위 변환", "길이 변환", "무게 변환", "부피 변환", "온도 변환", "섭씨 화씨", "음력 계산기", "양력 계산기", "JSON 포매터", "JSON 검증기", "JSON formatter", "JSON validator", "개발자 도구", "계산기", "한국 나이", "십이지", "음력 변환", "양력 변환", "D-day", "100일", "200일", "무료 계산기"],
  openGraph: {
    title: "계산기 & 개발자 도구 모음 - 만 나이, 띠, 별자리, 디데이, 요일, 기념일, 근무일수, BMI, 예금/적금 이자, 대출 이자, 단위 변환, 음력/양력 변환, JSON 포매터",
    description: "만 나이, 띠, 별자리, 디데이, 요일, 기념일, 근무일수, BMI, 예금/적금 이자, 대출 이자, 단위 변환, 음력/양력 변환, JSON 포매터 등 모든 서비스 무료 제공",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          계산기 & 개발자 도구 모음
        </h1>

        {/* 계산기 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📊 계산기</h2>
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

        {/* 개발자 도구 섹션 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">💻 개발자 도구</h2>
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
          </div>
        </section>

        {/* 이용 방법 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">이용 방법</h2>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <span className="text-gray-700">위에서 원하는 계산기를 선택합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <span className="text-gray-700">계산하기 버튼을 클릭하면 즉시 결과를 확인할 수 있습니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <span className="text-gray-700">페이지 하단의 상세 정보를 통해 더 많은 내용을 알아보세요.</span>
            </li>
          </ol>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 회원가입이 필요한가요?</h3>
              <p className="text-gray-700">A. 아니요, 모든 계산기는 회원가입 없이 무료로 이용할 수 있습니다.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 입력한 정보가 저장되나요?</h3>
              <p className="text-gray-700">A. 아니요, 입력한 생년월일 정보는 서버에 저장되지 않으며 브라우저에서만 계산됩니다. 개인정보 보호를 최우선으로 합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
