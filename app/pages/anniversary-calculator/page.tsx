import { Metadata } from "next";
import AnniversaryCalculator from "./AnniversaryCalculator";

export const metadata: Metadata = {
  title: "기념일 계산기",
  description:
    "시작일로부터 100일, 200일, 1년 등 주요 기념일을 계산하는 기념일 계산기입니다. 연애, 결혼, 출생 기념일을 쉽게 확인하세요.",
};

export default function Page() {
  return <AnniversaryCalculator />;
}
