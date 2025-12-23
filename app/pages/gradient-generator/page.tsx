import { Metadata } from "next";
import GradientGenerator from "./GradientGenerator";

export const metadata: Metadata = {
  title: "그라디언트 생성기",
  description: "CSS 그라디언트 코드를 생성하는 도구입니다. 선형, 방사형 그라디언트 지원. 색상, 각도 조정 가능. 프리셋 제공.",
};

export default function Page() {
  return <GradientGenerator />;
}
