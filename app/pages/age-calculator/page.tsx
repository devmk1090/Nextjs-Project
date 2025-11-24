import AgeCalculator from "./AgeCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "만 나이 계산기 - 정확한 한국 나이 계산 | 2023년 만 나이 통일법",
  description: "생년월일을 입력하여 정확한 만 나이를 계산하세요. 한국 나이 계산법(만 나이, 세는 나이, 연 나이)의 차이점과 2023년 만 나이 통일법에 대해 자세히 알아보세요. 무료 온라인 만 나이 계산기.",
  keywords: ["만 나이", "나이 계산기", "한국 나이", "세는 나이", "연 나이", "만 나이 통일법", "2023년 나이 계산", "생년월일 계산"],
  openGraph: {
    title: "만 나이 계산기 - 정확한 한국 나이 계산",
    description: "생년월일로 정확한 만 나이를 계산하는 무료 온라인 도구. 한국 나이 체계 완벽 설명",
    type: "website",
  },
};

export default function AgeCalculatorPage() {
  return <AgeCalculator />;
}
