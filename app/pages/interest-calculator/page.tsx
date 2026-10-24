import { Metadata } from "next";
import InterestCalculator from "./InterestCalculator";

export const metadata: Metadata = {
  title: "예금/적금 이자 계산기",
  description:
    "예금·적금 이자를 단리/월복리로 계산하고, 일반과세(15.4%)·비과세 등 과세 방식별 세후 수령액을 확인하세요. 같은 금리라도 적금 이자가 예금의 약 54%인 이유도 설명합니다.",
};

export default function Page() {
  return <InterestCalculator />;
}
