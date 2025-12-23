import { Metadata } from "next";
import ColorExtractor from "./ColorExtractor";

export const metadata: Metadata = {
  title: "색상 추출기",
  description: "이미지에서 주요 색상을 추출하는 도구입니다. 상위 10개 색상 자동 추출, HEX 코드 복사 기능. 로고, 사진에서 색상 팔레트 생성.",
};

export default function Page() {
  return <ColorExtractor />;
}
