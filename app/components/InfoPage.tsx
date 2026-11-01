import Link from "next/link";

// 사이트 소개 / 개인정보처리방침 같은 정적 안내 페이지 공통 레이아웃
export default function InfoPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <nav aria-label="현재 위치" className="text-sm text-ink-4 mb-3 flex gap-2">
        <Link href="/" className="hover:text-ink">
          홈
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-ink-2">{title}</span>
      </nav>
      <h1 className="text-[32px] font-extrabold tracking-tight mb-6">{title}</h1>
      <article className="bg-white rounded-3xl p-6 sm:p-8 text-ink-2 leading-relaxed space-y-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-brand [&_a]:underline">
        {children}
      </article>
    </main>
  );
}
