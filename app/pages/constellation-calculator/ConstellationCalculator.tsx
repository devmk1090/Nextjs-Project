"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, FaqList, ResultHero, StatGrid, ToolPage } from "../../components/tool/ToolUI";
import { toolPath } from "../../tools";

type Element = "불" | "흙" | "공기" | "물";

// 시작일(월, 일) 순서. 염소자리는 12월 22일 ~ 1월 19일로 해를 넘깁니다.
const signs: {
  name: string;
  en: string;
  symbol: string;
  start: [number, number];
  end: [number, number];
  element: Element;
  personality: string;
  strengths: string;
  matches: string;
}[] = [
  { name: "물병자리", en: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18], element: "공기", personality: "독창적이고 진보적이며 인도주의적임. 독립적이고 혁신을 추구함.", strengths: "창의성, 독립심, 인도주의", matches: "쌍둥이자리, 천칭자리" },
  { name: "물고기자리", en: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20], element: "물", personality: "감성적이고 예술적이며 직관적임. 공감 능력이 뛰어나고 상상력이 풍부함.", strengths: "예술성, 공감, 직관력", matches: "게자리, 전갈자리" },
  { name: "양자리", en: "Aries", symbol: "♈", start: [3, 21], end: [4, 19], element: "불", personality: "열정적이고 용감하며 리더십이 강함. 도전을 즐기고 새로운 시작을 두려워하지 않음.", strengths: "추진력, 솔직함, 독립심", matches: "사자자리, 사수자리" },
  { name: "황소자리", en: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20], element: "흙", personality: "안정적이고 실용적이며 인내심이 강함. 물질적 안정과 편안함을 중시함.", strengths: "신뢰성, 인내, 충성심", matches: "처녀자리, 염소자리" },
  { name: "쌍둥이자리", en: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20], element: "공기", personality: "호기심 많고 다재다능하며 사교적임. 의사소통 능력이 뛰어나고 적응력이 빠름.", strengths: "유연성, 지적 능력, 재치", matches: "천칭자리, 물병자리" },
  { name: "게자리", en: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22], element: "물", personality: "감성적이고 배려심 깊으며 가정적임. 직관력이 뛰어나고 보호 본능이 강함.", strengths: "공감 능력, 충성심, 직관", matches: "전갈자리, 물고기자리" },
  { name: "사자자리", en: "Leo", symbol: "♌", start: [7, 23], end: [8, 22], element: "불", personality: "자신감 넘치고 카리스마 있으며 관대함. 주목받기를 좋아하고 창의적임.", strengths: "리더십, 열정, 관대함", matches: "양자리, 사수자리" },
  { name: "처녀자리", en: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22], element: "흙", personality: "분석적이고 완벽주의적이며 실용적임. 세심하고 책임감이 강함.", strengths: "정확성, 근면성, 분석력", matches: "황소자리, 염소자리" },
  { name: "천칭자리", en: "Libra", symbol: "♎", start: [9, 23], end: [10, 22], element: "공기", personality: "균형감각이 뛰어나고 사교적이며 공정함. 조화와 미를 추구함.", strengths: "외교력, 균형감, 사교성", matches: "쌍둥이자리, 물병자리" },
  { name: "전갈자리", en: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21], element: "물", personality: "강렬하고 열정적이며 신비로움. 결단력이 강하고 깊이 있는 감정을 가짐.", strengths: "집중력, 통찰력, 결단력", matches: "게자리, 물고기자리" },
  { name: "사수자리", en: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21], element: "불", personality: "낙천적이고 자유로우며 모험적임. 철학적이고 진리를 탐구함.", strengths: "낙관성, 정직함, 모험심", matches: "양자리, 사자자리" },
  { name: "염소자리", en: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19], element: "흙", personality: "야심차고 규율적이며 현실적임. 목표 지향적이고 책임감이 강함.", strengths: "야망, 인내, 실용성", matches: "황소자리, 처녀자리" },
];

const elements: { name: Element; en: string; desc: string }[] = [
  { name: "불", en: "Fire", desc: "열정적, 활동적, 자신감 넘침. 에너지가 넘치고 도전적." },
  { name: "흙", en: "Earth", desc: "실용적, 안정적, 현실적. 신뢰할 수 있고 근면함." },
  { name: "공기", en: "Air", desc: "지적, 사교적, 소통 능력 뛰어남. 논리적이고 객관적." },
  { name: "물", en: "Water", desc: "감성적, 직관적, 공감 능력 강함. 깊은 감정과 상상력." },
];

const period = (s: (typeof signs)[number]) => `${s.start[0]}월 ${s.start[1]}일 ~ ${s.end[0]}월 ${s.end[1]}일`;

// 월·일로 별자리 찾기: 시작일이 그 날짜 이전인 마지막 별자리 (1월 1~19일은 염소자리)
function findSign(month: number, day: number) {
  const key = month * 100 + day;
  const found = [...signs].reverse().find((s) => s.start[0] !== 12 && s.start[0] * 100 + s.start[1] <= key);
  if (month === 12 && day >= 22) return signs[11];
  return found ?? signs[11];
}

const daysInMonth = (month: number) => new Date(2024, month, 0).getDate(); // 윤년 기준(2월 29일 허용)

const fieldClass =
  "flex items-center h-14 rounded-2xl bg-canvas px-4 gap-1.5 focus-within:ring-2 focus-within:ring-brand";
const fieldInput =
  "flex-1 min-w-0 bg-transparent outline-none text-lg font-bold text-ink placeholder:text-ink-4 placeholder:font-medium";

