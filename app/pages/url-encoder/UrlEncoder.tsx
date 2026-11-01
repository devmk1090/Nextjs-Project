"use client";

import { useState } from "react";

export default function UrlEncoder() {
  const [textInput, setTextInput] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [urlOutput, setUrlOutput] = useState<string>("");
  const [encodeError, setEncodeError] = useState<string>("");
  const [decodeError, setDecodeError] = useState<string>("");
  const [encodeCopied, setEncodeCopied] = useState<boolean>(false);
  const [decodeCopied, setDecodeCopied] = useState<boolean>(false);

  // 텍스트를 URL 인코딩
  const encodeToUrl = () => {
    try {
      if (!textInput) {
        setEncodeError("텍스트를 입력해주세요.");
        setUrlOutput("");
        return;
      }
      const encoded = encodeURIComponent(textInput);
      setUrlOutput(encoded);
      setEncodeError("");
    } catch (e) {
      setEncodeError(`인코딩 오류: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
      setUrlOutput("");
    }
  };

  // URL을 디코딩
  const decodeFromUrl = () => {
    try {
      if (!urlInput) {
        setDecodeError("URL 인코딩된 문자열을 입력해주세요.");
        setTextOutput("");
        return;
      }
      const decoded = decodeURIComponent(urlInput);
      setTextOutput(decoded);
      setDecodeError("");
    } catch (e) {
      setDecodeError(`디코딩 오류: ${e instanceof Error ? e.message : "올바른 URL 인코딩 형식이 아닙니다"}`);
      setTextOutput("");
    }
  };

  // 인코딩 결과 복사
  const copyEncoded = async () => {
    try {
      await navigator.clipboard.writeText(urlOutput);
      setEncodeCopied(true);
      setTimeout(() => setEncodeCopied(false), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  // 디코딩 결과 복사
  const copyDecoded = async () => {
    try {
      await navigator.clipboard.writeText(textOutput);
      setDecodeCopied(true);
      setTimeout(() => setDecodeCopied(false), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  // 인코딩 영역 초기화
  const clearEncode = () => {
    setTextInput("");
    setUrlOutput("");
    setEncodeError("");
  };

  // 디코딩 영역 초기화
  const clearDecode = () => {
    setUrlInput("");
    setTextOutput("");
    setDecodeError("");
  };

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink mb-6">
          URL 인코더/디코더
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 인코딩 섹션 */}
          <section className="rounded-2xl p-6 bg-canvas">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">텍스트 → URL 인코딩</h2>

            {/* 텍스트 입력 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">텍스트 입력</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="URL 인코딩할 텍스트를 입력하세요&#10;예: 안녕하세요 Hello World!"
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand text-sm resize-none"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={encodeToUrl}
                className="flex-1 px-6 py-2 bg-brand text-white rounded-xl font-semibold hover:bg-brand-hover transition-all hover:shadow-md"
              >
                인코딩
              </button>
              <button
                onClick={clearEncode}
                className="px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all hover:shadow-md"
              >
                초기화
              </button>
            </div>

            {/* 에러 메시지 */}
            {encodeError && (
              <div className="mb-4 p-3 bg-red-50 rounded-xl">
                <p className="text-red-700 text-sm font-semibold">{encodeError}</p>
              </div>
            )}

            {/* URL 인코딩 출력 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-semibold">URL 인코딩 결과</label>
                <button
                  onClick={copyEncoded}
                  disabled={!urlOutput}
                  className={`px-4 py-1 rounded-xl text-sm font-semibold transition-all ${
                    urlOutput
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {encodeCopied ? "복사됨!" : "복사"}
                </button>
              </div>
              <textarea
                value={urlOutput}
                readOnly
                placeholder="인코딩된 URL 문자열이 여기에 표시됩니다"
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm resize-none break-all"
              />
            </div>
          </section>

          {/* 디코딩 섹션 */}
          <section className="rounded-2xl p-6 bg-canvas">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">URL 인코딩 → 텍스트 디코딩</h2>

            {/* URL 입력 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">URL 인코딩 입력</label>
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="디코딩할 URL 인코딩 문자열을 입력하세요&#10;예: %EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94"
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand font-mono text-sm resize-none break-all"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={decodeFromUrl}
                className="flex-1 px-6 py-2 bg-brand text-white rounded-xl font-semibold hover:bg-brand-hover transition-all hover:shadow-md"
              >
                디코딩
              </button>
              <button
                onClick={clearDecode}
                className="px-6 py-2 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all hover:shadow-md"
              >
                초기화
              </button>
            </div>

            {/* 에러 메시지 */}
            {decodeError && (
              <div className="mb-4 p-3 bg-red-50 rounded-xl">
                <p className="text-red-700 text-sm font-semibold">{decodeError}</p>
              </div>
            )}

            {/* 텍스트 출력 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-semibold">텍스트 결과</label>
                <button
                  onClick={copyDecoded}
                  disabled={!textOutput}
                  className={`px-4 py-1 rounded-xl text-sm font-semibold transition-all ${
                    textOutput
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {decodeCopied ? "복사됨!" : "복사"}
                </button>
              </div>
              <textarea
                value={textOutput}
                readOnly
                placeholder="디코딩된 텍스트가 여기에 표시됩니다"
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm resize-none"
              />
            </div>
          </section>
        </div>

        {/* 사용 가이드 */}
        <div className="mt-8 bg-canvas rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">URL 인코딩이란?</h2>
          <div className="text-gray-700 space-y-3">
            <p>
              URL 인코딩(퍼센트 인코딩)은 URL에서 사용할 수 없는 문자를 안전하게 전송하기 위해 변환하는 방식입니다.
              공백, 한글, 특수문자 등을 %XX 형태의 16진수 코드로 변환합니다.
            </p>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">주요 사용처:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>URL 쿼리 파라미터에 한글이나 특수문자 포함 시</li>
                <li>검색 엔진 쿼리 문자열 (예: ?q=검색어)</li>
                <li>API 요청 URL에 특수문자 데이터 전달</li>
                <li>폼 데이터 전송 (application/x-www-form-urlencoded)</li>
                <li>브라우저 주소창에 안전한 문자열 표현</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 인코딩 규칙 */}
        <div className="mt-8 bg-canvas rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">인코딩 규칙</h2>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-gray-800 mb-2">인코딩되지 않는 문자:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>영문자: A-Z, a-z</li>
                    <li>숫자: 0-9</li>
                    <li>특수문자: - _ . ~ </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-2">인코딩되는 문자:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>공백 → %20</li>
                    <li>한글 → %XX%XX%XX (UTF-8)</li>
                    <li>특수문자: ! # $ % & 등</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 예제 */}
        <div className="mt-8 bg-canvas rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">예제</h2>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 mb-2 font-semibold">원본 텍스트:</p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">안녕하세요 Hello World!</pre>
              </div>
              <div>
                <p className="text-gray-700 mb-2 font-semibold">URL 인코딩:</p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto font-mono break-all">
                  %EB%82%98%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94%20Hello%20World!
                </pre>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 mb-2 font-semibold">실제 사용 예:</p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto font-mono break-all">
                  https://example.com/search?q=%EA%B2%80%EC%83%89%EC%96%B4&page=1
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
