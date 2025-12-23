"use client";

import { useState } from "react";

export default function CaseConverter() {
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  // 대문자로 변환
  const toUpperCase = () => input.toUpperCase();

  // 소문자로 변환
  const toLowerCase = () => input.toLowerCase();

  // 첫 글자만 대문자 (Sentence case)
  const toSentenceCase = () => {
    return input.toLowerCase().replace(/(^\w|\.\s+\w)/g, (letter) => letter.toUpperCase());
  };

  // 각 단어 첫 글자 대문자 (Title Case)
  const toTitleCase = () => {
    return input.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // 카멜케이스 (camelCase)
  const toCamelCase = () => {
    return input
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (match) => match.toLowerCase());
  };

  // 파스칼케이스 (PascalCase)
  const toPascalCase = () => {
    return input
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, (match) => match.toUpperCase());
  };

  // 스네이크케이스 (snake_case)
  const toSnakeCase = () => {
    return input
      .replace(/\s+/g, "_")
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");
  };

  // 케밥케이스 (kebab-case)
  const toKebabCase = () => {
    return input
      .replace(/\s+/g, "-")
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "");
  };

  // 복사 기능
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  const conversions = [
    { label: "대문자", func: toUpperCase, key: "upper", desc: "UPPER CASE" },
    { label: "소문자", func: toLowerCase, key: "lower", desc: "lower case" },
    { label: "문장 케이스", func: toSentenceCase, key: "sentence", desc: "Sentence case" },
    { label: "타이틀 케이스", func: toTitleCase, key: "title", desc: "Title Case" },
    { label: "카멜케이스", func: toCamelCase, key: "camel", desc: "camelCase" },
    { label: "파스칼케이스", func: toPascalCase, key: "pascal", desc: "PascalCase" },
    { label: "스네이크케이스", func: toSnakeCase, key: "snake", desc: "snake_case" },
    { label: "케밥케이스", func: toKebabCase, key: "kebab", desc: "kebab-case" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          케이스 변환기
        </h1>

        {/* 입력 영역 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">텍스트 입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="변환할 텍스트를 입력하세요..."
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        {/* 변환 결과 */}
        {input && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">변환 결과</h2>
            {conversions.map((conversion) => {
              const result = conversion.func();
              return (
                <div
                  key={conversion.key}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{conversion.label}</h3>
                      <p className="text-xs text-gray-500">{conversion.desc}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(result, conversion.key)}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                    >
                      {copied === conversion.key ? "복사됨!" : "복사"}
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-300 overflow-x-auto">
                    <code className="font-mono text-sm break-all">{result}</code>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">케이스 종류 설명</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">camelCase (카멜케이스)</h3>
              <p className="text-gray-700 mb-2">첫 단어는 소문자, 이후 단어는 대문자로 시작</p>
              <code className="font-mono text-blue-600">myVariableName</code>
              <p className="text-xs text-gray-500 mt-2">주로 JavaScript, Java 변수명에 사용</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">PascalCase (파스칼케이스)</h3>
              <p className="text-gray-700 mb-2">모든 단어의 첫 글자를 대문자로</p>
              <code className="font-mono text-blue-600">MyClassName</code>
              <p className="text-xs text-gray-500 mt-2">주로 클래스명, 컴포넌트명에 사용</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">snake_case (스네이크케이스)</h3>
              <p className="text-gray-700 mb-2">단어를 언더스코어(_)로 구분, 모두 소문자</p>
              <code className="font-mono text-blue-600">my_variable_name</code>
              <p className="text-xs text-gray-500 mt-2">주로 Python, Ruby, 데이터베이스 필드명에 사용</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">kebab-case (케밥케이스)</h3>
              <p className="text-gray-700 mb-2">단어를 하이픈(-)으로 구분, 모두 소문자</p>
              <code className="font-mono text-blue-600">my-variable-name</code>
              <p className="text-xs text-gray-500 mt-2">주로 URL, CSS 클래스명에 사용</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
