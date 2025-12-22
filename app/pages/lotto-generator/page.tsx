import { Metadata } from "next";
import LottoGenerator from "./LottoGenerator";

export const metadata: Metadata = {
  title: "로또 번호 생성기",
  description: "자동 로또 번호 추천 도구입니다. 1~45 중 6개 생성, 포함/제외 번호 설정, 즐겨찾기 기능. 행운의 번호를 찾아보세요!",
};

export default function Page() {
  return <LottoGenerator />;
}
