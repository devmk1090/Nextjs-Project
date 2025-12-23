"use client";

import { useState } from "react";

export default function Base64Converter() {
  const [textInput, setTextInput] = useState<string>("");
  const [base64Input, setBase64Input] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [base64Output, setBase64Output] = useState<string>("");
  const [encodeError, setEncodeError] = useState<string>("");
  const [decodeError, setDecodeError] = useState<string>("");
  const [encodeCopied, setEncodeCopied] = useState<boolean>(false);
  const [decodeCopied, setDecodeCopied] = useState<boolean>(false);

  // 텍스트를 Base64로 인코딩
  const encodeToBase64 = () => {
    try {
      if (!textInput) {
        setEncodeError("텍스트를 입력해주세요.");
        setBase64Output("");
        return;
      }
      // UTF-8 인코딩을 위해 encodeURIComponent 사용
      const encoded = btoa(unescape(encodeURIComponent(textInput)));
      setBase64Output(encoded);
      setEncodeError("");
    } catch (e) {
      setEncodeError(`인코딩 오류: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
      setBase64Output("");
    }
  };

  // Base64를 텍스트로 디코딩
  const decodeFromBase64 = () => {
    try {
      if (!base64Input) {
        setDecodeError("Base64 문자열을 입력해주세요.");
        setTextOutput("");
        return;
      }
      // UTF-8 디코딩
      const decoded = decodeURIComponent(escape(atob(base64Input)));
      setTextOutput(decoded);
      setDecodeError("");
    } catch (e) {
      setDecodeError(`디코딩 오류: ${e instanceof Error ? e.message : "올바른 Base64 형식이 아닙니다"}`);
      setTextOutput("");
    }
  };

  // 인코딩 결과 복사
  const copyEncoded = async () => {
    try {
      await navigator.clipboard.writeText(base64Output);
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
    setBase64Output("");
    setEncodeError("");
  };

  // 디코딩 영역 초기화
  const clearDecode = () => {
    setBase64Input("");
    setTextOutput("");
    setDecodeError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Base64 인코더/디코더
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 인코딩 섹션 */}
          <section className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 텍스트 → Base64 인코딩</h2>

            {/* 텍스트 입력 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">텍스트 입력</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="인코딩할 텍스트를 입력하세요"
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={encodeToBase64}
                className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                인코딩
              </button>
              <button
                onClick={clearEncode}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
              >
                초기화
              </button>
            </div>

            {/* 에러 메시지 */}
            {encodeError && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
                <p className="text-red-700 text-sm font-semibold">❌ {encodeError}</p>
              </div>
            )}

            {/* Base64 출력 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-semibold">Base64 결과</label>
                <button
                  onClick={copyEncoded}
                  disabled={!base64Output}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold transition-all ${
                    base64Output
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {encodeCopied ? "복사됨!" : "복사"}
                </button>
              </div>
              <textarea
                value={base64Output}
                readOnly
                placeholder="인코딩된 Base64 문자열이 여기에 표시됩니다"
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono text-sm resize-none"
              />
            </div>
          </section>

          {/* 디코딩 섹션 */}
          <section className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔓 Base64 → 텍스트 디코딩</h2>

            {/* Base64 입력 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Base64 입력</label>
              <textarea
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                placeholder="디코딩할 Base64 문자열을 입력하세요"
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-none"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={decodeFromBase64}
                className="flex-1 px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
              >
                디코딩
              </button>
              <button
                onClick={clearDecode}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
              >
                초기화
              </button>
            </div>

            {/* 에러 메시지 */}
            {decodeError && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
                <p className="text-red-700 text-sm font-semibold">❌ {decodeError}</p>
              </div>
            )}

            {/* 텍스트 출력 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-semibold">텍스트 결과</label>
                <button
                  onClick={copyDecoded}
                  disabled={!textOutput}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold transition-all ${
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
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm resize-none"
              />
            </div>
          </section>
        </div>

        {/* 사용 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Base64란?</h2>
          <div className="text-gray-700 space-y-3">
            <p>
              Base64는 바이너리 데이터를 텍스트 형태로 변환하는 인코딩 방식입니다. 이메일, URL, JSON 등 텍스트만 지원하는
              환경에서 바이너리 데이터를 전송할 때 사용됩니다.
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">주요 사용처:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>이미지를 HTML/CSS에 직접 임베딩 (Data URL)</li>
                <li>API 인증 토큰 (Basic Authentication)</li>
                <li>이메일 첨부파일 인코딩</li>
                <li>JSON 내부에 바이너리 데이터 포함</li>
                <li>URL에 특수문자 포함된 데이터 전달</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 예제 */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">예제</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 mb-2 font-semibold">원본 텍스트:</p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">안녕하세요 Hello World!</pre>
              </div>
              <div>
                <p className="text-gray-700 mb-2 font-semibold">Base64 인코딩:</p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto font-mono">
                  7JWI64WV7ZWY7IS47JqUIEhlbGxvIFdvcmxkIQ==
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
