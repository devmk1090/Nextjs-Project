import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPage, { subPageCard } from "../../../components/SubPage";
import { Faq } from "../../../lib/structuredData";
import { toolPath } from "../../../tools";
import {
  AreaPage,
  NATIONAL_HOUSING_M2,
  SQFT_PER_M2,
  areaNotes,
  areaPageLabel,
  areaPagePath,
  areaPages,
  exclusiveFromSupplyPyeong,
  fmt,
  getAreaPage,
  supplyPyeongFromExclusive,
  toM2,
  toPyeong,
} from "../areas";

// 존재하지 않는 면적은 404
export const dynamicParams = false;

export function generateStaticParams() {
  return areaPages.map((page) => ({ area: page.slug }));
}

type Props = { params: Promise<{ area: string }> };

// 주차장법 시행규칙의 일반형 주차구획 2.5m × 5.0m
const PARKING_SPACE_M2 = 12.5;

function describe(page: AreaPage) {
  const m2 = page.kind === "pyeong" ? toM2(page.value) : page.value;
  const pyeong = page.kind === "pyeong" ? page.value : toPyeong(m2);
  return { m2, pyeong };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getAreaPage((await params).area);
  if (!page) return {};
  const { m2, pyeong } = describe(page);
  const canonical = areaPagePath(page);
  if (page.kind === "pyeong") {
    const supply = exclusiveFromSupplyPyeong(page.value);
    return {
      title: `${page.value}평은 몇 m²? ${page.value}평형 아파트 전용면적`,
      description: `${page.value}평은 ${fmt(m2)}m²입니다. 아파트 ${page.value}평형은 공급면적 기준이라 전용면적은 약 ${fmt(supply.min, 0)}~${fmt(supply.max, 0)}m²이고, 실평수 ${page.value}평이라면 몇 평형인지까지 계산했습니다.`,
      alternates: { canonical },
    };
  }
  const supply = supplyPyeongFromExclusive(page.value);
  return {
    title: `${page.value}m²는 몇 평? 전용 ${page.value}m² 아파트 평형`,
    description: `${page.value}m²는 ${fmt(pyeong)}평입니다. 아파트 전용 ${page.value}m²는 공급면적 기준 약 ${supply.min}~${supply.max}평형으로, 국민주택규모 해당 여부와 크기 비교까지 정리했습니다.`,
    alternates: { canonical },
  };
}

const AreaLink = ({ page }: { page: AreaPage }) => (
  <Link
    href={areaPagePath(page)}
    className="px-3.5 py-1.5 bg-canvas rounded-full text-sm text-ink-2 hover:bg-brand-soft hover:text-brand"
  >
    {areaPageLabel(page)}
  </Link>
);

// 전용면적 범위가 국민주택규모(85m² 이하)에 드는지
function nationalHousingText(min: number, max: number) {
  if (max <= NATIONAL_HOUSING_M2) return `국민주택규모(전용 ${NATIONAL_HOUSING_M2}m² 이하)에 해당합니다.`;
  if (min > NATIONAL_HOUSING_M2) return `국민주택규모(전용 ${NATIONAL_HOUSING_M2}m² 이하)를 넘는 중대형입니다.`;
  return `전용률에 따라 국민주택규모(전용 ${NATIONAL_HOUSING_M2}m² 이하) 경계에 걸칩니다. 분양공고의 전용면적을 확인하세요.`;
}

