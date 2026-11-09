import { toolPath } from "../../tools";

// 연봉별 실수령액 페이지(/pages/salary-calculator/<만원>) 목록
// 5,000만 원까지는 200만 원 단위(2,500·3,500·4,500 포함), 그 위로는 1억 원까지 500만 원 단위, 1억 원 초과는 대표 금액만
export const salaryAmounts = [
  2000, 2200, 2400, 2500, 2600, 2800, 3000, 3200, 3400, 3500, 3600, 3800, 4000, 4200, 4400, 4500,
  4600, 4800, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 15000,
];

export const salaryPath = (man: number) => `${toolPath("salary-calculator")}/${man}`;

export { manLabel } from "../../lib/format";
