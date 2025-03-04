import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          메뉴
        </h1>
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
          </ul>
        </nav>
      </div>
    </div>
  );
}
