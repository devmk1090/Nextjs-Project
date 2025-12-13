import { Metadata } from "next";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title: "단위 변환 계산기",
  description:
    "길이, 무게, 부피, 온도 단위를 변환하는 계산기입니다. 미터, 킬로그램, 리터, 섭씨 등 다양한 단위를 쉽게 변환하세요.",
};

export default function Page() {
  return <UnitConverter />;
}
