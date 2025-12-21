"use client";

import { useState } from "react";

type SortType = "asc" | "desc" | "length-asc" | "length-desc" | "random";

export default function TextSorter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>("asc");

  const sortText = () => {
    if (!input) {
      setOutput("");
      return;
    }

    const lines = input.split("\n");
    let sorted: string[];

    switch (sortType) {
      case "asc":
        sorted = [...lines].sort((a, b) => a.localeCompare(b, "ko"));
        break;
      case "desc":
        sorted = [...lines].sort((a, b) => b.localeCompare(a, "ko"));
        break;
      case "length-asc":
        sorted = [...lines].sort((a, b) => a.length - b.length);
        break;
      case "length-desc":
        sorted = [...lines].sort((a, b) => b.length - a.length);
        break;
      case "random":
        sorted = [...lines].sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = lines;
    }

    setOutput(sorted.join("\n"));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("복사되었습니다!");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          텍스트 정렬 도구
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">입력 (줄 단위)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="정렬할 텍스트를 줄별로 입력하세요..."
              className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none font-mono"
            />
            <div className="mt-4 space-y-3">
              <label className="block text-gray-700 font-semibold mb-2">정렬 방식</label>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value as SortType)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">오름차순 (가나다순, ABC순)</option>
                <option value="desc">내림차순 (역순)</option>
                <option value="length-asc">길이 오름차순 (짧은 것부터)</option>
                <option value="length-desc">길이 내림차순 (긴 것부터)</option>
                <option value="random">무작위 섞기</option>
              </select>
              <button
                onClick={sortText}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                정렬하기
              </button>
            </div>
          </div>

          {/* 출력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">결과</label>
            <textarea
              value={output}
              readOnly
              placeholder="정렬된 결과가 여기에 표시됩니다"
              className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm resize-none font-mono"
            />
            {output && (
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
              >
                복사
              </button>
            )}
          </div>
        </div>

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">정렬 방식 설명</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>오름차순:</strong> 가나다순, ABC순으로 정렬. 한글과 영문을 모두 지원합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>내림차순:</strong> 역순으로 정렬합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>길이 오름차순:</strong> 짧은 줄부터 긴 줄 순서로 정렬합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>길이 내림차순:</strong> 긴 줄부터 짧은 줄 순서로 정렬합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>무작위 섞기:</strong> 줄의 순서를 무작위로 섞습니다.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
