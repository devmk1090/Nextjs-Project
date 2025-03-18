import SolarCalculator from "./SolarCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "양력 날짜 계산기 - 음력을 양력으로",
  description: "음력 날짜를 입력하면 양력 날짜로 변환해드립니다.",
};

export default function SolarCalculatorPage() {
  return <SolarCalculator />
}
