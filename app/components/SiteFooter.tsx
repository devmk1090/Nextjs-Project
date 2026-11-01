"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  categories,
  getToolBySlug,
  getToolsByCategory,
  toolPath,
} from "../tools";
import { launchYear, siteName } from "../site";
import Icon from "./Icon";

export default function SiteFooter() {
  const pathname = usePathname();

  // 도구 페이지(하위 페이지 포함)라면 같은 카테고리의 다른 도구를 보여줌
  const currentSlug = pathname.match(/^\/pages\/([^/]+)/)?.[1];
  const currentTool = currentSlug ? getToolBySlug(currentSlug) : undefined;
  const relatedTools = currentTool
    ? getToolsByCategory(currentTool.category).filter(
        (tool) => tool.slug !== currentTool.slug
      )
    : [];
  const currentCategory = categories.find(
    (category) => category.id === currentTool?.category
  );

  return (
    <footer>
      {currentCategory && relatedTools.length > 0 && (
        <nav aria-label="관련 도구" className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white rounded-3xl py-3">
            <h2 className="text-xl font-extrabold px-6 sm:px-7 pt-4 pb-2">
              다른 {currentCategory.name}
            </h2>
            <ul>
              {relatedTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={toolPath(tool.slug)}
                    className="flex items-center gap-3.5 px-6 sm:px-7 py-3.5 text-ink hover:bg-canvas"
                  >
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
                      <Icon name={tool.icon} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold">{tool.name}</span>
                      <span className="block text-sm text-ink-4 truncate">{tool.description}</span>
                    </span>
                    <Icon name="chevronRight" className="w-5 h-5 text-ink-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <div className="bg-white border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <nav
            aria-label="전체 도구"
            className="grid grid-cols-2 md:grid-cols-5 gap-8"
          >
            {categories.map((category) => (
              <div key={category.id}>
                {/* 홈에서도 hashchange가 발생하도록 일반 a 태그 사용 */}
                <a
                  href={`/#${category.id}`}
                  className="font-bold text-ink hover:text-brand"
                >
                  {category.name}
                </a>
                <ul className="mt-3 space-y-2">
                  {getToolsByCategory(category.id).map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={toolPath(tool.slug)}
                        className="text-sm text-ink-3 hover:text-brand"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-4">
            <div className="flex gap-5">
              <span className="font-bold text-ink-2">{siteName}</span>
              <Link href="/about" className="hover:text-ink">
                사이트 소개
              </Link>
              <Link href="/privacy" className="font-bold text-ink-2 hover:text-ink">
                개인정보처리방침
              </Link>
            </div>
            <p>
              © {launchYear}-{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
