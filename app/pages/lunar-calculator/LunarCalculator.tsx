"use client";

import { useEffect, useState } from "react";
import LunarBirthdays from "../../components/tool/LunarBirthdays";
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
  emptyDateParts,
  formatDateWithWeekday,
  parseDateParts,
  weekdayNames,
} from "../../lib/date";
import { LUNAR_MAX_YEAR, LUNAR_MIN_YEAR, formatLunar, lunarToSolar, solarToLunar } from "../../lib/lunar";

const holidays = [
  { name: "설날", month: 1, day: 1, desc: "한국의 가장 큰 명절로, 새해의 첫날입니다. 떡국을 먹고 세배를 드리며, 가족들이 모여 차례를 지냅니다." },
  { name: "정월대보름", month: 1, day: 15, desc: "한 해의 첫 보름달이 뜨는 날로, 오곡밥과 나물을 먹고 부럼을 깨며 건강을 기원합니다." },
  { name: "삼짇날", month: 3, day: 3, desc: "봄을 맞이하는 명절로, 진달래전을 먹고 봄나들이를 떠나는 풍습이 있습니다." },
  { name: "부처님오신날", month: 4, day: 8, desc: "석가탄신일로, 사찰에서는 연등을 밝히고 법회를 엽니다. 법정 공휴일입니다." },
  { name: "단오", month: 5, day: 5, desc: "창포물에 머리를 감고 그네뛰기, 씨름 등의 민속놀이를 즐기는 명절입니다." },
  { name: "추석", month: 8, day: 15, desc: "설날과 함께 2대 명절로, 햅쌀로 송편을 빚고 차례를 지냅니다. 한가위라고도 부릅니다." },
];

type Result = { solar: Date; lunar: ReturnType<typeof solarToLunar> };

