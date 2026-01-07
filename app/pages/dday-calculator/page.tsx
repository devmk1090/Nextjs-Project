import { Metadata } from "next";
import DdayCalculator from "./DdayCalculator";

export const metadata: Metadata = {
  title: "디데이 계산기 - D-day 카운트다운, 남은 일수 계산",
  description:
    "특정 날짜까지 남은 일수를 계산하는 무료 디데이 계산기입니다. 수능, 결혼식, 전역일, 출산 예정일, 프로젝트 마감일까지 D-day 확인. 100일 전, 200일 전 등 기념일 자동 표시. 목표 설정 이론 기반 동기 부여 도구. 그레고리력 기준 정확한 날짜 계산, 윤년 자동 반영. 과거 날짜는 D+일수로 표시.",
};

export default function Page() {
  return <DdayCalculator />;
}
