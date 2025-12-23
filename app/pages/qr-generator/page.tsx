import { Metadata } from "next";
import QrGenerator from "./QrGenerator";

export const metadata: Metadata = {
  title: "QR 코드 생성기",
  description: "텍스트나 URL을 QR 코드로 변환하는 도구입니다. 색상, 크기, 오류 정정 수준 조정 가능. URL, 이메일, 전화번호, Wi-Fi, 위치 정보 등 다양한 템플릿 제공. PNG 다운로드 지원.",
};

export default function Page() {
  return <QrGenerator />;
}
