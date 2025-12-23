import { Metadata } from "next";
import DiceCoin from "./DiceCoin";

export const metadata: Metadata = {
  title: "주사위/동전 던지기",
  description: "주사위 굴리기와 동전 던지기 시뮬레이터입니다. 4~100면 주사위 지원, 여러 개 동시 실행, 히스토리 및 통계 제공. 게임, 확률 실험에 활용.",
};

export default function Page() {
  return <DiceCoin />;
}
