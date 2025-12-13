import { Metadata } from "next";
import WorkPeriodCalculator from "./WorkPeriodCalculator";

export const metadata: Metadata = {
  title: "근무일수 계산기",
  description:
    "입사일 기준으로 근무 일수, 재직 기간, 연차 개수, 예상 퇴직금을 계산하는 근무일수 계산기입니다. 직장인을 위한 필수 도구입니다.",
};

export default function Page() {
  return <WorkPeriodCalculator />;
}
