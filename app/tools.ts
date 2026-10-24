export type CategoryId = "calculator" | "developer" | "text" | "color" | "random";

export const categories: { id: CategoryId; name: string; emoji: string }[] = [
  { id: "calculator", name: "계산기", emoji: "📊" },
  { id: "developer", name: "개발자 도구", emoji: "🛠️" },
  { id: "text", name: "텍스트 도구", emoji: "📝" },
  { id: "color", name: "색상 도구", emoji: "🎨" },
  { id: "random", name: "랜덤 생성기", emoji: "🎲" },
];

export type Tool = {
  slug: string;
  category: CategoryId;
  emoji: string;
  name: string;
  description: string;
};

// 전체 도구 목록. 홈 카드, 관련 도구 링크, 푸터, sitemap이 모두 이 목록을 사용합니다.
// 새 도구를 추가하면 app/pages/<slug>/ 와 함께 여기에 항목을 추가하세요.
export const tools: Tool[] = [
  {
    slug: "age-calculator",
    category: "calculator",
    emoji: "📅",
    name: "만 나이 계산기",
    description:
      "2023년 만 나이 통일법에 따른 정확한 만 나이를 계산합니다. 한국 나이, 세는 나이와의 차이점도 자세히 설명합니다.",
  },
  {
    slug: "zodiac-calculator",
    category: "calculator",
    emoji: "🐉",
    name: "띠 계산기",
    description:
      "12가지 십이지 띠를 확인하고, 각 띠의 성격과 특징, 띠별 궁합 정보를 제공합니다.",
  },
  {
    slug: "constellation-calculator",
    category: "calculator",
    emoji: "⭐",
    name: "별자리 계산기",
    description:
      "12 별자리를 확인하고 각 별자리의 기간, 4원소(불/흙/공기/물), 성격 특징과 궁합을 알아봅니다.",
  },
  {
    slug: "lunar-calculator",
    category: "calculator",
    emoji: "🌙",
    name: "음력 변환 계산기",
    description:
      "양력을 음력으로 간편하게 변환합니다. 전통 명절 날짜 확인과 음력 생일 계산에 유용합니다.",
  },
  {
    slug: "solar-calculator",
    category: "calculator",
    emoji: "☀️",
    name: "양력 변환 계산기",
    description:
      "음력을 양력으로 간편하게 변환합니다. 음력 생일을 양력으로 확인할 때 유용합니다.",
  },
  {
    slug: "dday-calculator",
    category: "calculator",
    emoji: "⏰",
    name: "디데이 계산기",
    description:
      "목표 날짜까지 남은 일수를 계산합니다. 수능, 결혼식, 제대일 등 중요한 날까지 D-day를 확인하세요.",
  },
  {
    slug: "day-calculator",
    category: "calculator",
    emoji: "📆",
    name: "요일 계산기",
    description:
      "특정 날짜의 요일을 확인합니다. 내가 태어난 날, 기념일의 요일을 쉽게 찾아보세요.",
  },
  {
    slug: "anniversary-calculator",
    category: "calculator",
    emoji: "🎉",
    name: "기념일 계산기",
    description:
      "시작일로부터 100일, 200일, 1년 등 주요 기념일을 자동으로 계산합니다. 연애, 결혼, 출생 기념일에 유용합니다.",
  },
  {
    slug: "work-period-calculator",
    category: "calculator",
    emoji: "💼",
    name: "근무일수 계산기",
    description:
      "입사일 기준으로 근무 기간, 연차 개수, 예상 퇴직금을 계산합니다. 직장인을 위한 필수 도구입니다.",
  },
  {
    slug: "bmi-calculator",
    category: "calculator",
    emoji: "⚖️",
    name: "BMI 계산기",
    description:
      "체질량지수(BMI)와 표준체중을 계산합니다. 건강한 체중 관리와 비만도 확인에 유용합니다.",
  },
  {
    slug: "interest-calculator",
    category: "calculator",
    emoji: "💰",
    name: "예금/적금 이자 계산기",
    description:
      "예금과 적금의 이자를 계산합니다. 세전/세후 금액과 이자소득세까지 자동으로 계산합니다.",
  },
  {
    slug: "unit-converter",
    category: "calculator",
    emoji: "🔄",
    name: "단위 변환 계산기",
    description:
      "길이, 무게, 부피, 온도 단위를 변환합니다. 미터, 킬로그램, 리터, 섭씨 등 다양한 단위를 쉽게 변환하세요.",
  },
  {
    slug: "pyeong-calculator",
    category: "calculator",
    emoji: "🏠",
    name: "평형/평수 계산기",
    description:
      "평형(평)과 제곱미터(m²)를 변환합니다. 아파트 면적 계산, 부동산 평수 확인에 유용합니다.",
  },
  {
    slug: "loan-calculator",
    category: "calculator",
    emoji: "🏦",
    name: "대출 이자 계산기",
    description:
      "원리금균등·원금균등·만기일시상환 방식별 월 상환액과 총 이자를 계산하고, 세 방식의 이자 차이를 비교합니다.",
  },
  {
    slug: "json-formatter",
    category: "developer",
    emoji: "📋",
    name: "JSON 포매터/검증기",
    description:
      "JSON 문법을 검사하고 예쁘게 포맷팅합니다. 들여쓰기 조정, 축소, 복사 기능을 제공합니다.",
  },
  {
    slug: "base64-converter",
    category: "developer",
    emoji: "🔐",
    name: "Base64 인코더/디코더",
    description:
      "텍스트를 Base64로 인코딩하거나 Base64를 텍스트로 디코딩합니다. 한글 지원, 복사 기능 제공.",
  },
  {
    slug: "url-encoder",
    category: "developer",
    emoji: "🔗",
    name: "URL 인코더/디코더",
    description:
      "URL에 한글이나 특수문자를 안전하게 포함시킵니다. 퍼센트 인코딩, 쿼리 문자열 인코딩 지원.",
  },
  {
    slug: "regex-tester",
    category: "developer",
    emoji: "🔍",
    name: "정규식 테스터",
    description:
      "정규표현식을 실시간으로 테스트하고 검증합니다. 매칭 결과, 하이라이트, 캡처 그룹 확인 가능.",
  },
  {
    slug: "hash-generator",
    category: "developer",
    emoji: "🔐",
    name: "해시 생성기",
    description:
      "SHA-1, SHA-256, SHA-384, SHA-512 해시를 생성합니다. 데이터 무결성 검증, 비밀번호 해싱에 활용.",
  },
  {
    slug: "qr-generator",
    category: "developer",
    emoji: "📱",
    name: "QR 코드 생성기",
    description:
      "텍스트나 URL을 QR 코드로 변환합니다. 색상, 크기 조정 가능. URL, Wi-Fi, 전화번호 등 템플릿 제공.",
  },
  {
    slug: "char-counter",
    category: "text",
    emoji: "🔢",
    name: "글자 수 세기",
    description:
      "문자, 단어, 문장, 공백 수를 세고 예상 읽기 시간을 계산합니다. 실시간 통계 제공.",
  },
  {
    slug: "case-converter",
    category: "text",
    emoji: "🔤",
    name: "케이스 변환기",
    description:
      "대문자, 소문자, 카멜케이스, 스네이크케이스 등 다양한 케이스로 변환합니다.",
  },
  {
    slug: "text-diff",
    category: "text",
    emoji: "🔍",
    name: "텍스트 비교",
    description:
      "두 텍스트의 차이점을 비교하고 하이라이트합니다. 문자, 단어, 줄 단위 비교 지원.",
  },
  {
    slug: "duplicate-remover",
    category: "text",
    emoji: "🗑️",
    name: "중복 제거기",
    description:
      "중복된 줄을 제거합니다. 대소문자 구분 옵션 제공. 제거된 중복 수 통계 표시.",
  },
  {
    slug: "text-sorter",
    category: "text",
    emoji: "↕️",
    name: "정렬 도구",
    description:
      "가나다순, ABC순, 길이순, 무작위 등 다양한 방식으로 텍스트를 정렬합니다.",
  },
  {
    slug: "random-string",
    category: "text",
    emoji: "🎲",
    name: "랜덤 문자열 생성기",
    description:
      "안전한 비밀번호, UUID, Nano ID를 생성합니다. 길이 및 문자 종류 조정 가능.",
  },
  {
    slug: "color-converter",
    category: "color",
    emoji: "🔄",
    name: "색상 변환기",
    description:
      "HEX, RGB, HSL 색상 형식을 상호 변환합니다. 실시간 미리보기, 슬라이더 조정 지원.",
  },
  {
    slug: "gradient-generator",
    category: "color",
    emoji: "🌈",
    name: "그라디언트 생성기",
    description:
      "CSS 그라디언트 코드를 생성합니다. 선형, 방사형 지원. 프리셋 제공.",
  },
  {
    slug: "color-palette",
    category: "color",
    emoji: "🎨",
    name: "컬러 팔레트 생성기",
    description:
      "조화로운 색상 조합을 추천합니다. 단색, 유사, 보색, 삼각, 사각 조화 팔레트 제공.",
  },
  {
    slug: "color-extractor",
    category: "color",
    emoji: "📸",
    name: "색상 추출기",
    description:
      "이미지에서 주요 색상을 추출합니다. 상위 10개 색상 자동 추출, HEX 코드 복사.",
  },
  {
    slug: "timer-stopwatch",
    category: "random",
    emoji: "⏱️",
    name: "타이머 & 스톱워치",
    description:
      "타이머, 스톱워치, 포모도로 기법을 한 곳에서. 알람 기능, 랩타임 기록, 집중 시간 관리에 유용합니다.",
  },
  {
    slug: "random-number",
    category: "random",
    emoji: "🔢",
    name: "랜덤 숫자 생성기",
    description:
      "범위 내 난수를 생성합니다. 최솟값/최댓값 설정, 중복 허용/불가 선택, 여러 개 생성 지원.",
  },
  {
    slug: "random-name",
    category: "random",
    emoji: "👤",
    name: "랜덤 이름 생성기",
    description:
      "한국 이름과 영어 이름을 무작위로 생성합니다. 남/여 성별 선택 가능.",
  },
  {
    slug: "dice-coin",
    category: "random",
    emoji: "🎲",
    name: "주사위/동전 던지기",
    description:
      "주사위 굴리기와 동전 던지기 시뮬레이터. 4~100면 주사위 지원, 히스토리 및 통계 제공.",
  },
  {
    slug: "lotto-generator",
    category: "random",
    emoji: "🎰",
    name: "로또 번호 생성기",
    description:
      "자동 로또 번호 추천. 1~45 중 6개 생성, 포함/제외 번호 설정, 즐겨찾기 기능.",
  },
];

export const toolPath = (slug: string) => `/pages/${slug}`;

export const getToolsByCategory = (category: CategoryId) =>
  tools.filter((tool) => tool.category === category);

export const getToolBySlug = (slug: string) => tools.find((tool) => tool.slug === slug);
