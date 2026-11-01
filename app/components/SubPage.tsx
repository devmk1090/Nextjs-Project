import Link from "next/link";
import { breadcrumbJsonLd, Crumb, Faq, faqJsonLd } from "../lib/structuredData";
import JsonLd from "./JsonLd";

// 도구의 하위 페이지(출생 연도별 나이, 평수별 환산 등) 공통 레이아웃.
// 화면의 경로 표시와 BreadcrumbList / FAQPage 구조화 데이터를 함께 출력합니다.
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-8 px-4">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          ...(faqs && faqs.length > 0 ? [faqJsonLd(faqs)] : []),
        ]}
      />
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8 text-gray-700 leading-relaxed">
        <nav aria-label="현재 위치" className="text-sm text-gray-500 mb-4">
          {crumbs.map((crumb, index) => (
            <span key={crumb.path}>
              {index > 0 && <span className="mx-2">›</span>}
              {index < crumbs.length - 1 ? (
                <Link href={crumb.path} className="hover:text-blue-600">
                  {crumb.name}
                </Link>
              ) : (
                <span>{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{title}</h1>
        {lead && <p className="text-gray-600 mb-8">{lead}</p>}
        <div className="space-y-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mb-4">
          {children}
          {faqs && faqs.length > 0 && (
            <section>
              <h2>자주 묻는 질문</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-gray-800 mb-1">Q. {faq.question}</h3>
                    <p>A. {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
