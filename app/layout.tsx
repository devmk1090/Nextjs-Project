import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import ToolStructuredData from "./components/ToolStructuredData";
import { adsenseClient, siteUrl } from "./site";

export const metadata: Metadata = {
  title: {
    default: "계산기 모음 - 만 나이, 띠, 별자리, 디데이, 요일, 기념일, 근무일수, 음력/양력 변환",
    template: "%s | 계산기 모음"
  },
  description: "만 나이 계산기, 띠 계산기, 별자리 계산기, 디데이 계산기, 요일 계산기, 기념일 계산기, 근무일수 계산기, 음력/양력 변환기를 무료로 제공합니다. 정확한 계산 결과와 상세한 정보를 확인하세요.",
  keywords: ["만 나이", "띠", "별자리", "디데이", "요일", "기념일", "근무일수", "연차", "음력", "양력", "계산기", "한국 나이", "십이지", "D-day", "100일", "200일"],
  authors: [{ name: "계산기 모음" }],
  creator: "계산기 모음",
  publisher: "계산기 모음",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '계산기 모음',
  },
  verification: {
    google: "pkAgU1RzZUArhIjwp16I3fscJHnWmedOOicnmIpTUFk",
  },
  // AdSense 사이트 소유권 확인용 메타 태그
  other: {
    "google-adsense-account": adsenseClient,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* AdSense 스크립트는 서버 HTML의 head에 바로 넣어 심사 크롤러가 볼 수 있게 함 */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ToolStructuredData />
        <Analytics />
      </body>
    </html>
  );
}
