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

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Base64 인코딩이란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Base64는 바이너리 데이터를 64개의 안전한 ASCII 문자(A-Z, a-z, 0-9, +, /)만을 사용하여 텍스트로 변환하는 인코딩 방식입니다.
              이메일, URL, JSON 등 텍스트만 지원하는 환경에서 이미지, 파일, 암호화 데이터 같은 바이너리 데이터를 안전하게 전송할 때 필수적으로 사용됩니다.
            </p>
            <p>
              원래 이메일 시스템(SMTP)은 7비트 ASCII 텍스트만 지원했기 때문에, 첨부파일(8비트 바이너리)을 보내려면 Base64로 변환해야 했습니다.
              오늘날에도 웹 개발, API 통신, 데이터 저장 등 다양한 분야에서 Base64 인코딩이 널리 활용됩니다.
              특히 이미지를 HTML/CSS에 직접 삽입하는 Data URL, API 인증 헤더(Basic Auth), JWT 토큰 등에서 필수적입니다.
            </p>
            <p>
              Base64 인코딩은 암호화가 아닙니다. 누구나 쉽게 디코딩할 수 있으므로 보안 용도로 사용하면 안 됩니다.
              단지 데이터를 "텍스트 형태로 표현"하는 방법일 뿐, 민감한 정보는 반드시 암호화(AES, RSA 등)를 별도로 적용해야 합니다.
            </p>
            <p>
              우리의 Base64 변환기는 한글을 포함한 모든 유니코드 문자를 올바르게 처리하며, 인코딩/디코딩 결과를 즉시 복사할 수 있는
              편리한 인터페이스를 제공합니다. 개발자, 시스템 관리자, 보안 담당자 등 다양한 분야에서 활용할 수 있습니다.
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
                <strong className="text-gray-900">이미지 Data URL 생성:</strong> 작은 아이콘이나 로고를 HTML/CSS에 직접 임베딩할 때 사용합니다.
                예: &lt;img src="data:image/png;base64,iVBORw0KG..." /&gt; 형태로 외부 파일 없이 이미지를 표시할 수 있습니다.
                HTTP 요청 수를 줄여 웹 페이지 로딩 속도를 개선하는 효과가 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">2.</span>
              <div>
                <strong className="text-gray-900">API 인증 헤더 (Basic Auth):</strong> HTTP 요청 시 사용자명과 비밀번호를 Base64로 인코딩하여 전송합니다.
                예: "username:password"를 인코딩한 "dXNlcm5hbWU6cGFzc3dvcmQ="를 Authorization 헤더에 포함합니다.
                단, HTTPS 없이 사용하면 보안에 취약하므로 반드시 SSL/TLS 통신과 함께 사용해야 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">3.</span>
              <div>
                <strong className="text-gray-900">이메일 첨부파일 인코딩:</strong> PDF, 이미지, 워드 파일 등을 이메일로 보낼 때 MIME 형식으로 Base64 인코딩됩니다.
                이메일 프로토콜(SMTP)은 텍스트만 지원하기 때문에 바이너리 파일을 전송하려면 Base64 변환이 필수입니다.
                받는 사람의 이메일 클라이언트가 자동으로 디코딩하여 원본 파일로 복원합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">4.</span>
              <div>
                <strong className="text-gray-900">JWT 토큰 분석:</strong> JWT(JSON Web Token)는 헤더, 페이로드, 서명이 각각 Base64로 인코딩되어 점(.)으로 연결됩니다.
                개발자가 JWT 토큰을 디버깅할 때 Base64 디코더로 페이로드 내용을 확인하여 사용자 정보, 권한, 만료 시간 등을 분석할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">5.</span>
              <div>
                <strong className="text-gray-900">URL에 복잡한 데이터 전달:</strong> URL에는 특수문자나 한글을 직접 포함할 수 없습니다.
                복잡한 JSON 데이터나 긴 파라미터를 Base64로 인코딩하여 URL에 포함시키면 안전하게 전달할 수 있습니다.
                예: ?data=eyJuYW1lIjoi7ZmN6ri464W5In0= 같은 형태로 사용합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">6.</span>
              <div>
                <strong className="text-gray-900">데이터베이스에 바이너리 저장:</strong> 작은 이미지나 파일을 별도 파일 시스템 없이 데이터베이스에 저장할 때 Base64로 인코딩합니다.
                MySQL의 TEXT 컬럼이나 MongoDB의 문자열 필드에 바이너리 데이터를 저장할 수 있습니다.
                단, 용량이 33% 증가하므로 큰 파일은 별도 스토리지 사용을 권장합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">7.</span>
              <div>
                <strong className="text-gray-900">개발/디버깅 도구:</strong> 서버에서 받은 응답이나 암호화된 쿠키 값을 Base64 디코딩하여 내용을 확인합니다.
                API 응답에 Base64로 인코딩된 에러 메시지가 있을 때, 디코딩하여 실제 에러 내용을 파악할 수 있습니다.
              </div>
            </li>
          </ul>
        </div>

        {/* Base64의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Base64의 원리</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔤</span>
              <div>
                <strong className="text-gray-900">64개 문자 사용:</strong> Base64는 A-Z(26개), a-z(26개), 0-9(10개), +(1개), /(1개) 총 64개 문자만 사용합니다.
                여기에 패딩용 =(equals) 문자가 추가됩니다. 이 64개 문자는 모든 시스템에서 안전하게 전송 가능한 ASCII 문자들입니다.
                바이너리 데이터를 6비트씩 끊어서 0~63의 숫자로 변환하고, 각 숫자를 64개 문자 중 하나로 매핑합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📏</span>
              <div>
                <strong className="text-gray-900">용량이 33% 증가:</strong> 원본 데이터를 Base64로 인코딩하면 크기가 약 4/3배(33% 증가)가 됩니다.
                이는 8비트(1바이트) 데이터를 6비트씩 나눠서 표현하기 때문입니다. 예를 들어 3바이트(24비트) 원본은 4개 문자(24비트)로 변환됩니다.
                따라서 큰 파일을 Base64로 인코딩하면 전송 용량이 크게 늘어나므로 주의해야 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">⚖️</span>
              <div>
                <strong className="text-gray-900">패딩(=) 문자의 역할:</strong> 원본 데이터가 3바이트의 배수가 아닐 때, 끝에 =나 ==를 붙여 길이를 맞춥니다.
                예를 들어 "A"(1바이트)를 인코딩하면 "QQ=="가 되고, "AB"(2바이트)는 "QUI="가 됩니다.
                패딩은 디코더가 정확히 몇 바이트인지 알 수 있게 하는 마커 역할을 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔒</span>
              <div>
                <strong className="text-gray-900">암호화가 아닌 인코딩:</strong> Base64는 "변환" 방식일 뿐 "암호화"가 아닙니다.
                누구나 Base64 디코더로 원본을 복원할 수 있으므로 비밀번호, 개인정보 같은 민감한 데이터를 숨기는 용도로는 절대 사용하면 안 됩니다.
                보안이 필요하면 AES, RSA 같은 암호화 알고리즘을 먼저 적용한 후 Base64로 인코딩해야 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌐</span>
              <div>
                <strong className="text-gray-900">URL-safe Base64 변형:</strong> 표준 Base64의 +와 / 문자는 URL에서 특수 의미를 가지므로 문제가 됩니다.
                URL-safe Base64는 +를 -, /를 _로 대체하고 패딩 =를 생략합니다. JWT 토큰이나 URL 파라미터에서 주로 사용됩니다.
                예: 표준 "a+b/c==" → URL-safe "a-b_c"
              </div>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. Base64로 인코딩하면 안전한가요? 비밀번호를 숨길 수 있나요?</h3>
              <p className="text-gray-700">
                A. 아니요, 절대 안전하지 않습니다. Base64는 암호화가 아니라 단순 인코딩입니다.
                누구나 Base64 디코더로 즉시 원본을 복원할 수 있으므로 비밀번호나 개인정보를 숨기는 용도로는 사용하면 안 됩니다.
                보안이 필요하면 AES, RSA 같은 진짜 암호화 알고리즘을 사용하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 한글이 깨지는데 어떻게 해야 하나요?</h3>
              <p className="text-gray-700">
                A. 우리 도구는 UTF-8 인코딩을 자동으로 처리하므로 한글이 올바르게 변환됩니다.
                다른 도구에서 한글이 깨진다면 UTF-8 인코딩을 지원하지 않는 경우입니다.
                btoa() 함수는 Latin1만 지원하므로, 한글 처리를 위해 encodeURIComponent()와 조합해야 합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 이미지 파일도 Base64로 변환할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 네, 가능하지만 이 도구는 텍스트 전용입니다. 이미지를 Base64로 변환하려면 별도의 이미지 인코더를 사용하거나,
                브라우저 개발자 도구의 FileReader API를 활용하세요. 변환된 결과는 "data:image/png;base64,..." 형태의 Data URL로 사용할 수 있습니다.
                단, 큰 이미지는 Base64로 인코딩하면 용량이 33% 증가하므로 성능에 주의하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 끝에 있는 = 문자는 무엇인가요? 지워도 되나요?</h3>
              <p className="text-gray-700">
                A. =는 패딩(padding) 문자로, 데이터 길이를 맞추기 위해 추가됩니다.
                일반적인 Base64 디코더는 =가 있어야 정확히 디코딩할 수 있습니다. 지우면 오류가 발생할 수 있습니다.
                URL-safe Base64에서는 패딩을 생략하기도 하지만, 표준 Base64에서는 필수입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. JWT 토큰을 디코딩할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 네, JWT는 점(.)으로 구분된 3개 부분(헤더.페이로드.서명)으로 구성되며, 각 부분이 Base64로 인코딩되어 있습니다.
                두 번째 부분(페이로드)을 복사하여 디코딩하면 사용자 정보, 권한, 만료 시간 등을 확인할 수 있습니다.
                단, JWT는 URL-safe Base64를 사용하므로 일부 디코더에서는 +와 /를 -와 _로 수동 변환해야 할 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 디코딩 오류가 나는데 이유가 뭔가요?</h3>
              <p className="text-gray-700">
                A. Base64 형식이 올바르지 않거나 손상된 경우입니다. Base64는 A-Z, a-z, 0-9, +, /, = 문자만 허용합니다.
                공백, 줄바꿈, 특수문자가 포함되어 있거나, 일부 문자가 복사 과정에서 누락되었을 수 있습니다.
                복사할 때 앞뒤 공백을 제거하고 전체 문자열을 정확히 붙여넣으세요.
              </p>
            </div>
          </div>
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
