import SolarCalculator from "./SolarCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "양력 날짜 계산기 - 음력을 양력으로 변환 | 그레고리력 정보",
  description: "음력 날짜를 양력으로 간편하게 변환하세요. 양력(그레고리력)의 역사, 음력과의 차이점, 한국의 양력 도입 역사를 자세히 알아보세요. 공식 문서 작성, 국제 교류 시 필수인 양력 날짜 확인이 가능합니다. 무료 온라인 양력 변환기.",
  keywords: ["양력", "양력 계산기", "음력 양력 변환", "그레고리력", "Gregorian Calendar", "양력 달력", "한국 양력", "양력 음력 차이", "양력 변환", "공식 달력"],
  openGraph: {
    title: "양력 날짜 계산기 - 음력을 양력으로 변환",
    description: "음력 날짜를 양력으로 변환하고 양력과 음력의 차이점 확인",
    type: "website",
  },
};

export default function SolarCalculatorPage() {
  return <SolarCalculator />
}
