import { Metadata } from "next";
import DdayCalculator from "./DdayCalculator";

export const metadata: Metadata = {
  title: "디데이 계산기 - 만 나이 계산기",
  description:
    "특정 날짜까지 남은 일수를 계산하는 디데이 계산기입니다. 수능, 결혼식, 제대일 등 중요한 날까지 D-day를 확인하세요.",
};

export default function Page() {
  return <DdayCalculator />;
}
