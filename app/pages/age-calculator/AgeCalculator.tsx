"use client";

import Link from "next/link";
import { useState } from "react";
import { birthYearPath, hasBirthYearPage } from "./birthYearPath";

const animals = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];

type Result = {
  birthYear: number;
  baseDate: Date;
  age: number;
  countingAge: number;
  yearAge: number;
  animal: string;
  nextBirthday: Date;
  daysToBirthday: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function calculate(year: number, month: number, day: number): Result | string {
  const birth = new Date(year, month - 1, day);
  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day
  ) {
    return "존재하지 않는 날짜입니다. 생년월일을 다시 확인하세요.";
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (birth > today) return "생년월일이 오늘보다 늦습니다.";

  // 만 나이: 올해 생일이 지나지 않았으면 1을 뺌
  let age = today.getFullYear() - year;
  const beforeBirthday =
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day);
  if (beforeBirthday) age--;

  // 다음 생일 (2월 29일생은 평년에 3월 1일로 넘어감)
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  if (nextBirthday <= today) nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);

  return {
    birthYear: year,
    baseDate: today,
    age,
    countingAge: today.getFullYear() - year + 1,
    yearAge: today.getFullYear() - year,
    animal: animals[(((year - 4) % 12) + 12) % 12],
    nextBirthday,
    daysToBirthday: Math.round((nextBirthday.getTime() - today.getTime()) / DAY_MS),
  };
}

const formatDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const card = "bg-white rounded-3xl p-6 sm:p-7";
const cardTitle = "text-xl font-extrabold text-ink mb-4";
const field =
  "flex items-center h-14 rounded-2xl bg-canvas px-4 gap-1.5 focus-within:ring-2 focus-within:ring-brand";

