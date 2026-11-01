"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, FaqList, Field, ResultHero, StatGrid, ToolPage, inputClass } from "../../components/tool/ToolUI";
import { ganzhi } from "../../lib/ganzhi";
import { birthYearPath, hasBirthYearPage } from "../age-calculator/birthYearPath";

// 십이지 순서(자축인묘진사오미신유술해)
const signs = [
  { animal: "쥐", hanja: "子", personality: "영리하고 재치있으며 적응력이 뛰어남. 근면하고 절약 정신이 강함.", strengths: "순발력, 통찰력, 사교성", caution: "때때로 소심하거나 지나치게 신중할 수 있음" },
  { animal: "소", hanja: "丑", personality: "성실하고 근면하며 책임감이 강함. 인내심이 뛰어나고 신뢰할 수 있음.", strengths: "끈기, 정직함, 안정성", caution: "고집이 세고 변화를 받아들이기 어려울 수 있음" },
  { animal: "호랑이", hanja: "寅", personality: "용감하고 자신감 넘치며 리더십이 강함. 정의감이 뛰어남.", strengths: "추진력, 카리스마, 열정", caution: "충동적이거나 지나치게 경쟁적일 수 있음" },
  { animal: "토끼", hanja: "卯", personality: "온화하고 섬세하며 예술적 감각이 뛰어남. 평화를 사랑함.", strengths: "배려심, 우아함, 창의력", caution: "우유부단하거나 갈등 회피 성향이 있을 수 있음" },
  { animal: "용", hanja: "辰", personality: "강인하고 카리스마 넘치며 야망이 큼. 행운의 상징.", strengths: "자신감, 창의력, 리더십", caution: "오만하거나 완벽주의 성향이 강할 수 있음" },
  { animal: "뱀", hanja: "巳", personality: "지혜롭고 직관력이 뛰어나며 신비로움. 깊이있는 사고를 함.", strengths: "통찰력, 침착함, 결단력", caution: "의심이 많거나 질투심이 강할 수 있음" },
  { animal: "말", hanja: "午", personality: "활발하고 자유로우며 열정적임. 사교적이고 낙천적.", strengths: "에너지, 독립성, 유머감각", caution: "조급하거나 집중력이 부족할 수 있음" },
  { animal: "양", hanja: "未", personality: "부드럽고 온순하며 예술적 감성이 풍부함. 타인을 배려함.", strengths: "친절함, 예술성, 공감능력", caution: "소극적이거나 의존적일 수 있음" },
  { animal: "원숭이", hanja: "申", personality: "영리하고 재치있으며 호기심이 많음. 문제 해결 능력이 뛰어남.", strengths: "창의력, 유머, 적응력", caution: "장난기가 많거나 경솔할 수 있음" },
  { animal: "닭", hanja: "酉", personality: "정확하고 체계적이며 관찰력이 뛰어남. 자신감이 강함.", strengths: "정직함, 근면성, 분석력", caution: "비판적이거나 완벽주의 성향이 있을 수 있음" },
  { animal: "개", hanja: "戌", personality: "충성스럽고 정직하며 책임감이 강함. 정의감이 뛰어남.", strengths: "신뢰성, 헌신적, 용기", caution: "걱정이 많거나 비관적일 수 있음" },
  { animal: "돼지", hanja: "亥", personality: "관대하고 솔직하며 낙천적임. 성실하고 인내심이 강함.", strengths: "친절함, 관용, 정직함", caution: "순진하거나 자기관리가 부족할 수 있음" },
];

// 전통 궁합: 삼합(4칸씩 떨어진 셋), 육합(정해진 짝), 육충(정반대 6칸)
const yukhap = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
const signIndex = (year: number) => (((year - 4) % 12) + 12) % 12;
const goodMatches = (i: number) => [(i + 4) % 12, (i + 8) % 12, yukhap[i]].map((j) => signs[j].animal);
const clash = (i: number) => signs[(i + 6) % 12].animal;

