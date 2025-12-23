import { Metadata } from "next";
import JsonFormatter from "./JsonFormatter";

export const metadata: Metadata = {
  title: "JSON 포매터/검증기",
  description: "JSON 문법을 검사하고 예쁘게 포맷팅하는 도구입니다. 들여쓰기 조정, 축소(minify), 복사 기능을 제공합니다. 개발자를 위한 필수 JSON 도구.",
};

export default function Page() {
  return <JsonFormatter />;
}
