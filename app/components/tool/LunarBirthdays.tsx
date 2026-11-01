"use client";

import { formatDateWithWeekday } from "../../lib/date";
import { upcomingLunarBirthdays } from "../../lib/lunar";
import { Card } from "./ToolUI";

// 음력 생일(월·일)이 올해부터 몇 년간 양력으로 언제인지 보여주는 카드
export default function LunarBirthdays({
  month,
  day,
  isLeap,
  count = 5,
}: {
  month: number;
  day: number;
  isLeap: boolean;
  count?: number;
}) {
  const rows = upcomingLunarBirthdays(month, day, isLeap, new Date().getFullYear(), count);
  return (
    <Card title={`음력 ${isLeap ? "윤" : ""}${month}월 ${day}일, 앞으로 ${count}년 양력 날짜`}>
      <p className="text-sm text-ink-3 -mt-2 mb-3">
        음력 생일이나 제삿날을 해마다 양력 달력에 옮길 때 참고하세요.
      </p>
      <ul className="divide-y divide-canvas">
        {rows.map((row) => (
          <li key={row.year} className="flex items-center justify-between gap-3 py-3">
            <span className="font-bold text-ink">{row.year}년</span>
            <span className="text-right">
              <span className="block text-ink-2">{formatDateWithWeekday(row.date)}</span>
              {row.note && <span className="block text-sm text-ink-4">{row.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
