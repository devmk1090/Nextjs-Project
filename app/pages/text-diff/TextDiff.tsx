"use client";

import { useState } from "react";
import * as Diff from "diff";

export default function TextDiff() {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [diffType, setDiffType] = useState<"chars" | "words" | "lines">("lines");

  const getDiff = () => {
    if (!text1 && !text2) return [];

    switch (diffType) {
      case "chars":
        return Diff.diffChars(text1, text2);
      case "words":
        return Diff.diffWords(text1, text2);
      case "lines":
        return Diff.diffLines(text1, text2);
      default:
        return [];
    }
  };

  const diff = getDiff();

  const stats = {
    added: diff.filter((part) => part.added).reduce((sum, part) => sum + part.value.length, 0),
    removed: diff.filter((part) => part.removed).reduce((sum, part) => sum + part.value.length, 0),
    unchanged: diff.filter((part) => !part.added && !part.removed).reduce((sum, part) => sum + part.value.length, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          텍스트 비교
        </h1>

        {/* 비교 타입 선택 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">비교 단위</label>
          <div className="flex gap-3">
            <button
              onClick={() => setDiffType("chars")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                diffType === "chars"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              문자 단위
            </button>
            <button
              onClick={() => setDiffType("words")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                diffType === "words"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              단어 단위
            </button>
            <button
              onClick={() => setDiffType("lines")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                diffType === "lines"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              줄 단위
            </button>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">원본 텍스트</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="원본 텍스트를 입력하세요..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none font-mono"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">비교 텍스트</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="비교할 텍스트를 입력하세요..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none font-mono"
            />
          </div>
        </div>

        {/* 통계 */}
        {(text1 || text2) && (
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">추가됨</p>
              <p className="text-2xl font-bold text-green-600">+{stats.added}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">제거됨</p>
              <p className="text-2xl font-bold text-red-600">-{stats.removed}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
              <p className="text-sm text-gray-600 mb-1">변경 없음</p>
              <p className="text-2xl font-bold text-gray-600">{stats.unchanged}</p>
            </div>
          </div>
        )}

        {/* 차이점 표시 */}
        {(text1 || text2) && (
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">차이점</h2>
            <div className="bg-white p-4 rounded-lg border border-gray-300 overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                {diff.map((part, index) => {
                  const color = part.added ? "bg-green-200" : part.removed ? "bg-red-200" : "";
                  const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
                  return (
                    <span key={index} className={color}>
                      {part.value.split("\n").map((line, i) => (
                        <span key={i}>
                          {line && <span className="text-gray-500 select-none">{prefix}</span>}
                          {line}
                          {i < part.value.split("\n").length - 1 && "\n"}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </pre>
            </div>
          </div>
        )}

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 방법</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>문자 단위:</strong> 가장 세밀한 비교. 한 글자 단위로 차이를 표시합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>단어 단위:</strong> 공백으로 구분된 단어 단위로 차이를 표시합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>줄 단위:</strong> 전체 줄 단위로 차이를 표시합니다. (권장)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><span className="bg-green-200 px-1">녹색 배경</span>은 추가된 부분</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><span className="bg-red-200 px-1">빨간색 배경</span>은 제거된 부분</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
