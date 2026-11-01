import Link from "next/link";
import { getToolBySlug } from "../../tools";
import type { DateParts } from "../../lib/date";

// 도구 페이지 공통 UI. 기준 화면(만 나이 계산기)의 구성을 따릅니다:
// 제목 → 입력 카드 → 결과 카드(큰 숫자 + 보조 수치) → 설명 카드들

export function ToolPage({
  slug,
  subtitle,
  children,
}: {
  slug: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  const tool = getToolBySlug(slug);
  const name = tool?.name ?? "";
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-4 text-ink-2 leading-relaxed">
      <nav aria-label="현재 위치" className="text-sm text-ink-4 flex gap-2">
        <Link href="/" className="hover:text-ink">
          홈
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-ink-2">{name}</span>
      </nav>
      <div className="pb-2">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink">{name}</h1>
        {subtitle && <p className="text-ink-3 mt-1">{subtitle}</p>}
      </div>
      {children}
    </main>
  );
}

export function Card({
  title,
  className = "",
  children,
  ...rest
}: {
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">) {
  return (
    <section className={`bg-white rounded-3xl p-6 sm:p-7 ${className}`} {...rest}>
      {title && <h2 className="text-xl font-extrabold text-ink mb-4">{title}</h2>}
      {children}
    </section>
  );
}

// 입력칸 모양 (회색 채움)
export const inputClass =
  "w-full h-14 rounded-2xl bg-canvas px-4 text-lg font-bold text-ink outline-none focus:ring-2 focus:ring-brand placeholder:text-ink-4 placeholder:font-medium";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[15px] font-bold text-ink-2">
        {label}
      </label>
      {children}
      {hint && <p className="text-sm text-ink-4">{hint}</p>}
    </div>
  );
}

// 연·월·일 세 칸 입력
const dateFieldClass =
  "flex items-center h-14 rounded-2xl bg-canvas px-4 gap-1.5 focus-within:ring-2 focus-within:ring-brand";
const dateInputClass =
  "flex-1 min-w-0 bg-transparent outline-none text-lg font-bold text-ink placeholder:text-ink-4 placeholder:font-medium";

export function DateFields({
  legend,
  value,
  onChange,
  placeholder = { year: "2025", month: "1", day: "1" },
}: {
  legend: string;
  value: DateParts;
  onChange: (value: DateParts) => void;
  placeholder?: DateParts;
}) {
  const parts = [
    { key: "year", unit: "년", max: 4 },
    { key: "month", unit: "월", max: 2 },
    { key: "day", unit: "일", max: 2 },
  ] as const;
  return (
    <fieldset className="flex flex-col">
      <legend className="text-[15px] font-bold text-ink-2 mb-2">{legend}</legend>
      <div className="grid grid-cols-3 gap-2.5">
        {parts.map((part) => (
          <label key={part.key} className={dateFieldClass}>
            <input
              inputMode="numeric"
              aria-label={`${legend} ${part.unit}`}
              value={value[part.key]}
              onChange={(e) =>
                onChange({ ...value, [part.key]: e.target.value.replace(/[^0-9]/g, "").slice(0, part.max) })
              }
              placeholder={placeholder[part.key]}
              className={dateInputClass}
            />
            <span className="text-ink-4">{part.unit}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// 몇 개 중 하나를 고르는 탭형 버튼
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; name: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[15px] font-bold text-ink-2">{label}</span>
      <div role="radiogroup" aria-label={label} className="grid gap-1.5 p-1.5 bg-canvas rounded-2xl" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              className={`h-11 rounded-xl text-[15px] font-bold transition ${
                selected ? "bg-white text-brand shadow-sm" : "text-ink-3 hover:text-ink"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  ...rest
}: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="h-14 rounded-2xl bg-brand hover:bg-brand-hover text-white text-[17px] font-bold transition"
      {...rest}
    >
      {children}
    </button>
  );
}

export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm font-medium text-red-600">
      {children}
    </p>
  );
}

// 결과 카드 맨 위의 큰 숫자
export function ResultHero({
  label,
  value,
  sub,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[15px] text-ink-3">{label}</p>
      <p className="text-[40px] sm:text-5xl font-extrabold tracking-tight text-brand mt-1 break-all">
        {value}
      </p>
      {sub && <p className="text-sm text-ink-3 mt-2">{sub}</p>}
    </div>
  );
}

// 결과 카드의 보조 수치 칸
export function StatGrid({
  items,
}: {
  items: { label: string; value: React.ReactNode; tone?: "default" | "warn" }[];
}) {
  // 모바일: "이름 ··· 값" 한 줄씩 목록, sm 이상: 칸 나열 (4개면 4열, 그 외 3열)
  const columns = items.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 ${columns} gap-2 sm:gap-2.5`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-canvas rounded-2xl px-4 py-3 sm:p-4 min-w-0 flex items-center justify-between gap-3 sm:block"
        >
          <p className="text-[13px] text-ink-3">{item.label}</p>
          <p
            className={`font-extrabold break-words text-right sm:text-left ${
              items.length === 4 ? "text-base sm:text-lg" : "text-base sm:text-xl"
            } ${item.tone === "warn" ? "text-red-600" : "text-ink"}`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <div className="divide-y divide-canvas">
      {items.map(([question, answer]) => (
        <div key={question} className="py-4 first:pt-0 last:pb-0">
          <h3 className="font-bold text-ink mb-1.5">{question}</h3>
          <p className="text-ink-3">{answer}</p>
        </div>
      ))}
    </div>
  );
}