export default function ConstellationCalculator() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const m = Number(month);
  const d = Number(day);
  const valid = m >= 1 && m <= 12 && d >= 1 && d <= daysInMonth(m);
  const sign = valid ? findSign(m, d) : null;
  const invalidInput = month !== "" && day !== "" && !valid;

  return (
    <ToolPage
      slug="constellation-calculator"
      subtitle="생일의 월과 일을 넣으면 별자리와 4원소, 성격과 잘 맞는 별자리를 알려 줍니다."
    >
      <Card>
        <fieldset className="flex flex-col">
          <legend className="text-[15px] font-bold text-ink-2 mb-2">생일</legend>
          <div className="grid grid-cols-2 gap-2.5">
            <label className={fieldClass}>
              <input
                inputMode="numeric"
                aria-label="생일 월"
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                placeholder="5"
                className={fieldInput}
              />
              <span className="text-ink-4">월</span>
            </label>
            <label className={fieldClass}>
              <input
                inputMode="numeric"
                aria-label="생일 일"
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                placeholder="15"
                className={fieldInput}
              />
              <span className="text-ink-4">일</span>
            </label>
          </div>
          {invalidInput && <p className="text-sm font-medium text-red-600 mt-2">존재하지 않는 날짜입니다.</p>}
        </fieldset>
      </Card>

      {sign && (
        <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero label={`${m}월 ${d}일생은`} value={`${sign.symbol} ${sign.name}`} sub={`${sign.en} · ${period(sign)}`} />
          <StatGrid
            items={[
              { label: "원소", value: sign.element },
              { label: "잘 맞는 별자리", value: sign.matches },
              { label: "장점", value: sign.strengths },
            ]}
          />
          <p className="bg-canvas rounded-2xl p-5 text-[15px]">{sign.personality}</p>
        </Card>
      )}

      <Card title="12 별자리란?">
        <p className="mb-3">
          12 별자리는 서양 점성술에서 쓰는 황도대(Zodiac)의 12구역입니다. 태양이 1년 동안 하늘에서
          지나가는 길인 황도를 12등분하고 각 구간에 별자리를 배치했습니다.
        </p>
        <p>
          태어난 날 태양이 어느 구간에 있었는지로 별자리가 정해지므로 연도와는 상관없이 월·일만
          보면 됩니다. 연도로 정하는 동양의{" "}
          <Link href={toolPath("zodiac-calculator")} className="text-brand font-bold">
            띠
          </Link>
          와는 다른 체계입니다.
        </p>
      </Card>

      <Card title="12 별자리 기간과 성격">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...signs.slice(2), ...signs.slice(0, 2)].map((s) => (
            <div
              key={s.name}
              className={`rounded-2xl p-5 text-[15px] ${s === sign ? "bg-brand-soft ring-2 ring-brand/30" : "bg-canvas"}`}
            >
              <h3 className="font-bold text-ink">
                {s.symbol} {s.name} <span className="font-medium text-ink-3">({s.en})</span>
              </h3>
              <p className="text-sm text-ink-4 mb-2">
                {period(s)} · 원소: {s.element}
              </p>
              <p>{s.personality}</p>
              <p className="mt-1.5 text-sm">
                <strong className="text-ink">장점</strong> {s.strengths} ·{" "}
                <strong className="text-ink">궁합</strong> {s.matches}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="별자리의 4원소">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {elements.map((el) => (
            <div
              key={el.name}
              className={`rounded-2xl p-5 text-[15px] ${sign?.element === el.name ? "bg-brand-soft" : "bg-canvas"}`}
            >
              <h3 className="font-bold text-ink">
                {el.name} ({el.en})
              </h3>
              <p className="text-sm text-ink-3 mb-1">
                {signs.filter((s) => s.element === el.name).map((s) => s.name).join(", ")}
              </p>
              <p>{el.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="별자리 궁합 보는 법">
        <div className="space-y-3">
          <p>
            <strong className="text-ink">같은 원소끼리:</strong> 불-불, 흙-흙, 공기-공기, 물-물은 서로를
            잘 이해하고 편안한 관계를 유지한다고 봅니다.
          </p>
          <p>
            <strong className="text-ink">보완 관계:</strong> 불과 공기, 흙과 물은 서로 다르지만 보완적인
            관계를 이룬다고 봅니다.
          </p>
          <p>
            <strong className="text-ink">도전 관계:</strong> 불과 물, 흙과 공기는 가치관 차이로 갈등이 생길
            수 있지만 서로 배우며 성장할 수 있다고 봅니다.
          </p>
          <p className="text-sm text-ink-3">
            별자리 궁합은 재미로 보는 참고 자료일 뿐, 실제 관계는 서로의 노력과 이해가 더 중요합니다.
          </p>
        </div>
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "경계일에 태어났어요. 어느 별자리인가요?",
              "별자리가 바뀌는 날짜는 해마다 하루 정도 달라질 수 있습니다. 태양이 다음 구간으로 넘어가는 시각이 해마다 조금씩 다르기 때문입니다. 경계일 전후에 태어났다면 출생 연도와 시각으로 계산하는 점성술 사이트에서 한 번 더 확인해 보세요.",
            ],
            [
              "별자리와 띠는 어떻게 다른가요?",
              "별자리는 서양 점성술로 생일(월·일)로 정하고, 띠는 동양의 십이지로 태어난 해로 정합니다. 서로 다른 문화에서 나온 체계라 같이 쓰이지만 관련은 없습니다.",
            ],
            [
              "별자리 성격은 정확한가요?",
              "오래 전해 내려온 상징과 해석일 뿐 과학적 근거는 없습니다. 재미있는 이야깃거리로 즐기세요.",
            ],
          ]}
        />
      </Card>
    </ToolPage>
  );
}
