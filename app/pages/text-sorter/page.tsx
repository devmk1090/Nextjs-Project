import { Metadata } from "next";
import TextSorter from "./TextSorter";

export const metadata: Metadata = {
  title: "텍스트 정렬 도구",
  description: "텍스트를 다양한 방식으로 정렬하는 도구입니다. 가나다순, ABC순, 역순, 길이순, 무작위 섞기 지원. 한글과 영문 모두 지원.",
};

export default function Page() {
  return <TextSorter />;
}