const thisYear = new Date().getFullYear();
const recentYears = (i: number) => {
  // 올해 이전 가장 가까운 해부터 12년 간격으로 5개
  const latest = thisYear - ((((thisYear - 4) % 12) + 12 - i) % 12);
  return Array.from({ length: 5 }, (_, k) => latest - k * 12);
};

export default function ZodiacCalculator({ children }: { children?: React.ReactNode }) {
  const [year, setYear] = useState("");

  const yearNum = Number(year);
  const valid = year.length === 4 && yearNum >= 1900 && yearNum <= 2100;
  const index = valid ? signIndex(yearNum) : -1;
  const sign = valid ? signs[index] : null;
  const g = valid ? ganzhi(yearNum) : null;

  return (
    <ToolPage
      slug="zodiac-calculator"
      subtitle="태어난 해를 넣으면 띠와 60갑자, 띠별 성격과 궁합을 알려 줍니다."
    >
      <Card>
        <Field
          label="태어난 해"
          htmlFor="zodiac-year"
          hint={year.length === 4 && !valid ? "1900년부터 2100년까지 입력할 수 있습니다." : undefined}
        >
          <input
            id="zodiac-year"
            inputMode="numeric"
            value={year}
            onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
            placeholder="1990"
            className={inputClass}
          />
        </Field>
      </Card>

      {sign && g && (
        <Card aria-label="계산 결과" aria-live="polite" className="flex flex-col gap-5">
          <ResultHero
            label={`${yearNum}년생은`}
            value={`${sign.animal}띠`}
            sub={`${g.name}(${g.hanja}) · ${g.colorAnimal}띠`}
          />
          <StatGrid
            items={[
              { label: "잘 맞는 띠", value: goodMatches(index).join(", ") },
              { label: "조심할 띠", value: clash(index) },
              { label: "같은 띠 최근 연도", value: recentYears(index).slice(0, 3).join(", ") },
            ]}
          />
          <div className="bg-canvas rounded-2xl p-5 text-[15px] space-y-1.5">
            <p>
              <strong className="text-ink">성격</strong> {sign.personality}
            </p>
            <p>
              <strong className="text-ink">장점</strong> {sign.strengths}
            </p>
            <p>
              <strong className="text-ink">주의</strong> {sign.caution}
            </p>
          </div>
          <p className="text-sm text-ink-3 border-t border-line pt-4">
            띠는 음력 설날을 기준으로 바뀝니다. 양력 1·2월생은 설날 전에 태어났다면 전해의 띠입니다.
            {hasBirthYearPage(yearNum) && (
              <>
                {" "}
                <Link href={birthYearPath(yearNum)} className="text-brand font-bold">
                  {yearNum}년 설날 날짜와 나이 보기 ›
                </Link>
              </>
            )}
          </p>
        </Card>
      )}

      <Card title="십이지(十二支) 띠란?">
        <p className="mb-3">
          십이지는 12년을 주기로 반복되는 동양의 전통 천간지지(天干地支) 체계 중 지지(地支)를 동물로
          표현한 것입니다. 쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지의 12가지 동물로
          구성되어 있습니다.
        </p>
        <p>
          천간 10개와 지지 12개를 차례로 짝지으면 60개의 조합이 생기는데, 이것이 60갑자입니다. 그래서
          같은 띠라도 천간에 따라 &quot;흰 말띠(경오년)&quot;, &quot;붉은 말띠(병오년)&quot;처럼 색이
          붙고, 같은 간지는 60년마다 돌아옵니다(환갑).
        </p>
      </Card>

      <Card title="12가지 띠의 성격과 특징">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {signs.map((s, i) => (
            <div
              key={s.animal}
              className={`rounded-2xl p-5 text-[15px] ${i === index ? "bg-brand-soft ring-2 ring-brand/30" : "bg-canvas"}`}
            >
              <h3 className="font-bold text-ink">
                {s.animal}띠 <span className="font-medium text-ink-3">({s.hanja})</span>
              </h3>
              <p className="text-sm text-ink-4 mb-2">해당 연도: {recentYears(i).join(", ")}…</p>
              <p>{s.personality}</p>
              <p className="mt-1.5 text-sm">
                <strong className="text-ink">장점</strong> {s.strengths} ·{" "}
                <strong className="text-ink">주의</strong> {s.caution}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="띠별 궁합 보는 법">
        <p className="mb-4">전통적으로 띠 궁합은 십이지의 순서에서 정해지는 세 가지 관계로 봅니다.</p>
        <div className="flex flex-col gap-3 mb-4">
          {[
            ["삼합(三合)", "4칸씩 떨어진 세 띠는 잘 어울린다고 봅니다.", "쥐·용·원숭이 / 소·뱀·닭 / 호랑이·말·개 / 토끼·양·돼지"],
            ["육합(六合)", "정해진 두 띠가 짝을 이뤄 화합한다고 봅니다.", "쥐·소 / 호랑이·돼지 / 토끼·개 / 용·닭 / 뱀·원숭이 / 말·양"],
            ["육충(六沖)", "정반대(6칸 차이)에 있는 두 띠는 부딪친다고 봅니다.", "쥐·말 / 소·양 / 호랑이·원숭이 / 토끼·닭 / 용·개 / 뱀·돼지"],
          ].map(([name, desc, groups]) => (
            <div key={name} className="bg-canvas rounded-2xl p-5 text-[15px]">
              <h3 className="font-bold text-ink mb-1">{name}</h3>
              <p>{desc}</p>
              <p className="mt-1.5 text-ink-3">{groups}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-3">
          띠 궁합은 전통적인 믿음일 뿐 과학적 근거는 없습니다. 재미있는 참고 정도로만 여기세요.
        </p>
      </Card>

      <Card title="한국 문화 속 띠의 의미">
        <div className="space-y-3">
          <p>
            <strong className="text-ink">나이 대신 띠:</strong> 나이를 직접 묻기보다 &quot;무슨
            띠세요?&quot;라고 묻는 것이 더 예의 바른 방법으로 여겨지기도 합니다.
          </p>
          <p>
            <strong className="text-ink">띠와 운세:</strong> 새해가 되면 그해의 띠를 기준으로 운세를
            보는 풍습이 있습니다. 자기 띠의 해(본띠해)에는 조심해야 한다는 속설이 있어 빨간 속옷이나
            빨간 물건을 지니기도 합니다.
          </p>
          <p>
            <strong className="text-ink">결혼과 궁합:</strong> 예로부터 결혼할 때 신랑과 신부의 띠
            궁합을 살펴보는 전통이 있었고, 지금도 참고하는 사람들이 있습니다.
          </p>
        </div>
      </Card>

      <Card title="자주 묻는 질문">
        <FaqList
          items={[
            [
              "띠는 언제부터 바뀌나요?",
              "띠는 양력 1월 1일이 아니라 음력 설날을 기준으로 바뀝니다. 사주에서는 입춘(양력 2월 4일 무렵)을 기준으로 보기도 합니다. 양력 1~2월생은 그해 설날 날짜를 확인하세요.",
            ],
            [
              "본띠해는 왜 조심해야 하나요?",
              "자기 띠의 해에는 큰 변화가 있거나 조심해야 한다는 속설에서 나온 풍습입니다. 근거가 있는 이야기는 아니지만 빨간 속옷이나 빨간 물건으로 액운을 막으려는 사람들이 있습니다.",
            ],
            [
              "흰 말띠, 황금 돼지띠는 무슨 뜻인가요?",
              "60갑자의 천간을 오행 색으로 바꿔 부른 말입니다. 갑·을은 푸른색, 병·정은 붉은색, 무·기는 황금(노란)색, 경·신은 흰색, 임·계는 검은색입니다. 예를 들어 1990년 경오년은 흰 말띠, 2019년 기해년은 황금 돼지띠입니다.",
            ],
          ]}
        />
      </Card>

      {children}
    </ToolPage>
  );
}
