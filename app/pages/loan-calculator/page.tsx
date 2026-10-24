import { Metadata } from "next";
import LoanCalculator from "./LoanCalculator";

export const metadata: Metadata = {
  title: "대출 이자 계산기",
  description: "대출 원금, 이자율, 기간을 입력하면 원리금균등상환·원금균등상환·만기일시상환 방식별 월 상환액, 총 이자, 월별 상환 일정표를 계산합니다. 세 가지 상환 방식의 총 이자 차이를 한눈에 비교하세요.",
};

export default function Page() {
  return <LoanCalculator />;
}
