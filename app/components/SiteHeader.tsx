import Link from "next/link";

// 모든 페이지 상단 헤더. 카테고리별 전체 도구 링크는 푸터에 있습니다.
export default function SiteHeader() {
  return (
    <header className="bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="w-8 h-8 rounded-[10px] bg-brand text-white flex items-center justify-center text-[15px] font-extrabold">
            올
          </span>
          <span className="text-lg font-extrabold tracking-tight">올인원 유틸리티</span>
        </Link>
        <nav aria-label="주요 메뉴" className="ml-auto flex gap-5 text-[15px] font-medium text-ink-3">
          <Link href="/" className="hover:text-ink">
            전체 도구
          </Link>
          <Link href="/about" className="hover:text-ink">
            사이트 소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
