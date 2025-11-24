import LunarCalculator from "./LunarCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "음력 날짜 계산기 - 양력을 음력으로 변환 | 한국 전통 명절 정보",
  description: "양력 날짜를 음력으로 간편하게 변환하세요. 음력 달력, 윤달 정보, 한국 전통 명절(설날, 추석, 대보름, 단오, 초파일) 날짜 확인이 가능합니다. 음력 생일 계산과 음력의 의미를 자세히 알아보세요. 무료 온라인 음력 변환기.",
  keywords: ["음력", "음력 계산기", "양력 음력 변환", "음력 달력", "윤달", "한국 명절", "설날", "추석", "음력 생일", "음력 변환", "전통 명절", "대보름"],
  openGraph: {
    title: "음력 날짜 계산기 - 양력을 음력으로 변환",
    description: "양력 날짜를 음력으로 변환하고 한국 전통 명절 정보 확인",
    type: "website",
  },
};

export default function LunarCalculatorPage() {
  return <LunarCalculator />;
}
