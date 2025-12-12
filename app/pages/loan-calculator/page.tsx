import { Metadata } from "next";
import LoanCalculator from "./LoanCalculator";

export const metadata: Metadata = {
  title: "대출 이자 계산기",
  description: "대출 원금, 이자율, 기간을 입력하여 원리금균등상환과 원금균등상환 방식의 이자와 상환 일정을 계산하는 계산기입니다. 월별 상환액과 총 이자를 확인하세요.",
};

export default function Page() {
  return <LoanCalculator />;
}
