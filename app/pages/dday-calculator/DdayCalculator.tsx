"use client";

import { useState } from "react";
import Link from "next/link";
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
  addDays,
  daysBetween,
  emptyDateParts,
  formatDateWithWeekday,
  relativeDays,
  parseDateParts,
  todayDate,
  weekdayNames,
} from "../../lib/date";
import { toolPath } from "../../tools";
import { ddayEventPath, ddayEvents } from "./events";

// 목표일 전 중간 점검일 (D-365, D-100 …)
const checkpoints = [365, 300, 200, 100, 50, 30, 7, 1];

type Result = { target: Date; diff: number };

const ddayLabel = (diff: number) => (diff === 0 ? "D-day" : diff > 0 ? `D-${diff}` : `D+${-diff}`);

export default function DdayCalculator() {
  const [targetParts, setTargetParts] = useState<DateParts>(emptyDateParts);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseDateParts(targetParts, "목표일");
    if (typeof target === "string") {
      setResult(null);
      setError(target);
      return;
    }
    setError("");
    setResult({ target, diff: daysBetween(todayDate(), target) });
  };

  const today = todayDate();
  const weeks = result ? Math.floor(Math.abs(result.diff) / 7) : 0;
  const restDays = result ? Math.abs(result.diff) % 7 : 0;

  return (
    <ToolPage
      slug="dday-calculator"
      subtitle="목표일까지 남은 날(D-day)이나 지난날로부터 흐른 날(D+)을 계산합니다."
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <DateFields
          legend="목표일"
          value={targetParts}
          onChange={setTargetParts}
          placeholder={{ year: "2026", month: "12", day: "25" }}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">계산하기</PrimaryButton>
      </form>

      {result && (
        <>
          <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
            <ResultHero
              label={formatDateWithWeekday(result.target)}
              value={ddayLabel(result.diff)}
              sub={
                result.diff === 0
                  ? "오늘이 바로 그날입니다."
                  : result.diff > 0
                    ? `${result.diff.toLocaleString("ko-KR")}일 남았습니다.`
                    : `${(-result.diff).toLocaleString("ko-KR")}일이 지났습니다.`
              }
            />
            <StatGrid
              items={[
                { label: "주 단위", value: restDays ? `${weeks}주 ${restDays}일` : `${weeks}주` },
                { label: "목표일 요일", value: `${weekdayNames[result.target.getDay()]}요일` },
                {
                  label: result.diff >= 0 ? "목표일까지 주말" : "지난 주말",
                  value: `${countWeekendDays(today, result.target)}일`,
                },
              ]}
            />
          </Card>

          {result.diff > 1 && (
            <Card title="중간 점검일">
              <p className="text-sm text-ink-3 -mt-2 mb-3">목표일까지 남은 날이 아래 숫자가 되는 날짜입니다.</p>
              <ul className="divide-y divide-canvas">
                {checkpoints
                  .filter((n) => n < result.diff + 1)
                  .map((n) => {
                    const date = addDays(result.target, -n);
                    const fromToday = daysBetween(today, date);
                    return (
                      <li
                        key={n}
                        className={`flex items-center justify-between gap-3 py-3 ${fromToday < 0 ? "opacity-60" : ""}`}
                      >
                        <span className="font-bold text-ink">D-{n}</span>
                        <span className="text-right">
                          <span className="block text-ink-2">{formatDateWithWeekday(date)}</span>
                          <span className="block text-sm text-ink-4">{relativeDays(fromToday)}</span>
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </Card>
          )}
        </>
      )}

      <Card title="명절·기념일까지 남은 날">
        <div className="flex flex-wrap gap-2">
          {ddayEvents.map((e) => (
            <Link
              key={e.slug}
              href={ddayEventPath(e.slug)}
              className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
            >
              {e.name} D-day
            </Link>
          ))}
        </div>
      </Card>

      <Card title="디데이 표기 방법">
        <BulletList
          items={[
            <>
              목표일 당일은 <strong className="text-ink">D-day</strong>(D-0)입니다. 하루 전은 D-1, 30일
              전은 D-30처럼 남은 날을 뺄셈 기호로 씁니다.
            </>,
            <>
              목표일이 지난 뒤에는 <strong className="text-ink">D+1, D+100</strong>처럼 지난 날을 덧셈
              기호로 씁니다. 과거 날짜를 넣으면 이 방식으로 표시됩니다.
            </>,
            "D-day라는 말은 원래 작전 개시일을 뜻하는 군사 용어로, 제2차 세계대전 노르망디 상륙작전(1944년 6월 6일)을 통해 널리 알려졌습니다.",
          ]}
        />
      </Card>

      <Card title="디데이와 '며칠째'는 다릅니다">
        <p className="mb-3">
          디데이는 두 날짜 사이의 차이를 셉니다. 오늘이 1일이고 목표일이 10일이면 D-9입니다. 반면
          연애 기념일이나 백일처럼 &quot;며칠째&quot;를 셀 때는 시작한 날을 1일째로 세기 때문에 같은
          기간이 하루 더 많게 나옵니다.
        </p>
        <p>
          100일, 1000일 같은 기념일 날짜를 구하려면{" "}
          <Link href={toolPath("anniversary-calculator")} className="text-brand font-bold">
            기념일 계산기
          </Link>
          를, 특정 날짜의 요일만 궁금하다면{" "}
          <Link href={toolPath("day-calculator")} className="text-brand font-bold">
            요일 계산기
          </Link>
          를 이용하세요.
        </p>
      </Card>

      <Card title="이런 때 쓰세요">
        <BulletList
          items={[
            "수능, 공무원·자격증 시험까지 남은 날과 D-100, D-30 같은 중간 점검일 확인",
            "결혼식, 출산 예정일, 이사, 여행까지 카운트다운",
            "전역일, 퇴사일, 계약 만료일까지 남은 날 계산",
            "과거 날짜를 넣어 첫 만남, 금연 시작일로부터 며칠이 지났는지 확인",
          ]}
        />
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "음력 날짜로도 계산할 수 있나요?",
              "이 계산기는 양력 기준입니다. 음력 생일이나 명절은 해마다 양력 날짜가 달라지므로, 음력→양력 변환기로 올해 날짜를 먼저 확인한 뒤 입력하세요.",
            ],
            [
              "윤년도 반영되나요?",
              "네. 4년마다 돌아오는 2월 29일을 포함해 달력의 실제 날짜로 계산합니다. 예를 들어 2024년 2월 29일부터 2025년 3월 1일까지는 366일입니다.",
            ],
            [
              "주말이나 공휴일을 빼고 셀 수 있나요?",
              "디데이는 달력의 모든 날을 셉니다. 대신 결과에서 목표일까지 남은 토요일·일요일 수를 함께 보여 드리니 평일 수를 어림할 때 참고하세요. 공휴일은 포함하지 않습니다.",
            ],
          ]}
        />
      </Card>
    </ToolPage>
  );
}

// 두 날짜 사이(오늘 다음 날부터 목표일까지, 과거면 목표일 다음 날부터 오늘까지)의 토·일 수
function countWeekendDays(today: Date, target: Date) {
  const [from, to] = today <= target ? [today, target] : [target, today];
  const days = daysBetween(from, to);
  // 7일마다 주말 2일, 남은 날은 직접 확인 (아주 먼 날짜도 빠르게 계산)
  let count = Math.floor(days / 7) * 2;
  for (let i = 1; i <= days % 7; i++) {
    const weekday = (from.getDay() + i) % 7;
    if (weekday === 0 || weekday === 6) count++;
  }
  return count;
}
