import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DrawerNavigation from "./components/DrawerNavigation";
import GoogleAdsense from "./components/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "만 나이 계산기",
  description: "만 나이, 띠, 별자리 등 다양한 계산기를 제공합니다",
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
