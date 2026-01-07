import { Metadata } from "next";
import GradientGenerator from "./GradientGenerator";

export const metadata: Metadata = {
  title: "그라디언트 생성기 - CSS Linear, Radial Gradient 코드 자동 생성",
  description: "CSS 그라디언트 코드를 자동 생성하는 무료 온라인 도구입니다. Linear(선형), Radial(방사형) 그라디언트 지원. 시각적 색상 선택, 각도 조정(0~360도), HEX 코드 직접 입력. 6가지 트렌디한 프리셋(일몰, 바다, 숲). 웹사이트 배경, 버튼, 로고 디자인에 활용. 모던 웹 디자인 필수 도구. 원클릭 CSS 코드 복사.",
};

export default function Page() {
  return <GradientGenerator />;
}
