import { Metadata } from "next";
import ColorExtractor from "./ColorExtractor";

export const metadata: Metadata = {
  title: "색상 추출기 - 이미지에서 HEX 색상 코드 자동 추출",
  description: "이미지에서 주요 색상을 자동 추출하는 무료 온라인 도구입니다. 상위 10개 색상 분석, HEX 코드 원클릭 복사. Canvas API 기반 RGB 분석. 웹 디자인 색상 팔레트 생성, 경쟁사 사이트 벤치마킹, 브랜드 컬러 분석, 인테리어 컬러 매칭에 활용. PNG, JPG, WebP 등 모든 이미지 형식 지원.",
};

export default function Page() {
  return <ColorExtractor />;
}
