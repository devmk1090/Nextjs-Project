import { Metadata } from "next";
import PyeongCalculator from "./PyeongCalculator";

export const metadata: Metadata = {
  title: "평형/평수 계산기",
  description:
    "평과 제곱미터(m²)를 변환하고, 아파트 전용면적으로 공급면적 평형을 계산합니다. 전용 84m²가 왜 34평형인지, 전용면적·공급면적·계약면적의 차이와 주요 면적별 평형표를 확인하세요.",
};

export default function Page() {
  return <PyeongCalculator />;
}
