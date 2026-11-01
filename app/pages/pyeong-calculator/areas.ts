import { toolPath } from "../../tools";

// 평수별·면적별 환산 페이지(/pages/pyeong-calculator/<slug>)의 목록과 계산.
// 검색이 많은 아파트 평형과 대표 전용면적만 페이지로 만듭니다.

// 1평 = 400/121 m² (약 3.3058 m²)
export const M2_PER_PYEONG = 400 / 121;
export const SQFT_PER_M2 = 10.7639;
// 국민주택규모: 주거전용면적 85m² 이하(주택법)
export const NATIONAL_HOUSING_M2 = 85;
// 아파트 전용률의 일반적인 범위(복도식 70% ~ 계단식 80%)와 대표값
export const RATIO_MIN = 0.7;
export const RATIO_MAX = 0.8;
export const RATIO_TYPICAL = 0.75;

// 분양 시장에서 흔한 전용면적 타입(m²)
export const commonExclusiveAreas = [39, 49, 59, 74, 84, 101, 114, 135];

export type AreaPage =
  | { kind: "pyeong"; value: number; slug: string }
  | { kind: "m2"; value: number; slug: string };

const pyeongValues = [10, 12, 15, 18, 20, 22, 24, 25, 27, 30, 32, 33, 34, 35, 38, 40, 45, 50, 60];
const m2Values = [33, 39, 46, 49, 59, 66, 74, 84, 99, 101, 114, 135];

export const areaPages: AreaPage[] = [
  ...pyeongValues.map((value) => ({ kind: "pyeong" as const, value, slug: `${value}-pyeong` })),
  ...m2Values.map((value) => ({ kind: "m2" as const, value, slug: `${value}-m2` })),
];

export const getAreaPage = (slug: string) => areaPages.find((page) => page.slug === slug);

export const areaPagePath = (page: AreaPage | string) =>
  `${toolPath("pyeong-calculator")}/${typeof page === "string" ? page : page.slug}`;

export const areaPageLabel = (page: AreaPage) =>
  page.kind === "pyeong" ? `${page.value}평` : `${page.value}m²`;

export const toM2 = (pyeong: number) => pyeong * M2_PER_PYEONG;
export const toPyeong = (m2: number) => m2 / M2_PER_PYEONG;

// 숫자를 소수점 자리수에 맞춰 표시 (끝의 0은 남김)
export const fmt = (n: number, digits = 2) =>
  n.toLocaleString("ko-KR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

// 공급면적(평형) → 전용면적 추정 범위
export function exclusiveFromSupplyPyeong(pyeong: number) {
  const supply = toM2(pyeong);
  const min = supply * RATIO_MIN;
  const max = supply * RATIO_MAX;
  return {
    supply,
    min,
    max,
    typical: supply * RATIO_TYPICAL,
    // 이 범위에 드는 대표 전용면적 타입
    commonTypes: commonExclusiveAreas.filter((area) => area >= min && area <= max),
  };
}

// 전용면적 → 공급면적(평형) 추정 범위
export function supplyPyeongFromExclusive(m2: number) {
  return {
    min: Math.round(toPyeong(m2 / RATIO_MAX)),
    max: Math.round(toPyeong(m2 / RATIO_MIN)),
    typical: Math.round(toPyeong(m2 / RATIO_TYPICAL)),
  };
}

// 면적별로 덧붙이는 설명
export const areaNotes: Record<string, string> = {
  "33-m2":
    "원룸이나 소형 오피스텔에서 흔한 크기입니다. 오피스텔은 계약면적 기준으로 분양하는 경우가 많아 같은 '평'이라도 아파트보다 실제 공간이 좁게 느껴질 수 있습니다.",
  "59-m2":
    "소형 아파트의 대표 타입입니다. 신축 아파트에서는 보통 24~25평형으로 분양되며, 방 3개·욕실 2개 구성이 흔합니다.",
  "84-m2":
    "'국민평형'이라 불리는 가장 흔한 아파트 타입입니다. 청약 가점제 비율, 신축 주택 부가가치세 면제 등 여러 제도의 기준인 국민주택규모(전용 85m² 이하)에 맞춰 설계된 면적이며, 보통 33~34평형으로 분양됩니다.",
  "34-pyeong":
    "흔히 '국민평형'이라 부르는 평형으로, 대부분 전용 84m² 타입입니다. 전용면적이 국민주택규모(85m² 이하)에 들어가도록 설계된 경우가 많습니다.",
  "24-pyeong":
    "신축 아파트의 소형 대표 평형으로, 보통 전용 59m² 타입이 24~25평형으로 분양됩니다.",
  "25-pyeong":
    "소형 아파트에서 흔한 평형으로, 신축 아파트는 대개 전용 59m² 타입이 24~25평형으로 분양됩니다.",
};
