"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./components/Icon";
import { CategoryId, Tool, categories, getToolsByCategory, toolPath, tools } from "./tools";

// 검색창 아래 바로가기 (tools.ts의 slug)
const popularSlugs = [
  "age-calculator",
  "loan-calculator",
  "pyeong-calculator",
  "char-counter",
  "work-period-calculator",
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={toolPath(tool.slug)}
      className="flex flex-col gap-3.5 bg-white rounded-[20px] p-5 sm:p-6 text-ink hover:ring-2 hover:ring-brand/30 transition"
    >
      <span className="w-11 h-11 rounded-[14px] bg-brand-soft text-brand flex items-center justify-center">
        <Icon name={tool.icon} className="w-[22px] h-[22px]" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-[17px] font-bold">{tool.name}</span>
        <span className="text-sm text-ink-4 leading-relaxed line-clamp-2">{tool.description}</span>
      </span>
    </Link>
  );
}

export default function HomeContent() {
  const [activeTab, setActiveTab] = useState<CategoryId>("calculator");
  const [query, setQuery] = useState("");

  // URL 해시(/#developer)로 탭 전환
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const category = categories.find((c) => c.id === hash);
      if (category) setActiveTab(category.id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const selectTab = (id: CategoryId) => {
    setActiveTab(id);
    history.replaceState(null, "", `#${id}`);
  };

  const keyword = query.trim().toLowerCase();
  const searchResults = keyword
    ? tools.filter((tool) =>
        `${tool.name} ${tool.description}`.toLowerCase().includes(keyword)
      )
    : [];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 flex flex-col gap-10">
      <section className="flex flex-col items-center gap-5 text-center">
        <h1 className="text-3xl sm:text-[40px] leading-tight font-extrabold tracking-tight">
          필요한 계산, 바로 여기서
        </h1>
        <p className="text-base sm:text-[17px] text-ink-3">
          나이, 대출 이자, 평수부터 개발자 도구까지 {tools.length}가지 무료 도구
        </p>
        <label className="w-full max-w-2xl flex items-center gap-3 bg-white border border-[#D1D6DB] rounded-2xl px-5 h-14 sm:h-[60px] focus-within:border-brand">
          <Icon name="search" className="w-[22px] h-[22px] text-ink-4" />
          <span className="sr-only">도구 검색</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="어떤 도구를 찾으세요? 예: 나이, 평수, JSON"
            className="flex-1 min-w-0 bg-transparent outline-none text-base sm:text-[17px] placeholder:text-ink-4"
          />
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          {popularSlugs.map((slug) => {
            const tool = tools.find((t) => t.slug === slug);
            if (!tool) return null;
            return (
              <Link
                key={slug}
                href={toolPath(slug)}
                className="px-3.5 py-2 rounded-full bg-white border border-line text-ink-2 text-sm font-medium hover:border-brand hover:text-brand"
              >
                {tool.name}
              </Link>
            );
          })}
        </div>
      </section>

      {keyword && (
        <section aria-label="검색 결과" className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">
            &apos;{query.trim()}&apos; 검색 결과 {searchResults.length}개
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
              {searchResults.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="bg-white rounded-[20px] p-6 text-ink-3">
              일치하는 도구가 없습니다. 다른 단어로 검색하거나 아래 카테고리에서 찾아보세요.
            </p>
          )}
        </section>
      )}

      <section className="flex flex-col gap-5">
        <div role="tablist" aria-label="카테고리" className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = activeTab === category.id;
            return (
              <button
                key={category.id}
                id={category.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${category.id}`}
                onClick={() => selectTab(category.id)}
                className={`h-11 px-[18px] rounded-xl text-[15px] font-bold transition ${
                  selected
                    ? "bg-brand text-white"
                    : "bg-white border border-line text-ink-2 hover:border-brand"
                }`}
              >
                {category.name}{" "}
                <span className="font-medium opacity-70">
                  {getToolsByCategory(category.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 크롤러가 모든 링크를 볼 수 있도록 전부 렌더링하고 비활성 탭은 숨김 */}
        {categories.map((category) => (
          <div
            key={category.id}
            id={`panel-${category.id}`}
            role="tabpanel"
            aria-label={category.name}
            className={activeTab === category.id ? "grid gap-3 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]" : "hidden"}
          >
            {getToolsByCategory(category.id).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-tight">한눈에 보는 표</h2>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <Link
            href={`${toolPath("age-calculator")}#birth-years`}
            className="bg-white rounded-[20px] p-7 flex flex-col gap-3 text-ink hover:ring-2 hover:ring-brand/30 transition"
          >
            <span className="text-[13px] font-bold text-brand">출생 연도별</span>
            <span className="text-xl font-extrabold">연도별 나이·띠 표</span>
            <span className="text-[15px] text-ink-3 leading-relaxed">
              만 나이와 띠, 설날 기준 1·2월생 띠, 입학 연도와 국민연금 수령 나이를 출생 연도별로
              정리했습니다.
            </span>
          </Link>
          <Link
            href={`${toolPath("pyeong-calculator")}#areas`}
            className="bg-white rounded-[20px] p-7 flex flex-col gap-3 text-ink hover:ring-2 hover:ring-brand/30 transition"
          >
            <span className="text-[13px] font-bold text-brand">평수·면적별</span>
            <span className="text-xl font-extrabold">자주 찾는 평수 환산표</span>
            <span className="text-[15px] text-ink-3 leading-relaxed">
              아파트 평형의 전용면적, 전용 84m²가 몇 평형인지, 국민주택규모 해당 여부를
              정리했습니다.
            </span>
          </Link>
        </div>
      </section>

      <section className="grid gap-3 grid-cols-1 md:grid-cols-2">
        <div className="bg-white rounded-[20px] p-7">
          <h2 className="text-lg font-extrabold mb-4">이용 방법</h2>
          <ol className="space-y-3 text-ink-2">
            {[
              "검색하거나 카테고리 탭에서 원하는 도구를 고릅니다.",
              "필요한 값을 입력하면 바로 결과가 나옵니다.",
              "도구 페이지 아래의 설명과 자주 묻는 질문에서 계산 기준을 확인하세요.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="w-6 h-6 shrink-0 rounded-full bg-brand-soft text-brand text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-white rounded-[20px] p-7">
          <h2 className="text-lg font-extrabold mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-1">회원가입이 필요한가요?</h3>
              <p className="text-ink-3">아니요. 모든 도구는 회원가입 없이 무료로 이용할 수 있습니다.</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">입력한 정보가 저장되나요?</h3>
              <p className="text-ink-3">
                아니요. 입력한 정보는 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
