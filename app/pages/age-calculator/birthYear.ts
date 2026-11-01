import { Lunar } from "lunar-typescript";
import { FIRST_BIRTH_YEAR } from "./birthYearPath";
import { ganzhi } from "../../lib/ganzhi";

export { ganzhi };

// 출생 연도별 페이지(/pages/age-calculator/<연도>)에서 쓰는 계산 모음.
// 서버 컴포넌트에서만 사용합니다(lunar-typescript를 클라이언트 번들에 넣지 않기 위해).

// 서버 시간대와 상관없이 한국 기준 올해 연도
export function currentYearKST(now = new Date()) {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", year: "numeric" }).format(now)
  );
}

export function birthYears(currentYear = currentYearKST()) {
  const years: number[] = [];
  for (let year = currentYear; year >= FIRST_BIRTH_YEAR; year--) years.push(year);
  return years;
}

export function isValidBirthYear(year: number, currentYear = currentYearKST()) {
  return Number.isInteger(year) && year >= FIRST_BIRTH_YEAR && year <= currentYear;
}

// 해당 연도의 설날(음력 1월 1일)과 입춘의 양력 날짜
export function yearBoundaries(year: number) {
  const lunarNewYear = Lunar.fromYmd(year, 1, 1);
  const seollal = lunarNewYear.getSolar();
  const ipchun = lunarNewYear.getJieQiTable()["立春"];
  return {
    seollal: { month: seollal.getMonth(), day: seollal.getDay() },
    ipchun: { month: ipchun.getMonth(), day: ipchun.getDay() },
  };
}

export function ages(birthYear: number, currentYear: number) {
  return {
    // 만 나이: 생일 전/후
    beforeBirthday: Math.max(currentYear - birthYear - 1, 0),
    afterBirthday: currentYear - birthYear,
    // 세는 나이: 태어나면 1살, 1월 1일마다 1살
    counting: currentYear - birthYear + 1,
    // 연 나이: 올해 연도 - 출생 연도
    yearAge: currentYear - birthYear,
  };
}

// "만 35세(생일 전) / 36세(생일 후)" 형태의 만 나이 문구
export function manAgeText(birthYear: number, currentYear: number) {
  const a = ages(birthYear, currentYear);
  if (birthYear === currentYear) return "만 0세";
  return `만 ${a.beforeBirthday}세(생일 전) 또는 ${a.afterBirthday}세(생일 후)`;
}

// 국민연금 노령연금 수령 개시 연령(국민연금법 부칙, 출생 연도별 단계 상향)
export function pensionAge(birthYear: number) {
  if (birthYear <= 1952) return 60;
  if (birthYear <= 1956) return 61;
  if (birthYear <= 1960) return 62;
  if (birthYear <= 1964) return 63;
  if (birthYear <= 1968) return 64;
  return 65;
}

// 만 6세가 지난 다음 해 3월 초등학교 입학 기준.
// 2008학년도까지는 3월~이듬해 2월생이 같은 학년이어서 2002년 이전 1·2월생은 한 해 먼저 입학했고,
// 2009학년도부터 1월~12월생이 같은 학년이 되었습니다.
export function schoolYears(birthYear: number) {
  const entry = birthYear + 7;
  return {
    elementaryEntry: entry,
    middleEntry: entry + 6,
    highEntry: entry + 9,
    suneung: entry + 11,
    highGraduation: entry + 12,
    universityEntry: entry + 12,
    hasEarlyBirthCohort: birthYear <= 2002,
  };
}

// 올해 3월 새 학년 기준 학년. 초·중·고 재학 나이가 아니면 null
export function currentGrade(birthYear: number, currentYear: number) {
  const grade = currentYear - (birthYear + 7) + 1;
  if (grade < 1 || grade > 12) return null;
  if (grade <= 6) return `초등학교 ${grade}학년`;
  if (grade <= 9) return `중학교 ${grade - 6}학년`;
  return `고등학교 ${grade - 9}학년`;
}

export type Milestone = { year: number; label: string };

export function milestones(birthYear: number): Milestone[] {
  const pension = pensionAge(birthYear);
  return [
    { year: birthYear + 18, label: "만 18세: 선거권, 운전면허(1·2종 보통) 취득 가능" },
    { year: birthYear + 19, label: "만 19세: 민법상 성년" },
    {
      year: birthYear + 19,
      label: "연 나이 19세: 1월 1일부터 술·담배 구매 가능(청소년보호법), 남성은 병역판정검사 대상",
    },
    { year: birthYear + 60, label: "만 60세: 법정 정년(고령자고용법상 정년 하한)" },
    {
      year: birthYear + pension,
      label: `만 ${pension}세: 국민연금 노령연금 수령 시작(가입기간 10년 이상)`,
    },
    { year: birthYear + 65, label: "만 65세: 기초연금 신청, 지하철 경로우대" },
  ];
}
