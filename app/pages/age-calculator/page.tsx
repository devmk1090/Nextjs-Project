import AgeCalculator from "./AgeCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "만 나이 계산기 - 정확한 만 나이 계산",
  description: "생년월일을 입력하면 정확한 만 나이를 계산해드립니다.",
};

export default function AgeCalculatorPage() {
  return <AgeCalculator />;
}
