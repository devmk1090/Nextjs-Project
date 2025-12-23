import { Metadata } from "next";
import CharCounter from "./CharCounter";

export const metadata: Metadata = {
  title: "글자 수 세기",
  description: "텍스트의 문자, 단어, 문장, 공백을 세는 도구입니다. 전체 문자 수, 공백 제외 문자 수, 단어 수, 문장 수, 단락 수, 예상 읽기 시간 제공.",
};

export default function Page() {
  return <CharCounter />;
}
