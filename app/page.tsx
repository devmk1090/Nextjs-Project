import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한국 날짜 계산기 모음 - 만 나이, 띠, 별자리, 음력/양력 변환",
  description: "만 나이 계산기, 띠 계산기, 별자리 계산기, 음력/양력 변환기를 한 곳에서 무료로 이용하세요. 2023년 만 나이 통일법 적용, 십이지 띠 궁합, 12 별자리 정보, 한국 전통 명절 음력 날짜 확인까지 모든 날짜 계산 서비스를 제공합니다.",
  keywords: ["만 나이 계산기", "띠 계산기", "별자리 계산기", "음력 계산기", "양력 계산기", "날짜 계산기", "한국 나이", "십이지", "음력 변환", "양력 변환", "무료 계산기"],
  openGraph: {
    title: "한국 날짜 계산기 모음 - 만 나이, 띠, 별자리, 음력/양력 변환",
    description: "만 나이, 띠, 별자리, 음력/양력 변환 등 모든 날짜 계산 서비스 무료 제공",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          한국 날짜 계산기 모음
        </h1>

        <p className="text-gray-700 text-center mb-8 leading-relaxed">
          만 나이, 띠, 별자리부터 음력/양력 변환까지 다양한 날짜 계산기를 무료로 이용하세요.
          생년월일만 입력하면 정확한 결과를 바로 확인할 수 있습니다.
        </p>

        <nav>
          <ul className="space-y-3">
            <li>
              <Link
                href="/pages/age-calculator"
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 rounded-md text-center text-lg transition-colors"
              >
                만 나이 계산기
              </Link>
            </li>
            <li>
              <Link
                href="/pages/zodiac-calculator"
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 rounded-md text-center text-lg transition-colors"
              >
                띠 계산기
              </Link>
            </li>
            <li>
              <Link
                href="/pages/constellation-calculator"
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 rounded-md text-center text-lg transition-colors"
              >
                별자리 계산기
              </Link>
            </li>
            <li>
              <Link
                href="/pages/lunar-calculator"
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 rounded-md text-center text-lg transition-colors"
              >
                음력 생일 계산기
              </Link>
            </li>
            <li>
              <Link
                href="/pages/solar-calculator"
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 rounded-md text-center text-lg transition-colors"
              >
                양력 변환 계산기
              </Link>
            </li>
          </ul>
        </nav>

        {/* 서비스 소개 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">서비스 소개</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            한국 날짜 계산기는 한국인의 일상생활에 필요한 다양한 날짜 관련 계산 도구를 제공합니다.
            2023년부터 시행된 만 나이 통일법에 따른 정확한 만 나이 계산부터, 전통적으로 중요시되는 띠와 별자리 정보,
            그리고 한국 전통 명절에 필수적인 음력/양력 변환까지 모든 기능을 한 곳에서 편리하게 이용할 수 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            복잡한 계산 없이 생년월일만 입력하면 즉시 정확한 결과를 확인할 수 있으며,
            각 계산기마다 상세한 설명과 함께 관련 정보를 제공하여 더 깊이 있는 이해를 도와드립니다.
          </p>
        </div>

        {/* 주요 기능 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">📅 만 나이 계산기</h3>
              <p className="text-sm text-gray-700">
                2023년 만 나이 통일법에 따른 정확한 만 나이를 계산합니다. 한국 나이, 세는 나이와의 차이점도 자세히 설명합니다.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🐉 띠 계산기</h3>
              <p className="text-sm text-gray-700">
                12가지 십이지 띠를 확인하고, 각 띠의 성격과 특징, 띠별 궁합 정보를 제공합니다.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">⭐ 별자리 계산기</h3>
              <p className="text-sm text-gray-700">
                12 별자리를 확인하고 각 별자리의 기간, 4원소(불/흙/공기/물), 성격 특징과 궁합을 알아봅니다.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">🌙 음력/양력 변환</h3>
              <p className="text-sm text-gray-700">
                양력을 음력으로, 음력을 양력으로 간편하게 변환합니다. 전통 명절 날짜 확인과 음력 생일 계산에 유용합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 이용 방법 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">이용 방법</h2>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <span className="text-gray-700">위 메뉴에서 원하는 계산기를 선택합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <span className="text-gray-700">생년월일 또는 날짜를 입력합니다. (년/월/일 형식)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <span className="text-gray-700">계산하기 버튼을 클릭하면 즉시 결과를 확인할 수 있습니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">4.</span>
              <span className="text-gray-700">페이지 하단의 상세 정보를 통해 더 많은 내용을 알아보세요.</span>
            </li>
          </ol>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 계산 결과가 정확한가요?</h3>
              <p className="text-gray-700">A. 네, 모든 계산기는 공인된 알고리즘을 사용하여 정확한 결과를 제공합니다. 만 나이는 2023년 시행된 법령에 따르며, 음력/양력 변환은 1900년부터 2100년까지 정확하게 지원합니다.</p>
            </div>
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
