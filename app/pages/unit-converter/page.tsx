import { Metadata } from "next";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title: "단위 변환 계산기",
  description:
    "길이, 무게, 부피, 온도 단위를 변환하는 계산기입니다. 미터, 인치, 파운드, 갤런 같은 국제 단위는 물론 금 1돈, 고기 1근, 쌀 1되처럼 한국 전통 단위(돈·냥·근·관·자·리·홉·되·말)도 변환하세요.",
};

export default function Page() {
  return <UnitConverter />;
}
