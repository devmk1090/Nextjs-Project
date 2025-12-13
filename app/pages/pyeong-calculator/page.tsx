import { Metadata } from "next";
import PyeongCalculator from "./PyeongCalculator";

export const metadata: Metadata = {
  title: "평형/평수 계산기",
  description:
    "평형(평)과 제곱미터(m²)를 변환하는 계산기입니다. 아파트 면적 계산, 부동산 평수 확인에 유용합니다.",
};

export default function Page() {
  return <PyeongCalculator />;
}
