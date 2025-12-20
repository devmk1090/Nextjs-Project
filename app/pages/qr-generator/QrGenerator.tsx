"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export default function QrGenerator() {
  const [text, setText] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("M");
  const [size, setSize] = useState<number>(300);
  const [darkColor, setDarkColor] = useState<string>("#000000");
  const [lightColor, setLightColor] = useState<string>("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // QR 코드 생성
  useEffect(() => {
    if (!text) {
      setQrCodeUrl("");
      return;
    }

    const generateQRCode = async () => {
      try {
        const options = {
          errorCorrectionLevel: errorLevel,
          width: size,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        };

        // Canvas에 그리기
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, text, options);
        }

        // Data URL 생성
        const url = await QRCode.toDataURL(text, options);
        setQrCodeUrl(url);
      } catch (error) {
        console.error("QR 코드 생성 오류:", error);
      }
    };

    generateQRCode();
  }, [text, errorLevel, size, darkColor, lightColor]);

  // QR 코드 다운로드
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 미리 정의된 템플릿
  const templates = [
    { label: "URL", placeholder: "https://example.com" },
    { label: "이메일", placeholder: "mailto:example@email.com" },
    { label: "전화번호", placeholder: "tel:010-1234-5678" },
    { label: "SMS", placeholder: "sms:010-1234-5678?body=안녕하세요" },
    { label: "Wi-Fi", placeholder: "WIFI:T:WPA;S:네트워크명;P:비밀번호;;" },
    { label: "위치", placeholder: "geo:37.5665,126.9780" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          QR 코드 생성기
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 영역 */}
          <div className="space-y-6">
            {/* 텍스트 입력 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">텍스트/URL 입력</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="QR 코드로 변환할 텍스트나 URL을 입력하세요"
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>

            {/* 템플릿 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">빠른 템플릿</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template) => (
                  <button
                    key={template.label}
                    onClick={() => setText(template.placeholder)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 오류 정정 수준 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">오류 정정 수준</label>
              <div className="grid grid-cols-4 gap-2">
                {(["L", "M", "Q", "H"] as ErrorCorrectionLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setErrorLevel(level)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      errorLevel === level
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                L(7%) → M(15%) → Q(25%) → H(30%) - 높을수록 손상에 강함
              </p>
            </div>

            {/* 크기 조절 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                크기: {size}px
              </label>
              <input
                type="range"
                min="150"
                max="500"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* 색상 설정 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">QR 코드 색상</label>
                <input
                  type="color"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">배경 색상</label>
                <input
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            {/* 초기화 버튼 */}
            <button
              onClick={() => {
                setText("");
                setErrorLevel("M");
                setSize(300);
                setDarkColor("#000000");
                setLightColor("#ffffff");
              }}
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
            >
              초기화
            </button>
          </div>

          {/* QR 코드 미리보기 */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200 mb-6">
              {qrCodeUrl ? (
                <div className="flex flex-col items-center">
                  <canvas ref={canvasRef} className="hidden" />
                  <img src={qrCodeUrl} alt="QR Code" className="rounded-lg shadow-lg" />
                </div>
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-200 rounded-lg"
                  style={{ width: size, height: size }}
                >
                  <p className="text-gray-500 text-center px-4">
                    텍스트를 입력하면
                    <br />
                    QR 코드가 생성됩니다
                  </p>
                </div>
              )}
            </div>

            {/* 다운로드 버튼 */}
            {qrCodeUrl && (
              <button
                onClick={downloadQRCode}
                className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                PNG로 다운로드
              </button>
            )}
          </div>
        </div>

        {/* QR 코드 사용 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QR 코드란?</h2>
          <div className="text-gray-700 space-y-3">
            <p>
              QR(Quick Response) 코드는 2차원 바코드의 일종으로, 텍스트, URL, 연락처 정보 등을 빠르게 인식할 수 있는
              코드입니다. 스마트폰 카메라로 스캔하여 정보를 즉시 확인할 수 있습니다.
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">주요 사용처:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>웹사이트 URL 공유 (명함, 포스터, 광고)</li>
                <li>모바일 결제 (계좌 정보, 송금)</li>
                <li>Wi-Fi 비밀번호 공유</li>
                <li>이벤트 입장권 및 티켓</li>
                <li>제품 정보 및 매뉴얼 링크</li>
                <li>앱 다운로드 링크</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 오류 정정 수준 설명 */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">오류 정정 수준</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">L (Low) - 7%</h3>
              <p className="text-gray-700">낮은 오류 정정. 깨끗한 환경에서 사용. 더 많은 데이터 저장 가능.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">M (Medium) - 15%</h3>
              <p className="text-gray-700">
                중간 오류 정정. 일반적인 용도에 적합. 균형잡힌 선택. (권장)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Q (Quartile) - 25%</h3>
              <p className="text-gray-700">높은 오류 정정. 약간 손상되어도 읽기 가능.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">H (High) - 30%</h3>
              <p className="text-gray-700">
                최고 오류 정정. 많이 손상되어도 복원 가능. 로고 삽입 시 사용.
              </p>
            </div>
          </div>
        </div>

        {/* 템플릿 예시 */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">템플릿 예시</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">URL:</span>{" "}
              <code className="font-mono text-blue-600">https://example.com</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">이메일:</span>{" "}
              <code className="font-mono text-blue-600">mailto:contact@example.com</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">전화:</span>{" "}
              <code className="font-mono text-blue-600">tel:010-1234-5678</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">SMS:</span>{" "}
              <code className="font-mono text-blue-600">sms:010-1234-5678?body=메시지 내용</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">Wi-Fi:</span>{" "}
              <code className="font-mono text-blue-600">WIFI:T:WPA;S:네트워크명;P:비밀번호;;</code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold text-gray-800">위치 (위도,경도):</span>{" "}
              <code className="font-mono text-blue-600">geo:37.5665,126.9780</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
