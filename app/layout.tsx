import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DrawerNavigation from "./components/DrawerNavigation";
import GoogleAdsense from "./components/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });


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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://all-in-one-k-calculator.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '계산기 모음',
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
