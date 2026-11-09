import { hasBatchim } from "./josa";

// 날짜 입력과 계산 도우미. 모두 로컬 시간 자정 기준으로 다룹니다.

export type DateParts = { year: string; month: string; day: string };

export const emptyDateParts: DateParts = { year: "", month: "", day: "" };

export const DAY_MS = 24 * 60 * 60 * 1000;

export const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];

export function todayDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// 받침 유무에 따라 "을/를" (예: 날짜를, 시작일을)
const objectParticle = (word: string) => (hasBatchim(word) ? "을" : "를");

// 연·월·일 입력을 날짜로 바꿈. 잘못된 입력이면 오류 문구를 돌려줌
export function parseDateParts(parts: DateParts, label = "날짜"): Date | string {
  const josa = objectParticle(label);
  if (parts.year.length !== 4 || !parts.month || !parts.day) {
    return `${label}${josa} 모두 입력하세요. 연도는 4자리입니다.`;
  }
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return `존재하지 않는 날짜입니다. ${label}${josa} 다시 확인하세요.`;
  }
  return date;
}

// b - a (일). 자정 기준 날짜끼리 비교
export const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / DAY_MS);

export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const formatDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

export const formatDateWithWeekday = (date: Date) =>
  `${formatDate(date)} (${weekdayNames[date.getDay()]})`;

// 오늘 기준 상대 표시: "오늘", "3일 후", "12일 전"
export function relativeDays(days: number) {
  if (days === 0) return "오늘";
  return days > 0 ? `${days.toLocaleString("ko-KR")}일 후` : `${(-days).toLocaleString("ko-KR")}일 전`;
}
