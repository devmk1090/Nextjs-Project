import LunarCalculator from "./LunarCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "음력 날짜 계산기 - 양력을 음력으로",
  description: "양력 날짜를 입력하면 음력 날짜로 변환해드립니다.",
};

export default function LunarCalculatorPage() {
  return <LunarCalculator />;
}
