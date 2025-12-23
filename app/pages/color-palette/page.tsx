import { Metadata } from "next";
import ColorPalette from "./ColorPalette";

export const metadata: Metadata = {
  title: "컬러 팔레트 생성기",
  description: "조화로운 색상 조합을 추천하는 도구입니다. 단색, 유사, 보색, 삼각, 사각 조화 팔레트 자동 생성. 웹 디자인, 그래픽 작업에 유용.",
};

export default function Page() {
  return <ColorPalette />;
}
