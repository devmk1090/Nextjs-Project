import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPage, { subPageCard } from "../../../components/SubPage";
import { Faq } from "../../../lib/structuredData";
import { toolPath } from "../../../tools";
import {
  ages,
  birthYears,
  currentGrade,
  currentYearKST,
  ganzhi,
  isValidBirthYear,
  manAgeText,
  milestones,
  pensionAge,
  schoolYears,
  shortYearLabel,
  yearBoundaries,
  yearHeadline,
} from "../birthYear";
import { birthYearPath } from "../birthYearPath";

// 나이는 해가 바뀌면 달라지므로 하루에 한 번 다시 생성합니다.
export const revalidate = 86400;

export function generateStaticParams() {
  return birthYears().map((year) => ({ year: String(year) }));
}

type Props = { params: Promise<{ year: string }> };

function parseYear(value: string) {
  if (!/^\d{4}$/.test(value)) return null;
  const year = Number(value);
  return isValidBirthYear(year) ? year : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = parseYear((await params).year);
  if (!year) return {};
  const currentYear = currentYearKST();
  const grade = currentGrade(year, currentYear);
  const short = shortYearLabel(year);
  const g = ganzhi(year);
  return {
    // 템플릿(%s | 올인원 유틸리티)을 붙이지 않아 검색 결과에서 핵심 정보가 잘리지 않게 함
    title: { absolute: `${year}년생(${short}) 나이 - ${yearHeadline(year, currentYear)}` },
    description: `${year}년생(${short})은 ${currentYear}년에 몇 살일까요? ${currentYear}년 기준 ${manAgeText(year, currentYear)}, 세는 나이 ${ages(year, currentYear).counting}세${grade ? `이고 3월 새 학년 기준 ${grade}입니다` : "입니다"}. ${g.name} ${g.colorAnimal}띠이며, 1·2월생의 띠 구분, 초·중·고 입학 연도, 국민연금 수령 나이까지 정리했습니다.`,
    alternates: { canonical: birthYearPath(year) },
  };
}

const formatStatus = (year: number, currentYear: number) => {
  if (year < currentYear) return "지남";
  if (year === currentYear) return "올해";
  return `${year - currentYear}년 후`;
};

