"use client";

import { useState } from "react";
import {
  BulletList,
  Card,
  ErrorText,
  FaqList,
  Field,
  PrimaryButton,
  ResultHero,
  StatGrid,
  ToolPage,
  inputClass,
} from "../../components/tool/ToolUI";
import { digitsOnly, koreanWon, won } from "../../lib/format";

type WorkPeriod = {
  startDate: Date;
  totalDays: number;
  years: number;
  months: number;
  days: number;
  annualLeave: number;
  estimatedSeverance: number;
  salary: number;
};

const DAY_MS = 1000 * 60 * 60 * 24;

// 연차 (근로기준법 제60조)
// 1년 미만: 1개월 개근 시 1개씩, 최대 11개
// 1년 이상: 15개, 3년 이상부터 최초 1년을 초과하는 근속 2년마다 1개 가산, 최대 25개
const annualLeaveFor = (years: number, months: number) =>
  years < 1 ? Math.min(months, 11) : Math.min(15 + Math.floor((years - 1) / 2), 25);

const leaveTable = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21].map((years) => ({
  years,
  leave: annualLeaveFor(years, 0),
}));

const dateField =
  "flex items-center h-14 rounded-2xl bg-canvas px-4 gap-1.5 focus-within:ring-2 focus-within:ring-brand";
const dateInput =
  "flex-1 min-w-0 bg-transparent outline-none text-lg font-bold text-ink placeholder:text-ink-4 placeholder:font-medium";

