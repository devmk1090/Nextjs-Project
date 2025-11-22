import ConstellationCalculator from "./ConstellationCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "별자리 계산기 - 12 별자리 확인 | 황도12궁 성격과 궁합",
  description: "생일로 나의 별자리를 확인하세요. 12 별자리(양자리, 황소자리, 쌍둥이자리, 게자리, 사자자리, 처녀자리, 천칭자리, 전갈자리, 사수자리, 염소자리, 물병자리, 물고기자리)의 성격, 특징, 4원소, 궁합 정보를 제공합니다. 무료 온라인 별자리 계산기.",
  keywords: ["별자리", "별자리 계산기", "황도12궁", "12별자리", "별자리 성격", "별자리 궁합", "조디악", "zodiac", "4원소", "별자리 의미"],
  openGraph: {
    title: "별자리 계산기 - 12 별자리 성격과 궁합",
    description: "생일로 별자리 확인과 12 별자리의 성격, 특징, 4원소, 궁합 정보",
    type: "website",
  },
};

export default function ConstellationCalculatorPage() {
  return <ConstellationCalculator />;
}
