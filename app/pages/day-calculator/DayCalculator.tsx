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
  parseDateParts,
  relativeDays,
  todayDate,
  weekdayNames,
} from "../../lib/date";

const weekdayEnglish = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 한국 달력 관례: 일요일 빨강, 토요일 파랑
const weekdayColor = (day: number) =>
  day === 0 ? "text-red-600" : day === 6 ? "text-blue-600" : "text-ink";

const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

type Result = { date: Date };

export default function DayCalculator() {
  const [parts, setParts] = useState<DateParts>(emptyDateParts);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = parseDateParts(parts);
    if (typeof date === "string") {
      setResult(null);
      setError(date);
      return;
    }
    setError("");
    setResult({ date });
  };

  const date = result?.date;
  const dayOfYear = date ? daysBetween(new Date(date.getFullYear(), 0, 1), date) + 1 : 0;
  const thisYear = new Date().getFullYear();
  // 같은 월·일의 앞으로 5년 요일 (2월 29일은 윤년에만)
  const upcoming = date
    ? Array.from({ length: 5 }, (_, i) => thisYear + i).map((year) => {
        const valid = !(date.getMonth() === 1 && date.getDate() === 29 && !isLeapYear(year));
        return { year, day: valid ? new Date(year, date.getMonth(), date.getDate()).getDay() : null };
      })
    : [];

  return (
    <ToolPage slug="day-calculator" subtitle="날짜를 넣으면 그날이 무슨 요일인지 알려 줍니다.">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <DateFields
          legend="날짜"
          value={parts}
          onChange={setParts}
          placeholder={{ year: "1990", month: "5", day: "15" }}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">요일 확인하기</PrimaryButton>
      </form>

      {date && (
        <>
          <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
            <ResultHero
              label={`${formatDate(date)}은`}
              value={<span className={weekdayColor(date.getDay())}>{weekdayNames[date.getDay()]}요일</span>}
              sub={weekdayEnglish[date.getDay()]}
            />
            <StatGrid
              items={[
                { label: "오늘 기준", value: relativeDays(daysBetween(todayDate(), date)) },
                {
                  label: `${date.getFullYear()}년 중`,
                  value: `${dayOfYear}번째 날 / ${isLeapYear(date.getFullYear()) ? 366 : 365}일`,
                },
                { label: "구분", value: date.getDay() === 0 || date.getDay() === 6 ? "주말" : "평일" },
              ]}
            />
          </Card>

          <Card title={`${date.getMonth() + 1}월 ${date.getDate()}일, 앞으로 5년 요일`}>
            <ul className="divide-y divide-canvas">
              {upcoming.map((row) => (
                <li key={row.year} className="flex items-center justify-between py-3">
                  <span className="font-bold text-ink">{row.year}년</span>
                  {row.day === null ? (
                    <span className="text-ink-4">2월 29일 없음 (평년)</span>
                  ) : (
                    <span className={`font-bold ${weekdayColor(row.day)}`}>{weekdayNames[row.day]}요일</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-3 mt-3">
              같은 날짜의 요일은 평년에는 하루, 윤년 2월 29일을 지나면 이틀씩 뒤로 밀립니다.
            </p>
          </Card>
        </>
      )}

      <Card title="요일은 어떻게 정해졌을까">
        <p className="mb-3">
          7일 주기는 고대 바빌로니아에서 시작되었다고 알려져 있습니다. 해(일), 달(월)과 맨눈으로 보이는
          다섯 행성인 화성·수성·목성·금성·토성의 이름을 요일에 붙였고, 한국어와 영어
          요일(Sunday=해, Monday=달, Saturday=토성)에 그 흔적이 남아 있습니다.
        </p>
        <p>
          요일은 날짜와 상관없이 7일마다 끊김 없이 이어집니다. 그래서 1년(365일)이 지나면 요일이 하루씩
          밀리고(365 = 7 × 52 + 1), 윤년에는 이틀 밀립니다.
        </p>
      </Card>

      <Card title="역사적 사건의 요일">
        <BulletList
          items={[
            "1945년 8월 15일 광복절은 수요일이었습니다.",
            "1950년 6월 25일 한국전쟁이 시작된 날은 일요일이었습니다.",
            "1941년 12월 7일 진주만 공습은 일요일 아침에 일어났습니다.",
            "1969년 7월 20일(미국 시각) 아폴로 11호가 달에 착륙한 날은 일요일이었습니다.",
          ]}
        />
      </Card>

      <Card title="윤년 규칙">
        <p className="mb-3">
          지금 쓰는 그레고리력은 1년을 평균 365.2425일로 맞추기 위해 윤년을 다음처럼 정합니다.
        </p>
        <BulletList
          items={[
            "4로 나누어떨어지는 해는 윤년입니다. 예: 2024년",
            "그중 100으로 나누어떨어지는 해는 평년입니다. 예: 1900년",
            "다시 400으로 나누어떨어지는 해는 윤년입니다. 예: 2000년",
          ]}
        />
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "음력 날짜의 요일도 알 수 있나요?",
              "이 계산기는 양력 날짜를 받습니다. 음력 생일이나 명절의 요일은 양력 변환기로 그해 양력 날짜를 먼저 구한 뒤 입력하세요.",
            ],
            [
              "아주 옛날 날짜도 정확한가요?",
              "현재 그레고리력 규칙을 과거까지 그대로 적용해 계산합니다. 그레고리력은 1582년 10월 15일에 처음 쓰였고, 그 전에는 율리우스력을 써서 실제 기록된 날짜와 며칠 차이가 날 수 있습니다. 한국은 1896년부터 양력을 썼습니다.",
            ],
            [
              "한 주는 일요일부터인가요, 월요일부터인가요?",
              "달력마다 다릅니다. 한국과 미국의 벽걸이 달력은 보통 일요일부터 시작하지만, 국제 표준(ISO 8601)은 월요일을 한 주의 첫날로 봅니다.",
            ],
          ]}
        />
      </Card>

      <Card title="이런 때 쓰세요">
        <BulletList
          items={[
            "내가 태어난 날은 무슨 요일이었는지 확인",
            "올해와 내년 생일, 결혼기념일이 주말인지 미리 확인",
            "약속, 행사, 마감일의 요일 확인",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
