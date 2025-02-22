"use client";

import { useState } from "react";
import Link from "next/link";

export default function DrawerNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 햄버거 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-20 p-2 rounded-md hover:bg-gray-100"
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
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

          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  만 나이 계산기
                </Link>
              </li>
              <li>
                <Link
                  href="/another-page"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Another Page
                </Link>
              </li>
              {/* 추가 메뉴 항목들 */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}