export default function WorkPeriodCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [result, setResult] = useState<WorkPeriod | null>(null);
  const [error, setError] = useState("");

  const salaryValue = Number(annualSalary);

  const fail = (message: string) => {
    setResult(null);
    setError(message);
  };

  const calculateWorkPeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (year.length !== 4 || !month || !day) return fail("입사일을 모두 입력하세요. 연도는 4자리입니다.");

    const startYear = Number(year);
    const startMonth = Number(month);
    const startDay = Number(day);
    const start = new Date(startYear, startMonth - 1, startDay);
    if (
      start.getFullYear() !== startYear ||
      start.getMonth() !== startMonth - 1 ||
      start.getDate() !== startDay
    ) {
      return fail("존재하지 않는 날짜입니다. 입사일을 다시 확인하세요.");
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (start > today) return fail("입사일은 오늘이나 그 이전 날짜여야 합니다.");

    const totalDays = Math.round((today.getTime() - start.getTime()) / DAY_MS);

    // 년, 월, 일 계산
    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // 퇴직금 예상: 연봉 ÷ 12 × 근속연수 (계속근로기간 1년 이상일 때만, 근로자퇴직급여 보장법 제8조)
    const estimatedSeverance =
      salaryValue > 0 && years >= 1 ? Math.floor((salaryValue / 12) * (totalDays / 365)) : 0;

    setError("");
    setResult({
      startDate: start,
      totalDays,
      years,
      months,
      days,
      annualLeave: annualLeaveFor(years, months),
      estimatedSeverance,
      salary: salaryValue,
    });
  };

  const severanceText = (r: WorkPeriod) => {
    if (r.years < 1) return "대상 아님";
    if (r.salary > 0) return `약 ${won(r.estimatedSeverance)}원`;
    return "연봉 입력 시 계산";
  };

  return (
    <ToolPage
      slug="work-period-calculator"
      subtitle="입사일로 오늘까지의 근무 기간, 올해 연차 개수, 예상 퇴직금을 계산합니다."
    >
      <form onSubmit={calculateWorkPeriod} className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5">
        <fieldset className="flex flex-col">
          <legend className="text-[15px] font-bold text-ink-2 mb-2">입사일</legend>
          <div className="grid grid-cols-3 gap-2.5">
            <label className={dateField}>
              <input
                inputMode="numeric"
                aria-label="입사 연도"
                value={year}
                onChange={(e) => setYear(digitsOnly(e.target.value).slice(0, 4))}
                placeholder="2020"
                className={dateInput}
              />
              <span className="text-ink-4">년</span>
            </label>
            <label className={dateField}>
              <input
                inputMode="numeric"
                aria-label="입사 월"
                value={month}
                onChange={(e) => setMonth(digitsOnly(e.target.value).slice(0, 2))}
                placeholder="3"
                className={dateInput}
              />
              <span className="text-ink-4">월</span>
            </label>
            <label className={dateField}>
              <input
                inputMode="numeric"
                aria-label="입사 일"
                value={day}
                onChange={(e) => setDay(digitsOnly(e.target.value).slice(0, 2))}
                placeholder="2"
                className={dateInput}
              />
              <span className="text-ink-4">일</span>
            </label>
          </div>
        </fieldset>

        <Field
          label="연봉 (선택)"
          htmlFor="annual-salary"
          hint={salaryValue > 0 ? koreanWon(salaryValue) : "입력하면 예상 퇴직금을 함께 계산합니다"}
        >
          <input
            id="annual-salary"
            inputMode="numeric"
            value={annualSalary ? salaryValue.toLocaleString("ko-KR") : ""}
            onChange={(e) => setAnnualSalary(digitsOnly(e.target.value).slice(0, 12))}
            placeholder="40,000,000"
            className={inputClass}
          />
        </Field>

        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton type="submit">계산하기</PrimaryButton>
      </form>

      {result && (
        <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero
            label={`${result.startDate.getFullYear()}년 ${result.startDate.getMonth() + 1}월 ${result.startDate.getDate()}일 입사 · 오늘까지`}
            value={`${result.years}년 ${result.months}개월 ${result.days}일`}
            sub={`총 ${result.totalDays.toLocaleString("ko-KR")}일, 약 ${Math.floor(result.totalDays / 7).toLocaleString("ko-KR")}주`}
          />
          <StatGrid
            items={[
              { label: result.years < 1 ? "지금까지 발생한 연차" : "올해 연차", value: `${result.annualLeave}개` },
              { label: "예상 퇴직금 (세전)", value: severanceText(result) },
              { label: "퇴직금 대상", value: result.years >= 1 ? "해당" : "1년 미만" },
            ]}
          />
          <p className="text-sm text-ink-3 border-t border-line pt-4">
            {result.years < 1
              ? "1년 미만은 1개월 개근할 때마다 연차가 1개씩 생깁니다(최대 11개). 퇴직금은 1년 이상 근무해야 받을 수 있습니다."
              : "1년 이상은 기본 15개에 3년차부터 2년마다 1개씩 늘어납니다(최대 25개). 퇴직금은 연봉 ÷ 12 × 근속연수로 어림한 값입니다."}
          </p>
        </Card>
      )}

      <Card title="근속연수별 연차 개수">
        <p className="mb-4">
          근로기준법 제60조에 따라 1년간 80% 이상 출근하면 15개의 유급휴가가 생기고, 3년 이상 근무하면
          최초 1년을 넘는 근속 2년마다 1개씩 늘어 최대 25개까지 받습니다.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          <div className="bg-canvas rounded-2xl p-3 text-center">
            <p className="text-[13px] text-ink-3">1년 미만</p>
            <p className="font-extrabold text-ink">월 1개</p>
          </div>
          {leaveTable.map((row) => (
            <div key={row.years} className="bg-canvas rounded-2xl p-3 text-center">
              <p className="text-[13px] text-ink-3">{row.years === 21 ? "21년 이상" : `${row.years}년`}</p>
              <p className="font-extrabold text-ink">{row.leave}개</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="퇴직금 계산 방법">
        <p className="mb-3">
          법정 퇴직금은 <strong className="text-ink">1일 평균임금 × 30일 × (재직일수 ÷ 365)</strong>
          입니다. 1일 평균임금은 퇴직 전 3개월 동안 받은 임금 총액을 그 기간의 총 일수로 나눈 값이며,
          정기 상여금과 연차수당 일부도 포함됩니다.
        </p>
        <p>
          이 계산기는 연봉을 12로 나눈 월급에 근속연수를 곱해 어림합니다. 상여금 비중이 크거나 퇴직 직전
          임금이 바뀐 경우에는 실제 퇴직금과 차이가 날 수 있으니, 정확한 금액은 회사나 고용노동부
          퇴직금 계산기로 확인하세요.
        </p>
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "1년 미만 근무자도 연차가 있나요?",
              "있습니다. 입사 후 1년 동안은 1개월 개근할 때마다 1개씩, 최대 11개의 연차가 생깁니다(근로기준법 제60조 제2항).",
            ],
            [
              "퇴직금은 언제까지 받아야 하나요?",
              "회사는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 합니다. 당사자끼리 합의하면 지급 기일을 연장할 수 있습니다(근로자퇴직급여 보장법 제9조).",
            ],
            [
              "아르바이트도 퇴직금과 연차를 받나요?",
              "1년 이상 일했고 4주 평균 1주 소정근로시간이 15시간 이상이면 아르바이트도 퇴직금과 연차를 받습니다. 주 15시간 미만이면 둘 다 적용되지 않습니다.",
            ],
          ]}
        />
      </Card>

      <Card title="참고 사항">
        <BulletList
          items={[
            "연차는 출근율 80% 이상을 가정하며, 표시되는 개수는 현재 근속연수에 해당하는 연간 발생 개수입니다.",
            "회계연도 기준으로 연차를 부여하는 회사는 입사 연도에 따라 개수가 다를 수 있습니다.",
            "연차 사용 촉진, 미사용 연차수당, 이월 규정은 회사마다 다릅니다.",
            "퇴직금은 세전 금액이며, 실제로는 퇴직소득세가 원천징수됩니다.",
          ]}
        />
      </Card>
    </ToolPage>
  );
}
