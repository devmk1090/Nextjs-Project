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

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">정규식(Regular Expression)이란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              정규식(정규 표현식, Regex)은 특정 패턴을 가진 문자열을 찾거나 검증하기 위한 강력한 도구입니다.
              예를 들어 "이메일 형식이 맞는지", "전화번호가 올바른지", "비밀번호가 8자 이상이고 특수문자를 포함하는지" 같은
              복잡한 조건을 단 몇 줄의 패턴으로 검사할 수 있습니다.
            </p>
            <p>
              정규식은 프로그래밍, 데이터 분석, 텍스트 편집기, 검색 엔진 등 거의 모든 IT 분야에서 사용됩니다.
              JavaScript, Python, Java, PHP 등 대부분의 프로그래밍 언어가 정규식을 지원하며,
              VS Code, Sublime Text 같은 편집기의 찾기/바꾸기 기능에서도 정규식을 활용할 수 있습니다.
            </p>
            <p>
              처음에는 복잡해 보이지만, 기본 패턴(\d는 숫자, \w는 문자, +는 1회 이상 반복)만 익혀도 90% 상황을 해결할 수 있습니다.
              우리의 정규식 테스터는 실시간으로 매칭 결과를 하이라이트하고, 캡처 그룹, 위치 정보까지 상세히 보여줘
              정규식 학습과 디버깅을 쉽게 만들어줍니다.
            </p>
            <p>
              정규식은 학습 곡선이 있지만, 한 번 익히면 업무 효율이 몇 배로 향상됩니다.
              엑셀 데이터 정제, 로그 파일 분석, 웹 스크래핑, 입력 폼 검증 등 다양한 작업을 몇 초 만에 해결할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">활용 사례</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">1.</span>
              <div>
                <strong className="text-gray-900">입력 폼 검증:</strong> 회원가입 폼에서 이메일 형식, 전화번호 형식, 비밀번호 강도를 실시간으로 검증합니다.
                예: {`/^\\w+@\\w+\\.\\w+$/`}는 기본 이메일 형식을 확인하고, {`/^(?=.*[A-Z])(?=.*\\d).{8,}$/`}는 "최소 8자, 대문자와 숫자 포함" 조건을 검사합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">2.</span>
              <div>
                <strong className="text-gray-900">데이터 추출:</strong> 웹 페이지 HTML에서 특정 정보를 자동으로 추출합니다.
                예를 들어 "가격: 15,000원" 형태의 텍스트에서 {`/(\\d{1,3}(,\\d{3})*)/`}로 숫자만 뽑아내거나,
                블로그 글에서 모든 URL을 찾아 링크 목록을 만들 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">3.</span>
              <div>
                <strong className="text-gray-900">로그 파일 분석:</strong> 서버 에러 로그에서 특정 패턴의 오류만 필터링합니다.
                예: /ERROR.*database/gi로 "ERROR"와 "database"가 함께 나오는 줄만 추출하여 데이터베이스 관련 오류를 신속히 파악할 수 있습니다.
                수천 줄의 로그를 수동으로 읽지 않아도 됩니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">4.</span>
              <div>
                <strong className="text-gray-900">텍스트 일괄 치환:</strong> VS Code나 Sublime Text에서 수백 개 파일의 변수명을 일괄 변경할 때 사용합니다.
                예를 들어 camelCase를 snake_case로 바꾸거나, 날짜 형식을 "YYYY-MM-DD"에서 "MM/DD/YYYY"로 일괄 변환할 수 있습니다.
                정규식의 캡처 그룹($1, $2)을 활용하면 복잡한 치환도 가능합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">5.</span>
              <div>
                <strong className="text-gray-900">민감 정보 마스킹:</strong> 로그나 보고서에서 전화번호, 주민등록번호, 신용카드 번호 같은 민감 정보를 자동으로 가립니다.
                예: /(\d{3})-(\d{4})-(\d{4})/를 찾아 $1-****-****로 치환하면 "010-1234-5678"이 "010-****-****"로 바뀝니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">6.</span>
              <div>
                <strong className="text-gray-900">URL 라우팅 패턴:</strong> Express.js, Django 같은 웹 프레임워크에서 URL 경로를 매칭합니다.
                예: /users/(\d+) 패턴은 "/users/123", "/users/456"을 매칭하고 숫자 ID를 캡처하여 사용자 정보를 조회할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">7.</span>
              <div>
                <strong className="text-gray-900">SQL 인젝션 방어:</strong> 사용자 입력이 위험한 패턴(--, ', DROP, SELECT 등)을 포함하는지 검사하여 공격을 차단합니다.
                물론 정규식만으로는 완벽하지 않으므로 Prepared Statement와 함께 사용해야 하지만, 1차 필터로 매우 유용합니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 정규식의 기초 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">정규식의 기초</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📝</span>
              <div>
                <strong className="text-gray-900">메타 문자의 의미:</strong> 정규식에서 \d, \w, \s, ., +, *, ? 같은 특수 문자는 "메타 문자"로 특별한 의미를 가집니다.
                예를 들어 \d는 0~9 숫자, \w는 영문자/숫자/밑줄, \s는 공백/탭/개행을 의미합니다.
                만약 점(.) 자체를 찾고 싶다면 \. 처럼 백슬래시로 이스케이프해야 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔁</span>
              <div>
                <strong className="text-gray-900">수량자의 탐욕성:</strong> *와 +는 기본적으로 "탐욕적(greedy)"입니다. 즉, 가능한 한 많이 매칭합니다.
                예를 들어 "&lt;div&gt;안녕&lt;/div&gt;&lt;div&gt;하세요&lt;/div&gt;"에서 /&lt;div&gt;.*&lt;\/div&gt;/는 전체를 하나로 매칭합니다.
                최소 매칭을 원하면 /&lt;div&gt;.*?&lt;\/div&gt;/ 처럼 ?를 붙여 "비탐욕적(lazy)" 모드를 사용하세요.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📍</span>
              <div>
                <strong className="text-gray-900">앵커(^, $)의 역할:</strong> ^는 문자열의 시작, $는 끝을 의미합니다.
                /hello/는 "hello world"나 "say hello"를 모두 매칭하지만, /^hello$/는 정확히 "hello"만 매칭합니다.
                입력 폼에서 "이메일만 입력했는지" 검증할 때 {`/^\\w+@\\w+\\.\\w+$/`} 처럼 ^와 $를 함께 사용하면 다른 텍스트가 섞이지 않도록 보장할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🏷️</span>
              <div>
                <strong className="text-gray-900">캡처 그룹의 활용:</strong> 괄호 ()로 묶으면 "캡처 그룹"이 생성되어 매칭된 부분을 따로 추출할 수 있습니다.
                예: /(\d{4})-(\d{2})-(\d{2})/로 "2025-12-25"를 매칭하면 $1=2025, $2=12, $3=25로 접근할 수 있습니다.
                치환 시 "연도: $1, 월: $2, 일: $3" 형태로 재구성할 수 있어 매우 강력합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🚩</span>
              <div>
                <strong className="text-gray-900">플래그(flags)의 종류:</strong> 정규식 끝에 붙는 플래그는 동작 방식을 변경합니다.
                g(global)는 모든 매칭을 찾고, i(ignoreCase)는 대소문자를 무시하며, m(multiline)은 ^와 $가 각 줄마다 적용되게 합니다.
                예: /hello/gi는 "Hello", "HELLO", "hello"를 모두 찾습니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 정규식이 너무 어려운데 꼭 배워야 하나요?</h3>
              <p className="text-gray-700">
                A. 정규식은 처음엔 어렵지만, 기본 패턴만 익히면 업무 효율이 10배 이상 향상됩니다.
                엑셀 데이터 정제, 로그 분석, 코드 검색 등 수작업으로 몇 시간 걸릴 작업을 몇 초 만에 해결할 수 있습니다.
                \d(숫자), \w(문자), +(1회 이상), *(0회 이상) 같은 기본 4~5개만 알아도 80% 상황을 해결할 수 있으니 포기하지 마세요!
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. /g 플래그는 언제 사용하나요?</h3>
              <p className="text-gray-700">
                A. g(global) 플래그는 "모든 매칭"을 찾을 때 사용합니다. 플래그 없이는 첫 번째 매칭만 찾고 멈춥니다.
                예를 들어 "apple apple apple"에서 /apple/은 첫 번째만 찾지만, /apple/g는 3개 모두 찾습니다.
                문자열 치환(replace)이나 전체 검색에서 필수입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 한글은 어떻게 검색하나요?</h3>
              <p className="text-gray-700">
                A. [가-힣]는 완성된 한글 음절(가~힣)을 의미합니다. /[가-힣]+/로 "안녕하세요" 같은 한글 단어를 찾을 수 있습니다.
                \w는 영문/숫자만 포함하고 한글은 포함하지 않으므로 주의하세요.
                한글+영문+숫자를 모두 찾으려면 /[가-힣\w]+/처럼 조합하면 됩니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 이메일 검증 정규식이 정말 정확한가요?</h3>
              <p className="text-gray-700">
                A. 완벽한 이메일 정규식은 매우 복잡합니다(수백 자 이상). {`/^\\w+@\\w+\\.\\w+$/`}는 "기본적인" 형식만 검증합니다.
                실무에서는 정규식으로 1차 검증 후, 실제로 인증 메일을 보내는 2단계 검증을 권장합니다.
                정규식만으로는 "존재하는 도메인인지"까지 확인할 수 없기 때문입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 성능이 느린데 정규식 때문인가요?</h3>
              <p className="text-gray-700">
                A. 복잡한 정규식(특히 중첩된 수량자 .*.*.*같은 패턴)은 "재앙적 백트래킹"으로 인해 매우 느릴 수 있습니다.
                간단한 문자열 검색은 indexOf()나 includes()가 더 빠릅니다. 정규식은 패턴 매칭이 필요할 때만 사용하세요.
                성능이 중요하다면 정규식을 미리 컴파일(new RegExp)하고 재사용하는 것이 좋습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 비캡처 그룹 (?:...)은 언제 쓰나요?</h3>
              <p className="text-gray-700">
                A. 그룹화는 필요하지만 캡처(추출)는 필요 없을 때 사용합니다.
                예: /(?:https?):\/\/(\w+)/에서 http나 https는 그룹화만 하고 캡처하지 않으며, 도메인(\w+)만 $1로 추출됩니다.
                성능도 약간 향상되고, 캡처 그룹 번호($1, $2)가 깔끔해집니다.
              </p>
            </div>
          </div>
        </div>

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
