"use client";

import { useState, useEffect } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("");
  const [flags, setFlags] = useState<string>("g");
  const [testString, setTestString] = useState<string>("");
  const [matches, setMatches] = useState<RegExpMatchArray[] | null>(null);
  const [error, setError] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");

  // 정규식 테스트 실행
  useEffect(() => {
    if (!pattern || !testString) {
      setMatches(null);
      setHighlightedText("");
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matchArray: RegExpMatchArray[] = [];
      let match;

      if (flags.includes("g")) {
        // 전역 검색
        const globalRegex = new RegExp(pattern, flags);
        while ((match = globalRegex.exec(testString)) !== null) {
          matchArray.push(match as RegExpMatchArray);
        }
      } else {
        // 단일 검색
        match = testString.match(regex);
        if (match) {
          matchArray.push(match as RegExpMatchArray);
        }
      }

      setMatches(matchArray.length > 0 ? matchArray : null);
      setError("");

      // 하이라이트 처리
      if (matchArray.length > 0) {
        let highlighted = testString;
        const replacements: { start: number; end: number; text: string }[] = [];

        matchArray.forEach((m) => {
          if (m.index !== undefined) {
            replacements.push({
              start: m.index,
              end: m.index + m[0].length,
              text: m[0],
            });
          }
        });

        // 뒤에서부터 교체 (인덱스 변경 방지)
        replacements.sort((a, b) => b.start - a.start);
        replacements.forEach((r) => {
          highlighted =
            highlighted.substring(0, r.start) +
            `<mark class="bg-yellow-300 font-bold">${r.text}</mark>` +
            highlighted.substring(r.end);
        });

        setHighlightedText(highlighted);
      } else {
        setHighlightedText(testString);
      }
    } catch (e) {
      setError(`정규식 오류: ${e instanceof Error ? e.message : "잘못된 패턴입니다"}`);
      setMatches(null);
      setHighlightedText("");
    }
  }, [pattern, flags, testString]);

  // 플래그 토글
  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          정규식 테스터
        </h1>

        {/* 정규식 패턴 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">정규식 패턴</label>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-gray-600">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="정규식 패턴을 입력하세요 (예: \w+@\w+\.\w+)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
            />
            <span className="text-2xl text-gray-600">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="플래그"
              className="w-20 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg text-center"
            />
          </div>
        </div>

        {/* 플래그 선택 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">플래그</label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleFlag("g")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                flags.includes("g")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              g (전역 검색)
            </button>
            <button
              onClick={() => toggleFlag("i")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                flags.includes("i")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              i (대소문자 무시)
            </button>
            <button
              onClick={() => toggleFlag("m")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                flags.includes("m")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              m (다중행)
            </button>
            <button
              onClick={() => toggleFlag("s")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                flags.includes("s")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              s (dotAll)
            </button>
          </div>
        </div>

        {/* 테스트 문자열 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">테스트 문자열</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="테스트할 문자열을 입력하세요"
            className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-red-700 font-semibold">❌ {error}</p>
          </div>
        )}

        {/* 결과 */}
        {!error && pattern && testString && (
          <div className="space-y-6">
            {/* 매칭 결과 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">매칭 결과</h2>
              <div className="text-lg">
                {matches && matches.length > 0 ? (
                  <p className="text-green-600 font-bold">
                    ✅ {matches.length}개의 매칭이 발견되었습니다.
                  </p>
                ) : (
                  <p className="text-gray-600 font-bold">❌ 매칭되는 결과가 없습니다.</p>
                )}
              </div>
            </div>

            {/* 하이라이트된 텍스트 */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">하이라이트</h2>
              <div
                className="bg-white p-4 rounded-lg border border-gray-300 min-h-[100px] whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: highlightedText || testString }}
              />
            </div>

            {/* 매칭 상세 정보 */}
            {matches && matches.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">매칭 상세</h2>
                <div className="space-y-3">
                  {matches.map((match, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-300">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="font-bold text-gray-700">매칭 #{index + 1}:</span>{" "}
                          <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{match[0]}</span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-700">위치:</span> {match.index}
                        </div>
                        <div>
                          <span className="font-bold text-gray-700">길이:</span> {match[0].length}
                        </div>
                      </div>
                      {match.length > 1 && (
                        <div className="mt-2">
                          <span className="font-bold text-gray-700">캡처 그룹:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {match.slice(1).map((group, gIndex) => (
                              <span key={gIndex} className="font-mono bg-blue-100 px-2 py-1 rounded text-sm">
                                ${gIndex + 1}: {group || "(없음)"}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">정규식 치트시트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">문자 클래스</h3>
              <ul className="space-y-1 font-mono text-gray-700">
                <li><span className="text-blue-600">\d</span> - 숫자 [0-9]</li>
                <li><span className="text-blue-600">\w</span> - 단어 문자 [A-Za-z0-9_]</li>
                <li><span className="text-blue-600">\s</span> - 공백 문자</li>
                <li><span className="text-blue-600">.</span> - 모든 문자 (개행 제외)</li>
                <li><span className="text-blue-600">[abc]</span> - a, b, c 중 하나</li>
                <li><span className="text-blue-600">[^abc]</span> - a, b, c가 아닌 것</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">수량자</h3>
              <ul className="space-y-1 font-mono text-gray-700">
                <li><span className="text-blue-600">*</span> - 0회 이상</li>
                <li><span className="text-blue-600">+</span> - 1회 이상</li>
                <li><span className="text-blue-600">?</span> - 0회 또는 1회</li>
                <li><span className="text-blue-600">{`{n}`}</span> - 정확히 n회</li>
                <li><span className="text-blue-600">{`{n,}`}</span> - n회 이상</li>
                <li><span className="text-blue-600">{`{n,m}`}</span> - n회 이상 m회 이하</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">앵커</h3>
              <ul className="space-y-1 font-mono text-gray-700">
                <li><span className="text-blue-600">^</span> - 문자열 시작</li>
                <li><span className="text-blue-600">$</span> - 문자열 끝</li>
                <li><span className="text-blue-600">\b</span> - 단어 경계</li>
                <li><span className="text-blue-600">\B</span> - 단어 경계 아님</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">그룹</h3>
              <ul className="space-y-1 font-mono text-gray-700">
                <li><span className="text-blue-600">(abc)</span> - 캡처 그룹</li>
                <li><span className="text-blue-600">(?:abc)</span> - 비캡처 그룹</li>
                <li><span className="text-blue-600">a|b</span> - a 또는 b</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 예제 */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 사용하는 패턴</h2>
          <div className="space-y-2 text-sm">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">이메일:</span>{" "}
              <code className="font-mono text-blue-600">\w+@\w+\.\w+</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">URL:</span>{" "}
              <code className="font-mono text-blue-600">https?://[\w\.-]+</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">전화번호:</span>{" "}
              <code className="font-mono text-blue-600">\d{`{2,3}`}-\d{`{3,4}`}-\d{`{4}`}</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">날짜 (YYYY-MM-DD):</span>{" "}
              <code className="font-mono text-blue-600">\d{`{4}`}-\d{`{2}`}-\d{`{2}`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
