import { Metadata } from "next";
import RandomName from "./RandomName";

export const metadata: Metadata = {
  title: "랜덤 이름 생성기",
  description: "한국 이름과 영어 이름을 무작위로 생성하는 도구입니다. 남/여 성별 선택 가능. 테스트 데이터, 캐릭터 이름, 가명 생성에 활용.",
};

export default function Page() {
  return <RandomName />;
}
