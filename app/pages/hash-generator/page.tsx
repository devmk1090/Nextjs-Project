import { Metadata } from "next";
import HashGenerator from "./HashGenerator";

export const metadata: Metadata = {
  title: "해시 생성기",
  description: "SHA-1, SHA-256, SHA-384, SHA-512 해시를 생성하는 도구입니다. 텍스트의 해시 값을 실시간으로 계산하고 비교할 수 있습니다. 데이터 무결성 검증, 비밀번호 해싱에 활용하세요.",
};

export default function Page() {
  return <HashGenerator />;
}
