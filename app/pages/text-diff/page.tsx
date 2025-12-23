import { Metadata } from "next";
import TextDiff from "./TextDiff";

export const metadata: Metadata = {
  title: "텍스트 비교",
  description: "두 텍스트의 차이점을 비교하고 하이라이트하는 도구입니다. 문자, 단어, 줄 단위 비교 지원. 추가/제거/변경 부분을 색상으로 구분하여 표시.",
};

export default function Page() {
  return <TextDiff />;
}
