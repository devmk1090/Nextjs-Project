import { toolPath } from "../../tools";

// 출생 연도별 페이지의 범위와 경로. 클라이언트 컴포넌트에서도 쓰므로 lunar-typescript를 import하지 않습니다.
export const FIRST_BIRTH_YEAR = 1930;

export const birthYearPath = (year: number) => `${toolPath("age-calculator")}/${year}`;

// 클라이언트에서 결과 아래에 출생 연도 페이지 링크를 보여줄지 판단할 때 사용
export const hasBirthYearPage = (year: number) =>
  Number.isInteger(year) && year >= FIRST_BIRTH_YEAR && year <= new Date().getFullYear();
