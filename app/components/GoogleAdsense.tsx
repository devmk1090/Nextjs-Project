"use client";

import { useEffect } from "react";

export default function GoogleAdsense() {
  useEffect(() => {
    try {
      // 기존 스크립트가 있으면 제거 (중복 방지)
      const existingScript = document.getElementById("google-adsense");
      if (existingScript) {
        return;
      }
      
      // 구글 애드센스 스크립트 생성
      const script = document.createElement("script");
      script.id = "google-adsense";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT_KEY}`;
      
      // 스크립트를 head에 추가
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error loading Google AdSense:", error);
    }
  }, []);

  return null;
} 