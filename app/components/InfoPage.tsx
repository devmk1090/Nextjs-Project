import Link from "next/link";

// 사이트 소개 / 개인정보처리방침 / 문의하기 같은 정적 안내 페이지 공통 레이아웃
export default function InfoPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-10 text-gray-700 leading-relaxed">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">
            홈
          </Link>
          <span className="mx-2">›</span>
          <span>{title}</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{title}</h1>
        <div className="space-y-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a]:underline">
          {children}
        </div>
      </article>
    </div>
  );
}