export default function AgeCalculator({ children }: { children?: React.ReactNode }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const onlyDigits = (value: string, max: number) => value.replace(/[^0-9]/g, "").slice(0, max);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (year.length !== 4 || !month || !day) {
      setResult(null);
      setError("생년월일을 모두 입력하세요. 연도는 4자리입니다.");
      return;
    }
    const outcome = calculate(Number(year), Number(month), Number(day));
    if (typeof outcome === "string") {
      setResult(null);
      setError(outcome);
    } else {
      setError("");
      setResult(outcome);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-4 text-ink-2 leading-relaxed">
      <nav aria-label="현재 위치" className="text-sm text-ink-4 flex gap-2">
        <Link href="/" className="hover:text-ink">
          홈
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-ink-2">만 나이 계산기</span>
      </nav>
      <div className="pb-2">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink">
          만 나이 계산기
        </h1>
        <p className="text-ink-3 mt-1">
          2023년 6월 28일부터 법령과 공문서의 나이는 만 나이로 통일되었습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`${card} flex flex-col gap-5`}>
        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-[15px] font-bold text-ink-2 mb-2.5">생년월일</legend>
          <div className="grid grid-cols-3 gap-2.5">
            <label className={field}>
              <input
                inputMode="numeric"
                value={year}
                onChange={(e) => setYear(onlyDigits(e.target.value, 4))}
                placeholder="1990"
                aria-label="년"
                className="flex-1 min-w-0 bg-transparent outline-none text-lg font-bold text-ink placeholder:text-ink-4 placeholder:font-medium"
              />
              <span className="text-ink-4">년</span>
            </label>
            <label className={field}>
              <input
                inputMode="numeric"
                value={month}
                onChange={(e) => setMonth(onlyDigits(e.target.value, 2))}
                placeholder="5"
                aria-label="월"
                className="flex-1 min-w-0 bg-transparent outline-none text-lg font-bold text-ink placeholder:text-ink-4 placeholder:font-medium"
              />
              <span className="text-ink-4">월</span>
            </label>
            <label className={field}>
              <input
                inputMode="numeric"
                value={day}
                onChange={(e) => setDay(onlyDigits(e.target.value, 2))}
                placeholder="15"
                aria-label="일"
                className="flex-1 min-w-0 bg-transparent outline-none text-lg font-bold text-ink placeholder:text-ink-4 placeholder:font-medium"
              />
              <span className="text-ink-4">일</span>
            </label>
          </div>
        </fieldset>
        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="h-14 rounded-2xl bg-brand hover:bg-brand-hover text-white text-[17px] font-bold transition"
        >
          계산하기
        </button>
      </form>

      {result && (
        <section aria-label="계산 결과" aria-live="polite" className={`${card} flex flex-col gap-5`}>
          <div>
            <p className="text-[15px] text-ink-3">{formatDate(result.baseDate)} 기준 만 나이</p>
            <p className="text-5xl sm:text-[52px] font-extrabold tracking-tight text-brand mt-1">
              {result.age}세
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              ["세는 나이", `${result.countingAge}세`],
              ["연 나이", `${result.yearAge}세`],
              ["띠", `${result.animal}띠`],
            ].map(([label, value]) => (
              <div key={label} className="bg-canvas rounded-2xl p-4">
                <p className="text-[13px] text-ink-3">{label}</p>
                <p className="text-xl font-extrabold text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <p className="text-[15px] text-ink-2">
              다음 생일까지 <strong>{result.daysToBirthday}일</strong> ({formatDate(result.nextBirthday)})
            </p>
            {hasBirthYearPage(result.birthYear) && (
              <Link href={birthYearPath(result.birthYear)} className="text-[15px] font-bold text-brand">
                {result.birthYear}년생 정보 더 보기 ›
              </Link>
            )}
          </div>
        </section>
      )}

      <section className={card}>
        <h2 className={cardTitle}>만 나이란?</h2>
        <p className="mb-3">
          만 나이는 국제적으로 통용되는 나이 계산 방식으로, 태어난 날을 0세로 시작하여 생일이 지날
          때마다 1살씩 나이가 증가하는 방식입니다. 2023년 6월부터 한국에서도 공식적으로 만 나이를
          사용하게 되었습니다.
        </p>
        <p>
          기존에 한국에서 사용하던 세는 나이(태어나자마자 1세, 1월 1일마다 증가)와 달리, 만 나이는
          실제로 살아온 기간을 정확하게 반영합니다.
        </p>
      </section>

      <section className={card}>
        <h2 className={cardTitle}>한국의 세 가지 나이 계산법</h2>
        <div className="overflow-x-auto mb-5">
          <table className="w-full min-w-[480px] text-[15px] text-left">
            <thead className="text-ink-3">
              <tr className="border-b border-line">
                <th className="py-2.5 pr-3 font-medium">구분</th>
                <th className="py-2.5 px-3 font-medium">계산법</th>
                <th className="py-2.5 pl-3 font-medium">쓰이는 곳</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas">
              <tr>
                <td className="py-3.5 pr-3 font-bold text-ink">만 나이</td>
                <td className="py-3.5 px-3">0세에서 시작, 생일마다 1살</td>
                <td className="py-3.5 pl-3">법령, 공문서, 의료</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-3 font-bold text-ink">세는 나이</td>
                <td className="py-3.5 px-3">1세에서 시작, 1월 1일마다 1살</td>
                <td className="py-3.5 pl-3">일상 대화(관습)</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-3 font-bold text-ink">연 나이</td>
                <td className="py-3.5 px-3">올해 연도 − 출생 연도</td>
                <td className="py-3.5 pl-3">청소년보호법, 병역법</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-ink mb-1">1. 만 나이 (국제 나이)</h3>
            <p>
              태어난 날을 0세로 시작하여 생일이 돌아올 때마다 1살씩 증가합니다. 2023년 6월 28일부터
              대한민국에서 법적으로 사용하는 공식 나이 계산법입니다. 법률, 의료, 행정 등 모든 공식
              문서에서 만 나이를 사용합니다.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-ink mb-1">2. 세는 나이 (한국식 나이)</h3>
            <p>
              태어나자마자 1세가 되고, 1월 1일이 되면 나이가 1살 증가합니다. 과거 한국에서
              전통적으로 사용하던 방식으로, 현재는 일상 대화에서만 간혹 사용됩니다. 만 나이보다
              1~2살 많게 계산됩니다.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-ink mb-1">3. 연 나이</h3>
            <p>
              현재 연도에서 출생 연도를 뺀 나이입니다. 생일이 지났는지 여부와 관계없이 계산됩니다.
              주로 학년을 구분하거나 병역 판정 등에 사용되었습니다.
            </p>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className={cardTitle}>만 나이 통일법 (2023년 시행)</h2>
        <p className="mb-3">
          2023년 6월 28일부터 「행정기본법」 개정으로 대한민국에서는 모든 법령과 공식 문서에서 만
          나이를 사용하도록 통일되었습니다. 이는 국제 기준에 맞추고 나이 계산의 혼란을 없애기 위한
          조치입니다.
        </p>
        <p>
          다만 일부 법률(예: 청소년보호법, 병역법 등)은 특정 연도 출생자를 기준으로 하는 연 나이를
          계속 사용할 수 있으며, 전통적인 관습에서는 세는 나이를 사용할 수 있습니다.
        </p>
      </section>

      <section className={card}>
        <h2 className={cardTitle}>만 나이가 필요한 경우</h2>
        <ul className="space-y-2.5">
          {[
            ["공식 문서 작성", "주민등록, 여권, 운전면허증 등 모든 신분증과 공식 서류"],
            ["의료 기록", "병원 진료, 건강검진, 예방접종 등 의료 관련 기록"],
            ["법적 계약", "보험 가입, 부동산 계약, 금융 거래 등"],
            ["국제 교류", "해외 유학, 이민, 국제결혼 등 외국과의 소통"],
            ["복지 혜택", "각종 정부 지원금, 노인 복지, 아동 수당 등의 연령 기준"],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>
                <strong className="text-ink">{title}:</strong> {desc}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className={cardTitle}>자주 묻는 질문</h2>
        <div className="divide-y divide-canvas">
          {[
            [
              "생일이 지나지 않았으면 어떻게 계산하나요?",
              "생일이 지나지 않았다면 현재 연도에서 출생 연도를 뺀 값에서 1을 뺍니다. 예를 들어 2000년생이 2024년 2월에는 만 23세이지만, 생일 이후에는 만 24세가 됩니다.",
            ],
            [
              "윤년 2월 29일생은 어떻게 계산하나요?",
              "윤년이 아닌 해에는 보통 2월 28일이나 3월 1일을 생일로 간주합니다. 법적으로는 2월 28일 24시에 나이가 증가하는 것으로 봅니다.",
            ],
            [
              "만 나이와 세는 나이의 차이는 얼마인가요?",
              "생일이 지났다면 1살, 생일이 지나지 않았다면 2살 차이가 납니다. 예를 들어 생일이 지난 사람이 만 20세라면 세는 나이로는 21세, 생일 전이라면 세는 나이로는 22세입니다.",
            ],
            [
              "일상 대화에서도 만 나이를 써야 하나요?",
              "법적으로 강제되는 것은 공식 문서와 행정 절차입니다. 일상 대화에서는 개인의 선택이지만, 혼란을 줄이기 위해 만 나이 사용을 권장합니다.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="py-4 first:pt-0 last:pb-0">
              <h3 className="font-bold text-ink mb-1.5">{q}</h3>
              <p className="text-ink-3">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={cardTitle}>계산기 사용 팁</h2>
        <ul className="space-y-2">
          {[
            "정확한 만 나이를 알고 싶다면 생년월일을 정확히 입력하세요.",
            "계산 결과는 오늘 날짜를 기준으로 자동 계산됩니다.",
            "공식 문서 작성 시 이 계산기로 확인한 만 나이를 사용하시면 됩니다.",
          ].map((tip) => (
            <li key={tip} className="flex gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {children}
    </main>
  );
}
