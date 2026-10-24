"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories, getToolsByCategory, toolPath } from "./tools";

export default function HomeContent() {
  const [activeTab, setActiveTab] = useState("calculator");

  // URL 해시로 탭 전환
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && categories.some((category) => category.id === hash)) {
        setActiveTab(hash);
      }
    };

    // 초기 로드 시 해시 확인
    handleHashChange();

    // 해시 변경 이벤트 리스너 등록
    window.addEventListener("hashchange", handleHashChange);

    // 클린업
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          올인원 유틸리티 도구
        </h1>

        {/* 탭 버튼 */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((tab) => (
            <button
              key={tab.id}
              id={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {tab.emoji} {tab.name}
            </button>
          ))}
        </div>

        {/* 카테고리별 도구 목록: 크롤러가 모든 링크를 볼 수 있도록 전부 렌더링하고 비활성 탭은 숨김 */}
        {categories.map((category) => (
          <section
            key={category.id}
            aria-label={category.name}
            className={activeTab === category.id ? "" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getToolsByCategory(category.id).map((tool) => (
                <Link
                  key={tool.slug}
                  href={toolPath(tool.slug)}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                >
                  <h3 className="font-bold text-gray-800 mb-2">
                    {tool.emoji} {tool.name}
                  </h3>
                  <p className="text-sm text-gray-700">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 이용 방법 */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">이용 방법</h2>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <span className="text-gray-700">위에서 원하는 도구를 선택합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <span className="text-gray-700">필요한 정보를 입력하고 결과를 확인합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <span className="text-gray-700">탭을 전환하여 다른 카테고리의 도구도 이용해보세요.</span>
            </li>
          </ol>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 회원가입이 필요한가요?</h3>
              <p className="text-gray-700">A. 아니요, 모든 도구는 회원가입 없이 무료로 이용할 수 있습니다.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 입력한 정보가 저장되나요?</h3>
              <p className="text-gray-700">A. 아니요, 입력한 정보는 서버에 저장되지 않으며 브라우저에서만 처리됩니다. 개인정보 보호를 최우선으로 합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
