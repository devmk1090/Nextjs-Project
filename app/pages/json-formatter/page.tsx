import { Metadata } from "next";
import JsonFormatter from "./JsonFormatter";

export const metadata: Metadata = {
  title: "JSON 포매터/검증기 - JSON Formatter, Validator, Minify",
  description: "JSON 문법을 검사하고 예쁘게 포맷팅하는 무료 온라인 도구입니다. Pretty Print(2칸/4칸 들여쓰기), Minify(압축), 문법 오류 자동 검출. REST API 응답 디버깅, package.json 편집, 로그 파일 분석에 활용. JSON.parse/stringify 기반 정확한 파싱. 브라우저 내부 처리로 데이터 100% 안전. 개발자 필수 도구.",
};

export default function Page() {
  return <JsonFormatter />;
}
