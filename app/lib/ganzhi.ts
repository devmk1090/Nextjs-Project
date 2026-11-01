// 60갑자(간지)와 띠. 연도만으로 계산하므로 클라이언트·서버 어디서나 쓸 수 있습니다.

const mod = (n: number, m: number) => ((n % m) + m) % m;

// 천간: 오행에 따른 색(갑을 청, 병정 적, 무기 황, 경신 백, 임계 흑)
const stems = [
  { ko: "갑", hanja: "甲", color: "푸른" },
  { ko: "을", hanja: "乙", color: "푸른" },
  { ko: "병", hanja: "丙", color: "붉은" },
  { ko: "정", hanja: "丁", color: "붉은" },
  { ko: "무", hanja: "戊", color: "황금" },
  { ko: "기", hanja: "己", color: "황금" },
  { ko: "경", hanja: "庚", color: "흰" },
  { ko: "신", hanja: "辛", color: "흰" },
  { ko: "임", hanja: "壬", color: "검은" },
  { ko: "계", hanja: "癸", color: "검은" },
];

const branches = [
  { ko: "자", hanja: "子", animal: "쥐" },
  { ko: "축", hanja: "丑", animal: "소" },
  { ko: "인", hanja: "寅", animal: "호랑이" },
  { ko: "묘", hanja: "卯", animal: "토끼" },
  { ko: "진", hanja: "辰", animal: "용" },
  { ko: "사", hanja: "巳", animal: "뱀" },
  { ko: "오", hanja: "午", animal: "말" },
  { ko: "미", hanja: "未", animal: "양" },
  { ko: "신", hanja: "申", animal: "원숭이" },
  { ko: "유", hanja: "酉", animal: "닭" },
  { ko: "술", hanja: "戌", animal: "개" },
  { ko: "해", hanja: "亥", animal: "돼지" },
];

// 60갑자. 1984년이 갑자년입니다.
export function ganzhi(year: number) {
  const stem = stems[mod(year - 4, 10)];
  const branch = branches[mod(year - 4, 12)];
  return {
    name: `${stem.ko}${branch.ko}년`,
    hanja: `${stem.hanja}${branch.hanja}年`,
    animal: branch.animal,
    colorAnimal: `${stem.color} ${branch.animal}`,
  };
}

