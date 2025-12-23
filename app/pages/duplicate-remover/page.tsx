import { Metadata } from "next";
import DuplicateRemover from "./DuplicateRemover";

export const metadata: Metadata = {
  title: "중복 제거기",
  description: "텍스트에서 중복된 줄을 제거하는 도구입니다. 대소문자 구분 옵션 제공. 원본 줄 수, 고유 줄 수, 제거된 중복 수 통계 제공.",
};

export default function Page() {
  return <DuplicateRemover />;
}
