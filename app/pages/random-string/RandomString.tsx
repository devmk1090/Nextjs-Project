"use client";

import { useState } from "react";

export default function RandomString() {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      alert("최소 한 가지 문자 종류를 선택해주세요.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setResult(password);
  };

  const generateUUID = () => {
    setResult(crypto.randomUUID());
  };

  const generateNanoid = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 21; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setResult(id);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          랜덤 문자열 생성기
        </h1>

        {/* 비밀번호 생성 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">비밀번호 생성</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              길이: {length}자
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-gray-700">대문자 (A-Z)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-gray-700">소문자 (a-z)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-gray-700">숫자 (0-9)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-gray-700">특수문자 (!@#$...)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            비밀번호 생성
          </button>
        </div>

        {/* UUID 생성 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">UUID 생성</h2>
          <p className="text-gray-700 mb-4 text-sm">
            범용 고유 식별자(UUID v4)를 생성합니다. 데이터베이스 ID, API 키 등에 사용됩니다.
          </p>
          <button
            onClick={generateUUID}
            className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
          >
            UUID 생성
          </button>
        </div>

        {/* Nano ID 생성 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nano ID 생성</h2>
          <p className="text-gray-700 mb-4 text-sm">
            짧고 안전한 URL 친화적 고유 ID를 생성합니다. (21자)
          </p>
          <button
            onClick={generateNanoid}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
          >
            Nano ID 생성
          </button>
        </div>

        {/* 결과 */}
        {result && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800">결과</h2>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                {copied ? "복사됨!" : "복사"}
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300 overflow-x-auto">
              <code className="font-mono text-lg break-all">{result}</code>
            </div>
          </div>
        )}

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>비밀번호:</strong> 최소 12자 이상, 대소문자+숫자+특수문자 조합 권장</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>UUID:</strong> 128비트 고유 식별자, 중복 확률 극히 낮음</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>Nano ID:</strong> UUID보다 짧고 URL 친화적, 충돌 확률 낮음</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
