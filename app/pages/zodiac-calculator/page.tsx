import ZodiacCalculator from "./ZodiacCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "띠 계산기 - 연도별 띠 확인",
  description: "연도를 입력하면 해당 연도의 띠를 알려드립니다.",
};

export default function ZodiacCalculatorPage() {
  return <ZodiacCalculator />;
}
