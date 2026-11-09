import { toolPath } from "../../tools";

// 명절·기념일 디데이 페이지(/pages/dday-calculator/<slug>) 목록.
// 클라이언트에서도 쓰므로 lunar-typescript를 import하지 않습니다 (날짜 계산은 eventDates.ts).

export type DdayEvent = {
  slug: string;
  name: string;
  calendar: "solar" | "lunar";
  month: number;
  day: number;
  // 공휴일에 관한 법률상 대체공휴일 적용 대상인지
  substitute: boolean;
  // 설날·추석처럼 전날·다음날까지 3일 연휴인지
  threeDays?: boolean;
  desc: string;
};

export const ddayEvents: DdayEvent[] = [
  { slug: "new-year", name: "신정(새해 첫날)", calendar: "solar", month: 1, day: 1, substitute: false, desc: "양력 1월 1일, 새해의 첫날입니다. 공휴일이지만 주말과 겹쳐도 대체공휴일은 없습니다." },
  { slug: "seollal", name: "설날", calendar: "lunar", month: 1, day: 1, substitute: true, threeDays: true, desc: "음력 1월 1일로, 전날과 다음 날까지 3일 연휴입니다. 떡국을 먹고 차례를 지내며 세배를 합니다." },
  { slug: "samiljeol", name: "삼일절", calendar: "solar", month: 3, day: 1, substitute: true, desc: "1919년 3·1 운동을 기념하는 국경일입니다." },
  { slug: "childrens-day", name: "어린이날", calendar: "solar", month: 5, day: 5, substitute: true, desc: "어린이의 인격을 존중하고 행복을 도모하기 위해 정한 기념일이자 공휴일입니다." },
  { slug: "buddhas-birthday", name: "부처님오신날", calendar: "lunar", month: 4, day: 8, substitute: true, desc: "음력 4월 8일, 석가모니의 탄생을 기념하는 공휴일로 사찰에서 연등을 밝힙니다." },
  { slug: "memorial-day", name: "현충일", calendar: "solar", month: 6, day: 6, substitute: false, desc: "나라를 위해 목숨을 바친 순국선열과 호국영령을 추모하는 날입니다. 대체공휴일은 적용되지 않습니다." },
  { slug: "liberation-day", name: "광복절", calendar: "solar", month: 8, day: 15, substitute: true, desc: "1945년 광복과 1948년 정부 수립을 기념하는 국경일입니다." },
  { slug: "chuseok", name: "추석", calendar: "lunar", month: 8, day: 15, substitute: true, threeDays: true, desc: "음력 8월 15일로, 전날과 다음 날까지 3일 연휴입니다. 송편을 빚고 차례를 지냅니다." },
  { slug: "national-foundation-day", name: "개천절", calendar: "solar", month: 10, day: 3, substitute: true, desc: "단군이 고조선을 세운 것을 기념하는 국경일입니다." },
  { slug: "hangul-day", name: "한글날", calendar: "solar", month: 10, day: 9, substitute: true, desc: "훈민정음 반포를 기념하고 한글의 우수성을 기리는 국경일입니다." },
  { slug: "christmas", name: "크리스마스", calendar: "solar", month: 12, day: 25, substitute: true, desc: "예수의 탄생을 기념하는 날(기독탄신일)로 공휴일입니다." },
];

export const getDdayEvent = (slug: string) => ddayEvents.find((e) => e.slug === slug);
export const ddayEventPath = (slug: string) => `${toolPath("dday-calculator")}/${slug}`;
