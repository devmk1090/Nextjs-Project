"use client";

import { useState, useEffect } from "react";

export default function CharCounter() {
  const [text, setText] = useState<string>("");
  const [stats, setStats] = useState({
    totalChars: 0,
    charsNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    spaces: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!text) {
      setStats({
        totalChars: 0,
        charsNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        spaces: 0,
        readingTime: 0,
      });
      return;
    }

    // 전체 문자 수
    const totalChars = text.length;

    // 공백 제외 문자 수
    const charsNoSpaces = text.replace(/\s/g, "").length;

    // 공백 수
    const spaces = totalChars - charsNoSpaces;

    // 단어 수 (공백 기준)
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    // 문장 수 (., !, ? 기준)
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;

    // 단락 수 (연속된 줄바꿈 기준)
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

    // 줄 수
    const lines = text.split("\n").length;

    // 읽기 시간 (분) - 평균 읽기 속도 200 단어/분
    const readingTime = Math.ceil(words / 200);

    setStats({
      totalChars,
      charsNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      spaces,
      readingTime,
    });
  }, [text]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          글자 수 세기
        </h1>

        {/* 입력 영역 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">텍스트 입력</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="글자 수를 세고 싶은 텍스트를 입력하세요..."
            className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">전체 문자</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalChars.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-1">공백 제외</p>
            <p className="text-3xl font-bold text-green-600">{stats.charsNoSpaces.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">단어</p>
            <p className="text-3xl font-bold text-purple-600">{stats.words.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200">
            <p className="text-sm text-gray-600 mb-1">문장</p>
            <p className="text-3xl font-bold text-orange-600">{stats.sentences.toLocaleString()}</p>
          </div>
        </div>

        {/* 상세 통계 */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">상세 통계</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">공백 수:</span>
              <span className="text-lg font-bold text-gray-800">{stats.spaces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">단락 수:</span>
              <span className="text-lg font-bold text-gray-800">{stats.paragraphs.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">줄 수:</span>
              <span className="text-lg font-bold text-gray-800">{stats.lines.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">예상 읽기 시간:</span>
              <span className="text-lg font-bold text-gray-800">약 {stats.readingTime}분</span>
            </div>
          </div>
        </div>

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">글자 수 세기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              글자 수 세기는 텍스트에 포함된 문자, 단어, 문장, 단락 등의 개수를 정확하게 측정하는 도구입니다.
              학교 과제, 논문 작성, 블로그 포스팅, SNS 글 작성 등 다양한 상황에서 글자 수 제한을 확인하고 관리할 때 필수적으로 사용됩니다.
            </p>
            <p>
              특히 대학 리포트나 자기소개서처럼 엄격한 분량 제한이 있는 문서를 작성할 때, 글자 수 세기 도구는 매우 유용합니다.
              예를 들어 "2000자 이내"라는 조건이 있다면, 실시간으로 현재 글자 수를 확인하며 적절한 분량으로 조절할 수 있습니다.
            </p>
            <p>
              이 도구는 학생, 작가, 블로거, 마케터, 개발자, 번역가 등 글쓰기와 관련된 모든 직업군에서 널리 사용됩니다.
              특히 SEO 최적화를 위해 메타 디스크립션의 길이를 확인하거나, 트위터 같은 SNS의 글자 수 제한을 체크할 때 매우 편리합니다.
            </p>
            <p>
              우리의 글자 수 세기 도구는 단순히 문자 개수만 세는 것이 아니라, 공백 포함/제외 문자 수, 단어 수, 문장 수, 단락 수,
              예상 읽기 시간까지 다양한 통계를 제공하여 더욱 효과적인 글쓰기를 도와드립니다.
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
                <strong className="text-gray-900">대학 리포트 작성:</strong> 교수님이 요구한 "2000자 이상, 3000자 이내" 같은 분량 제한을 정확하게 맞출 수 있습니다.
                작성 중 실시간으로 글자 수를 확인하며 적절한 분량을 유지할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">2.</span>
              <div>
                <strong className="text-gray-900">SNS 글자 수 제한 확인:</strong> 트위터(280자), 인스타그램 캡션(2200자), 네이버 블로그 제목(50자) 등
                각 플랫폼의 글자 수 제한을 미리 확인하고 적절하게 작성할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">3.</span>
              <div>
                <strong className="text-gray-900">블로그 포스트 길이 측정:</strong> SEO 최적화를 위해 블로그 글의 적절한 길이(보통 1000~2000단어)를 확인하고,
                독자가 읽는 데 걸리는 예상 시간(약 5분 등)을 표시할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">4.</span>
              <div>
                <strong className="text-gray-900">번역 비용 계산:</strong> 번역 의뢰 시 많은 번역사들이 글자당 요금을 책정합니다(예: 한글 1자당 50원).
                정확한 글자 수를 알면 예상 비용을 미리 계산할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">5.</span>
              <div>
                <strong className="text-gray-900">이력서/자기소개서 작성:</strong> 많은 기업들이 자기소개서에 글자 수 제한을 둡니다(예: 1000자 이내).
                제한된 글자 수 안에서 자신의 강점을 효과적으로 어필하기 위해 정확한 글자 수 확인이 필수입니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">6.</span>
              <div>
                <strong className="text-gray-900">메타 디스크립션 최적화:</strong> 웹사이트 SEO를 위한 메타 디스크립션은 보통 150~160자가 적절합니다.
                검색 결과에서 잘리지 않도록 정확한 글자 수를 맞추는 것이 중요합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">7.</span>
              <div>
                <strong className="text-gray-900">이메일 제목 길이 확인:</strong> 이메일 제목은 모바일에서 30~40자, 데스크톱에서 60자 정도가 표시됩니다.
                중요한 내용이 잘리지 않도록 적절한 길이로 작성하는 데 활용할 수 있습니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 알아두면 좋은 점 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">알아두면 좋은 점</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">💡</span>
              <div>
                <strong className="text-gray-900">공백 포함 vs 공백 제외:</strong> "공백 포함"은 띄어쓰기와 줄바꿈을 모두 포함한 전체 문자 수이고,
                "공백 제외"는 순수하게 글자만 센 개수입니다. 학술 논문은 보통 공백 포함, 번역은 공백 제외를 기준으로 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">💡</span>
              <div>
                <strong className="text-gray-900">단어 수 vs 글자 수:</strong> 영어는 단어 수(word count)를 주로 사용하고, 한국어는 글자 수(character count)를 사용합니다.
                이는 언어 구조의 차이 때문입니다. 영어 1단어는 평균 5~6글자 정도입니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">💡</span>
              <div>
                <strong className="text-gray-900">읽기 시간 계산 원리:</strong> 평균적으로 성인은 분당 200~250단어를 읽습니다.
                우리 도구는 200단어/분을 기준으로 예상 읽기 시간을 계산합니다. 블로그 글 상단에 "5분 읽기" 같은 표시를 할 때 유용합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">💡</span>
              <div>
                <strong className="text-gray-900">다양한 플랫폼의 글자 수 제한:</strong> 트위터(280자), 인스타그램 캡션(2200자), 페이스북 게시물(63206자이지만 권장 80자),
                유튜브 제목(100자), 유튜브 설명(5000자), 네이버 블로그 제목(50자), 티스토리 제목(200자) 등 플랫폼마다 제한이 다릅니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">💡</span>
              <div>
                <strong className="text-gray-900">한글 vs 영문의 차이:</strong> 한글 1글자는 보통 2~3바이트, 영문 1글자는 1바이트입니다.
                데이터베이스나 시스템에서 바이트 제한이 있을 때는 한글이 영문보다 더 적은 글자만 입력 가능합니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 공백을 포함해서 세어야 하나요, 제외해야 하나요?</h3>
              <p className="text-gray-700">
                A. 작성하는 문서의 요구사항에 따라 다릅니다. 학술 논문, 리포트, 대학 과제는 보통 "공백 포함" 기준입니다.
                하지만 번역 업계에서는 "공백 제외"를 기준으로 비용을 계산하는 경우가 많습니다. 요구사항을 먼저 확인하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 특수문자(!@#$%)와 숫자(123)도 글자 수에 포함되나요?</h3>
              <p className="text-gray-700">
                A. 네, 포함됩니다. "전체 문자" 항목은 한글, 영문, 숫자, 특수문자, 공백, 줄바꿈 등 모든 문자를 포함합니다.
                순수하게 문자(한글+영문)만 보고 싶다면 "공백 제외" 수치를 참고하되, 특수문자는 여전히 포함됩니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 단어 수는 어떻게 계산되나요?</h3>
              <p className="text-gray-700">
                A. 공백(띄어쓰기)으로 구분된 덩어리를 1단어로 계산합니다. 예를 들어 "안녕하세요 반갑습니다"는 2단어입니다.
                영어에서는 의미가 명확하지만, 한국어는 띄어쓰기 규칙에 따라 달라질 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 예상 읽기 시간은 정확한가요?</h3>
              <p className="text-gray-700">
                A. 평균적인 성인의 읽기 속도(분당 200단어)를 기준으로 계산한 추정치입니다.
                실제 읽기 시간은 텍스트의 난이도, 독자의 배경 지식, 집중도 등에 따라 달라질 수 있습니다.
                블로그나 기사에서 대략적인 읽기 시간을 표시할 때 유용한 참고 수치입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 한글과 영문을 섞어 쓰면 글자 수가 다르게 계산되나요?</h3>
              <p className="text-gray-700">
                A. 이 도구에서는 한글, 영문 모두 1글자로 동일하게 계산됩니다. 하지만 컴퓨터 시스템 내부적으로는
                한글(2~3바이트)과 영문(1바이트)의 용량이 다르기 때문에, 데이터베이스나 일부 시스템에서는 바이트 기준으로 제한할 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 복사 붙여넣기 할 때 서식(볼드, 이탤릭)이 유지되나요?</h3>
              <p className="text-gray-700">
                A. 아니요, 이 도구는 순수 텍스트(Plain Text)만 처리합니다. 워드나 구글 독스에서 복사해서 붙여넣으면
                볼드, 이탤릭, 색상 같은 서식은 모두 제거되고 텍스트만 남습니다. 글자 수를 정확하게 세는 데 집중한 도구입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>전체 문자:</strong> 공백, 특수문자를 포함한 모든 문자</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>공백 제외:</strong> 공백을 제외한 순수 문자 수</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>단어:</strong> 공백으로 구분된 단어의 개수</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>문장:</strong> 마침표(.), 느낌표(!), 물음표(?)로 끝나는 문장</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>단락:</strong> 빈 줄로 구분된 단락</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>읽기 시간:</strong> 평균 읽기 속도 200 단어/분 기준</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}