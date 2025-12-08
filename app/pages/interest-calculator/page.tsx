import { Metadata } from "next";
import InterestCalculator from "./InterestCalculator";

export const metadata: Metadata = {
  title: "예금/적금 이자 계산기",
  description:
    "예금과 적금의 이자를 계산하는 이자 계산기입니다. 세전/세후 금액을 확인하고 이자소득세까지 자동 계산합니다.",
};

export default function Page() {
  return <InterestCalculator />;
}
