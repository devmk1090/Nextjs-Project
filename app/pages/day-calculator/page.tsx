import { Metadata } from "next";
import DayCalculator from "./DayCalculator";

export const metadata: Metadata = {
  title: "요일 계산기 - 만 나이 계산기",
  description:
    "특정 날짜의 요일을 확인하는 요일 계산기입니다. 생년월일, 기념일의 요일을 쉽게 찾아보세요.",
};

export default function Page() {
  return <DayCalculator />;
}
