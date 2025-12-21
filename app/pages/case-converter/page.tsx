import { Metadata } from "next";
import CaseConverter from "./CaseConverter";

export const metadata: Metadata = {
  title: "케이스 변환기",
  description: "텍스트를 다양한 케이스로 변환하는 도구입니다. 대문자, 소문자, 카멜케이스, 파스칼케이스, 스네이크케이스, 케밥케이스, 타이틀케이스 지원.",
};

export default function Page() {
  return <CaseConverter />;
}
