"use client";

import { usePathname } from "next/navigation";
import { getToolBySlug, toolPath } from "../tools";
import { siteAlternateNames, siteName, siteUrl } from "../site";
import { breadcrumbJsonLd, webApplicationJsonLd } from "../lib/structuredData";
import JsonLd from "./JsonLd";

// 홈과 도구 페이지(/pages/<slug>)의 구조화 데이터. 도구 목록은 tools.ts에서 가져옵니다.
// 하위 페이지(/pages/<slug>/<...>)는 각 페이지가 직접 출력합니다.
export default function ToolStructuredData() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          alternateName: siteAlternateNames,
          url: siteUrl,
          inLanguage: "ko-KR",
        }}
      />
    );
  }

  const slug = pathname.match(/^\/pages\/([^/]+)\/?$/)?.[1];
  const tool = slug ? getToolBySlug(slug) : undefined;
  if (!tool) return null;

  // 카테고리는 /#<id> 해시 주소라 홈과 같은 URL이므로 경로에서 뺍니다.
  return (
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: tool.name, path: toolPath(tool.slug) },
        ]),
        webApplicationJsonLd({
          name: tool.name,
          description: tool.description,
          path: toolPath(tool.slug),
        }),
      ]}
    />
  );
}
