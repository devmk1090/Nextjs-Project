// 받침 유무에 따라 조사 고르기: josa("설날", "은/는") → "설날은", josa("크리스마스", "이/가") → "크리스마스가"
// 끝이 괄호나 숫자 등 한글이 아니면 마지막 한글 글자를 기준으로 합니다.
export function hasBatchim(word: string) {
  for (let i = word.length - 1; i >= 0; i--) {
    const code = word.charCodeAt(i) - 0xac00;
    if (code >= 0 && code <= 11171) return code % 28 !== 0;
  }
  return false;
}

export function josa(word: string, pair: "은/는" | "이/가" | "을/를" | "과/와") {
  const [withBatchim, without] = pair.split("/");
  return `${word}${hasBatchim(word) ? withBatchim : without}`;
}
