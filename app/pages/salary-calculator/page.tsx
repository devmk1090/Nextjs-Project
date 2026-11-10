import { Metadata } from "next";
import SalaryCalculator from "./SalaryCalculator";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 (2026년) - 4대보험·소득세 공제 후 월급",
  description:
    "연봉을 넣으면 2026년 국민연금(4.75%)·건강보험·장기요양·고용보험과 국세청 근로소득 간이세액표 기준 소득세를 뺀 월 실수령액을 계산합니다. 연봉 2,000만원부터 1억 5,000만원까지 연봉별 실수령액 표도 확인하세요.",
};

export default function Page() {
  return <SalaryCalculator />;
}
