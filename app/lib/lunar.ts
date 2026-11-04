import { LunarYear, Lunar, Solar } from "lunar-typescript";
import { ganzhi } from "./ganzhi";

// 음력·양력 변환 도우미 (lunar-typescript 사용, 1900~2100년)
// lunar-typescript는 윤달을 음수 월로 표현합니다 (2023년 윤2월 = -2).

export const LUNAR_MIN_YEAR = 1900;
export const LUNAR_MAX_YEAR = 2100;

export type LunarDate = { year: number; month: number; day: number; isLeap: boolean };

// 그해의 윤달 (없으면 0)
export const leapMonthOf = (year: number) => LunarYear.fromYear(year).getLeapMonth();

// 음력 year년 month월(윤달이면 isLeap)의 날 수. 그런 달이 없으면 null
export function lunarMonthDays(year: number, month: number, isLeap: boolean) {
  const target = isLeap ? -month : month;
  const found = LunarYear.fromYear(year)
    .getMonths()
    .find((m) => m.getYear() === year && m.getMonth() === target);
  return found ? found.getDayCount() : null;
}

export const formatLunar = (d: LunarDate) =>
  `음력 ${d.year}년 ${d.isLeap ? "윤" : ""}${d.month}월 ${d.day}일`;

export function solarToLunar(date: Date) {
  const lunar = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate()).getLunar();
  const month = lunar.getMonth();
  const value: LunarDate = {
    year: lunar.getYear(),
    month: Math.abs(month),
    day: lunar.getDay(),
    isLeap: month < 0,
  };
  return {
    ...value,
    ganzhi: ganzhi(value.year),
    monthDays: lunarMonthDays(value.year, value.month, value.isLeap) ?? 0,
  };
}

// 음력 → 양력. 그런 날짜가 없으면 오류 문구
export function lunarToSolar({ year, month, day, isLeap }: LunarDate): Date | string {
  if (year < LUNAR_MIN_YEAR || year > LUNAR_MAX_YEAR) {
    return `${LUNAR_MIN_YEAR}년부터 ${LUNAR_MAX_YEAR}년까지만 변환할 수 있습니다.`;
  }
  if (month < 1 || month > 12) return "월은 1~12 사이로 입력하세요.";
  const days = lunarMonthDays(year, month, isLeap);
  if (days === null) {
    const leap = leapMonthOf(year);
    return leap
      ? `음력 ${year}년에는 윤${month}월이 없습니다. 이해의 윤달은 윤${leap}월입니다.`
      : `음력 ${year}년에는 윤달이 없습니다.`;
  }
  if (day < 1 || day > days) {
    return `음력 ${year}년 ${isLeap ? "윤" : ""}${month}월은 ${days}일까지 있습니다.`;
  }
  const solar = Lunar.fromYmd(year, isLeap ? -month : month, day).getSolar();
  return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
}

// 음력 생일(월·일)이 앞으로 몇 년간 양력으로 언제인지.
// 윤달생은 그해에 같은 윤달이 없으면 평달로, 30일생은 그달이 29일까지면 29일로 챙깁니다.
export function upcomingLunarBirthdays(
  month: number,
  day: number,
  isLeap: boolean,
  fromYear: number,
  count: number
) {
  const rows: { year: number; date: Date; note?: string }[] = [];
  for (let year = fromYear; year < fromYear + count && year <= LUNAR_MAX_YEAR; year++) {
    const useLeap = isLeap && lunarMonthDays(year, month, true) !== null;
    const days = lunarMonthDays(year, month, useLeap) ?? 29;
    const useDay = Math.min(day, days);
    const date = lunarToSolar({ year, month, day: useDay, isLeap: useLeap });
    if (typeof date === "string") continue;
    const notes = [
      isLeap && !useLeap ? "윤달이 없어 평달 기준" : "",
      useDay < day ? `${days}일까지인 달이라 ${useDay}일 기준` : "",
    ].filter(Boolean);
    rows.push({ year, date, note: notes.join(", ") || undefined });
  }
  return rows;
}
