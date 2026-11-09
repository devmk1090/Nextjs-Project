import { SALARY_RULES, SalaryResult } from "../../lib/salary";

const won = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;

// 월급에서 빠지는 항목별 공제 내역 표 (계산기와 연봉별 페이지에서 함께 사용)
export default function SalaryBreakdown({ result }: { result: SalaryResult }) {
  const r = SALARY_RULES;
  const rows: [string, string, number][] = [
    ["국민연금", `${(r.pensionRate * 100).toFixed(2)}%`, result.pension],
    ["건강보험", `${(r.healthRate * 100).toFixed(3)}%`, result.health],
    ["장기요양보험", "건강보험료의 13.14%", result.longTermCare],
    ["고용보험", `${(r.employmentRate * 100).toFixed(1)}%`, result.employment],
    ["소득세", "간이세액표", result.incomeTax],
    ["지방소득세", "소득세의 10%", result.localTax],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[360px] text-[15px]">
        <thead className="text-ink-3 text-left">
          <tr className="border-b border-line">
            <th className="py-2.5 pr-3 font-medium">항목</th>
            <th className="py-2.5 px-3 font-medium">기준</th>
            <th className="py-2.5 pl-3 font-medium text-right">월 공제액</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-canvas">
          <tr>
            <td className="py-3 pr-3 text-ink-3">월급 (세전)</td>
            <td className="py-3 px-3 text-ink-4">비과세 {won(result.nonTaxable)} 포함</td>
            <td className="py-3 pl-3 text-right font-bold text-ink">{won(result.monthly)}</td>
          </tr>
          {rows.map(([name, basis, amount]) => (
            <tr key={name}>
              <td className="py-3 pr-3">{name}</td>
              <td className="py-3 px-3 text-ink-4">{basis}</td>
              <td className="py-3 pl-3 text-right">−{won(amount)}</td>
            </tr>
          ))}
          <tr>
            <td className="py-3 pr-3 font-bold text-ink">공제 합계</td>
            <td className="py-3 px-3" />
            <td className="py-3 pl-3 text-right font-bold text-red-600">−{won(result.deductions)}</td>
          </tr>
          <tr>
            <td className="py-3 pr-3 font-bold text-ink">월 실수령액</td>
            <td className="py-3 px-3" />
            <td className="py-3 pl-3 text-right font-extrabold text-brand">{won(result.net)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
