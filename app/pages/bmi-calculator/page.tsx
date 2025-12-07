import { Metadata } from "next";
import BmiCalculator from "./BmiCalculator";

export const metadata: Metadata = {
  title: "BMI 계산기",
  description:
    "체질량지수(BMI)와 표준체중을 계산하는 BMI 계산기입니다. 건강한 체중 관리를 위한 필수 도구입니다.",
};

export default function Page() {
  return <BmiCalculator />;
}
