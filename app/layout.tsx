import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DrawerNavigation from "./components/DrawerNavigation";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "만 나이 계산기",
  description: "만 나이를 계산해주는 웹 애플리케이션입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <DrawerNavigation />
        {children}
      </body>
    </html>
  );
}
