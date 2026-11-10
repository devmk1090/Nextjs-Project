export const siteName = "올인원 유틸리티";
// 검색엔진에 함께 알려 줄 다른 이름 (구조화 데이터 alternateName)
export const siteAlternateNames = ["올인원 유틸리티 도구"];
export const contactEmail = "devmk1090@gmail.com";
export const githubUrl = "https://github.com/devmk1090/Nextjs-Project";
export const launchYear = 2025;

// AdSense 게시자 ID. public/ads.txt에 이미 공개된 값이라 코드에 직접 둡니다
// (환경변수로 두면 빌드 시 값이 빠졌을 때 client=undefined가 되어 광고 코드가 깨짐).
export const adsenseClient = "ca-pub-1646409874287424";

// 끝에 슬래시가 없는 사이트 주소. sitemap, robots, 구조화 데이터의 절대 URL에 사용합니다.
export const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://all-in-one-k-calculator.vercel.app"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

// 모든 페이지 Open Graph 공통값. 페이지에서 openGraph를 따로 지정하면 레이아웃 값이 통째로 덮이므로
// 반드시 ...ogDefaults를 먼저 펼쳐 사이트 이름(og:site_name)이 빠지지 않게 합니다.
export const ogDefaults = {
  siteName,
  locale: "ko_KR",
  type: "website",
} as const;
