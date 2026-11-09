import { addDays, daysBetween } from "../../lib/date";
import { lunarToSolar } from "../../lib/lunar";
import { DdayEvent } from "./events";

// 명절·기념일 날짜 계산 (서버에서만 사용)

// 서버 시간대와 상관없이 한국 날짜 기준 오늘 (자정)
export function todayKST(now = new Date()) {
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return new Date(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate());
}

export function eventDateInYear(event: DdayEvent, year: number): Date | null {
  if (event.calendar === "solar") return new Date(year, event.month - 1, event.day);
  const date = lunarToSolar({ year, month: event.month, day: event.day, isLeap: false });
  return typeof date === "string" ? null : date;
}

// 오늘이거나 오늘 이후의 가장 가까운 날
export function nextEventDate(event: DdayEvent, today: Date) {
  const thisYear = eventDateInYear(event, today.getFullYear());
  if (thisYear && daysBetween(today, thisYear) >= 0) return thisYear;
  return eventDateInYear(event, today.getFullYear() + 1)!;
}

// 설날·추석은 전날~다음 날 3일, 나머지는 당일
export function holidayDays(event: DdayEvent, date: Date) {
  return event.threeDays ? [addDays(date, -1), date, addDays(date, 1)] : [date];
}

// 대체공휴일 대상이 될 수 있는지: 설날·추석 연휴는 일요일과 겹칠 때, 그 밖의 대상 공휴일은 토·일과 겹칠 때
// (다른 공휴일과 겹치는 경우 등 세부 지정은 정부 발표를 따릅니다)
export function mayHaveSubstitute(event: DdayEvent, date: Date) {
  if (!event.substitute) return false;
  const days = holidayDays(event, date);
  return event.threeDays
    ? days.some((d) => d.getDay() === 0)
    : days.some((d) => d.getDay() === 0 || d.getDay() === 6);
}
