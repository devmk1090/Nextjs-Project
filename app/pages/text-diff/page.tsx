import { Metadata } from "next";
import TextDiff from "./TextDiff";

export const metadata: Metadata = {
  title: "텍스트 비교 도구 - 두 텍스트 차이점 Diff 분석",
  description: "두 텍스트의 차이점을 시각적으로 비교하는 무료 온라인 도구입니다. 문자/단어/줄 단위 비교, LCS 알고리즘 기반 정확한 diff 분석. 추가(초록), 제거(빨강), 변경(노랑)을 색상으로 구분 표시. 문서 버전 비교, 계약서 개정 내역, 코드 리뷰, 번역 검수, 표절 검사에 활용. Git diff와 유사한 직관적 인터페이스.",
};

export default function Page() {
  return <TextDiff />;
}
