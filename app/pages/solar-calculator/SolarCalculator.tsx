"use client";

import { useState } from "react";
import LunarBirthdays from "../../components/tool/LunarBirthdays";
import {
  BulletList,
  Card,
  DateFields,
  ErrorText,
  FaqList,
  PrimaryButton,
  ResultHero,
  Segmented,
  StatGrid,
  ToolPage,
} from "../../components/tool/ToolUI";
import {
  DateParts,
  daysBetween,
  emptyDateParts,
  formatDateWithWeekday,
  relativeDays,
  todayDate,
} from "../../lib/date";
import { ganzhi } from "../../lib/ganzhi";
import {
  LUNAR_MAX_YEAR,
  LUNAR_MIN_YEAR,
  LunarDate,
  formatLunar,
  leapMonthOf,
  lunarToSolar,
} from "../../lib/lunar";

type MonthType = "normal" | "leap";

const monthTypes: { id: MonthType; name: string }[] = [
  { id: "normal", name: "평달" },
  { id: "leap", name: "윤달" },
];

type Result = { lunar: LunarDate; solar: Date };

export default function SolarCalculator() {
  const [parts, setParts] = useState<DateParts>(emptyDateParts);
  const [monthType, setMonthType] = useState<MonthType>("normal");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parts.year.length !== 4 || !parts.month || !parts.day) {
      setResult(null);
      setError("음력 날짜를 모두 입력하세요. 연도는 4자리입니다.");
      return;
    }
    const lunar: LunarDate = {
      year: Number(parts.year),
      month: Number(parts.month),
      day: Number(parts.day),
      isLeap: monthType === "leap",
    };
    const solar = lunarToSolar(lunar);
    if (typeof solar === "string") {
      setResult(null);
      setError(solar);
      return;
    }
    setError("");
    setResult({ lunar, solar });
  };

  const yearLeap =
    result && result.lunar.year >= LUNAR_MIN_YEAR ? leapMonthOf(result.lunar.year) : 0;

  return (
    <ToolPage
      slug="solar-calculator"
      subtitle="음력 날짜를 양력으로 바꾸고, 음력 생일이 앞으로 양력으로 언제인지 알려 줍니다."
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <DateFields
          legend="음력 날짜"
          value={parts}
          onChange={setParts}
          placeholder={{ year: "1990", month: "4", day: "21" }}
        />
        <Segmented label="윤달 여부" options={monthTypes} value={monthType} onChange={setMonthType} />
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">양력으로 변환하기</PrimaryButton>
      </form>

      {result && (
        <>
          <Card aria-label="변환 결과" aria-live="polite" className="flex flex-col gap-5">
            <ResultHero
              label={formatLunar(result.lunar)}
              value={formatDateWithWeekday(result.solar)}
              sub={`양력 · ${ganzhi(result.lunar.year).name} ${ganzhi(result.lunar.year).animal}띠 해`}
            />
            <StatGrid
              items={[
                { label: "오늘 기준", value: relativeDays(daysBetween(todayDate(), result.solar)) },
                {
                  label: `${result.lunar.year}년 윤달`,
                  value: yearLeap ? `윤${yearLeap}월` : "없음",
                },
                { label: "간지", value: ganzhi(result.lunar.year).name },
              ]}
            />
          </Card>
          <LunarBirthdays month={result.lunar.month} day={result.lunar.day} isLeap={result.lunar.isLeap} />
        </>
      )}

      <Card title="양력이란?">
        <p className="mb-3">
          양력(陽曆)은 지구가 태양을 한 바퀴 도는 주기를 기준으로 만든 달력으로, 전 세계 대부분의
          나라가 공식적으로 사용합니다. 지금 쓰는 양력은 1582년 교황 그레고리우스 13세가 제정한
          그레고리력입니다.
        </p>
        <p>
          한국은 1896년 1월 1일부터 공식적으로 양력을 사용했습니다. 지금은 공공기관, 공식 문서, 법정
          기념일 대부분이 양력 기준이지만, 설날·추석·부처님오신날은 여전히 음력으로 정합니다.
        </p>
      </Card>

      <Card title="양력이 필요한 경우">
        <BulletList
          items={[
            <>
              <strong className="text-ink">공식 문서 작성:</strong> 주민등록증, 여권, 각종 증명서는 모두
              양력을 사용합니다.
            </>,
            <>
              <strong className="text-ink">음력 생일·제사 챙기기:</strong> 음력 날짜는 해마다 양력
              날짜가 바뀌므로, 달력이나 휴대전화 일정에 넣으려면 그해 양력 날짜로 바꿔야 합니다.
            </>,
            <>
              <strong className="text-ink">양력 기념일:</strong> 신정(1월 1일), 삼일절(3월 1일),
              어린이날(5월 5일), 광복절(8월 15일), 개천절(10월 3일), 크리스마스(12월 25일) 등
            </>,
          ]}
        />
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "음력 생일을 양력으로 바꾸면 매년 날짜가 다른가요?",
              "네. 음력 1년은 양력보다 약 11일 짧고 2~3년마다 윤달이 들어가기 때문에, 같은 음력 날짜가 양력으로는 해마다 약 한 달 범위 안에서 오르내립니다. 설날이 1월 하순부터 2월 중순 사이를 오가는 것도 같은 이유입니다.",
            ],
            [
              "윤달은 어떻게 입력하나요?",
              "윤달 여부에서 '윤달'을 고르고 입력하세요. 그해에 해당 윤달이 없으면 그해의 실제 윤달을 알려 드립니다. 예를 들어 2023년에는 윤2월이 있었습니다.",
            ],
            [
              "한국은 언제부터 양력을 썼나요?",
              "1896년 1월 1일(건양 원년)부터 공식적으로 양력을 사용했습니다. 그 뒤에도 명절과 집안 행사는 음력을 함께 써 왔습니다.",
            ],
          ]}
        />
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            `음력 ${LUNAR_MIN_YEAR}년부터 ${LUNAR_MAX_YEAR}년까지 변환할 수 있습니다.`,
            "음력은 달마다 29일 또는 30일입니다. 입력한 날짜가 그달에 없으면 몇 일까지 있는지 알려 드립니다.",
            "중국 기준 역법 데이터로 계산합니다. 한국천문연구원의 음력과 아주 드물게 하루 차이가 나는 날이 있으니, 중요한 행사 날짜는 한 번 더 확인하세요.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
