import { Metadata } from "next";
import BmiCalculator from "./BmiCalculator";

export const metadata: Metadata = {
  title: "BMI 계산기",
  description:
    "키와 몸무게로 체질량지수(BMI)와 표준체중을 계산합니다. 대한비만학회 2022 기준(비만 전단계, 1·2·3단계 비만)으로 분류하고, 한국 기준이 WHO 국제 기준보다 낮은 이유와 복부비만 허리둘레 기준도 알려드립니다.",
};

export default function Page() {
  return <BmiCalculator />;
}
