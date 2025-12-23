import { Metadata } from "next";
import RandomNumber from "./RandomNumber";

export const metadata: Metadata = {
  title: "랜덤 숫자 생성기",
  description: "범위 내 난수 생성 도구입니다. 최솟값/최댓값 설정, 중복 허용/불가 선택, 여러 개 생성 지원. 추첨, 게임, 무작위 선택에 활용.",
};

export default function Page() {
  return <RandomNumber />;
}
