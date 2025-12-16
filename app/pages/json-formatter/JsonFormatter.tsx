"use client";

import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [indent, setIndent] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError(`JSON 문법 오류: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (e) {
      setError(`JSON 문법 오류: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          JSON 포매터/검증기
        </h1>

        {/* 컨트롤 버튼 */}
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <button
            onClick={formatJson}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            포맷팅
          </button>
          <button
            onClick={minifyJson}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
          >
            축소
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-md ${
              output
                ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {copied ? "복사됨!" : "복사"}
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
          >
            초기화
          </button>

          {/* 들여쓰기 옵션 */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-gray-700 font-semibold">들여쓰기:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>2칸</option>
              <option value={4}>4칸</option>
            </select>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-red-700 font-semibold">❌ {error}</p>
          </div>
        )}

        {/* JSON 입력/출력 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">입력 (JSON)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "홍길동", "age": 30}'
              className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
            />
          </div>

          {/* 출력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">출력</label>
            <textarea
              value={output}
              readOnly
              placeholder="포맷팅된 결과가 여기에 표시됩니다"
              className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono text-sm resize-none"
            />
          </div>
        </div>

        {/* 사용 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 방법</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">1.</span>
              <span>왼쪽 입력란에 JSON 데이터를 입력하거나 붙여넣습니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">2.</span>
              <span>
                <strong>포맷팅</strong> 버튼을 클릭하면 JSON을 들여쓰기가 적용된 읽기 쉬운 형태로 변환합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">3.</span>
              <span>
                <strong>축소</strong> 버튼을 클릭하면 공백을 제거하여 최소 크기로 압축합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">4.</span>
              <span>
                <strong>복사</strong> 버튼으로 결과를 클립보드에 복사할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">5.</span>
              <span>들여쓰기는 2칸 또는 4칸으로 선택할 수 있습니다.</span>
            </li>
          </ul>
        </div>

        {/* 예제 */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">예제</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 mb-2 font-semibold">입력 예시:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto font-mono">
              {`{"name":"홍길동","age":30,"hobbies":["독서","운동"],"address":{"city":"서울","district":"강남구"}}`}
            </pre>
            <p className="text-gray-700 mt-4 mb-2 font-semibold">포맷팅 결과:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto font-mono">
              {`{
  "name": "홍길동",
  "age": 30,
  "hobbies": [
    "독서",
    "운동"
  ],
  "address": {
    "city": "서울",
    "district": "강남구"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
