import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "계산기 모음",
  description: "",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
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
      </div>
    </div>
  );
}
