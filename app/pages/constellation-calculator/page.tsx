import ConstellationCalculator from "./ConstellationCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "별자리 계산기 - 생일별 별자리 확인",
  description: "생년월일을 입력하면 당신의 별자리를 알려드립니다.",
};

export default function ConstellationCalculatorPage() {
  return <ConstellationCalculator />;
}
