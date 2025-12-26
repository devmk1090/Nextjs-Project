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

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QR 코드란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              QR(Quick Response) 코드는 1994년 일본 덴소웨이브(Denso Wave)사가 개발한 2차원 바코드입니다.
              기존 1차원 바코드(검은 세로줄)는 20자 정도만 저장할 수 있지만, QR 코드는 최대 7,000자 이상의 정보를 담을 수 있어
              URL, 연락처, Wi-Fi 정보, 결제 정보 등 다양한 데이터를 빠르게 공유할 수 있습니다.
            </p>
            <p>
              스마트폰 카메라로 QR 코드를 스캔하면 자동으로 웹사이트 접속, 전화 걸기, 위치 확인 등이 가능하여
              명함, 광고 포스터, 제품 포장, 티켓, 메뉴판 등 일상 곳곳에서 널리 사용됩니다.
              특히 코로나19 이후 비접촉 결제와 출입 명부 확인용으로 사용이 급증했습니다.
            </p>
            <p>
              QR 코드의 가장 큰 장점은 "오류 정정 기능"입니다. 코드의 일부가 손상되거나 가려져도(최대 30%)
              정보를 정확히 읽을 수 있습니다. 이 때문에 QR 코드 중앙에 로고를 넣어도 스캔이 가능합니다.
              또한 어느 방향에서 스캔해도 인식되도록 네 모서리에 위치 감지 패턴이 있습니다.
            </p>
            <p>
              우리의 QR 코드 생성기는 URL, 이메일, 전화번호, Wi-Fi 정보 등 다양한 템플릿을 제공하며,
              오류 정정 레벨, 크기, 색상을 자유롭게 조절할 수 있어 개인 명함부터 기업 마케팅까지 폭넓게 활용할 수 있습니다.
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
                <strong className="text-gray-900">명함에 개인 웹사이트 링크:</strong> 종이 명함에 QR 코드를 인쇄하여 포트폴리오, 블로그, LinkedIn 프로필 링크를 공유합니다.
                상대방이 명함을 받으면 QR 코드를 스캔하여 즉시 웹사이트를 방문할 수 있어, 긴 URL을 타이핑할 필요가 없습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">2.</span>
              <div>
                <strong className="text-gray-900">레스토랑 메뉴판:</strong> 식당 테이블에 QR 코드를 부착하여 고객이 스마트폰으로 메뉴를 확인하고 주문할 수 있습니다.
                코로나19 이후 비접촉 주문 방식으로 널리 퍼졌으며, 메뉴 변경 시 QR 코드 뒤 링크만 업데이트하면 되어 인쇄 비용이 절감됩니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">3.</span>
              <div>
                <strong className="text-gray-900">Wi-Fi 비밀번호 공유:</strong> 카페나 사무실에서 Wi-Fi 정보를 QR 코드로 만들어 출입구에 부착하면,
                방문자가 복잡한 비밀번호를 타이핑하지 않고 스캔만으로 자동 접속할 수 있습니다.
                형식: WIFI:T:WPA;S:네트워크명;P:비밀번호;;
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">4.</span>
              <div>
                <strong className="text-gray-900">모바일 결제:</strong> 계좌번호나 송금 정보를 QR 코드로 만들어 고객이 스캔하여 즉시 결제할 수 있습니다.
                특히 중국의 WeChat Pay, Alipay나 한국의 간편송금 서비스에서 QR 코드 결제가 일상화되어 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">5.</span>
              <div>
                <strong className="text-gray-900">이벤트 티켓 및 입장권:</strong> 콘서트, 영화, 전시회 티켓을 QR 코드로 발급하여 입구에서 스캔으로 확인합니다.
                위조 방지 효과가 있고, 종이 티켓 없이 스마트폰만으로 입장 가능하여 편리합니다.
                실시간으로 입장 현황을 파악할 수 있어 관리가 쉽습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">6.</span>
              <div>
                <strong className="text-gray-900">제품 매뉴얼 링크:</strong> 가전제품이나 가구 포장에 QR 코드를 인쇄하여 소비자가 스캔하면 PDF 매뉴얼, 조립 영상, A/S 신청 페이지로 연결됩니다.
                두꺼운 종이 매뉴얼을 인쇄할 필요 없이 온라인 자료만 업데이트하면 되어 비용과 환경을 절약할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">7.</span>
              <div>
                <strong className="text-gray-900">앱 다운로드 유도:</strong> 광고 포스터나 전단지에 QR 코드를 넣어 고객이 스캔하면 앱스토어 또는 플레이스토어로 직접 이동합니다.
                URL을 타이핑할 필요 없이 즉시 앱 설치 페이지로 연결되어 전환율이 높아집니다.
              </div>
            </li>
          </ul>
        </div>

        {/* QR 코드의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QR 코드의 원리</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📐</span>
              <div>
                <strong className="text-gray-900">2차원 구조:</strong> 기존 바코드는 가로 방향으로만 정보를 저장하지만, QR 코드는 가로와 세로 양쪽 방향을 활용하여
                훨씬 많은 데이터를 저장합니다. 작은 정사각형(모듈)을 흰색/검은색으로 배치하여 정보를 인코딩합니다.
                최소 21x21 모듈부터 최대 177x177 모듈까지 다양한 버전이 있으며, 크기가 클수록 더 많은 정보를 담을 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔍</span>
              <div>
                <strong className="text-gray-900">위치 감지 패턴:</strong> QR 코드 네 모서리 중 세 곳에 큰 정사각형 패턴이 있습니다.
                이는 스캔 장치가 QR 코드의 방향과 크기를 인식하는 데 사용됩니다. 이 덕분에 QR 코드를 거꾸로 스캔하거나 기울어진 각도에서도 정확히 읽을 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🛡️</span>
              <div>
                <strong className="text-gray-900">오류 정정 기능 (Reed-Solomon):</strong> QR 코드는 리드-솔로몬 오류 정정 알고리즘을 사용하여 코드가 손상되어도 복원할 수 있습니다.
                L(7%), M(15%), Q(25%), H(30%) 네 가지 레벨이 있으며, H 레벨은 코드의 30%가 손상되어도 읽을 수 있습니다.
                로고를 중앙에 넣는 QR 코드는 보통 H 레벨을 사용합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📦</span>
              <div>
                <strong className="text-gray-900">데이터 인코딩 방식:</strong> QR 코드는 숫자, 영문, 한글, 바이너리 등 다양한 데이터 타입을 지원합니다.
                숫자 모드(최대 7,089자), 영숫자 모드(최대 4,296자), 바이트 모드(최대 2,953자), 한자/한글 모드를 선택하여 효율적으로 저장합니다.
                데이터 타입에 따라 압축 방식이 달라져 같은 크기의 QR 코드에도 더 많은 정보를 담을 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎨</span>
              <div>
                <strong className="text-gray-900">색상 및 디자인:</strong> 전통적으로 QR 코드는 검은색+흰색 배경이지만, 충분한 대비만 있으면 다른 색상도 사용할 수 있습니다.
                단, 너무 밝은 색상이나 낮은 대비는 스캔 오류를 유발할 수 있으므로 주의해야 합니다.
                일부 기업은 브랜드 정체성을 위해 로고를 중앙에 넣거나 모듈 모양을 변형하기도 합니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. QR 코드는 무료인가요? 저작권이 있나요?</h3>
              <p className="text-gray-700">
                A. QR 코드 기술 자체는 오픈 표준이며 무료입니다. 개발사 덴소웨이브가 특허권을 행사하지 않기로 선언했습니다.
                누구나 자유롭게 생성하고 사용할 수 있으며, 상업적 목적으로도 제한 없이 활용 가능합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 오류 정정 레벨은 어떤 것을 선택해야 하나요?</h3>
              <p className="text-gray-700">
                A. 일반적인 용도는 M(15%)을 권장합니다. 깨끗한 환경(디지털 화면)에서는 L(7%)도 충분하고,
                야외 포스터처럼 손상 가능성이 있는 경우 Q(25%)나 H(30%)를 사용하세요.
                로고를 중앙에 넣으려면 H(30%) 레벨이 필수입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. QR 코드가 스캔되지 않는 이유는 무엇인가요?</h3>
              <p className="text-gray-700">
                A. 주로 크기가 너무 작거나(최소 2x2cm 권장), 색상 대비가 부족하거나, 인쇄 품질이 낮기 때문입니다.
                또한 QR 코드 주변에 여백(Quiet Zone)이 충분하지 않으면 인식이 어렵습니다.
                흰색 배경에 검은색 QR 코드가 가장 인식률이 높습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 한 번 만든 QR 코드의 내용을 수정할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 아니요, QR 코드 자체는 수정할 수 없습니다. 하지만 URL 단축 서비스(bit.ly 등)를 사용하면 간접적으로 가능합니다.
                QR 코드에는 단축 URL을 넣고, 실제 목적지 URL은 단축 서비스에서 변경하는 방식입니다.
                "동적 QR 코드" 서비스를 사용하면 스캔 통계 추적과 목적지 변경이 가능합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. QR 코드에 로고를 넣고 싶은데 어떻게 하나요?</h3>
              <p className="text-gray-700">
                A. 오류 정정 레벨을 H(30%)로 설정한 후, 이미지 편집 프로그램(포토샵 등)에서 QR 코드 중앙에 로고를 배치하세요.
                로고 크기는 QR 코드 전체 면적의 20~30%를 넘지 않는 것이 좋습니다. 너무 크면 스캔이 안 될 수 있습니다.
                로고 주변에 흰색 테두리를 넣으면 인식률이 향상됩니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. QR 코드의 유효기간이 있나요?</h3>
              <p className="text-gray-700">
                A. QR 코드 자체는 영구적입니다. 하지만 QR 코드가 가리키는 URL이 만료되거나 삭제되면 사용할 수 없게 됩니다.
                예를 들어 웹사이트가 폐쇄되거나 도메인이 만료되면 QR 코드는 스캔되어도 아무 동작도 하지 않습니다.
                따라서 장기간 사용할 QR 코드는 안정적인 URL을 사용해야 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* QR 코드 사용 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
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
