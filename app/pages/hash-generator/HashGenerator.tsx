"use client";

import { useState } from "react";

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export default function HashGenerator() {
  const [input, setInput] = useState<string>("");
  const [hashes, setHashes] = useState<{ [key in HashAlgorithm]?: string }>({});
  const [copied, setCopied] = useState<string>("");

  // 해시 생성
  const generateHashes = async () => {
    if (!input) {
      setHashes({});
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algorithms: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const results: { [key in HashAlgorithm]?: string } = {};

    for (const algorithm of algorithms) {
      try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        results[algorithm] = hashHex;
      } catch (e) {
        results[algorithm] = "오류 발생";
      }
    }

    setHashes(results);
  };

  // 복사 기능
  const copyToClipboard = async (text: string, algorithm: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(algorithm);
      setTimeout(() => setCopied(""), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  // 입력 변경 시 자동으로 해시 생성
  const handleInputChange = (value: string) => {
    setInput(value);
    if (value) {
      generateHashes();
    } else {
      setHashes({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          해시 생성기
        </h1>

        {/* 입력 영역 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">입력 텍스트</label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="해시를 생성할 텍스트를 입력하세요"
            className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            입력한 텍스트의 해시가 자동으로 생성됩니다.
          </p>
        </div>

        {/* 해시 결과 */}
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">해시 결과</h2>

            {/* SHA-1 */}
            {hashes["SHA-1"] && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">SHA-1</h3>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-600">{hashes["SHA-1"]?.length / 2} bytes</span>
                    <button
                      onClick={() => copyToClipboard(hashes["SHA-1"]!, "SHA-1")}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                    >
                      {copied === "SHA-1" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300 overflow-x-auto">
                  <code className="font-mono text-sm break-all">{hashes["SHA-1"]}</code>
                </div>
                <p className="text-xs text-red-600 mt-2">
                  ⚠️ SHA-1은 보안에 취약하여 권장되지 않습니다. SHA-256 이상을 사용하세요.
                </p>
              </div>
            )}

            {/* SHA-256 */}
            {hashes["SHA-256"] && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">SHA-256</h3>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-600">{hashes["SHA-256"]?.length / 2} bytes</span>
                    <button
                      onClick={() => copyToClipboard(hashes["SHA-256"]!, "SHA-256")}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                    >
                      {copied === "SHA-256" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300 overflow-x-auto">
                  <code className="font-mono text-sm break-all">{hashes["SHA-256"]}</code>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  ✅ 권장되는 해시 알고리즘입니다. 비트코인, SSL/TLS 등에서 사용됩니다.
                </p>
              </div>
            )}

            {/* SHA-384 */}
            {hashes["SHA-384"] && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">SHA-384</h3>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-600">{hashes["SHA-384"]?.length / 2} bytes</span>
                    <button
                      onClick={() => copyToClipboard(hashes["SHA-384"]!, "SHA-384")}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                    >
                      {copied === "SHA-384" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300 overflow-x-auto">
                  <code className="font-mono text-sm break-all">{hashes["SHA-384"]}</code>
                </div>
              </div>
            )}

            {/* SHA-512 */}
            {hashes["SHA-512"] && (
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">SHA-512</h3>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-600">{hashes["SHA-512"]?.length / 2} bytes</span>
                    <button
                      onClick={() => copyToClipboard(hashes["SHA-512"]!, "SHA-512")}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                    >
                      {copied === "SHA-512" ? "복사됨!" : "복사"}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300 overflow-x-auto">
                  <code className="font-mono text-sm break-all">{hashes["SHA-512"]}</code>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  ✅ 가장 강력한 보안을 제공합니다. 높은 보안이 필요한 경우 사용하세요.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 해시란? */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">해시(Hash)란?</h2>
          <div className="text-gray-700 space-y-3">
            <p>
              해시 함수는 임의의 길이의 데이터를 고정된 길이의 데이터로 변환하는 단방향 암호화 함수입니다.
              동일한 입력은 항상 동일한 해시 값을 생성하지만, 해시 값으로부터 원본 데이터를 복원할 수 없습니다.
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">주요 특징:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>결정론적: 같은 입력 → 항상 같은 출력</li>
                <li>단방향: 해시 값에서 원본 복원 불가능</li>
                <li>눈사태 효과: 입력의 작은 변화가 큰 출력 변화를 만듦</li>
                <li>고정 길이: 입력 크기와 관계없이 고정된 길이 출력</li>
                <li>충돌 저항성: 동일한 해시를 생성하는 두 입력을 찾기 어려움</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 사용처 */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 사용처</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">비밀번호 저장</h3>
              <p className="text-gray-700">
                비밀번호를 평문으로 저장하지 않고 해시 값으로 저장하여 보안을 강화합니다.
                (단, salt와 함께 사용 권장)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">데이터 무결성 검증</h3>
              <p className="text-gray-700">
                파일 다운로드 시 해시 값을 비교하여 파일이 변조되지 않았는지 확인합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">디지털 서명</h3>
              <p className="text-gray-700">
                문서나 소프트웨어의 진위를 확인하기 위해 해시 값에 서명합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">블록체인</h3>
              <p className="text-gray-700">
                비트코인 등 블록체인 기술에서 블록과 트랜잭션을 검증하는 데 사용됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 알고리즘 비교 */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">알고리즘 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">알고리즘</th>
                  <th className="px-4 py-2 text-left">해시 길이</th>
                  <th className="px-4 py-2 text-left">보안 수준</th>
                  <th className="px-4 py-2 text-left">권장 여부</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">SHA-1</td>
                  <td className="px-4 py-2">160 bit (20 bytes)</td>
                  <td className="px-4 py-2 text-red-600">취약</td>
                  <td className="px-4 py-2 text-red-600">❌ 비권장</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">SHA-256</td>
                  <td className="px-4 py-2">256 bit (32 bytes)</td>
                  <td className="px-4 py-2 text-green-600">강력</td>
                  <td className="px-4 py-2 text-green-600">✅ 권장</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-mono">SHA-384</td>
                  <td className="px-4 py-2">384 bit (48 bytes)</td>
                  <td className="px-4 py-2 text-green-600">매우 강력</td>
                  <td className="px-4 py-2 text-green-600">✅ 권장</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SHA-512</td>
                  <td className="px-4 py-2">512 bit (64 bytes)</td>
                  <td className="px-4 py-2 text-green-600">최강</td>
                  <td className="px-4 py-2 text-green-600">✅ 권장</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">⚠️ 주의사항</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>비밀번호 해싱:</strong> 비밀번호를 해시할 때는 반드시 salt를 사용하고,
              bcrypt, scrypt, Argon2 같은 전용 알고리즘을 사용하세요.
            </li>
            <li>
              <strong>SHA-1 사용 금지:</strong> SHA-1은 충돌 공격에 취약하므로 보안 용도로 사용하지 마세요.
            </li>
            <li>
              <strong>개인정보 주의:</strong> 민감한 개인정보는 해시하기 전에 암호화를 고려하세요.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
