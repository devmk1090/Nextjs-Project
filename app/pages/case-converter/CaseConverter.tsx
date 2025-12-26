"use client";

import { useState } from "react";

export default function CaseConverter() {
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  // 대문자로 변환
  const toUpperCase = () => input.toUpperCase();

  // 소문자로 변환
  const toLowerCase = () => input.toLowerCase();

  // 첫 글자만 대문자 (Sentence case)
  const toSentenceCase = () => {
    return input.toLowerCase().replace(/(^\w|\.\s+\w)/g, (letter) => letter.toUpperCase());
  };

  // 각 단어 첫 글자 대문자 (Title Case)
  const toTitleCase = () => {
    return input.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // 카멜케이스 (camelCase)
  const toCamelCase = () => {
    return input
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (match) => match.toLowerCase());
  };

  // 파스칼케이스 (PascalCase)
  const toPascalCase = () => {
    return input
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, (match) => match.toUpperCase());
  };

  // 스네이크케이스 (snake_case)
  const toSnakeCase = () => {
    return input
      .replace(/\s+/g, "_")
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");
  };

  // 케밥케이스 (kebab-case)
  const toKebabCase = () => {
    return input
      .replace(/\s+/g, "-")
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "");
  };

  // 복사 기능
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  const conversions = [
    { label: "대문자", func: toUpperCase, key: "upper", desc: "UPPER CASE" },
    { label: "소문자", func: toLowerCase, key: "lower", desc: "lower case" },
    { label: "문장 케이스", func: toSentenceCase, key: "sentence", desc: "Sentence case" },
    { label: "타이틀 케이스", func: toTitleCase, key: "title", desc: "Title Case" },
    { label: "카멜케이스", func: toCamelCase, key: "camel", desc: "camelCase" },
    { label: "파스칼케이스", func: toPascalCase, key: "pascal", desc: "PascalCase" },
    { label: "스네이크케이스", func: toSnakeCase, key: "snake", desc: "snake_case" },
    { label: "케밥케이스", func: toKebabCase, key: "kebab", desc: "kebab-case" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          케이스 변환기
        </h1>

        {/* 입력 영역 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">텍스트 입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="변환할 텍스트를 입력하세요..."
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        {/* 변환 결과 */}
        {input && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">변환 결과</h2>
            {conversions.map((conversion) => {
              const result = conversion.func();
              return (
                <div
                  key={conversion.key}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{conversion.label}</h3>
                      <p className="text-xs text-gray-500">{conversion.desc}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(result, conversion.key)}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                    >
                      {copied === conversion.key ? "복사됨!" : "복사"}
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-300 overflow-x-auto">
                    <code className="font-mono text-sm break-all">{result}</code>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">케이스 변환기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              케이스 변환기는 텍스트의 대소문자 표기법(naming convention)을 다양한 형식으로 자동 변환해주는 도구입니다. 프로그래밍에서는 언어와 맥락에 따라 변수명, 함수명, 클래스명 등에 서로 다른 케이스 규칙을 사용하기 때문에, 이러한 변환이 자주 필요합니다.
            </p>
            <p>
              camelCase, PascalCase, snake_case, kebab-case 등 각 프로그래밍 언어와 프레임워크는 고유한 코딩 컨벤션을 가지고 있습니다. JavaScript는 camelCase를, Python은 snake_case를 선호하며, URL과 CSS는 kebab-case를 주로 사용합니다. 이러한 차이는 각 언어의 역사적 배경과 커뮤니티 문화에서 비롯되었습니다.
            </p>
            <p>
              개발자는 다양한 언어와 플랫폼을 넘나들며 작업하기 때문에, 한 형식에서 다른 형식으로 변수명을 변환해야 하는 상황이 빈번합니다. 예를 들어 API 응답(snake_case)을 JavaScript 객체(camelCase)로 매핑하거나, React 컴포넌트명(PascalCase)을 파일명(kebab-case)으로 변환할 때 케이스 변환기가 유용합니다.
            </p>
            <p>
              이 도구는 8가지 주요 케이스 형식을 지원하며, 입력과 동시에 모든 형식의 변환 결과를 실시간으로 보여줍니다. 클릭 한 번으로 원하는 형식을 복사하여 즉시 코드에 적용할 수 있어, 수동 변환의 오류를 방지하고 작업 속도를 크게 높여줍니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">케이스 변환기 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. API 데이터 매핑</h3>
              <p className="text-gray-700 text-sm">
                백엔드 API가 snake_case(예: user_name, created_at)로 데이터를 반환하지만, 프론트엔드 JavaScript는 camelCase(userName, createdAt) 규칙을 따를 때, 케이스 변환기로 빠르게 매핑 코드를 작성할 수 있습니다. 특히 많은 필드를 다룰 때 수동 변환의 오타를 방지합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 다국어 프로젝트 협업</h3>
              <p className="text-gray-700 text-sm">
                Python 백엔드와 JavaScript 프론트엔드를 함께 개발할 때, Python의 snake_case 함수명을 JavaScript의 camelCase로 변환하거나, 반대로 변환해야 하는 경우가 많습니다. 케이스 변환기는 두 언어 간의 네이밍 일관성을 유지하는 데 도움을 줍니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 데이터베이스 스키마 설계</h3>
              <p className="text-gray-700 text-sm">
                데이터베이스 테이블과 컬럼명은 전통적으로 snake_case를 사용하지만, ORM 모델이나 애플리케이션 코드에서는 camelCase나 PascalCase를 사용할 수 있습니다. 스키마를 설계할 때 케이스 변환기로 일관된 네이밍을 빠르게 생성할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. URL 및 라우팅</h3>
              <p className="text-gray-700 text-sm">
                웹 URL은 kebab-case(예: /user-profile, /blog-posts)를 사용하지만, 내부 함수명이나 컴포넌트명은 camelCase나 PascalCase를 사용합니다. 새로운 페이지를 추가할 때 케이스 변환기로 URL과 코드명을 일관되게 생성할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. 파일명 및 폴더 구조</h3>
              <p className="text-gray-700 text-sm">
                React 컴포넌트는 PascalCase(UserProfile.tsx)로 명명하지만, CSS 모듈이나 테스트 파일은 kebab-case(user-profile.module.css, user-profile.test.ts)를 사용할 수 있습니다. 프로젝트 컨벤션에 맞게 파일명을 변환할 때 유용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. CSS 클래스명 생성</h3>
              <p className="text-gray-700 text-sm">
                BEM(Block Element Modifier) 방법론이나 일반 CSS에서는 kebab-case(예: user-profile__header--active)를 사용하지만, JavaScript에서 동적으로 클래스를 생성할 때는 camelCase 변수명을 사용합니다. 케이스 변환기로 양쪽 네이밍을 빠르게 생성할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">7. 코드 리팩토링</h3>
              <p className="text-gray-700 text-sm">
                레거시 코드를 현대적인 컨벤션에 맞게 리팩토링할 때, 수백 개의 변수명을 한 번에 변환해야 할 수 있습니다. 케이스 변환기로 새 네이밍 규칙을 빠르게 생성한 후, IDE의 찾기-바꾸기 기능과 결합하여 대규모 리팩토링을 안전하게 수행할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 케이스 형식의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">케이스 형식의 역사와 사용 이유</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">camelCase의 유래</h3>
              <p className="text-gray-700 text-sm">
                camelCase는 대문자가 낙타의 혹처럼 보인다 하여 붙여진 이름입니다. 1970년대 Xerox PARC에서 개발된 Smalltalk 언어에서 처음 사용되었으며, 이후 Java, JavaScript, C# 등에서 표준 변수명 규칙으로 자리잡았습니다. 공백 없이 여러 단어를 구분할 수 있어 가독성이 좋고, 대부분의 프로그래밍 언어에서 식별자로 사용할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">snake_case와 UNIX 문화</h3>
              <p className="text-gray-700 text-sm">
                snake_case는 UNIX 초창기부터 사용된 전통적인 명명 규칙입니다. C 언어와 UNIX 시스템 프로그래밍에서 소문자와 언더스코어만 사용하는 관습에서 비롯되었으며, Python, Ruby, Rust 등에서 공식 스타일 가이드로 채택했습니다. 특히 Python의 PEP 8 스타일 가이드는 snake_case를 함수명과 변수명의 표준으로 규정하고 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">PascalCase와 객체지향 프로그래밍</h3>
              <p className="text-gray-700 text-sm">
                PascalCase는 1970년대 Pascal 언어에서 유래했으며, 클래스명과 타입명에 주로 사용됩니다. Java, C#, TypeScript 등 객체지향 언어에서 클래스는 PascalCase로, 인스턴스와 메서드는 camelCase로 명명하여 둘을 시각적으로 구분합니다. React에서도 컴포넌트를 PascalCase로 명명하여 일반 함수와 구별합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">kebab-case와 웹 표준</h3>
              <p className="text-gray-700 text-sm">
                kebab-case는 URL과 HTML 속성명에서 널리 사용됩니다. URL은 대소문자를 구분하지 않는 시스템이 많아 소문자와 하이픈만 사용하는 것이 안전하며, 검색 엔진 최적화(SEO)에도 유리합니다. CSS의 속성명(background-color, font-size)도 역사적으로 kebab-case를 사용해왔으며, 이는 웹 표준의 일부가 되었습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">언어별 컨벤션 차이의 이유</h3>
              <p className="text-gray-700 text-sm">
                각 프로그래밍 언어가 서로 다른 네이밍 컨벤션을 채택한 이유는 역사적, 기술적 배경이 다르기 때문입니다. C 계열 언어는 초기 키보드에서 언더스코어 입력이 불편했던 점, Python은 가독성을 최우선으로 하는 철학, JavaScript는 Java의 영향 등이 각각 반영되었습니다. 이러한 차이를 이해하면 적절한 컨벤션을 선택하고 팀 내 일관성을 유지할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                camelCase와 PascalCase의 차이는 무엇인가요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> camelCase는 첫 단어를 소문자로 시작하고(예: myVariable), PascalCase는 모든 단어를 대문자로 시작합니다(예: MyClass). JavaScript에서는 변수와 함수는 camelCase, 클래스와 컴포넌트는 PascalCase를 사용하는 것이 일반적입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                어떤 케이스를 사용해야 하나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 언어와 맥락에 따라 다릅니다. JavaScript는 camelCase, Python은 snake_case, URL과 CSS는 kebab-case를 선호합니다. 기존 프로젝트가 있다면 그 컨벤션을 따르고, 새 프로젝트라면 해당 언어/프레임워크의 공식 스타일 가이드를 참고하세요.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                snake_case와 kebab-case는 언제 구분해서 사용하나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> snake_case는 프로그래밍 언어의 변수명(Python, Ruby)과 데이터베이스 필드명에, kebab-case는 URL, CSS 클래스명, 파일명에 주로 사용됩니다. 많은 프로그래밍 언어에서 하이픈(-)은 빼기 연산자로 인식되어 식별자로 사용할 수 없기 때문입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                대문자와 소문자만 변환하면 안 되나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 단순 대소문자 변환(UPPER CASE, lower case)은 강조나 스타일링 목적으로 사용되지만, 프로그래밍에서는 여러 단어를 결합한 식별자가 필요합니다. camelCase, snake_case 등은 공백 없이 단어를 구분하면서도 가독성을 유지하는 실용적인 방법입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                한글이나 다른 언어도 변환할 수 있나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 이 도구는 영문 알파벳 기준으로 설계되었습니다. camelCase, PascalCase 등은 영문자의 대소문자를 활용하는 방식이므로 한글에는 적용되지 않습니다. 프로그래밍에서는 일반적으로 변수명에 ASCII 문자만 사용하는 것을 권장합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                SCREAMING_SNAKE_CASE는 무엇인가요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> SCREAMING_SNAKE_CASE(모두 대문자 + 언더스코어)는 상수(constant)를 나타낼 때 주로 사용됩니다. 예를 들어 MAX_SIZE, API_KEY처럼 변경되지 않는 값을 강조할 때 사용하며, 대부분의 프로그래밍 언어에서 이 컨벤션을 따릅니다.
              </p>
            </div>
          </div>
        </div>

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">케이스 종류 설명</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">camelCase (카멜케이스)</h3>
              <p className="text-gray-700 mb-2">첫 단어는 소문자, 이후 단어는 대문자로 시작</p>
              <code className="font-mono text-blue-600">myVariableName</code>
              <p className="text-xs text-gray-500 mt-2">주로 JavaScript, Java 변수명에 사용</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">PascalCase (파스칼케이스)</h3>
              <p className="text-gray-700 mb-2">모든 단어의 첫 글자를 대문자로</p>
              <code className="font-mono text-blue-600">MyClassName</code>
              <p className="text-xs text-gray-500 mt-2">주로 클래스명, 컴포넌트명에 사용</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">snake_case (스네이크케이스)</h3>
              <p className="text-gray-700 mb-2">단어를 언더스코어(_)로 구분, 모두 소문자</p>
              <code className="font-mono text-blue-600">my_variable_name</code>
              <p className="text-xs text-gray-500 mt-2">주로 Python, Ruby, 데이터베이스 필드명에 사용</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">kebab-case (케밥케이스)</h3>
              <p className="text-gray-700 mb-2">단어를 하이픈(-)으로 구분, 모두 소문자</p>
              <code className="font-mono text-blue-600">my-variable-name</code>
              <p className="text-xs text-gray-500 mt-2">주로 URL, CSS 클래스명에 사용</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
