"use client";

import { useState } from "react";
import Link from "next/link";

export default function DrawerNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: "calculator", name: "계산기", emoji: "📊", path: "/" },
    { id: "developer", name: "개발자 도구", emoji: "🛠️", path: "/" },
    { id: "text", name: "텍스트 도구", emoji: "📝", path: "/" },
    { id: "color", name: "색상 도구", emoji: "🎨", path: "/" },
    { id: "random", name: "랜덤 생성기", emoji: "🎲", path: "/" }
  ];

  return (
    <>
      {/* 햄버거 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-20 p-2 rounded-md hover:bg-gray-100 bg-white shadow-md"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="mt-12">
            {/* 제목 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 px-4">
                올인원 유틸리티 도구
              </h2>
              <p className="text-sm text-gray-600 px-4 mt-1">34개의 도구</p>
            </div>

            {/* 카테고리 목록 */}
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`${category.path}#${category.id}`}
                    className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-100 rounded-lg transition-all group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-2xl mr-3">{category.emoji}</span>
                    <span className="font-semibold group-hover:text-blue-600">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
