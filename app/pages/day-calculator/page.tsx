import { Metadata } from "next";
import DayCalculator from "./DayCalculator";

export const metadata: Metadata = {
  title: "요일 계산기 - 특정 날짜의 요일 자동 계산 (생일, 기념일)",
  description:
    "특정 날짜의 요일을 자동 계산하는 무료 온라인 도구입니다. 생년월일, 결혼기념일, 역사적 사건의 요일 확인. 젤러의 공식(Zeller's Congruence) 기반 정확한 계산. 그레고리력 윤년 규칙 자동 반영. 주말/평일 구분, 일요일(빨강)/토요일(파랑) 색상 표시. 과거부터 미래까지 모든 날짜 지원. 프로젝트 일정 계획, 이벤트 날짜 선정에 활용.",
};

export default function Page() {
  return <DayCalculator />;
}
