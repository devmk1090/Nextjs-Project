"use client";

import { useState } from "react";

export default function GradientGenerator() {
  const [color1, setColor1] = useState<string>("#3B82F6");
  const [color2, setColor2] = useState<string>("#8B5CF6");
  const [angle, setAngle] = useState<number>(90);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const getGradientCSS = () => {
    if (type === "linear") {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const getGradientStyle = () => {
    if (type === "linear") {
      return { background: `linear-gradient(${angle}deg, ${color1}, ${color2})` };
    } else {
      return { background: `radial-gradient(circle, ${color1}, ${color2})` };
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getGradientCSS());
      alert("CSS 코드가 복사되었습니다!");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  const presets = [
    { name: "일몰", c1: "#FF6B6B", c2: "#FFE66D", angle: 135 },
    { name: "바다", c1: "#00D4FF", c2: "#0099FF", angle: 180 },
    { name: "숲", c1: "#56AB2F", c2: "#A8E063", angle: 90 },
    { name: "보라", c1: "#667EEA", c2: "#764BA2", angle: 135 },
    { name: "핑크", c1: "#FF6A88", c2: "#FF99AC", angle: 45 },
    { name: "황금", c1: "#FFD700", c2: "#FF8C00", angle: 90 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          그라디언트 생성기
        </h1>

        {/* 미리보기 */}
        <div className="mb-8">
          <div className="w-full h-64 rounded-xl shadow-lg border-4 border-white" style={getGradientStyle()} />
        </div>

        {/* 타입 선택 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">그라디언트 타입</label>
          <div className="flex gap-3">
            <button
              onClick={() => setType("linear")}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                type === "linear" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              선형 (Linear)
            </button>
            <button
              onClick={() => setType("radial")}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                type === "radial" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              방사형 (Radial)
            </button>
          </div>
        </div>

        {/* 색상 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">시작 색상</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">종료 색상</label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg font-mono"
            />
          </div>
        </div>

        {/* 각도 (선형일 때만) */}
        {type === "linear" && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">각도: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[0, 90, 180, 270].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setAngle(deg)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CSS 코드 */}
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">CSS 코드</h2>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <pre className="bg-white p-4 rounded-lg border border-gray-300 overflow-x-auto font-mono text-sm">
            {getGradientCSS()}
          </pre>
        </div>

        {/* 프리셋 */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">프리셋</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setColor1(preset.c1);
                  setColor2(preset.c2);
                  setAngle(preset.angle);
                  setType("linear");
                }}
                className="h-20 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-all relative overflow-hidden"
                style={{ background: `linear-gradient(${preset.angle}deg, ${preset.c1}, ${preset.c2})` }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-shadow">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">그라디언트 생성기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              그라디언트(Gradient) 생성기는 두 가지 이상의 색상을 부드럽게 혼합한 그라데이션 효과를 자동으로 생성하고 CSS 코드로 출력하는 도구입니다. 그라디언트의 역사는 1990년대 초 Photoshop에서 시작되었으며, CSS3에서 2009년 linear-gradient와 radial-gradient가 표준화되면서 웹 디자인의 필수 요소가 되었습니다. 플랫 디자인(Flat Design) 트렌드를 지나 현대 웹은 다시 섬세한 그라디언트로 깊이감과 입체감을 표현합니다.
            </p>
            <p>
              디자인 트렌드는 시대에 따라 변합니다. 2010년대 초반 iOS 7과 Material Design의 플랫 디자인이 유행하며 단색이 지배했지만, 2020년대 들어 Glassmorphism(유리형태론), Neumorphism(뉴모피즘) 같은 새로운 디자인 언어가 등장하며 그라디언트가 다시 주목받고 있습니다. Instagram, Spotify, Stripe 같은 유명 브랜드들도 그라디언트를 적극 활용하여 현대적이고 역동적인 이미지를 구축합니다.
            </p>
            <p>
              이 도구는 선형 그라디언트(Linear Gradient)와 방사형 그라디언트(Radial Gradient) 두 가지 타입을 지원합니다. 선형은 한 방향으로 색이 변하며 각도 조절이 가능하고, 방사형은 중심에서 바깥으로 원형으로 색이 퍼집니다. CSS 코드를 자동 생성하므로 복잡한 문법을 외울 필요 없이 시각적으로 조정한 후 복사하여 바로 사용할 수 있습니다.
            </p>
            <p>
              색상 선택 도구(Color Picker)로 정확한 HEX 코드를 입력하거나 시각적으로 선택할 수 있으며, 6가지 프리셋(일몰, 바다, 숲, 보라, 핑크, 황금)을 제공하여 빠르게 트렌디한 그라디언트를 적용할 수 있습니다. 웹사이트 배경, 버튼, 카드, 로고, 소셜 미디어 포스트 등 다양한 용도로 활용됩니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">그라디언트 생성기 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 웹사이트 배경 디자인</h3>
              <p className="text-gray-700 text-sm">
                랜딩 페이지, 포트폴리오 사이트, 제품 소개 페이지의 배경에 그라디언트를 적용하여 시각적 임팩트를 높입니다. 단색 배경보다 역동적이고 현대적인 느낌을 주며, 특히 히어로 섹션(Hero Section)에 사용하면 방문자의 시선을 즉시 사로잡습니다. 예: 파랑에서 보라로 변하는 그라디언트는 테크 스타트업에서 자주 사용됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 버튼 및 CTA(Call-to-Action) 스타일링</h3>
              <p className="text-gray-700 text-sm">
                "회원가입", "구매하기", "무료 체험" 같은 중요한 버튼에 그라디언트를 적용하면 클릭률(CTR)이 향상됩니다. 단색 버튼보다 입체감이 있어 눈에 띄며, hover 효과와 결합하면 인터랙티브한 경험을 제공합니다. Instagram의 보라-핑크-주황 그라디언트 버튼이 대표적인 예입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 카드 및 컴포넌트 디자인</h3>
              <p className="text-gray-700 text-sm">
                상품 카드, 가격 테이블, 프로필 카드의 배경이나 테두리에 그라디언트를 적용하여 차별화된 디자인을 만듭니다. 특히 프리미엄 플랜이나 추천 상품을 강조할 때 그라디언트 테두리나 배경을 사용하면 사용자의 주목도가 높아집니다. Stripe의 가격 페이지가 좋은 예입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 로고 및 브랜드 아이덴티티</h3>
              <p className="text-gray-700 text-sm">
                브랜드 로고나 아이콘에 그라디언트를 적용하여 현대적이고 역동적인 이미지를 구축합니다. 단색 로고보다 깊이감과 고급스러움을 표현할 수 있으며, Firefox(주황-빨강), Asana(핑크-주황-노랑), Messenger(파랑-보라-핑크) 같은 유명 브랜드들이 그라디언트 로고를 사용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. 소셜 미디어 포스트 및 썸네일</h3>
              <p className="text-gray-700 text-sm">
                Instagram 스토리, YouTube 썸네일, 블로그 포스트 헤더 이미지에 그라디언트를 사용하여 시선을 사로잡습니다. Canva, Figma에서 그라디언트 배경을 만들 때 이 도구로 CSS 코드를 생성한 후 색상 값을 참고할 수 있습니다. 일몰 그라디언트(주황-핑크)는 감성적인 느낌을, 바다 그라디언트(파랑-청록)는 시원한 느낌을 전달합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 모바일 앱 UI/UX 디자인</h3>
              <p className="text-gray-700 text-sm">
                iOS와 Android 앱의 상단 내비게이션 바, 탭 바, 스플래시 스크린에 그라디언트를 적용하여 앱의 개성을 표현합니다. React Native, Flutter에서 CSS 코드를 변환하여 사용할 수 있으며, 특히 음악 앱(Spotify, Apple Music)이나 피트니스 앱에서 그라디언트를 적극 활용하여 에너지 넘치는 분위기를 조성합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 원리 섹션 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">그라디언트의 원리와 CSS 기술</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📐</span>
              <div>
                <strong className="text-gray-900">Linear Gradient (선형 그라디언트):</strong> 한 방향으로 색상이 변합니다. 문법은 linear-gradient(각도, 시작색, 종료색)입니다. 각도는 0deg(위에서 아래), 90deg(왼쪽에서 오른쪽), 180deg(아래에서 위), 270deg(오른쪽에서 왼쪽)처럼 시계 방향으로 회전합니다. 대각선은 45deg, 135deg, 225deg, 315deg를 사용합니다. 두 개 이상의 색상도 가능합니다: linear-gradient(90deg, red, yellow, green).
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">⭕</span>
              <div>
                <strong className="text-gray-900">Radial Gradient (방사형 그라디언트):</strong> 중심에서 바깥으로 원형 또는 타원형으로 색상이 퍼집니다. 문법은 radial-gradient(모양, 시작색, 종료색)입니다. 모양은 circle(정원) 또는 ellipse(타원)이며, 기본값은 ellipse입니다. 중심 위치도 조절 가능합니다: radial-gradient(circle at top left, blue, green)처럼 at 키워드로 지정합니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎨</span>
              <div>
                <strong className="text-gray-900">색 공간 보간 (Color Interpolation):</strong> 브라우저는 두 색상 사이의 중간 색을 RGB 색 공간에서 계산합니다. 빨강(#FF0000)과 파랑(#0000FF) 사이는 보라(#800080)를 거칩니다. 하지만 HSL 색 공간에서 보간하면 다른 색상이 나옵니다. CSS Color Level 4에서는 in hsl, in lch 같은 색 공간 지정이 가능하지만, 브라우저 지원이 제한적입니다.
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌈</span>
              <div>
                <strong className="text-gray-900">색상 조합 이론:</strong> 아름다운 그라디언트를 만들려면 색상 이론을 이해해야 합니다. 유사색(Analogous)은 색상환에서 인접한 색으로 조화롭습니다(파랑-청록-초록). 보색(Complementary)은 정반대 색으로 강렬한 대비를 만듭니다(주황-파랑). 단색(Monochromatic)은 같은 색의 밝기만 다르게 하여 세련된 느낌을 줍니다(진한 파랑-연한 파랑).
              </div>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">💻</span>
              <div>
                <strong className="text-gray-900">브라우저 호환성 및 fallback:</strong> CSS 그라디언트는 IE 10 이상, 모든 현대 브라우저에서 지원됩니다. 하지만 구형 브라우저를 위해 fallback 색상을 지정해야 합니다: background: #3B82F6; background: linear-gradient(90deg, #3B82F6, #8B5CF6); 첫 줄은 그라디언트를 지원하지 않는 브라우저를 위한 단색 배경입니다. 벤더 프리픽스(-webkit-, -moz-)는 2023년 기준 불필요합니다.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 투명도(Opacity)가 있는 그라디언트도 만들 수 있나요?</h3>
              <p className="text-gray-700">
                네, RGBA 색상을 사용하면 됩니다. 예: linear-gradient(90deg, rgba(59, 130, 246, 1), rgba(59, 130, 246, 0))는 파랑에서 투명으로 변합니다. 이 도구는 HEX 코드만 지원하지만, 생성된 코드를 수동으로 RGBA로 변환하면 됩니다. 온라인 HEX to RGBA 변환기를 사용하거나, rgba(R, G, B, 알파) 형식으로 직접 입력하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 세 가지 이상의 색상을 사용할 수 있나요?</h3>
              <p className="text-gray-700">
                이 도구는 두 색상만 지원하지만, CSS에서는 무제한 색상을 사용할 수 있습니다. 예: linear-gradient(90deg, red, yellow, green, blue)는 빨강-노랑-초록-파랑으로 변합니다. 각 색상의 위치도 지정 가능합니다: linear-gradient(90deg, red 0%, yellow 30%, green 70%, blue 100%). 이렇게 하면 색 변화 속도를 조절할 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 반복되는 그라디언트(Repeating Gradient)도 만들 수 있나요?</h3>
              <p className="text-gray-700">
                repeating-linear-gradient() 또는 repeating-radial-gradient()를 사용하면 됩니다. 예: repeating-linear-gradient(45deg, red 0px, red 10px, blue 10px, blue 20px)는 빨강-파랑 줄무늬를 반복합니다. 스트라이프 패턴이나 진행률 바(Progress Bar)에 유용합니다. 하지만 이 도구는 기본 그라디언트만 지원하므로 코드를 수동으로 수정해야 합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 그라디언트가 이미지처럼 다운로드할 수 있나요?</h3>
              <p className="text-gray-700">
                이 도구는 CSS 코드만 생성합니다. 이미지로 저장하려면 브라우저 개발자 도구(F12)에서 미리보기 영역을 우클릭 → "이미지로 저장" 또는 스크린샷 도구를 사용하세요. 또는 Canvas API나 온라인 "CSS to Image" 변환기를 사용하여 PNG/JPG로 변환할 수 있습니다. Figma, Photoshop에서는 CSS 그라디언트를 직접 가져올 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 텍스트에 그라디언트를 적용할 수 있나요?</h3>
              <p className="text-gray-700">
                네, background-clip: text와 -webkit-background-clip: text를 사용하면 됩니다. 예: background: linear-gradient(90deg, red, blue); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent; 이렇게 하면 텍스트에 그라디언트가 적용됩니다. 이 페이지 제목("그라디언트 생성기")도 이 기법을 사용합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 성능 문제는 없나요? 그라디언트가 느린가요?</h3>
              <p className="text-gray-700">
                CSS 그라디언트는 이미지보다 가볍고 빠릅니다. 네트워크 요청이 없고, 벡터 기반이라 어떤 화면 크기에도 선명합니다. 하지만 복잡한 그라디언트(10개 이상 색상, 반복 패턴)를 많이 사용하면 GPU 렌더링 부하가 있을 수 있습니다. 모바일에서는 단순한 그라디언트를 권장합니다. 대부분의 경우 성능 문제는 없습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
