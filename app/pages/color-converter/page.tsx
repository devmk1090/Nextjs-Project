import { Metadata } from "next";
import ColorConverter from "./ColorConverter";

export const metadata: Metadata = {
  title: "색상 변환기",
  description: "HEX, RGB, HSL 색상 형식을 상호 변환하는 도구입니다. 실시간 색상 미리보기, 슬라이더 조정, 복사 기능 제공. 웹 디자인, 개발에 유용.",
};

export default function Page() {
  return <ColorConverter />;
}
