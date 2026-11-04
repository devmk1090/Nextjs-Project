"use client";

import { useState } from "react";
import {
  BulletList,
  Card,
  DateFields,
  ErrorText,
  FaqList,
  PrimaryButton,
  ResultHero,
  StatGrid,
  ToolPage,
} from "../../components/tool/ToolUI";
import {
  DateParts,
  daysBetween,
  emptyDateParts,
  formatDate,
  formatDateWithWeekday,
  parseDateParts,
  relativeDays,
  todayDate,
} from "../../lib/date";

type Anniversary = { name: string; date: Date; daysFrom: number };

type Result = {
  start: Date;
  // 오늘이 시작일로부터 며칠째인지 (시작일 = 1일째). 시작일이 미래면 0 이하
  todayCount: number;
  anniversaries: Anniversary[];
};

function calculate(start: Date): Result {
  const today = todayDate();
  const y = start.getFullYear();
  const m = start.getMonth();
  const d = start.getDate();

  // 일수 기념일: 한국식으로 시작일을 1일째로 셈 (100일 = 시작일 + 99일)
  const dayAnniversaries = [100, 200, 300, 500, 1000, 2000, 3000].map((days) => {
    const date = new Date(y, m, d + days - 1);
    return { name: `${days}일`, date, daysFrom: daysBetween(today, date) };
  });

  // 주년: 달력 기준 같은 날짜 (2월 29일 시작이면 평년에는 2월 28일)
  const yearAnniversaries = [1, 2, 3, 5, 10].map((years) => {
    const date = new Date(y + years, m, d);
    if (date.getMonth() !== m) date.setDate(0);
    return { name: `${years}주년`, date, daysFrom: daysBetween(today, date) };
  });

  return {
    start,
    todayCount: daysBetween(start, today) + 1,
    anniversaries: [...dayAnniversaries, ...yearAnniversaries].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    ),
  };
}

function StatusChip({ daysFrom }: { daysFrom: number }) {
  if (daysFrom < 0) return <span className="text-sm text-ink-4">{relativeDays(daysFrom)}</span>;
  const tone =
    daysFrom === 0
      ? "bg-brand text-white"
      : daysFrom <= 30
        ? "bg-brand-soft text-brand"
        : "bg-canvas text-ink-2";
  return (
    <span className={`text-sm font-bold rounded-lg px-2 py-1 ${tone}`}>
      {daysFrom === 0 ? "오늘" : `D-${daysFrom}`}
    </span>
  );
}

export default function AnniversaryCalculator() {
  const [startParts, setStartParts] = useState<DateParts>(emptyDateParts);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = parseDateParts(startParts, "시작일");
    if (typeof start === "string") {
      setResult(null);
      setError(start);
      return;
    }
    setError("");
    setResult(calculate(start));
  };

  const next = result?.anniversaries.find((a) => a.daysFrom >= 0);

  return (
    <ToolPage
      slug="anniversary-calculator"
      subtitle="시작일로부터 100일, 1000일, 1주년 같은 기념일 날짜와 오늘이 며칠째인지 계산합니다."
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <DateFields
          legend="시작일"
          value={startParts}
          onChange={setStartParts}
          placeholder={{ year: "2025", month: "3", day: "14" }}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">기념일 계산하기</PrimaryButton>
      </form>

      {result && (
        <>
          <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
            <ResultHero
              label={`${formatDate(result.start)}부터 오늘까지`}
              value={
                result.todayCount > 0
                  ? `${result.todayCount.toLocaleString("ko-KR")}일째`
                  : `D-${1 - result.todayCount}`
              }
              sub={
                result.todayCount > 0
                  ? "시작일을 1일째로 세는 한국식 계산입니다."
                  : "시작일이 아직 오지 않았습니다."
              }
            />
            {next && (
              <StatGrid
                items={[
                  { label: "다음 기념일", value: next.name },
                  { label: "날짜", value: formatDateWithWeekday(next.date) },
                  { label: "남은 날", value: next.daysFrom === 0 ? "오늘" : `${next.daysFrom}일` },
                ]}
              />
            )}
          </Card>

          <Card title="기념일 목록">
            <ul className="divide-y divide-canvas">
              {result.anniversaries.map((a) => (
                <li
                  key={a.name}
                  className={`flex items-center justify-between gap-3 py-3.5 ${a.daysFrom < 0 ? "opacity-60" : ""}`}
                >
                  <span>
                    <span className="block font-bold text-ink">{a.name}</span>
                    <span className="block text-sm text-ink-3">{formatDateWithWeekday(a.date)}</span>
                  </span>
                  <StatusChip daysFrom={a.daysFrom} />
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}

      <Card title="기념일 계산 기준">
        <BulletList
          items={[
            <>
              <strong className="text-ink">100일, 200일 등 일수 기념일</strong>은 시작일을 1일째로 세는
              한국식 계산법을 따릅니다. 예를 들어 1월 1일에 시작했다면 100일은 4월 10일입니다(윤년이
              아닌 해 기준).
            </>,
            <>
              <strong className="text-ink">1주년, 2주년 등 주년</strong>은 일수가 아니라 달력상 같은
              날짜로 계산합니다. 윤년이 끼어도 날짜가 밀리지 않습니다.
            </>,
            "2월 29일에 시작했다면 평년의 주년은 2월 28일로 표시합니다.",
          ]}
        />
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "아기 백일은 어떻게 계산하나요?",
              "백일도 태어난 날을 1일째로 셉니다. 1월 1일에 태어났다면 99일을 더한 4월 10일(평년 기준)이 백일입니다. 위 계산기에 출생일을 넣으면 100일 항목에서 바로 확인할 수 있습니다.",
            ],
            [
              "1주년과 365일은 같은 날인가요?",
              "대부분 하루 차이가 납니다. 시작일을 1일째로 세면 365일은 1주년 하루 전날이고, 그 사이에 2월 29일이 있으면 이틀 전날이 됩니다. 결혼기념일 같은 주년은 달력상 같은 날짜로 챙기는 것이 일반적입니다.",
            ],
            [
              "왜 시작일을 1일째로 세나요?",
              "한국에서는 연애 기념일이나 백일을 셀 때 시작한 날 자체를 첫째 날로 세는 관습이 있습니다. 그래서 두 날짜 사이의 차이만 세는 디데이 계산보다 하루가 더 많게 나옵니다.",
            ],
          ]}
        />
      </Card>

      <Card title="이런 때 쓰세요">
        <BulletList
          items={[
            "연애 시작일로부터 100일, 200일, 1000일 계산",
            "결혼기념일 1주년, 5주년, 10주년 확인",
            "아기 출생일로부터 백일, 200일",
            "입사일, 금연·운동 시작일로부터 기념일 확인",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
