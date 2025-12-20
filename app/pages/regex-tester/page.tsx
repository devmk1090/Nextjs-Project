import { Metadata } from "next";
import RegexTester from "./RegexTester";

export const metadata: Metadata = {
  title: "정규식 테스터",
  description: "정규표현식(Regex)을 테스트하고 검증하는 도구입니다. 실시간 매칭 결과, 하이라이트, 캡처 그룹 확인. 정규식 치트시트 제공.",
};

export default function Page() {
  return <RegexTester />;
}
