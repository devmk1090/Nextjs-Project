"use client";

import { useState } from "react";
import * as Diff from "diff";

export default function TextDiff() {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [diffType, setDiffType] = useState<"chars" | "words" | "lines">("lines");

  const getDiff = () => {
    if (!text1 && !text2) return [];

    switch (diffType) {
      case "chars":
        return Diff.diffChars(text1, text2);
      case "words":
        return Diff.diffWords(text1, text2);
      case "lines":
        return Diff.diffLines(text1, text2);
      default:
        return [];
    }
  };

  const diff = getDiff();

  const stats = {
    added: diff.filter((part) => part.added).reduce((sum, part) => sum + part.value.length, 0),
    removed: diff.filter((part) => part.removed).reduce((sum, part) => sum + part.value.length, 0),
    unchanged: diff.filter((part) => !part.added && !part.removed).reduce((sum, part) => sum + part.value.length, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          텍스트 비교
        </h1>

        {/* 비교 타입 선택 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">비교 단위</label>
          <div className="flex gap-3">
            <button
              onClick={() => setDiffType("chars")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                diffType === "chars"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              문자 단위
            </button>
            <button
              onClick={() => setDiffType("words")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                diffType === "words"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              단어 단위
            </button>
            <button
              onClick={() => setDiffType("lines")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                diffType === "lines"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              줄 단위
            </button>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">원본 텍스트</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="원본 텍스트를 입력하세요..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none font-mono"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">비교 텍스트</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="비교할 텍스트를 입력하세요..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none font-mono"
            />
          </div>
        </div>

        {/* 통계 */}
        {(text1 || text2) && (
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">추가됨</p>
              <p className="text-2xl font-bold text-green-600">+{stats.added}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">제거됨</p>
              <p className="text-2xl font-bold text-red-600">-{stats.removed}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
              <p className="text-sm text-gray-600 mb-1">변경 없음</p>
              <p className="text-2xl font-bold text-gray-600">{stats.unchanged}</p>
            </div>
          </div>
        )}

        {/* 차이점 표시 */}
        {(text1 || text2) && (
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">차이점</h2>
            <div className="bg-white p-4 rounded-lg border border-gray-300 overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                {diff.map((part, index) => {
                  const color = part.added ? "bg-green-200" : part.removed ? "bg-red-200" : "";
                  const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
                  return (
                    <span key={index} className={color}>
                      {part.value.split("\n").map((line, i) => (
                        <span key={i}>
                          {line && <span className="text-gray-500 select-none">{prefix}</span>}
                          {line}
                          {i < part.value.split("\n").length - 1 && "\n"}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </pre>
            </div>
          </div>
        )}

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 방법</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>문자 단위:</strong> 가장 세밀한 비교. 한 글자 단위로 차이를 표시합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>단어 단위:</strong> 공백으로 구분된 단어 단위로 차이를 표시합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>줄 단위:</strong> 전체 줄 단위로 차이를 표시합니다. (권장)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><span className="bg-green-200 px-1">녹색 배경</span>은 추가된 부분</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><span className="bg-red-200 px-1">빨간색 배경</span>은 제거된 부분</span>
            </li>
          </ul>
        </div>

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">텍스트 비교 도구란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              텍스트 비교(diff) 도구는 두 텍스트 간의 차이점을 시각적으로 표시하는 도구입니다. diff 알고리즘의 역사는 1974년 Unix의 diff 명령에서 시작되며, Douglas McIlroy와 James Hunt가 개발한 최초의 diff는 파일 비교의 표준이 되었습니다. 현대의 Git, SVN, Mercurial 같은 버전 관리 시스템(VCS)은 모두 diff 알고리즘을 핵심으로 사용하여 코드 변경 이력을 추적합니다.
            </p>
            <p>
              이 도구는 Longest Common Subsequence (LCS) 알고리즘을 기반으로 합니다. LCS는 두 문자열에서 공통으로 나타나는 가장 긴 부분 수열을 찾아, 어떤 부분이 추가되고 제거되었는지 계산합니다. Myers diff 알고리즘(1986)은 시간 복잡도 O((N+M)D)로 효율적인 diff를 제공하며, 대부분의 현대 diff 도구가 이를 사용합니다. D는 편집 거리(Edit Distance)로, 변경사항이 적을수록 빠릅니다.
            </p>
            <p>
              문자 단위, 단어 단위, 줄 단위 비교를 제공하여 다양한 용도에 활용할 수 있습니다. 코드 리뷰에서는 줄 단위 비교가 가장 유용하며, 번역 검토에서는 단어 단위, 오타 찾기에는 문자 단위가 효과적입니다. 녹색은 추가(+), 빨강은 삭제(-), 배경 없음은 변경 없음을 의미합니다. 이는 Git diff의 시각적 표현 방식을 따릅니다.
            </p>
            <p>
              표절 검사, 문서 버전 비교, 법률 문서 개정 내역 확인, 번역 품질 검토 등 다양한 분야에서 사용됩니다. 브라우저에서 직접 처리되므로 기밀 문서도 안전하게 비교할 수 있으며, 네트워크 요청이 전혀 발생하지 않습니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">텍스트 비교 도구 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 문서 버전 비교 (계약서, 약관)</h3>
              <p className="text-gray-700 text-sm">
                법률 계약서, 서비스 약관, 개인정보 처리방침의 개정 내역을 비교합니다. "이전 버전 vs 최신 버전"을 비교하여 어떤 조항이 추가, 수정, 삭제되었는지 명확히 파악할 수 있습니다. 법무팀, 컴플라이언스 담당자가 변경사항을 검토할 때 필수적입니다. Microsoft Word의 변경 내용 추적보다 깔끔하게 차이만 표시합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 코드 리뷰 (Git 커밋 전후 비교)</h3>
              <p className="text-gray-700 text-sm">
                코드 변경 사항을 리뷰할 때 사용합니다. Git diff 명령이나 GitHub Pull Request에서 보는 것과 동일한 방식입니다. 함수 수정, 변수명 변경, 로직 개선 등을 한눈에 파악할 수 있습니다. 팀 협업에서 코드 리뷰어가 변경사항을 빠르게 이해하고, 버그나 개선점을 찾아낼 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 번역 검토 (원문 vs 번역문)</h3>
              <p className="text-gray-700 text-sm">
                영문 원문과 한글 번역문을 문장별로 비교하거나, 초벌 번역과 교정 후 번역을 비교합니다. 번역 누락, 오역, 의역 부분을 찾아낼 수 있습니다. 전문 번역가, 로컬라이제이션 팀이 품질 관리(QA)에 사용합니다. CAT(Computer-Assisted Translation) 도구의 간소화된 버전입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 표절 검사 (유사도 분석)</h3>
              <p className="text-gray-700 text-sm">
                두 문서의 유사도를 확인하여 표절 여부를 판단합니다. 학술 논문, 보고서, 과제물 등에서 문장이 얼마나 비슷한지 시각적으로 확인할 수 있습니다. 완전한 표절 검사 시스템은 아니지만, 간단한 유사성 확인에는 충분합니다. 교수, 편집자, 저작권 관리자가 활용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. 로그 파일 비교 (에러 추적)</h3>
              <p className="text-gray-700 text-sm">
                서버 로그, 애플리케이션 로그를 비교하여 새로 발생한 에러나 경고를 찾습니다. "어제 로그 vs 오늘 로그"를 비교하면 새로운 문제점을 빠르게 발견할 수 있습니다. DevOps 엔지니어, SRE(Site Reliability Engineer)가 장애 대응 시 사용합니다. 수천 줄의 로그에서 변화만 추출합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 설정 파일 비교 (배포 환경 차이)</h3>
              <p className="text-gray-700 text-sm">
                개발(dev), 스테이징(staging), 프로덕션(production) 환경의 설정 파일을 비교합니다. .env, config.json, docker-compose.yml 등에서 환경별 차이를 확인하여 배포 오류를 방지합니다. 예: API 엔드포인트, 데이터베이스 주소, 디버그 모드 설정이 환경마다 올바르게 다른지 검증합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 원리 섹션 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Diff 알고리즘의 원리</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔍</span>
              <div>
                <strong className="text-gray-900">Longest Common Subsequence (LCS):</strong> LCS는 두 문자열에서 순서를 유지하면서 공통으로 나타나는 가장 긴 부분 수열을 찾는 알고리즘입니다. 예: "ABCD"와 "ACBD"의 LCS는 "ABD"입니다. LCS를 찾으면 나머지 부분이 추가되거나 제거된 것입니다. 동적 계획법(Dynamic Programming)으로 O(NM) 시간에 해결하며, diff의 기초입니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">⚡</span>
              <div>
                <strong className="text-gray-900">Myers Diff 알고리즘:</strong> Eugene Myers가 1986년 발표한 알고리즘으로, O((N+M)D) 시간 복잡도를 가집니다. D는 편집 거리(변경사항 개수)로, 차이가 적을수록 빠릅니다. Git의 기본 diff 알고리즘이며, "greedy" 방식으로 최소 편집 경로를 찾습니다. 대부분의 실제 사용 사례에서 LCS보다 훨씬 빠릅니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📏</span>
              <div>
                <strong className="text-gray-900">편집 거리 (Levenshtein Distance):</strong> 한 문자열을 다른 문자열로 변환하는 데 필요한 최소 연산 횟수입니다. 삽입, 삭제, 치환 연산을 사용하며, 편집 거리가 작을수록 두 문자열이 유사합니다. 표절 검사, 철자 교정, DNA 서열 분석에 사용됩니다. diff는 삽입과 삭제만 사용하는 단순화된 버전입니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌳</span>
              <div>
                <strong className="text-gray-900">3-way Merge:</strong> Git의 merge 작업은 3-way merge를 사용합니다. 공통 조상(base), 내 변경사항(mine), 상대 변경사항(theirs)을 비교하여 충돌 없이 병합합니다. 같은 줄을 양쪽에서 다르게 수정하면 충돌(conflict)이 발생합니다. 이 도구는 2-way diff만 지원하지만, 3-way merge는 버전 관리의 핵심 개념입니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎯</span>
              <div>
                <strong className="text-gray-900">Patience Diff와 Histogram Diff:</strong> Myers diff의 개선 버전들입니다. Patience diff는 고유한 줄을 먼저 매칭하여 더 직관적인 결과를 제공하고, Histogram diff는 성능을 개선했습니다. Git의 --patience, --histogram 옵션으로 사용할 수 있습니다. 복잡한 코드 리팩토링에서는 Myers보다 나은 결과를 보입니다.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 대소문자를 무시하고 비교할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 현재 버전은 대소문자를 구분합니다. "Hello"와 "hello"는 다른 것으로 인식됩니다. 대소문자를 무시하려면 양쪽 텍스트를 모두 소문자로 변환한 후 비교하세요. 라이브러리(jsdiff) 옵션으로 ignoreCase를 추가하면 구현 가능하지만, 이 도구는 기본 동작만 제공합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 공백(스페이스, 탭)을 무시할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 현재는 공백도 포함하여 비교합니다. Git의 -w 옵션처럼 공백을 무시하려면 텍스트 전처리가 필요합니다. 코드 포맷팅 변경(Prettier, Black)으로 공백만 바뀐 경우 많은 차이가 표시될 수 있습니다. 실무에서는 포맷터 적용 후 커밋하거나, git diff -w로 공백 무시 diff를 확인합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 문자/단어/줄 단위 중 어떤 걸 사용해야 하나요?</h3>
              <p className="text-gray-700">
                A. 용도에 따라 다릅니다. 코드나 문서 비교는 줄 단위(권장), 짧은 문장 비교는 단어 단위, 매우 세밀한 차이는 문자 단위입니다. 줄 단위는 가독성이 좋고 Git diff와 동일한 방식입니다. 문자 단위는 너무 세밀해서 복잡할 수 있습니다. 대부분의 경우 줄 단위로 충분합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 대용량 텍스트도 빠르게 처리되나요?</h3>
              <p className="text-gray-700">
                A. 수천 줄까지는 빠르게 처리되지만, 수만 줄 이상은 느려질 수 있습니다. diff 알고리즘의 시간 복잡도는 O(ND)로, 문서 크기(N)와 차이(D)에 비례합니다. 초대용량 파일은 Git diff나 Beyond Compare 같은 전문 도구를 사용하는 것이 좋습니다. 브라우저 메모리 한도도 고려해야 합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 두 파일이 완전히 다르면 어떻게 되나요?</h3>
              <p className="text-gray-700">
                A. 공통 부분이 없으면 모든 줄이 "제거 + 추가"로 표시됩니다. LCS가 빈 문자열이면 diff는 전체 삭제 후 전체 추가로 표현합니다. 이런 경우 diff보다는 유사도(Similarity) 점수를 계산하는 것이 더 유용합니다. 예: Jaccard Index, Cosine Similarity 등의 알고리즘을 사용합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 데이터가 서버로 전송되나요?</h3>
              <p className="text-gray-700">
                A. 전혀 전송되지 않습니다. 모든 비교가 브라우저 내부(클라이언트 사이드)에서 이루어집니다. jsdiff 라이브러리가 로컬에서 diff를 계산하며, 네트워크 요청이 없습니다. 기밀 계약서, 사내 코드, 개인정보가 포함된 문서도 안전하게 비교할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
