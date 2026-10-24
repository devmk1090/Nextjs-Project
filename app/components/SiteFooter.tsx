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

export default function SiteFooter() {
  const pathname = usePathname();

  // 도구 페이지라면 같은 카테고리의 다른 도구를 보여줌
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
    <footer className="bg-purple-100 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        {currentCategory && relatedTools.length > 0 && (
          <nav
            aria-label="관련 도구"
            className="bg-white rounded-lg shadow-xl p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {currentCategory.emoji} 다른 {currentCategory.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={toolPath(tool.slug)}
                  className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-gray-800">
                    {tool.emoji} {tool.name}
                  </span>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </nav>
        )}

        <nav
          aria-label="전체 도구"
          className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-purple-200 pt-8"
        >
          {categories.map((category) => (
            <div key={category.id}>
              <Link
                href={`/#${category.id}`}
                className="font-semibold text-gray-800 hover:text-blue-600"
              >
                {category.emoji} {category.name}
              </Link>
              <ul className="mt-2 space-y-1">
                {getToolsByCategory(category.id).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={toolPath(tool.slug)}
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-blue-600">
              사이트 소개
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 font-semibold">
              개인정보처리방침
            </Link>
          </div>
          <p>
            © {launchYear}-{new Date().getFullYear()} {siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
