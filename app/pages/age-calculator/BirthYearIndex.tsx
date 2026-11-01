import Link from "next/link";
import { ages, birthYears, currentYearKST, ganzhi } from "./birthYear";
import { birthYearPath } from "./birthYearPath";

// 출생 연도별 페이지로 가는 연대별 목록. 만 나이 계산기와 띠 계산기 하단에 들어갑니다.
export default function BirthYearIndex({ variant }: { variant: "age" | "zodiac" }) {
  const currentYear = currentYearKST();
  const decades = new Map<number, number[]>();
  for (const year of birthYears(currentYear)) {
    const decade = Math.floor(year / 10) * 10;
    decades.set(decade, [...(decades.get(decade) ?? []), year]);
  }

  return (
    <section className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        {variant === "age" ? `출생 연도별 나이표 (${currentYear}년 기준)` : "출생 연도별 띠"}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {variant === "age"
          ? "연도를 누르면 그 해 출생자의 만 나이, 띠, 학교 입학 연도, 국민연금 수령 나이를 볼 수 있습니다. 만 나이는 생일이 지난 경우 기준입니다."
          : "연도를 누르면 그 해의 60갑자, 설날·입춘 날짜와 1·2월생의 띠 구분을 볼 수 있습니다."}
      </p>
      <div className="space-y-4">
        {[...decades.entries()].map(([decade, years]) => (
          <div key={decade}>
            <h3 className="font-semibold text-gray-700 mb-2">{decade}년대생</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {years.map((year) => {
                const g = ganzhi(year);
                return (
                  <Link
                    key={year}
                    href={birthYearPath(year)}
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:border-blue-400 hover:text-blue-600"
                  >
                    <span className="font-semibold">{year}년생</span>{" "}
                    <span className="text-gray-500">
                      {variant === "age"
                        ? `만 ${ages(year, currentYear).afterBirthday}세`
                        : `${g.emoji} ${g.name}`}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
