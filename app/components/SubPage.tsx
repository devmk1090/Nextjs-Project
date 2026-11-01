import Link from "next/link";
import { breadcrumbJsonLd, Crumb, Faq, faqJsonLd } from "../lib/structuredData";
import JsonLd from "./JsonLd";

// 도구의 하위 페이지(출생 연도별 나이, 평수별 환산 등) 공통 레이아웃.
// 화면의 경로 표시와 BreadcrumbList / FAQPage 구조화 데이터를 함께 출력합니다.
// children은 흰 카드(<section className={subPageCard}>)들로 구성합니다.
export const subPageCard =
  "bg-white rounded-3xl p-6 sm:p-7 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h2]:mb-4";

export default function SubPage({
  crumbs,
  title,
  lead,
  faqs,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: React.ReactNode;
  faqs?: Faq[];
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-ink-2 leading-relaxed">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          ...(faqs && faqs.length > 0 ? [faqJsonLd(faqs)] : []),
        ]}
      />
      <nav aria-label="현재 위치" className="text-sm text-ink-4 mb-3 flex flex-wrap gap-2">
        {crumbs.map((crumb, index) => (
          <span key={crumb.path} className="flex gap-2">
            {index > 0 && <span aria-hidden="true">›</span>}
            {index < crumbs.length - 1 ? (
              <Link href={crumb.path} className="hover:text-ink">
                {crumb.name}
              </Link>
            ) : (
              <span className="text-ink-2">{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>
      <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink mb-2">{title}</h1>
      {lead && <p className="text-ink-3 mb-6">{lead}</p>}
      <div className="flex flex-col gap-4">
        {children}
        {faqs && faqs.length > 0 && (
          <section className={subPageCard}>
            <h2>자주 묻는 질문</h2>
            <div className="divide-y divide-canvas">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="font-bold text-ink mb-1.5">{faq.question}</h3>
                  <p className="text-ink-3">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