export default async function BirthYearPage({ params }: Props) {
  const year = parseYear((await params).year);
  if (!year) notFound();

  const currentYear = currentYearKST();
  const age = ages(year, currentYear);
  const g = ganzhi(year);
  const prev = ganzhi(year - 1);
  const { seollal, ipchun } = yearBoundaries(year);
  const school = schoolYears(year);
  const grade = currentGrade(year, currentYear);
  const pension = pensionAge(year);
  const isNewborn = year === currentYear;
  const shortYear = String(year).slice(2);

  const sameAnimalYears = [-36, -24, -12, 12, 24, 36]
    .map((offset) => year + offset)
    .filter((y) => isValidBirthYear(y, currentYear));
  const nearbyYears = [-3, -2, -1, 1, 2, 3]
    .map((offset) => year + offset)
    .filter((y) => isValidBirthYear(y, currentYear));

  const faqs: Faq[] = [
    {
      question: `${year}년생(${shortYearLabel(year)})은 ${currentYear}년에 몇 살인가요?`,
      answer: isNewborn
        ? `${year}년에 태어났다면 만 나이는 0세이고, 첫 생일이 지나면 만 1세가 됩니다. 세는 나이로는 1세입니다.`
        : `만 나이로 생일 전에는 ${age.beforeBirthday}세, 생일이 지나면 ${age.afterBirthday}세입니다. 세는 나이(한국식 나이)로는 ${age.counting}세, 연 나이로는 ${age.yearAge}세입니다.`,
    },
    {
      question: `${year}년생은 무슨 띠인가요?`,
      answer: `${g.name}(${g.hanja}) ${g.colorAnimal}띠입니다. 다만 띠를 음력으로 따지면 설날(${seollal.month}월 ${seollal.day}일) 전에 태어난 사람은 ${prev.name} ${prev.animal}띠에 해당합니다.`,
    },
  ];
  if (grade) {
    faqs.push({
      question: `${year}년생은 ${currentYear}년에 몇 학년인가요?`,
      answer: `${currentYear}년 3월 새 학년 기준 ${grade}입니다. ${school.elementaryEntry}년 3월에 초등학교에 입학했고, ${school.highGraduation}년 2월에 고등학교를 졸업합니다. 조기 입학이나 입학 유예를 했다면 1년씩 달라집니다.`,
    });
  } else if (school.elementaryEntry > currentYear) {
    faqs.push({
      question: `${year}년생은 언제 초등학교에 입학하나요?`,
      answer: `${year}년생은 ${school.elementaryEntry}년 3월에 초등학교에 입학합니다. 1월생부터 12월생까지 같은 학년이며, 조기 입학이나 입학 유예를 신청하면 1년씩 달라질 수 있습니다.`,
    });
  }
  // 국민연금은 1988년 도입되어 1952년 이전 출생자는 특례가 많으므로 1953년생부터 안내
  if (year >= 1953) {
    faqs.push({
      question: `${year}년생은 국민연금을 언제부터 받나요?`,
      answer: `${year}년생의 노령연금 수령 개시 나이는 만 ${pension}세로, ${year + pension}년 생일이 속한 달의 다음 달부터 받을 수 있습니다(가입기간 10년 이상). 조기노령연금은 최대 5년 앞당겨 받을 수 있지만 연금액이 줄어듭니다.`,
    });
  }
  if (year >= 1960 && school.hasEarlyBirthCohort) {
    faqs.push({
      question: `빠른 ${shortYear}년생이란 무엇인가요?`,
      answer: `2008학년도까지는 3월생부터 이듬해 2월생까지 같은 학년이었습니다. 그래서 ${year}년 1·2월생은 보통 ${year - 1}년생과 함께 ${school.elementaryEntry - 1}년에 초등학교에 입학했고, 이들을 '빠른 ${shortYear}년생'이라고 부릅니다.`,
    });
  }

  return (
    <SubPage
      crumbs={[
        { name: "홈", path: "/" },
        { name: "만 나이 계산기", path: toolPath("age-calculator") },
        { name: `${year}년생`, path: birthYearPath(year) },
      ]}
      title={`${year}년생(${shortYearLabel(year)}) 나이 (${currentYear}년 기준)`}
      lead={`${year}년에 태어난 사람(${shortYearLabel(year)})의 ${currentYear}년 만 나이, 세는 나이, 띠, 학교 입학 연도와 나이 기준 제도를 정리했습니다. 생년월일로 정확히 계산하려면 만 나이 계산기를 이용하세요.`}
      faqs={faqs}
    >
      <section className={subPageCard}>
        <p className="text-[15px] text-ink-3">{currentYear}년 기준 만 나이</p>
        <p className="text-5xl font-extrabold tracking-tight text-brand mt-1">
          {isNewborn ? "0세" : `${age.beforeBirthday}~${age.afterBirthday}세`}
        </p>
        {!isNewborn && (
          <p className="text-sm text-ink-3 mt-2">
            생일 전 {age.beforeBirthday}세, 생일이 지나면 {age.afterBirthday}세
          </p>
        )}
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          {[
            ["세는 나이", `${age.counting}세`],
            ["연 나이", `${age.yearAge}세`],
            ["띠", `${g.animal}띠`],
          ].map(([label, value]) => (
            <div key={label} className="bg-canvas rounded-2xl p-4">
              <p className="text-[13px] text-ink-3">{label}</p>
              <p className="text-xl font-extrabold text-ink">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 pt-5 border-t border-line text-sm text-ink-3">
          2023년 6월 28일부터 법령과 공문서의 나이는 만 나이로 통일되었습니다. 생일이 지났는지에
          따라 만 나이가 1살 달라지므로, 정확한 나이는{" "}
          <Link href={toolPath("age-calculator")} className="text-brand font-bold">
            만 나이 계산기
          </Link>
          에 생년월일을 넣어 확인하세요.
        </p>
      </section>

      <section className={subPageCard}>
        <h2>
          {year}년생의 띠: {g.name}({g.hanja})
        </h2>
        <p className="mb-3">
          {year}년은 60갑자로 {g.name}입니다. 천간 &apos;{g.name[0]}&apos;의 색과 지지 &apos;
          {g.name[1]}&apos;의 동물을 합쳐 <strong>{g.colorAnimal}띠</strong>라고도 부릅니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-line">
                <th className="bg-canvas px-3 py-2 text-left w-40">{year}년 설날</th>
                <td className="px-3 py-2">
                  양력 {seollal.month}월 {seollal.day}일
                </td>
              </tr>
              <tr className="border-b border-line">
                <th className="bg-canvas px-3 py-2 text-left">{year}년 입춘</th>
                <td className="px-3 py-2">
                  양력 {ipchun.month}월 {ipchun.day}일
                </td>
              </tr>
              <tr>
                <th className="bg-canvas px-3 py-2 text-left">1·2월생의 띠</th>
                <td className="px-3 py-2">
                  설날 전 출생이면 음력으로 {prev.name}({prev.animal}띠)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-3">
          일상에서는 출생 연도로 띠를 말하는 경우가 많지만, 음력으로는 설날부터 새해가 시작되고 사주
          명리학에서는 입춘을 한 해의 시작으로 봅니다. 그래서 {year}년 1월 1일부터 설날 전날까지
          태어났다면 기준에 따라 {prev.animal}띠로 보기도 합니다. 띠별 성격과 궁합은{" "}
          <Link href={toolPath("zodiac-calculator")} className="text-brand font-bold">
            띠 계산기
          </Link>
          에서 볼 수 있습니다.
        </p>
      </section>

      {year >= 1960 && (
        <section className={subPageCard}>
          <h2>{year}년생 학교 입학·졸업 연도</h2>
          {grade && (
            <p className="mb-4 p-4 bg-brand-soft rounded-2xl text-ink">
              {currentYear}년 3월 기준으로 {year}년생은 <strong>{grade}</strong>입니다.
            </p>
          )}
          {!grade && school.elementaryEntry > currentYear && (
            <p className="mb-4 p-4 bg-brand-soft rounded-2xl text-ink">
              {year}년생은 <strong>{school.elementaryEntry}년 3월</strong>에 초등학교에 입학합니다.
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-canvas">
                <tr>
                  <th className="px-3 py-2 text-left">구분</th>
                  <th className="px-3 py-2 text-right">연도</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["초등학교 입학", `${school.elementaryEntry}년 3월`],
                  ["중학교 입학", `${school.middleEntry}년 3월`],
                  ["고등학교 입학", `${school.highEntry}년 3월`],
                  ["대학수학능력시험(수능)", `${school.suneung}년 11월`],
                  ["고등학교 졸업", `${school.highGraduation}년 2월`],
                  [
                    "대학 입학(재수 없이)",
                    `${school.universityEntry}년 3월 (${String(school.universityEntry).slice(2)}학번)`,
                  ],
                ].map(([label, value]) => (
                  <tr key={label} className="border-t border-line">
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-3">
            {school.hasEarlyBirthCohort
              ? `2008학년도까지는 3월생부터 이듬해 2월생까지 같은 학년이었습니다. 그래서 ${year}년 1·2월생('빠른 ${shortYear}년생')은 보통 한 해 이른 ${school.elementaryEntry - 1}년에 입학했고, 위 연도도 1년씩 앞당겨집니다. `
              : "2009학년도부터 1월생부터 12월생까지 같은 학년이 되어 '빠른 년생' 구분이 없습니다. "}
            조기 입학, 입학 유예, 재수 여부에 따라 실제 연도는 다를 수 있습니다.
          </p>
        </section>
      )}

      <section className={subPageCard}>
        <h2>{year}년생 나이 기준 일정</h2>
        <p className="mb-3">
          법과 제도에서 정한 나이 기준을 {year}년생에게 적용하면 다음과 같습니다. 만 나이 기준은
          해당 연도의 생일부터, 연 나이 기준은 해당 연도 1월 1일부터 적용됩니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-canvas">
              <tr>
                <th className="px-3 py-2 text-left">연도</th>
                <th className="px-3 py-2 text-left">기준</th>
                <th className="px-3 py-2 text-right">상태</th>
              </tr>
            </thead>
            <tbody>
              {milestones(year).map((m) => (
                <tr key={m.label} className="border-t border-line">
                  <td className="px-3 py-2 whitespace-nowrap">{m.year}년</td>
                  <td className="px-3 py-2">{m.label}</td>
                  <td
                    className={`px-3 py-2 text-right whitespace-nowrap ${
                      m.year === currentYear ? "font-bold text-brand" : "text-ink-4"
                    }`}
                  >
                    {formatStatus(m.year, currentYear)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-3">
          국민연금 수령 나이는 출생 연도에 따라 1953년생부터 단계적으로 늦춰져 1969년생 이후는 만
          65세입니다. 제도는 법 개정으로 바뀔 수 있으니 신청 전에 국민연금공단에서 확인하세요.
        </p>
      </section>

      <section className={subPageCard}>
        <h2>다른 출생 연도 보기</h2>
        {sameAnimalYears.length > 0 && (
          <>
            <h3 className="font-bold text-ink mb-2">
              같은 {g.animal}띠
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {sameAnimalYears.map((y) => (
                <Link
                  key={y}
                  href={birthYearPath(y)}
                  className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
                >
                  {y}년생 ({ganzhi(y).name})
                </Link>
              ))}
            </div>
          </>
        )}
        <h3 className="font-bold text-ink mb-2">가까운 연도</h3>
        <div className="flex flex-wrap gap-2">
          {nearbyYears.map((y) => (
            <Link
              key={y}
              href={birthYearPath(y)}
              className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
            >
              {y}년생 ({ganzhi(y).animal}띠)
            </Link>
          ))}
        </div>
      </section>
    </SubPage>
  );
}
