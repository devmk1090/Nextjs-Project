import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPage, { subPageCard } from "../../../components/SubPage";
import { daysBetween, formatDate, formatDateWithWeekday, weekdayNames } from "../../../lib/date";
import { josa } from "../../../lib/josa";
import { Faq } from "../../../lib/structuredData";
import { toolPath } from "../../../tools";
import { eventDateInYear, holidayDays, mayHaveSubstitute, nextEventDate, todayKST } from "../eventDates";
import { ddayEventPath, ddayEvents, getDdayEvent } from "../events";

// 남은 날짜가 매일 바뀌므로 1시간마다 다시 생성합니다.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ddayEvents.map((e) => ({ event: e.slug }));
}

type Props = { params: Promise<{ event: string }> };

const ddayText = (diff: number) => (diff === 0 ? "D-day" : `D-${diff}`);
// "2026년 12월 25일 금요일"
const longDate = (date: Date) => `${formatDate(date)} ${weekdayNames[date.getDay()]}요일`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getDdayEvent((await params).event);
  if (!event) return {};
  const today = todayKST();
  const date = nextEventDate(event, today);
  const diff = daysBetween(today, date);
  return {
    title: {
      absolute: `${event.name}까지 며칠 남았을까? ${ddayText(diff)}, ${longDate(date)}`,
    },
    description: `${josa(event.name, "은/는")} ${longDate(date)}이고, 오늘부터 ${diff}일 남았습니다. ${
      event.calendar === "lunar" ? `음력 ${event.month}월 ${event.day}일이라 해마다 양력 날짜가 바뀝니다. ` : ""
    }앞으로 5년간 ${event.name} 날짜와 요일, ${event.threeDays ? "연휴 기간, " : ""}대체공휴일 여부를 정리했습니다.`,
    alternates: { canonical: ddayEventPath(event.slug) },
  };
}

export default async function DdayEventPage({ params }: Props) {
  const event = getDdayEvent((await params).event);
  if (!event) notFound();

  const today = todayKST();
  const date = nextEventDate(event, today);
  const diff = daysBetween(today, date);
  const days = holidayDays(event, date);
  const upcoming = Array.from({ length: 5 }, (_, i) => date.getFullYear() + i)
    .map((year) => ({ year, date: eventDateInYear(event, year) }))
    .filter((row): row is { year: number; date: Date } => row.date !== null);

  const faqs: Faq[] = [
    {
      question: `${date.getFullYear()}년 ${josa(event.name, "은/는")} 무슨 요일인가요?`,
      answer: `${formatDateWithWeekday(date)}입니다.${
        event.threeDays
          ? ` 연휴는 ${formatDateWithWeekday(days[0])}부터 ${formatDateWithWeekday(days[2])}까지 3일입니다.`
          : ""
      }`,
    },
    {
      question: `${josa(event.name, "이/가")} 주말과 겹치면 대체공휴일이 있나요?`,
      answer: event.substitute
        ? event.threeDays
          ? `설날·추석 연휴가 일요일이나 다른 공휴일과 겹치면 연휴 다음 첫 평일이 대체공휴일이 됩니다(공휴일에 관한 법률).`
          : `${josa(event.name, "이/가")} 토요일이나 일요일과 겹치면 다음 첫 평일이 대체공휴일이 됩니다(공휴일에 관한 법률).`
        : `${josa(event.name, "은/는")} 대체공휴일 적용 대상이 아니어서 주말과 겹쳐도 따로 쉬는 날이 생기지 않습니다.`,
    },
  ];
  if (event.calendar === "lunar") {
    faqs.push({
      question: `${josa(event.name, "은/는")} 왜 해마다 날짜가 바뀌나요?`,
      answer: `${josa(event.name, "은/는")} 음력 ${event.month}월 ${event.day}일이기 때문입니다. 음력 1년은 양력보다 약 11일 짧고 2~3년마다 윤달이 들어가서, 양력으로는 해마다 약 한 달 범위 안에서 날짜가 바뀝니다.`,
    });
  }

  return (
    <SubPage
      crumbs={[
        { name: "홈", path: "/" },
        { name: "디데이 계산기", path: toolPath("dday-calculator") },
        { name: `${event.name} D-day`, path: ddayEventPath(event.slug) },
      ]}
      title={`${event.name}까지 며칠 남았을까?`}
      lead={event.desc}
      faqs={faqs}
    >
      <section className={subPageCard}>
        <p className="text-[15px] text-ink-3">
          {date.getFullYear()}년 {event.name} · {formatDateWithWeekday(date)}
        </p>
        <p className="text-5xl font-extrabold tracking-tight text-brand mt-1">{ddayText(diff)}</p>
        <p className="text-sm text-ink-3 mt-2">
          {diff === 0 ? `오늘이 바로 ${event.name} 당일입니다.` : `오늘부터 ${diff.toLocaleString("ko-KR")}일 남았습니다.`}
          {event.calendar === "lunar" && ` (음력 ${event.month}월 ${event.day}일)`}
        </p>
        {event.threeDays && (
          <div className="grid grid-cols-3 gap-2.5 mt-5">
            {days.map((d, i) => (
              <div key={i} className={`rounded-2xl p-4 ${i === 1 ? "bg-brand-soft" : "bg-canvas"}`}>
                <p className="text-[13px] text-ink-3">{["연휴 첫날", event.name, "연휴 마지막 날"][i]}</p>
                <p className="font-extrabold text-ink">
                  {d.getMonth() + 1}/{d.getDate()} ({weekdayNames[d.getDay()]})
                </p>
              </div>
            ))}
          </div>
        )}
        {mayHaveSubstitute(event, date) && (
          <p className="mt-5 pt-5 border-t border-line text-[15px]">
            올해 {event.threeDays ? `${event.name} 연휴가 일요일과` : `${josa(event.name, "이/가")} 주말과`} 겹쳐 대체공휴일이 생길 수 있습니다. 정확한 날짜는
            정부 발표를 확인하세요.
          </p>
        )}
      </section>

      <section className={subPageCard}>
        <h2>앞으로 5년 {event.name} 날짜</h2>
        <ul className="divide-y divide-canvas">
          {upcoming.map((row) => (
            <li key={row.year} className="flex items-center justify-between gap-3 py-3">
              <span className="font-bold text-ink">{row.year}년</span>
              <span className="text-right">
                <span className="block text-ink-2">{formatDateWithWeekday(row.date)}</span>
                {event.threeDays && (
                  <span className="block text-sm text-ink-4">
                    연휴 {formatDateWithWeekday(holidayDays(event, row.date)[0]).replace(/^\d+년 /, "")} ~{" "}
                    {formatDateWithWeekday(holidayDays(event, row.date)[2]).replace(/^\d+년 /, "")}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={subPageCard}>
        <h2>다른 명절·기념일까지 남은 날</h2>
        <div className="flex flex-wrap gap-2">
          {ddayEvents
            .filter((e) => e.slug !== event.slug)
            .map((e) => (
              <Link
                key={e.slug}
                href={ddayEventPath(e.slug)}
                className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
              >
                {e.name}
              </Link>
            ))}
        </div>
        <p className="text-sm text-ink-3 mt-4">
          다른 날짜까지 남은 날은{" "}
          <Link href={toolPath("dday-calculator")} className="text-brand font-bold">
            디데이 계산기
          </Link>
          에서 직접 계산할 수 있습니다.
        </p>
      </section>
    </SubPage>
  );
}
