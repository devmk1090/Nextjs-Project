"use client";

import { useState } from "react";

type SortType = "asc" | "desc" | "length-asc" | "length-desc" | "random";

export default function TextSorter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>("asc");

  const sortText = () => {
    if (!input) {
      setOutput("");
      return;
    }

    const lines = input.split("\n");
    let sorted: string[];

    switch (sortType) {
      case "asc":
        sorted = [...lines].sort((a, b) => a.localeCompare(b, "ko"));
        break;
      case "desc":
        sorted = [...lines].sort((a, b) => b.localeCompare(a, "ko"));
        break;
      case "length-asc":
        sorted = [...lines].sort((a, b) => a.length - b.length);
        break;
      case "length-desc":
        sorted = [...lines].sort((a, b) => b.length - a.length);
        break;
      case "random":
        sorted = [...lines].sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = lines;
    }

    setOutput(sorted.join("\n"));
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
          텍스트 정렬 도구
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">입력 (줄 단위)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="정렬할 텍스트를 줄별로 입력하세요..."
              className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none font-mono"
            />
            <div className="mt-4 space-y-3">
              <label className="block text-gray-700 font-semibold mb-2">정렬 방식</label>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value as SortType)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">오름차순 (가나다순, ABC순)</option>
                <option value="desc">내림차순 (역순)</option>
                <option value="length-asc">길이 오름차순 (짧은 것부터)</option>
                <option value="length-desc">길이 내림차순 (긴 것부터)</option>
                <option value="random">무작위 섞기</option>
              </select>
              <button
                onClick={sortText}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                정렬하기
              </button>
            </div>
          </div>

          {/* 출력 영역 */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">결과</label>
            <textarea
              value={output}
              readOnly
              placeholder="정렬된 결과가 여기에 표시됩니다"
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

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">정렬 방식 설명</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>오름차순:</strong> 가나다순, ABC순으로 정렬. 한글과 영문을 모두 지원합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>내림차순:</strong> 역순으로 정렬합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>길이 오름차순:</strong> 짧은 줄부터 긴 줄 순서로 정렬합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>길이 내림차순:</strong> 긴 줄부터 짧은 줄 순서로 정렬합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>무작위 섞기:</strong> 줄의 순서를 무작위로 섞습니다.</span>
            </li>
          </ul>
        </div>

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">텍스트 정렬 도구란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              텍스트 정렬 도구는 여러 줄의 텍스트를 다양한 기준으로 자동 정렬하는 웹 기반 도구입니다. 정렬 알고리즘은 컴퓨터 과학의 가장 기본적이면서도 중요한 개념으로, 1945년 존 폰 노이만이 최초의 병합 정렬(Merge Sort)을 개발한 이래 수많은 알고리즘이 개발되었습니다. 이 도구는 JavaScript의 localeCompare() 메서드를 사용하여 한글, 영문, 숫자를 올바르게 정렬합니다.
            </p>
            <p>
              사전식 정렬(Lexicographic Order)은 사전에서 단어를 찾을 때 사용하는 원리와 같습니다. 영문은 A-Z 순서, 한글은 가나다 순서를 따릅니다. 하지만 유니코드 정렬은 복잡합니다. 한글은 초성(ㄱ,ㄴ,ㄷ...), 중성(ㅏ,ㅑ,ㅓ...), 종성(ㄱ,ㄴ,ㄷ...)으로 구성되어 있으며, 이를 모두 고려하여 정렬해야 합니다. localeCompare()는 이러한 복잡한 규칙을 자동으로 처리합니다.
            </p>
            <p>
              이 도구는 오름차순, 내림차순뿐만 아니라 길이 기준 정렬, 무작위 섞기 등 다양한 정렬 방식을 제공합니다. 길이 정렬은 짧은 단어부터 긴 문장까지 시각적으로 정리할 때 유용하고, 무작위 섞기는 추첨이나 랜덤 배정에 활용됩니다. 브라우저에서 즉시 실행되므로 설치 없이 사용할 수 있으며, 수천 줄의 데이터도 빠르게 처리합니다.
            </p>
            <p>
              데이터 정리, 코드 정렬, 명단 작성 등 일상적인 작업에서 정렬은 빈번하게 사용됩니다. Excel이나 텍스트 편집기에서도 정렬 기능이 있지만, 이 도구는 웹에서 빠르게 접근할 수 있고 다양한 정렬 옵션을 제공하여 더 편리합니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">텍스트 정렬 도구 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 단어장 및 용어집 사전순 정리</h3>
              <p className="text-gray-700 text-sm">
                외국어 학습 시 암기해야 할 단어 목록을 가나다순이나 ABC순으로 정렬하여 체계적으로 학습합니다. 기술 문서 작성 시 용어집(Glossary)을 알파벳 순으로 정렬하면 독자가 빠르게 찾을 수 있습니다. 무작위로 수집한 단어들을 정렬하면 비슷한 철자의 단어들이 모여 기억하기 쉽습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 파일 목록 및 디렉토리 정렬</h3>
              <p className="text-gray-700 text-sm">
                프로젝트의 파일 목록을 알파벳 순으로 정렬하여 문서화합니다. ls 명령어 결과를 복사하여 정렬하거나, 백업 파일 목록을 날짜순/이름순으로 정리할 때 유용합니다. README 파일에 프로젝트 구조를 문서화할 때도 정렬된 목록이 가독성을 높입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 학생 명단 가나다순 정렬</h3>
              <p className="text-gray-700 text-sm">
                학교나 학원에서 학생 명단을 가나다순으로 정렬하여 출석부를 만들거나, 시험 성적표를 이름순으로 정렬합니다. 조 편성이나 좌석 배치 시 무작위 섞기 기능으로 공정하게 배정할 수 있습니다. 졸업 앨범이나 행사 프로그램에서도 이름순 정렬이 필수입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 코드의 import 문 자동 정렬</h3>
              <p className="text-gray-700 text-sm">
                JavaScript, Python, Java 등의 프로그래밍에서 import 문이나 using 문을 알파벳 순으로 정렬하면 코드 가독성이 향상되고 중복을 쉽게 발견할 수 있습니다. ESLint나 Prettier 같은 도구도 import 정렬을 권장합니다. 팀 프로젝트에서 일관된 정렬 규칙은 코드 리뷰를 수월하게 합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. 상품 목록 및 메뉴 정리</h3>
              <p className="text-gray-700 text-sm">
                이커머스 사이트에서 상품명을 가나다순으로 정렬하거나, 레스토랑 메뉴를 카테고리별 알파벳 순으로 정리합니다. 가격순 정렬을 하려면 "상품명 - 가격" 형식으로 입력한 후 가격 부분을 기준으로 정렬할 수 있습니다. 재고 목록, 카탈로그 작성에도 유용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 로그 파일 및 이벤트 정렬</h3>
              <p className="text-gray-700 text-sm">
                서버 로그, 에러 메시지, 이벤트 로그를 알파벳 순으로 정렬하여 패턴을 분석합니다. 시간순으로 기록된 로그를 에러 종류별로 정렬하면 어떤 에러가 가장 많이 발생하는지 쉽게 파악할 수 있습니다. Git commit 메시지를 정렬하여 변경 이력을 체계적으로 정리할 수도 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 원리 섹션 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">정렬 알고리즘의 원리</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔄</span>
              <div>
                <strong className="text-gray-900">버블 정렬 vs 퀵 정렬:</strong> 버블 정렬(Bubble Sort)은 가장 단순한 정렬 알고리즘으로 인접한 두 원소를 비교하여 교환합니다. 시간 복잡도는 O(n²)로 느립니다. 반면 퀵 정렬(Quick Sort)은 피벗(pivot)을 기준으로 작은 값과 큰 값을 분할하여 O(n log n)의 빠른 속도를 자랑합니다. JavaScript의 Array.sort()는 브라우저마다 다르지만 대부분 퀵 정렬이나 Tim Sort를 사용합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌐</span>
              <div>
                <strong className="text-gray-900">localeCompare()와 유니코드 정렬:</strong> 단순 문자 코드 비교(charCodeAt)로는 한글을 올바르게 정렬할 수 없습니다. localeCompare()는 유니코드 Collation 알고리즘을 사용하여 언어별 정렬 규칙을 적용합니다. 한글은 초성 → 중성 → 종성 순서로 비교하며, "가" {"<"} "각" {"<"} "간" 같은 복잡한 규칙을 자동 처리합니다. 영문 대소문자 구분 여부, 악센트 문자 처리 등도 로케일에 따라 다릅니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔤</span>
              <div>
                <strong className="text-gray-900">한글 정렬 원리 (초성/중성/종성):</strong> 한글 유니코드는 0xAC00(가) ~ 0xD7A3(힣)까지 11,172자입니다. 각 글자는 ((초성 × 21) + 중성) × 28 + 종성 공식으로 계산됩니다. 초성은 ㄱ(0), ㄲ(1), ㄴ(2)... 순서이며, 중성은 ㅏ(0), ㅐ(1)..., 종성은 없음(0), ㄱ(1), ㄲ(2)... 순입니다. localeCompare()는 이 수학적 순서를 이용하여 정렬합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📏</span>
              <div>
                <strong className="text-gray-900">길이 정렬과 안정 정렬(Stable Sort):</strong> 길이 정렬은 length 속성을 비교하는 단순한 방식입니다. 안정 정렬은 같은 값을 가진 원소의 순서가 유지되는 정렬입니다. 예를 들어 "사과"와 "배" 모두 2글자인 경우, 입력 순서가 보존됩니다. JavaScript의 Array.sort()는 ES2019부터 안정 정렬이 보장됩니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎲</span>
              <div>
                <strong className="text-gray-900">무작위 섞기 (Fisher-Yates Shuffle):</strong> Math.random() - 0.5를 사용한 정렬은 완벽한 무작위가 아닙니다. 진정한 무작위 섞기는 Fisher-Yates Shuffle 알고리즘으로, 뒤에서부터 앞으로 임의의 원소와 교환합니다. 하지만 간단한 용도에서는 sort(() ={">"} Math.random() - 0.5)로도 충분합니다. 공정한 추첨이 필요하면 전문 난수 생성기를 사용하세요.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 대소문자를 구분하지 않고 정렬할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 현재 버전은 대소문자를 구분합니다. "Apple"이 "banana"보다 앞에 옵니다. 대소문자를 무시하려면 모든 텍스트를 소문자로 변환한 후 정렬해야 합니다. localeCompare()의 두 번째 매개변수에 sensitivity 옵션을 추가하면 대소문자 무시가 가능하지만, 이 도구는 기본 동작만 제공합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 숫자가 포함된 텍스트도 올바르게 정렬되나요?</h3>
              <p className="text-gray-700">
                A. 숫자는 문자열로 비교되므로 "10"이 "2"보다 앞에 올 수 있습니다 (사전식 정렬). 자연스러운 정렬(Natural Sort)을 원하면 localeCompare()에 numeric: true 옵션을 추가해야 합니다. 예: "파일1.txt", "파일2.txt", "파일10.txt"를 올바르게 정렬하려면 자연 정렬이 필요합니다. 현재 이 도구는 기본 사전식 정렬만 지원합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 특수문자나 이모지는 어떻게 정렬되나요?</h3>
              <p className="text-gray-700">
                A. 특수문자(!@#$%)는 유니코드 순서에 따라 정렬됩니다. 일반적으로 특수문자 → 숫자 → 영문 대문자 → 영문 소문자 → 한글 순입니다. 이모지(😀🎉)는 유니코드 고위 평면에 속하므로 텍스트보다 뒤에 위치합니다. 정확한 순서는 유니코드 표준(Unicode Standard)에 정의되어 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 중복된 줄이 있으면 어떻게 되나요?</h3>
              <p className="text-gray-700">
                A. 중복된 줄도 모두 유지됩니다. 정렬만 하고 중복 제거는 하지 않습니다. 중복을 제거하려면 먼저 "중복 제거기" 도구를 사용한 후 이 정렬 도구를 사용하세요. 안정 정렬(Stable Sort)이므로 중복된 값의 원래 순서는 보존됩니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 여러 언어가 섞여 있어도 정렬할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 네, 한글, 영문, 일본어, 중국어 등이 섞여 있어도 정렬됩니다. localeCompare("ko")는 한국어 로케일 기준으로 정렬하지만, 다른 언어도 유니코드 순서에 따라 정렬됩니다. 일반적으로 영문 → 한글 → 일본어 히라가나 → 한자 순입니다. 정확한 다국어 정렬이 필요하면 Intl.Collator API를 사용해야 합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 대용량 데이터도 빠르게 정렬되나요?</h3>
              <p className="text-gray-700">
                A. 수만 줄까지는 빠르게 정렬되지만, 수십만 줄 이상은 브라우저가 느려질 수 있습니다. JavaScript의 Array.sort()는 O(n log n) 복잡도이므로 10,000줄은 약 130,000번 비교, 100,000줄은 약 1,600,000번 비교가 필요합니다. 초대용량 데이터는 Linux sort 명령이나 데이터베이스 ORDER BY를 사용하는 것이 좋습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
