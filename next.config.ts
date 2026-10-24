import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 문의하기 페이지는 사이트 소개 페이지로 통합됨
      { source: "/contact", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
