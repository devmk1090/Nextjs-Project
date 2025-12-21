"use client";

import { useState } from "react";

export default function DuplicateRemover() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [stats, setStats] = useState({ original: 0, unique: 0, duplicates: 0 });
  const [caseSensitive, setCaseSensitive] = useState<boolean>(true);

  const removeDuplicates = () => {
    if (!input) {
      setOutput("");
      setStats({ original: 0, unique: 0, duplicates: 0 });
      return;
    }

    const lines = input.split("\n");
    const original = lines.length;

    const uniqueLines = caseSensitive
      ? [...new Set(lines)]
      : lines.filter((line, index, self) => {
          return self.findIndex((l) => l.toLowerCase() === line.toLowerCase()) === index;
        });

    const unique = uniqueLines.length;
    const duplicates = original - unique;

    setOutput(uniqueLines.join("\n"));
    setStats({ original, unique, duplicates });
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
          중복 제거기
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">입력 (줄 단위)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="줄별로 텍스트를 입력하세요..."
              className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none font-mono"
            />
            <div className="mt-4 space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">대소문자 구분</span>
              </label>
              <button
                onClick={removeDuplicates}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                중복 제거
              </button>
            </div>
          </div>

          {/* 출력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">결과</label>
            <textarea
              value={output}
              readOnly
              placeholder="중복이 제거된 결과가 여기에 표시됩니다"
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

        {/* 통계 */}
        {output && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">원본 줄 수</p>
              <p className="text-2xl font-bold text-blue-600">{stats.original}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">고유 줄 수</p>
              <p className="text-2xl font-bold text-green-600">{stats.unique}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">제거된 중복</p>
              <p className="text-2xl font-bold text-red-600">{stats.duplicates}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
