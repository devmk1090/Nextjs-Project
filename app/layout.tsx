import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DrawerNavigation from "./components/DrawerNavigation";
import GoogleAdsense from "./components/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: "날짜 계산기 - 만 나이, 띠, 별자리, 음력/양력 변환",
    template: "%s | 날짜 계산기"
  },
  description: "만 나이 계산기, 띠 계산기, 별자리 계산기, 음력/양력 변환기를 무료로 제공합니다. 정확한 계산 결과와 상세한 정보를 확인하세요.",
  keywords: ["만 나이", "띠", "별자리", "음력", "양력", "계산기", "한국 나이", "십이지", "날짜 변환"],
  authors: [{ name: "날짜 계산기" }],
  creator: "날짜 계산기",
  publisher: "날짜 계산기",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '날짜 계산기',
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
      <body className={inter.className}>
        <GoogleAdsense />
        <DrawerNavigation />
        {children}
      </body>
    </html>
  );
}