export default function LunarCalculator() {
  const [parts, setParts] = useState<DateParts>(emptyDateParts);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  // 명절의 올해 양력 날짜는 접속한 날 기준으로 화면에서 계산
  const [holidayDates, setHolidayDates] = useState<{ year: number; dates: (Date | string)[] } | null>(null);

  useEffect(() => {
    const year = new Date().getFullYear();
    setHolidayDates({
      year,
      dates: holidays.map((h) => lunarToSolar({ year, month: h.month, day: h.day, isLeap: false })),
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const solar = parseDateParts(parts, "양력 날짜");
    if (typeof solar === "string") {
      setResult(null);
      setError(solar);
      return;
    }
    if (solar.getFullYear() < LUNAR_MIN_YEAR || solar.getFullYear() >= LUNAR_MAX_YEAR) {
      setResult(null);
      setError(`${LUNAR_MIN_YEAR}년부터 ${LUNAR_MAX_YEAR - 1}년까지의 날짜만 변환할 수 있습니다.`);
      return;
    }
    setError("");
    setResult({ solar, lunar: solarToLunar(solar) });
  };

  return (
    <ToolPage
      slug="lunar-calculator"
      subtitle="양력 날짜를 음력으로 바꾸고, 그 음력 날짜가 앞으로 양력으로 언제인지 알려 줍니다."
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <DateFields
          legend="양력 날짜"
          value={parts}
          onChange={setParts}
          placeholder={{ year: "1990", month: "5", day: "15" }}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">음력으로 변환하기</PrimaryButton>
      </form>

      {result && (
        <>
          <Card aria-label="변환 결과" aria-live="polite" className="flex flex-col gap-5">
            <ResultHero
              label={`양력 ${formatDateWithWeekday(result.solar)}`}
              value={formatLunar(result.lunar).replace("음력 ", "")}
              sub={`음력 · ${result.lunar.ganzhi.name}(${result.lunar.ganzhi.hanja}) ${result.lunar.ganzhi.animal}띠 해`}
            />
            <StatGrid
              items={[
                { label: "윤달 여부", value: result.lunar.isLeap ? `윤${result.lunar.month}월` : "평달" },
                {
                  label: "그달의 크기",
                  value: result.lunar.monthDays === 30 ? "큰달 (30일)" : "작은달 (29일)",
                },
                { label: "요일", value: `${weekdayNames[result.solar.getDay()]}요일` },
              ]}
            />
            {result.lunar.isLeap && (
              <p className="text-sm text-ink-3 border-t border-line pt-4">
                윤달에 태어났다면 같은 윤달이 없는 해에는 보통 평달 {result.lunar.month}월{" "}
                {result.lunar.day}일에 생일을 지냅니다.
              </p>
            )}
          </Card>
          <LunarBirthdays month={result.lunar.month} day={result.lunar.day} isLeap={result.lunar.isLeap} />
        </>
      )}

      <Card title="음력이란?">
        <p className="mb-3">
          음력(陰曆)은 달이 차고 기우는 주기를 기준으로 만든 달력입니다. 한 달은 29일(작은달) 또는
          30일(큰달)이고, 12개월은 약 354일로 양력보다 약 11일 짧습니다.
        </p>
        <p>
          이 차이를 맞추기 위해 대략 19년에 7번, 즉 2~3년에 한 번씩 한 달을 더 넣는데 이를
          윤달이라고 합니다. 그래서 음력 날짜를 양력으로 옮기면 해마다 날짜가 달라집니다.
        </p>
      </Card>

      <Card title="음력과 양력의 차이">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-[15px]">
            <thead className="text-ink-3 text-left">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">구분</th>
                <th className="py-2.5 px-3 font-medium">음력</th>
                <th className="py-2.5 pl-3 font-medium">양력</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              {[
                ["기준", "달의 차고 기움", "지구의 공전(태양)"],
                ["한 달", "29일 또는 30일", "28~31일"],
                ["1년", "약 354일 (윤달 있는 해는 13개월)", "365일 (윤년 366일)"],
                ["보정", "윤달", "윤년(2월 29일)"],
                ["쓰임", "명절, 제사, 음력 생일", "공식 문서, 일상생활"],
              ].map(([label, lunar, solar]) => (
                <tr key={label}>
                  <td className="py-3 pr-3 font-bold text-ink">{label}</td>
                  <td className="py-3 px-3">{lunar}</td>
                  <td className="py-3 pl-3">{solar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="음력으로 지내는 명절">
        <ul className="divide-y divide-canvas">
          {holidays.map((h, i) => {
            const date = holidayDates?.dates[i];
            return (
              <li key={h.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-bold text-ink">
                    {h.name} <span className="font-medium text-ink-3">(음력 {h.month}월 {h.day}일)</span>
                  </h3>
                  {date instanceof Date && (
                    <span className="text-sm font-bold text-brand">
                      {holidayDates?.year}년 {formatDateWithWeekday(date).replace(/^\d+년 /, "")}
                    </span>
                  )}
                </div>
                <p className="text-[15px] mt-1">{h.desc}</p>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "윤달에 태어나면 생일은 언제인가요?",
              "윤달은 2~3년에 한 번, 그것도 해마다 다른 달에 들어갑니다. 그래서 윤달생은 같은 윤달이 없는 해에는 보통 평달의 같은 날을 생일로 지냅니다.",
            ],
            [
              "음력 30일생인데 그해 그달이 29일까지면요?",
              "음력은 달마다 29일 또는 30일이라 30일이 없는 해가 있습니다. 이럴 때는 그달 마지막 날인 29일에 지내는 경우가 많습니다.",
            ],
            [
              "공식 문서에는 어떤 생일을 쓰나요?",
              "주민등록, 여권 등 모든 공식 문서에는 양력 생일을 씁니다. 음력 생일은 집안 행사나 전통 의례에서만 쓰입니다.",
            ],
            [
              "띠는 음력과 양력 중 무엇으로 정하나요?",
              "띠는 음력 설날을 기준으로 바뀝니다. 양력 1~2월생은 그해 설날 전에 태어났다면 전해의 띠에 해당합니다.",
            ],
          ]}
        />
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            `${LUNAR_MIN_YEAR}년부터 ${LUNAR_MAX_YEAR - 1}년까지의 날짜를 변환할 수 있습니다.`,
            "중국 기준 역법 데이터로 계산합니다. 한국천문연구원의 음력과 아주 드물게 하루 차이가 나는 날이 있으니, 중요한 행사 날짜는 달력이나 한국천문연구원 자료로 한 번 더 확인하세요.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
