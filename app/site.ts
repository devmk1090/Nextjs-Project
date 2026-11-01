export const siteName = "올인원 유틸리티 도구";
export const contactEmail = "devmk1090@gmail.com";
export const githubUrl = "https://github.com/devmk1090/Nextjs-Project";
export const launchYear = 2025;

// 끝에 슬래시가 없는 사이트 주소. sitemap, robots, 구조화 데이터의 절대 URL에 사용합니다.
export const siteUrl = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://all-in-one-k-calculator.vercel.app"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;
