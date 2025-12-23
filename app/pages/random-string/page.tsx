import { Metadata } from "next";
import RandomString from "./RandomString";

export const metadata: Metadata = {
  title: "랜덤 문자열 생성기",
  description: "안전한 비밀번호, UUID, Nano ID를 생성하는 도구입니다. 비밀번호 길이 및 문자 종류 조정 가능. 고유 식별자 생성 지원.",
};

export default function Page() {
  return <RandomString />;
}