export default async function AreaConversionPage({ params }: Props) {
  const page = getAreaPage((await params).area);
  if (!page) notFound();

  const { m2, pyeong } = describe(page);
  const label = areaPageLabel(page);
  const note = areaNotes[page.slug];
  const side = Math.sqrt(m2);
  const exclusivePage = (area: number) => areaPages.find((p) => p.kind === "m2" && p.value === area);

  let faqs: Faq[];
  let body: React.ReactNode;

  if (page.kind === "pyeong") {
    const supply = exclusiveFromSupplyPyeong(page.value);
    const asExclusive = supplyPyeongFromExclusive(m2);
    faqs = [
      {
        question: `${page.value}평은 몇 제곱미터인가요?`,
        answer: `1평은 400/121m²(약 3.3058m²)이므로 ${page.value}평은 약 ${fmt(m2)}m²입니다.`,
      },
      {
        question: `${page.value}평형 아파트의 전용면적은 얼마인가요?`,
        answer: `아파트 평형은 공급면적 기준이므로 ${page.value}평형의 공급면적은 약 ${fmt(m2)}m²입니다. 전용률 70~80%를 적용하면 전용면적은 약 ${fmt(supply.min, 1)}~${fmt(supply.max, 1)}m²입니다.${supply.commonTypes.length > 0 ? ` 이 범위의 대표 타입은 전용 ${supply.commonTypes.join("·")}m²입니다.` : ""}`,
      },
      {
        question: `실평수(전용면적) ${page.value}평은 몇 평형인가요?`,
        answer: `전용면적이 ${page.value}평(${fmt(m2)}m²)이라면 공급면적 기준으로 약 ${asExclusive.min}~${asExclusive.max}평형, 전용률 75% 기준으로 약 ${asExclusive.typical}평형입니다.`,
      },
    ];
    body = (
      <>
        <section className={subPageCard}>
          <h2>아파트 {page.value}평형이라면</h2>
          <p className="mb-3">
            분양 광고나 일상에서 말하는 &quot;{page.value}평형&quot;은 전용면적에 계단·복도 같은
            주거공용면적을 더한 <strong>공급면적</strong> 기준입니다. 공급면적 {fmt(m2)}m²에 일반적인
            전용률 70~80%를 적용하면 실제로 세대가 쓰는 전용면적은 다음과 같습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-canvas">
                <tr>
                  <th className="px-3 py-2 text-left">전용률</th>
                  <th className="px-3 py-2 text-right">전용면적</th>
                  <th className="px-3 py-2 text-right">전용 평수</th>
                </tr>
              </thead>
              <tbody>
                {[0.7, 0.75, 0.8].map((ratio) => (
                  <tr key={ratio} className="border-t border-line">
                    <td className="px-3 py-2">
                      {ratio * 100}% {ratio === 0.7 ? "(복도식)" : ratio === 0.8 ? "(계단식)" : ""}
                    </td>
                    <td className="px-3 py-2 text-right">{fmt(m2 * ratio, 1)}m²</td>
                    <td className="px-3 py-2 text-right">{fmt(page.value * ratio, 1)}평</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            {supply.commonTypes.length > 0 && (
              <>
                이 범위에 드는 대표 타입은{" "}
                {supply.commonTypes.map((area, i) => {
                  const target = exclusivePage(area);
                  return (
                    <span key={area}>
                      {i > 0 && ", "}
                      {target ? (
                        <Link href={areaPagePath(target)} className="text-brand font-bold">
                          전용 {area}m²
                        </Link>
                      ) : (
                        `전용 ${area}m²`
                      )}
                    </span>
                  );
                })}
                입니다.{" "}
              </>
            )}
            {nationalHousingText(supply.min, supply.max)}
          </p>
        </section>

        <section className={subPageCard}>
          <h2>실평수(전용면적) {page.value}평이라면</h2>
          <p>
            원룸·상가·사무실이나 &quot;실평수&quot;로 말할 때는 전용면적 {page.value}평, 즉{" "}
            {fmt(m2)}m²를 뜻합니다. 같은 전용면적의 아파트라면 공급면적 기준으로 약{" "}
            <strong>
              {asExclusive.min}~{asExclusive.max}평형
            </strong>
            (전용률 75% 기준 약 {asExclusive.typical}평형)에 해당합니다.{" "}
            {nationalHousingText(m2, m2)}
          </p>
        </section>
      </>
    );
  } else {
    const supply = supplyPyeongFromExclusive(page.value);
    const isNational = page.value <= NATIONAL_HOUSING_M2;
    faqs = [
      {
        question: `${page.value}m²는 몇 평인가요?`,
        answer: `1m²는 약 0.3025평이므로 ${page.value}m²는 약 ${fmt(pyeong)}평입니다.`,
      },
      {
        question: `전용 ${page.value}m² 아파트는 몇 평형인가요?`,
        answer: `아파트 평형은 공급면적 기준입니다. 전용률 70~80%를 적용하면 전용 ${page.value}m²는 약 ${supply.min}~${supply.max}평형이며, 전용률 75% 기준으로는 약 ${supply.typical}평형입니다.`,
      },
      {
        question: `${page.value}m²는 국민주택규모인가요?`,
        answer: isNational
          ? `네. 국민주택규모는 주거전용면적 ${NATIONAL_HOUSING_M2}m² 이하이므로 전용 ${page.value}m²는 해당합니다.`
          : `아니요. 국민주택규모는 주거전용면적 ${NATIONAL_HOUSING_M2}m² 이하이므로 전용 ${page.value}m²는 넘습니다.`,
      },
    ];
    body = (
      <>
        <section className={subPageCard}>
          <h2>아파트 전용 {page.value}m²라면</h2>
          <p className="mb-3">
            분양공고나 등기부의 &quot;{page.value}m²&quot;는 보통 세대가 혼자 쓰는{" "}
            <strong>전용면적</strong>입니다. 흔히 말하는 평형은 여기에 주거공용면적을 더한
            공급면적 기준이라, 전용 {page.value}m²({fmt(pyeong, 1)}평)는 평형으로 더 크게
            불립니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-canvas">
                <tr>
                  <th className="px-3 py-2 text-left">전용률</th>
                  <th className="px-3 py-2 text-right">공급면적</th>
                  <th className="px-3 py-2 text-right">평형</th>
                </tr>
              </thead>
              <tbody>
                {[0.7, 0.75, 0.8].map((ratio) => (
                  <tr key={ratio} className="border-t border-line">
                    <td className="px-3 py-2">
                      {ratio * 100}% {ratio === 0.7 ? "(복도식)" : ratio === 0.8 ? "(계단식)" : ""}
                    </td>
                    <td className="px-3 py-2 text-right">{fmt(page.value / ratio, 1)}m²</td>
                    <td className="px-3 py-2 text-right">
                      약 {Math.round(toPyeong(page.value / ratio))}평형
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">{nationalHousingText(page.value, page.value)}</p>
        </section>

        <section className={subPageCard}>
          <h2>공급면적·계약면적 {page.value}m²라면</h2>
          <p>
            오피스텔이나 상가처럼 공급면적·계약면적으로 {page.value}m²를 표시했다면 평으로는{" "}
            {fmt(pyeong)}평이지만, 실제로 쓰는 전용면적은 그보다 작습니다. 오피스텔은 전용률이
            50% 안팎인 경우도 많아 계약면적 {page.value}m²의 전용면적이 약{" "}
            {fmt(page.value * 0.5, 0)}m²({fmt(pyeong * 0.5, 1)}평)에 그칠 수 있습니다.
          </p>
        </section>
      </>
    );
  }

  const pyeongPages = areaPages.filter((p) => p.kind === "pyeong");
  const m2Pages = areaPages.filter((p) => p.kind === "m2");

  return (
    <SubPage
      crumbs={[
        { name: "홈", path: "/" },
        { name: "평형/평수 계산기", path: toolPath("pyeong-calculator") },
        { name: label, path: areaPagePath(page) },
      ]}
      title={page.kind === "pyeong" ? `${page.value}평은 몇 m²?` : `${page.value}m²는 몇 평?`}
      lead={
        page.kind === "pyeong"
          ? `${page.value}평을 제곱미터로 바꾸고, 아파트 ${page.value}평형의 전용면적과 실평수 ${page.value}평의 평형을 정리했습니다.`
          : `${page.value}m²를 평으로 바꾸고, 전용 ${page.value}m² 아파트가 몇 평형인지 정리했습니다.`
      }
      faqs={faqs}
    >
      <section className={subPageCard}>
        <p className="text-[15px] text-ink-3">
          {page.kind === "pyeong" ? `${page.value}평을 제곱미터로` : `${page.value}m²를 평으로`}
        </p>
        <p className="text-5xl font-extrabold tracking-tight text-brand mt-1">
          {page.kind === "pyeong" ? `${fmt(m2)}m²` : `${fmt(pyeong)}평`}
        </p>
        <p className="text-sm text-ink-3 mt-2">
          정확한 값 {fmt(m2, 4)}m² = {fmt(pyeong, 4)}평 (1평 = 400/121m² ≈ 3.3058m²)
        </p>
        {note && <p className="mt-5 pt-5 border-t border-line">{note}</p>}
      </section>

      {body}

      <section className={subPageCard}>
        <h2>
          {label}
          {page.kind === "pyeong" ? "은" : "는"} 얼마나 넓을까?
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            정사각형이라면 한 변이 약 <strong>{fmt(side, 1)}m</strong>인 공간입니다.
          </li>
          <li>
            일반형 주차칸(2.5m × 5.0m = {PARKING_SPACE_M2}m²) 약{" "}
            <strong>{fmt(m2 / PARKING_SPACE_M2, 1)}개</strong> 넓이입니다.
          </li>
          <li>
            제곱피트로는 약 <strong>{fmt(m2 * SQFT_PER_M2, 0)}ft²</strong>입니다.
          </li>
        </ul>
        <p className="mt-3 text-sm text-ink-3">
          다른 값은{" "}
          <Link href={toolPath("pyeong-calculator")} className="text-brand font-bold">
            평형/평수 계산기
          </Link>
          에서 직접 변환하거나 전용률을 바꿔 평형을 계산할 수 있습니다.
        </p>
      </section>

      <section className={subPageCard}>
        <h2>다른 면적 보기</h2>
        <h3 className="font-bold text-ink mb-2">평 → m²</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {pyeongPages.map((p) => (
            <AreaLink key={p.slug} page={p} />
          ))}
        </div>
        <h3 className="font-bold text-ink mb-2">m² → 평</h3>
        <div className="flex flex-wrap gap-2">
          {m2Pages.map((p) => (
            <AreaLink key={p.slug} page={p} />
          ))}
        </div>
      </section>
    </SubPage>
  );
}
