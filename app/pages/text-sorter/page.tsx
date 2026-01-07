import { Metadata } from "next";
import TextSorter from "./TextSorter";

export const metadata: Metadata = {
  title: "텍스트 정렬 도구 - 가나다순, ABC순, 길이순 자동 정렬",
  description: "텍스트를 다양한 방식으로 정렬하는 무료 온라인 도구입니다. 가나다순(한글), ABC순(영문), 역순, 길이순, 무작위 섞기 지원. localeCompare() 기반 유니코드 정확 정렬. 엑셀 대용, 명단 정리, 단어장 정렬, 코드 import 정리 등 활용. Quick Sort O(n log n) 알고리즘으로 빠른 처리.",
};

export default function Page() {
  return <TextSorter />;
}
