import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // 디자인 토큰: 회색 바탕(canvas) 위 흰 카드, 포인트 색은 brand 하나만 씁니다.
      colors: {
        brand: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          soft: "#EFF6FF",
        },
        ink: {
          DEFAULT: "#191F28",
          2: "#333D4B",
          3: "#4E5968",
          4: "#6B7684",
        },
        canvas: "#F2F4F6",
        line: "#E5E8EB",
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
