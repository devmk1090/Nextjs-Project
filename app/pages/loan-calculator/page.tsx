import { Metadata } from "next";
import LoanCalculator from "./LoanCalculator";

export const metadata: Metadata = {
  title: "대출 이자 계산기 - 주택담보대출(주담대)·신용대출 월 상환액",
  description: "주택담보대출(주담대), 전세자금대출, 신용대출의 대출 금액·금리·기간을 넣으면 원리금균등·원금균등·만기일시상환 방식별 월 상환액과 총 이자, 월별 상환 일정표를 계산합니다. 3억 원 30년과 40년 주담대 이자 비교 예시도 확인하세요.",
};

export default function Page() {
  return <LoanCalculator />;
}
