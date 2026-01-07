"use client";

import { useState, useRef } from "react";

export default function ColorExtractor() {
  const [image, setImage] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        extractColors(img);
        setImage(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const colorMap: { [key: string]: number } = {};

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const hex = rgbToHex(r, g, b);
      colorMap[hex] = (colorMap[hex] || 0) + 1;
    }

    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([color]) => color);

    setColors(sortedColors);
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`${color} 복사되었습니다!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          색상 추출기
        </h1>

        {/* 이미지 업로드 */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">이미지 선택</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 이미지 미리보기 */}
        {image && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">업로드된 이미지</h2>
            <div className="flex justify-center">
              <img src={image} alt="Uploaded" className="max-w-full max-h-96 rounded-xl shadow-lg border-4 border-white" />
            </div>
          </div>
        )}

        {/* 추출된 색상 */}
        {colors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">추출된 주요 색상 (상위 10개)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => copyColor(color)}
                >
                  <div
                    className="h-24 rounded-lg border-2 border-gray-300 shadow-md"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-center mt-2 font-mono text-sm font-semibold">{color}</p>
                  <p className="text-center text-xs text-gray-500">클릭하여 복사</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 가이드 */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 방법</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">1.</span>
              <span>이미지 파일을 선택합니다. (JPG, PNG, GIF 등)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">2.</span>
              <span>이미지에서 가장 많이 사용된 상위 10개 색상이 자동으로 추출됩니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">3.</span>
              <span>색상을 클릭하면 HEX 코드가 클립보드에 복사됩니다.</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">4.</span>
              <span>로고, 사진, 디자인에서 색상 팔레트를 추출하여 활용하세요.</span>
            </li>
          </ul>
        </div>

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 추출기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              색상 추출기는 이미지에서 가장 많이 사용된 색상들을 자동으로 분석하고 HEX 코드로 추출하는 도구입니다. 색상 이론(Color Theory)은 디자인의 가장 기본이 되는 개념으로, 1666년 아이작 뉴턴이 프리즘을 통해 빛의 스펙트럼을 발견한 이래 수많은 연구가 이루어졌습니다. 디지털 시대에는 RGB(Red, Green, Blue)와 HEX(Hexadecimal) 표기법으로 1,677만 가지 색상을 표현할 수 있습니다.
            </p>
            <p>
              RGB 색 공간은 1931년 국제조명위원회(CIE)가 표준화했으며, 각 색상 채널은 0-255 범위의 256단계를 가집니다. HEX 코드는 #RRGGBB 형식으로, 예를 들어 #FF5733은 빨강 255, 초록 87, 파랑 51을 의미합니다. 웹 디자인과 그래픽 디자인에서 HEX 코드는 CSS, HTML, Photoshop, Illustrator 등 모든 도구에서 호환되는 표준 표기법입니다.
            </p>
            <p>
              이 도구는 Canvas API를 사용하여 이미지의 모든 픽셀을 스캔하고, 각 색상의 출현 빈도를 계산하여 상위 10개를 추출합니다. 브랜드 가이드라인 작성, 경쟁사 디자인 분석, 사진 색감 파악, UI/UX 색상 일관성 검토 등 다양한 용도로 활용됩니다. 브라우저에서 직접 처리되므로 이미지가 서버로 전송되지 않아 안전합니다.
            </p>
            <p>
              디자이너, 개발자, 마케터 모두에게 유용한 도구입니다. 로고에서 브랜드 색상을 추출하거나, 자연 풍경 사진에서 계절감을 표현하는 색상을 찾거나, 인기 웹사이트의 색상 팔레트를 분석하여 트렌드를 파악할 수 있습니다. 색상은 감정과 직결되므로, 올바른 색상 선택은 디자인의 성공을 좌우합니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 추출기 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 웹 디자인 색상 분석 (경쟁사 사이트 벤치마킹)</h3>
              <p className="text-gray-700 text-sm">
                경쟁사 웹사이트의 스크린샷을 찍어 색상을 추출하면 그들이 사용하는 브랜드 색상, 강조 색상, 배경 색상을 파악할 수 있습니다. 인기 사이트들의 색상 트렌드를 분석하여 현대적인 디자인을 만들 수 있습니다. 예를 들어 테크 기업들은 파랑(신뢰), 초록(성장), 보라(혁신) 계열을 선호합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 브랜드 가이드라인 작성</h3>
              <p className="text-gray-700 text-sm">
                회사 로고나 제품 사진에서 공식 브랜드 색상을 추출하여 브랜드 가이드라인에 문서화합니다. 마케팅 자료, 프레젠테이션, 웹사이트 디자인에서 일관된 색상을 사용하면 브랜드 인지도가 높아집니다. 코카콜라의 빨강, 페이스북의 파랑처럼 색상은 브랜드 정체성의 핵심입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 디자인 시스템 구축</h3>
              <p className="text-gray-700 text-sm">
                기존 디자인 파일(Figma, Sketch, XD)이나 완성된 UI 스크린샷에서 사용된 모든 색상을 추출하여 디자인 시스템의 색상 팔레트를 만듭니다. Primary, Secondary, Accent, Neutral 색상을 정의하고, Material Design이나 Tailwind CSS처럼 50-900 단계의 색상 스케일을 생성할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 사진 색상 분석 및 무드보드 제작</h3>
              <p className="text-gray-700 text-sm">
                여행 사진, 자연 풍경, 인물 사진에서 주요 색상을 추출하여 무드보드(Mood Board)를 만듭니다. 봄(파스텔 톤), 여름(비비드), 가을(어스 톤), 겨울(차가운 톤) 등 계절감을 표현하는 색상을 찾을 수 있습니다. 인테리어 디자이너는 가구나 인테리어 사진에서 색상을 추출하여 조화로운 공간을 설계합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. UI/UX 색상 일관성 검토</h3>
              <p className="text-gray-700 text-sm">
                앱이나 웹사이트의 여러 페이지를 캡처하여 각 페이지에서 사용된 색상을 추출하고 비교합니다. 일관성 없이 너무 많은 색상이 사용되면 혼란스러운 UI가 됩니다. 일반적으로 주요 색상 3-5개, 중립 색상(회색 계열) 3-5개로 제한하는 것이 좋습니다. 구글, 애플, 에어비앤비 등은 매우 제한된 색상 팔레트를 사용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 웹 접근성 (WCAG) 색상 대비 검토</h3>
              <p className="text-gray-700 text-sm">
                웹사이트의 배경색과 텍스트 색을 추출하여 색상 대비(Contrast Ratio)를 계산합니다. WCAG 2.1 기준에 따르면 일반 텍스트는 최소 4.5:1, 큰 텍스트는 3:1의 대비율이 필요합니다. 색맹(색각 이상) 사용자를 위해 색상만으로 정보를 전달하지 않고, 충분한 대비를 유지하는 것이 중요합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 원리 섹션 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 추출의 원리</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎨</span>
              <div>
                <strong className="text-gray-900">RGB 색 공간:</strong> 디지털 이미지는 빨강(Red), 초록(Green), 파랑(Blue) 세 가지 채널로 구성됩니다. 각 채널은 0-255 범위의 256단계를 가지며, 총 256³ = 16,777,216가지 색상을 표현할 수 있습니다. 인간의 눈도 빨강, 초록, 파랑 세 종류의 원추세포(Cone Cell)로 색을 인식하므로, RGB는 생물학적으로도 타당한 색 모델입니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">#️⃣</span>
              <div>
                <strong className="text-gray-900">HEX 표기법:</strong> HEX 코드는 #RRGGBB 형식의 16진수(Hexadecimal)입니다. 00-FF 범위로 각 채널을 표현하며, #000000은 검정, #FFFFFF는 하양, #FF0000은 순수 빨강입니다. 웹 표준(W3C)에서 정의한 표기법으로 HTML, CSS, SVG, Canvas에서 모두 사용됩니다. 짧은 형식(#RGB)도 가능합니다(예: #F00 = #FF0000).
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🖼️</span>
              <div>
                <strong className="text-gray-900">Canvas API와 픽셀 스캔:</strong> 이 도구는 HTML5 Canvas API를 사용합니다. 이미지를 캔버스에 그린 후 getImageData()로 모든 픽셀 데이터(RGBA 배열)를 가져옵니다. 1000x1000 이미지는 100만 개의 픽셀을 스캔합니다. 각 픽셀의 RGB 값을 HEX로 변환하고, 해시맵(Object)에 출현 빈도를 저장하여 빠르게 집계합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌈</span>
              <div>
                <strong className="text-gray-900">HSL 모델 (Hue, Saturation, Lightness):</strong> RGB 외에 HSL 모델도 자주 사용됩니다. Hue(색상)는 0-360도의 색상환, Saturation(채도)는 0-100%의 선명도, Lightness(명도)는 0-100%의 밝기입니다. 예: hsl(120, 100%, 50%)는 순수 초록입니다. HSL은 색상 조정이 직관적이라 디자이너들이 선호하지만, 이 도구는 웹 표준인 HEX를 출력합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔺</span>
              <div>
                <strong className="text-gray-900">색상 이론: 보색, 유사색, 삼각색:</strong> 색상환(Color Wheel)에서 정반대에 위치한 색을 보색(Complementary)이라 하며, 빨강-초록, 파랑-주황처럼 강한 대비를 만듭니다. 유사색(Analogous)은 인접한 색으로 조화롭고, 삼각색(Triadic)은 120도 간격의 세 색으로 균형감을 줍니다. 색상 추출 후 Adobe Color, Coolors 같은 도구로 조화로운 팔레트를 생성할 수 있습니다.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 투명도(Alpha)가 있는 PNG 이미지도 처리할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 네, 처리 가능합니다. 다만 투명한 부분은 배경색(흰색 또는 검정)과 합성되어 추출됩니다. Canvas에서 투명 픽셀은 알파 채널(A)이 0이며, RGBA 형식으로 저장됩니다. 완전히 투명한 픽셀을 제외하고 싶다면 알파 값이 일정 임계값 이상인 픽셀만 집계해야 합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 왜 10개만 추출되나요? 더 많은 색상을 보고 싶어요.</h3>
              <p className="text-gray-700">
                A. 일반적인 이미지는 수만 가지 미세하게 다른 색상을 포함합니다. 10개는 주요 색상을 파악하기에 적절한 수입니다. 더 많은 색상이 필요하면 코드를 수정하여 slice(0, 20) 또는 원하는 수로 변경할 수 있습니다. 하지만 너무 많으면 비슷한 색상들이 반복되어 혼란스럽습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 그라데이션이 많은 이미지는 어떻게 처리되나요?</h3>
              <p className="text-gray-700">
                A. 그라데이션은 수백 가지 중간 색상을 포함하므로, 각 색상의 빈도가 낮아집니다. 결과적으로 추출된 색상이 매우 다양하고 대표성이 떨어질 수 있습니다. 이런 경우 색상 양자화(Color Quantization) 알고리즘으로 비슷한 색을 묶어야 하지만, 이 도구는 단순 빈도 집계만 수행합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 추출 정확도를 높이려면 어떻게 해야 하나요?</h3>
              <p className="text-gray-700">
                A. K-means 클러스터링 같은 알고리즘을 사용하면 비슷한 색상들을 그룹화하여 더 의미 있는 색상 팔레트를 생성할 수 있습니다. Vibrant.js, Color Thief 같은 라이브러리는 이런 고급 알고리즘을 구현합니다. 하지만 단순 빈도 기반도 대부분의 경우 충분히 유용합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 대용량 고해상도 이미지도 빠르게 처리되나요?</h3>
              <p className="text-gray-700">
                A. 4000x3000 같은 고해상도 이미지는 1,200만 픽셀을 스캔해야 하므로 몇 초 걸릴 수 있습니다. 브라우저 성능에 따라 다르며, 모바일에서는 더 느릴 수 있습니다. 이미지를 축소(예: 800x600)하여 처리하면 속도가 빨라지고, 색상 추출 결과는 거의 동일합니다. Canvas의 drawImage()로 축소 그리기가 가능합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 이미지가 서버로 업로드되나요? 개인정보는 안전한가요?</h3>
              <p className="text-gray-700">
                A. 전혀 업로드되지 않습니다. 모든 처리가 브라우저 내부(클라이언트 사이드)에서 이루어집니다. FileReader API로 로컬 파일을 읽어 Canvas에서 처리하며, 네트워크 요청이 전혀 발생하지 않습니다. 기업 로고나 기밀 디자인 파일도 안전하게 사용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 숨겨진 캔버스 */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
