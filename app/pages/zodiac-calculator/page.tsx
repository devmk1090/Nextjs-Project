import ZodiacCalculator from "./ZodiacCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "띠 계산기 - 십이지 동물띠 확인 | 띠별 성격과 궁합",
  description: "태어난 연도로 십이지 띠를 확인하세요. 12가지 띠(쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지)의 성격, 특징, 궁합 정보를 제공합니다. 무료 온라인 띠 계산기.",
  keywords: ["띠", "띠 계산기", "십이지", "동물띠", "띠 궁합", "본띠해", "띠별 성격", "십이지 동물", "띠 의미", "한국 띠"],
  openGraph: {
    title: "띠 계산기 - 십이지 동물띠 성격과 궁합",
    description: "연도별 띠 확인과 12가지 띠의 성격, 특징, 궁합 정보",
    type: "website",
  },
};

export default function ZodiacCalculatorPage() {
  return <ZodiacCalculator />;
}
