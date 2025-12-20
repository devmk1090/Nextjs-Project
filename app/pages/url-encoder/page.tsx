import { Metadata } from "next";
import UrlEncoder from "./UrlEncoder";

export const metadata: Metadata = {
  title: "URL 인코더/디코더",
  description: "텍스트를 URL 인코딩하거나 URL 인코딩된 문자열을 디코딩하는 도구입니다. 한글, 특수문자, 공백을 안전하게 URL에 포함시킬 수 있습니다. 퍼센트 인코딩 지원.",
};

export default function Page() {
  return <UrlEncoder />;
}
