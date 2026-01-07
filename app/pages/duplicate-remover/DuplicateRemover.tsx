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

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">중복 제거기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              중복 제거기는 텍스트 데이터에서 중복된 줄을 자동으로 찾아 제거하는 도구입니다. 빅데이터 시대에 데이터 품질 관리는 매우 중요하며, 중복 데이터는 분석 결과를 왜곡하고 저장 공간을 낭비하며 처리 속도를 저하시킵니다. 이 도구는 JavaScript의 Set 자료구조를 활용하여 빠르고 정확하게 중복을 제거합니다.
            </p>
            <p>
              데이터 정제(Data Cleansing)는 머신러닝, 통계 분석, 마케팅 캠페인 등 모든 데이터 기반 작업의 첫 단계입니다. 중복 데이터가 있으면 통계적 편향(bias)이 발생하고, 이메일 마케팅에서는 같은 사람에게 중복 발송되어 스팸으로 신고될 위험이 있습니다. 설문조사에서 중복 응답이 있으면 결과의 신뢰도가 떨어집니다.
            </p>
            <p>
              이 도구는 대소문자 구분 옵션을 제공하여 "Apple"과 "apple"을 같은 것으로 볼지 다른 것으로 볼지 선택할 수 있습니다. 또한 원본 줄 수, 고유 줄 수, 제거된 중복 개수를 실시간으로 표시하여 데이터 정제 효과를 시각적으로 확인할 수 있습니다.
            </p>
            <p>
              브라우저에서 직접 실행되므로 서버로 데이터를 전송하지 않아 민감한 정보도 안전하게 처리할 수 있습니다. 설치가 필요 없고, 수천 줄의 텍스트도 즉시 처리할 수 있어 Excel이나 CSV 파일 편집기보다 훨씬 빠르고 편리합니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">중복 제거기 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 빅데이터 전처리 (CSV/Excel 데이터 정제)</h3>
              <p className="text-gray-700 text-sm">
                데이터 분석가나 데이터 과학자가 CSV 파일에서 중복 행을 제거할 때 사용합니다. 예를 들어 고객 데이터베이스에서 중복 가입된 이메일을 찾거나, 웹 로그에서 중복 IP 주소를 제거하여 순수 방문자 수를 계산할 수 있습니다. Excel에서 수만 줄의 데이터를 처리하면 느리지만, 이 도구는 즉시 결과를 보여줍니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 이메일 리스트 정리 (마케팅 캠페인)</h3>
              <p className="text-gray-700 text-sm">
                이메일 마케팅 담당자가 뉴스레터 발송 전 중복된 이메일 주소를 제거합니다. 같은 사람에게 여러 번 메일을 보내면 스팸으로 신고될 확률이 높아지고, 발송 비용도 낭비됩니다. 여러 소스에서 수집한 이메일 목록을 합칠 때 필수적으로 사용되는 작업입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 코드 리뷰 및 로그 분석 (중복 로그 제거)</h3>
              <p className="text-gray-700 text-sm">
                개발자가 서버 로그 파일에서 반복되는 에러 메시지를 제거하여 고유한 에러 종류만 확인할 때 사용합니다. 수천 개의 로그 중에서 실제로 몇 가지 종류의 에러가 발생했는지 파악하면 디버깅 시간이 크게 단축됩니다. 또한 Git commit 메시지에서 중복 태그나 이슈 번호를 정리할 때도 유용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 설문조사 응답 정리</h3>
              <p className="text-gray-700 text-sm">
                온라인 설문조사나 이벤트 응모에서 중복 참여를 방지하기 위해 이메일이나 전화번호 목록에서 중복을 제거합니다. 공정한 추첨이나 통계 분석을 위해서는 한 사람이 여러 번 응답한 경우를 찾아내야 합니다. 대규모 설문에서는 수동으로 찾기 어렵지만 이 도구로 즉시 처리할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. URL 목록 정리 (크롤링 결과)</h3>
              <p className="text-gray-700 text-sm">
                웹 크롤러나 스크래퍼를 개발할 때 수집한 URL 목록에서 중복을 제거합니다. 같은 페이지를 여러 번 크롤링하면 서버에 부담을 주고 IP 차단의 원인이 됩니다. 또한 sitemap.xml 생성 시에도 중복 URL이 없어야 SEO에 유리합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 단어장 및 용어집 정리</h3>
              <p className="text-gray-700 text-sm">
                외국어 학습 시 여러 교재에서 추출한 단어 목록을 합칠 때 중복을 제거합니다. 번역 작업이나 기술 문서 작성 시 용어집(Glossary)을 만들 때도 중복 용어를 제거하여 깔끔한 목록을 유지할 수 있습니다. 대소문자 구분 옵션을 해제하면 "Database"와 "database"를 하나로 통합할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 원리 섹션 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">중복 제거의 원리</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📌</span>
              <div>
                <strong className="text-gray-900">Set 자료구조:</strong> JavaScript의 Set은 중복을 허용하지 않는 자료구조입니다. 배열을 Set으로 변환하면 자동으로 중복이 제거되며, 이를 다시 배열로 변환하면 고유한 값만 남습니다. 시간 복잡도는 O(n)으로 매우 효율적입니다. Python의 set, Java의 HashSet과 동일한 개념입니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔑</span>
              <div>
                <strong className="text-gray-900">해시 테이블 (Hash Table):</strong> Set의 내부 구조는 해시 테이블입니다. 각 값을 해시 함수로 변환하여 고유한 키를 생성하고, 이미 존재하는 키인지 O(1) 시간에 확인할 수 있습니다. 해시 충돌(collision)은 체이닝(chaining)이나 오픈 어드레싱(open addressing)으로 해결됩니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔤</span>
              <div>
                <strong className="text-gray-900">대소문자 구분 원리:</strong> 대소문자를 구분하지 않으려면 모든 문자열을 소문자(toLowerCase)로 변환한 후 비교합니다. 하지만 원본 데이터는 그대로 유지하기 위해 별도의 맵(Map)을 사용하거나, 첫 번째로 발견된 값을 기준으로 합니다. 이 도구는 toLowerCase로 비교하되 원본 형태를 유지합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌐</span>
              <div>
                <strong className="text-gray-900">유니코드 정규화 (Unicode Normalization):</strong> 같은 문자도 유니코드에서 여러 방식으로 표현될 수 있습니다. 예를 들어 "é"는 "e + ́" 또는 단일 문자 "é"로 표현될 수 있습니다. 정확한 중복 제거를 위해서는 normalize() 메서드로 정규화해야 하지만, 일반적인 텍스트에서는 불필요합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">⚡</span>
              <div>
                <strong className="text-gray-900">성능 최적화:</strong> 이 도구는 메모리에서 모든 작업을 수행하므로 수만 줄도 빠르게 처리합니다. 단, 브라우저의 메모리 제한이 있으므로 수백만 줄의 초대용량 데이터는 Python pandas나 데이터베이스 쿼리(SELECT DISTINCT)를 사용하는 것이 좋습니다. 일반적인 업무용 데이터는 문제없이 처리됩니다.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 대용량 데이터도 처리할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 브라우저 메모리 한도 내에서 처리 가능합니다. 일반적으로 수만 줄(몇 MB)까지는 즉시 처리되지만, 수십 MB 이상의 대용량 파일은 브라우저가 느려지거나 멈출 수 있습니다. 그런 경우 Python pandas, Linux sort -u 명령, 또는 데이터베이스 DISTINCT 쿼리를 사용하는 것이 좋습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 중복 제거 후 순서가 유지되나요?</h3>
              <p className="text-gray-700">
                A. 대소문자를 구분하는 경우 JavaScript Set의 특성상 삽입 순서가 보존됩니다. 하지만 대소문자를 구분하지 않는 경우 첫 번째로 발견된 값의 위치가 유지되며, 이후 중복은 제거됩니다. 예: "Apple", "banana", "apple" → "Apple", "banana" (첫 번째 Apple이 남음)
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 빈 줄이나 공백만 있는 줄도 제거되나요?</h3>
              <p className="text-gray-700">
                A. 빈 줄("")도 고유한 값으로 취급되므로, 여러 빈 줄이 있으면 하나의 빈 줄만 남습니다. 공백만 있는 줄(" ", "  ")은 서로 다른 것으로 인식됩니다. 만약 모든 공백 줄을 제거하고 싶다면, 먼저 텍스트를 공백 제거 도구로 처리한 후 이 도구를 사용하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 이메일 주소나 URL의 중복 제거도 정확한가요?</h3>
              <p className="text-gray-700">
                A. 네, 정확합니다. 이메일은 대소문자를 구분하지 않으므로 (RFC 5321) 대소문자 구분 옵션을 해제하고 사용하세요. URL도 일반적으로 대소문자를 구분하지 않지만(도메인 부분), 경로는 구분하는 경우가 있으므로 상황에 따라 선택하세요. 예: "Example.COM"과 "example.com"은 같은 도메인입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. CSV 파일의 특정 열만 중복 제거할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 이 도구는 줄 단위로만 작동하므로 CSV의 특정 열만 추출해야 합니다. Excel에서 해당 열만 복사하여 붙여넣거나, 텍스트 편집기의 정규식으로 특정 열만 추출한 후 사용하세요. 또는 Python pandas의 drop_duplicates(subset=['column']) 기능을 사용하는 것이 더 편리할 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 데이터가 서버로 전송되나요? 개인정보 보호는?</h3>
              <p className="text-gray-700">
                A. 절대 전송되지 않습니다. 모든 처리가 브라우저 내부(클라이언트 사이드)에서 이루어지므로 민감한 고객 정보, 개인정보, 기밀 데이터도 안전하게 처리할 수 있습니다. 네트워크 요청이 전혀 발생하지 않으며, 브라우저를 닫으면 데이터는 완전히 사라집니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
