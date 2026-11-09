import { toolPath } from "../../tools";

// 대출 금액별 이자 페이지(/pages/loan-calculator/<만원>) 목록
export const loanAmounts = [
  3000, 5000, 7000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 70000, 80000, 100000,
];

export const loanAmountPath = (man: number) => `${toolPath("loan-calculator")}/${man}`;

// 1억 미만은 신용대출처럼 짧은 기간, 1억 이상은 주택담보대출처럼 긴 기간 기준으로 표를 만듭니다.
export const periodsFor = (man: number) => (man < 10000 ? [1, 3, 5, 10] : [10, 20, 30, 40]);

export const loanRates = [3, 3.5, 4, 4.5, 5, 5.5, 6, 7];
