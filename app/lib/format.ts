// 숫자 표시 도우미

// 1,234,567 (원 단위 반올림)
export const won = (value: number) => Math.round(value).toLocaleString("ko-KR");

// 125000000 → "1억 2,500만 원", 3500 → "3,500원"
export function koreanWon(value: number) {
  const n = Math.round(value);
  if (n < 10000) return `${n.toLocaleString("ko-KR")}원`;
  const eok = Math.floor(n / 100000000);
  const man = Math.floor((n % 100000000) / 10000);
  const rest = n % 10000;
  const parts = [
    eok > 0 ? `${eok.toLocaleString("ko-KR")}억` : "",
    man > 0 ? `${man.toLocaleString("ko-KR")}만` : "",
    rest > 0 ? rest.toLocaleString("ko-KR") : "",
  ].filter(Boolean);
  // 마지막이 숫자면 "1만 5,000원", 단위로 끝나면 "1억 2,500만 원"
  return `${parts.join(" ")}${rest > 0 ? "" : " "}원`;
}

// 입력값에서 숫자만 추출 (콤마 제거)
export const digitsOnly = (value: string) => value.replace(/[^0-9]/g, "");

// 개월 수 → "30년", "2년 6개월", "18개월"
export function monthsText(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  return rest === 0 ? `${years}년` : `${years}년 ${rest}개월`;
}
