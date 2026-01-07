import { Metadata } from "next";
import DuplicateRemover from "./DuplicateRemover";

export const metadata: Metadata = {
  title: "중복 제거기 - 텍스트 중복 줄 자동 제거 도구",
  description: "텍스트에서 중복된 줄을 자동으로 제거하는 무료 온라인 도구입니다. 대소문자 구분 옵션, 원본/고유/제거 줄 수 통계 제공. Set 자료구조 기반 O(n) 고속 처리. 엑셀 데이터 정리, 이메일 목록 중복 제거, 코드 리뷰 등 다양한 활용 사례. 데이터는 브라우저에서만 처리되어 100% 안전합니다.",
};

export default function Page() {
  return <DuplicateRemover />;
}
