import { Metadata } from "next";
import Base64Converter from "./Base64Converter";

export const metadata: Metadata = {
  title: "Base64 인코더/디코더",
  description: "텍스트를 Base64로 인코딩하거나 Base64를 텍스트로 디코딩하는 도구입니다. 한글 UTF-8 지원, 복사 기능 제공. 개발자를 위한 필수 Base64 변환 도구.",
};

export default function Page() {
  return <Base64Converter />;
}
