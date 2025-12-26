"use client";

import { useState, useEffect } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState<string>("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  // HEX를 RGB로 변환
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // RGB를 HEX로 변환
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  // RGB를 HSL로 변환
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // HSL을 RGB로 변환
  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };

  // HEX 변경
  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbValue = hexToRgb(value);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    }
  };

  // RGB 변경
  const handleRgbChange = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  // HSL 변경
  const handleHslChange = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const rgbValue = hslToRgb(h, s, l);
    setRgb(rgbValue);
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type} 복사되었습니다!`);
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          색상 변환기
        </h1>

        {/* 색상 미리보기 */}
        <div className="mb-8">
          <div
            className="w-full h-48 rounded-xl shadow-lg border-4 border-white"
            style={{ backgroundColor: hex }}
          />
          <p className="text-center mt-4 text-2xl font-bold text-gray-800">{hex}</p>
        </div>

        {/* HEX */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">HEX</h2>
            <button
              onClick={() => copyToClipboard(hex, "HEX")}
              className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
          />
          <input
            type="color"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full h-12 mt-2 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
        </div>

        {/* RGB */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">RGB</h2>
            <button
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
              className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">R (Red)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => handleRgbChange(Number(e.target.value), rgb.g, rgb.b)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="range"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => handleRgbChange(Number(e.target.value), rgb.g, rgb.b)}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">G (Green)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => handleRgbChange(rgb.r, Number(e.target.value), rgb.b)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="range"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => handleRgbChange(rgb.r, Number(e.target.value), rgb.b)}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">B (Blue)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => handleRgbChange(rgb.r, rgb.g, Number(e.target.value))}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="range"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => handleRgbChange(rgb.r, rgb.g, Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-lg">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
          </p>
        </div>

        {/* HSL */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">HSL</h2>
            <button
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
              className="px-4 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">H (Hue)</label>
              <input
                type="number"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => handleHslChange(Number(e.target.value), hsl.s, hsl.l)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="range"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => handleHslChange(Number(e.target.value), hsl.s, hsl.l)}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">S (Saturation)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => handleHslChange(hsl.h, Number(e.target.value), hsl.l)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => handleHslChange(hsl.h, Number(e.target.value), hsl.l)}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">L (Lightness)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => handleHslChange(hsl.h, hsl.s, Number(e.target.value))}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => handleHslChange(hsl.h, hsl.s, Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-lg">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </p>
        </div>

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 변환기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              색상 변환기는 HEX, RGB, HSL 등 다양한 색상 표현 방식을 상호 변환해주는 도구입니다. 디지털 환경에서 동일한 색상을 다양한 형식으로 사용할 수 있도록 돕습니다. 웹 개발, 그래픽 디자인, UI/UX 작업 등에서 필수적으로 사용되는 도구입니다.
            </p>
            <p>
              현대의 디지털 색상 체계는 다양한 역사적 배경과 용도에 따라 여러 형식이 존재합니다. HEX는 1990년대 웹 표준으로 자리잡았고, RGB는 모니터와 카메라의 물리적 원리를 반영하며, HSL은 인간의 색 인지에 더 가까운 직관적인 방식입니다. 각 형식은 특정 상황에서 장단점을 가지고 있습니다.
            </p>
            <p>
              디자이너는 HSL로 색조를 조정하고, 개발자는 HEX로 코드에 적용하며, 그래픽 소프트웨어는 RGB로 픽셀을 표현합니다. 이처럼 다양한 형식 간의 변환이 필요한 순간이 끊임없이 발생하기 때문에 색상 변환 도구는 창작 작업의 필수 도구가 되었습니다.
            </p>
            <p>
              이 도구는 실시간으로 색상을 변환하여 즉시 결과를 확인할 수 있으며, 슬라이더와 숫자 입력을 통해 정밀한 색상 조정이 가능합니다. 또한 클릭 한 번으로 코드를 복사하여 바로 프로젝트에 적용할 수 있어 작업 효율을 크게 높여줍니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 변환기 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 웹 개발 (CSS 스타일링)</h3>
              <p className="text-gray-700 text-sm">
                CSS에서는 HEX, RGB, HSL을 모두 사용할 수 있지만, 프로젝트 컨벤션이나 브라우저 호환성에 따라 특정 형식을 선호할 수 있습니다. 디자이너가 전달한 색상 코드를 프로젝트 형식에 맞게 변환하거나, RGBA/HSLA로 투명도를 추가할 때 기준 색상을 찾는 용도로 활용됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 디자인 시스템 구축</h3>
              <p className="text-gray-700 text-sm">
                디자인 시스템에서 색상 팔레트를 정의할 때, 기본 색상을 HSL로 관리하면 명도와 채도를 체계적으로 조정하여 변형 색상(lighter, darker)을 쉽게 만들 수 있습니다. 이를 다시 HEX나 RGB로 변환하여 개발 문서에 제공합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 그래픽 툴 간 협업</h3>
              <p className="text-gray-700 text-sm">
                Photoshop, Illustrator, Figma 등 각 툴마다 선호하는 색상 입력 방식이 다릅니다. 한 툴에서 추출한 RGB 값을 다른 툴에서 HEX로 입력해야 하는 경우, 색상 변환기를 통해 정확하게 동일한 색상을 재현할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 접근성 (Accessibility) 검증</h3>
              <p className="text-gray-700 text-sm">
                WCAG 기준에 따라 텍스트와 배경의 명도 대비를 확인할 때, HSL의 L(명도) 값을 조정하여 적절한 대비를 찾고, 이를 HEX로 변환하여 코드에 적용합니다. 색상 변환기는 이러한 반복 작업을 빠르게 처리할 수 있게 합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. 브랜드 컬러 관리</h3>
              <p className="text-gray-700 text-sm">
                브랜드 가이드라인에서 제공하는 색상을 다양한 매체에 적용할 때, 인쇄물(CMYK), 웹(HEX), 영상(RGB) 등 각 형식으로 변환하여 일관된 색상을 유지합니다. 색상 변환기는 디지털 형식 간의 정확한 변환을 보장합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 다크 모드 구현</h3>
              <p className="text-gray-700 text-sm">
                라이트 모드의 색상을 다크 모드에 맞게 조정할 때, HSL 형식으로 변환하여 명도(L)를 반전시키거나 채도(S)를 조정한 후, 다시 HEX나 RGB로 변환하여 적용합니다. 이 과정에서 색상 변환기가 반복적으로 사용됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">7. 프로그래밍 (게임, 데이터 시각화)</h3>
              <p className="text-gray-700 text-sm">
                Canvas API, WebGL, D3.js 등에서 색상을 동적으로 생성하거나 조작할 때, RGB와 HSL 간 변환이 필수입니다. 예를 들어 데이터 값에 따라 색조를 변경하는 히트맵을 만들 때 HSL을 사용하고, 최종 렌더링은 RGB로 수행합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 색상 형식의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 형식의 원리와 특징</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">HEX (#RRGGBB)</h3>
              <p className="text-gray-700 text-sm">
                HEX는 16진수(Hexadecimal) 표기법을 사용하여 RGB 값을 압축적으로 표현합니다. #을 시작으로 RR(빨강), GG(초록), BB(파랑) 각 2자리씩 총 6자리로 구성되며, 각 자리는 00(0)부터 FF(255)까지의 값을 가집니다. 예를 들어 #FF0000은 순수한 빨강색입니다. 웹 개발에서 가장 널리 사용되며, 짧고 명확하여 코드에서 가독성이 좋습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">RGB (Red, Green, Blue)</h3>
              <p className="text-gray-700 text-sm">
                RGB는 디지털 디스플레이의 물리적 구조를 그대로 반영하는 방식입니다. 모니터는 빨강, 초록, 파랑 세 가지 색의 빛을 조합하여 모든 색을 표현합니다(가산 혼합). 각 채널은 0~255의 정수 값을 가지며, rgb(0, 0, 0)은 검정, rgb(255, 255, 255)는 흰색입니다. 이미지 처리, 게임 엔진, Canvas API 등에서 직접적으로 사용됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">HSL (Hue, Saturation, Lightness)</h3>
              <p className="text-gray-700 text-sm">
                HSL은 인간이 색을 인지하는 방식에 더 가까운 모델입니다. Hue(색조)는 0~360도의 색상환에서 색의 종류를, Saturation(채도)는 0~100%로 색의 선명도를, Lightness(명도)는 0~100%로 밝기를 나타냅니다. 예를 들어 hsl(0, 100%, 50%)는 순수한 빨강색이며, 명도를 75%로 올리면 분홍색이 됩니다. 색상 변형을 직관적으로 조정할 수 있어 디자인 작업에 매우 유용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">투명도 (Alpha Channel)</h3>
              <p className="text-gray-700 text-sm">
                각 형식에 투명도를 추가할 수 있습니다. HEX는 8자리(#RRGGBBAA)로 확장되며, RGB는 rgba(r, g, b, a), HSL은 hsla(h, s, l, a) 형태가 됩니다. Alpha 값은 0(완전 투명)부터 1(완전 불투명) 사이의 소수로 표현됩니다. 이는 오버레이, 그림자, 블렌딩 효과에서 필수적으로 사용됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">변환 시 주의사항</h3>
              <p className="text-gray-700 text-sm">
                RGB와 HEX 간 변환은 단순한 진법 변환이지만, HSL과 RGB 간 변환은 복잡한 수학적 계산이 필요합니다. 또한 부동소수점 연산 과정에서 미세한 오차가 발생할 수 있으며, 반올림으로 인해 완벽하게 역변환되지 않을 수 있습니다. 예를 들어 RGB → HSL → RGB 변환 시 1~2 정도의 차이가 발생할 수 있으나, 이는 육안으로 구분이 불가능한 수준입니다.
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
                HEX, RGB, HSL 중 어떤 형식을 사용하는 것이 좋나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 용도에 따라 다릅니다. 웹 개발에서는 간결한 HEX가 일반적이지만, 투명도가 필요하면 RGBA를, 색상 조정이 많으면 HSL을 사용하는 것이 편리합니다. CSS는 세 가지 모두 지원하므로, 팀 컨벤션이나 개인 선호도에 따라 선택하면 됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                HSL의 Hue(색조) 값은 왜 360도인가요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> HSL의 색조는 색상환(Color Wheel)을 기반으로 합니다. 색상환은 원형 구조로, 0도와 360도는 같은 빨강색을 가리킵니다. 120도는 초록, 240도는 파랑을 나타내며, 360도 체계를 사용하면 색상 간의 각도 관계를 직관적으로 계산할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                RGB를 HSL로 변환하면 값이 정확히 복원되나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 대부분의 경우 거의 정확하지만, 부동소수점 연산과 반올림으로 인해 1~2 정도의 미세한 차이가 발생할 수 있습니다. 예를 들어 rgb(100, 150, 200)을 HSL로 변환한 후 다시 RGB로 변환하면 rgb(99, 150, 201)이 될 수 있으나, 이는 육안으로 구분이 불가능합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                HEX 색상 코드에서 3자리 형식도 있나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 네, #RGB 형식(3자리)은 각 자리를 두 번 반복한 것과 같습니다. 예를 들어 #F0A는 #FF00AA와 동일합니다. 이는 간단한 색상을 더 짧게 표현할 때 사용되지만, 정밀한 색상 표현에는 6자리 형식을 사용하는 것이 좋습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                모든 브라우저에서 HSL을 지원하나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 현대의 모든 주요 브라우저(Chrome, Firefox, Safari, Edge)는 HSL을 완전히 지원합니다. IE 9 이상도 지원하므로, 특별히 구형 브라우저를 지원해야 하는 경우가 아니라면 안전하게 사용할 수 있습니다. HSLA(투명도 포함)도 동일하게 지원됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                보색(Complementary Color)을 찾으려면 어떻게 하나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 보색은 색상환에서 정반대편에 위치한 색입니다. HSL 형식에서 Hue 값에 180을 더하거나 빼면 됩니다(360을 초과하면 360을 뺍니다). 예를 들어 hsl(30, 100%, 50%) 주황색의 보색은 hsl(210, 100%, 50%) 파랑색입니다. 이 방법으로 조화로운 색상 조합을 쉽게 만들 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 형식 설명</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong className="text-blue-600">HEX:</strong> 16진수 색상 코드. 웹에서 가장 많이 사용됨. #RRGGBB 형식
            </div>
            <div>
              <strong className="text-green-600">RGB:</strong> Red, Green, Blue의 조합. 0-255 범위. rgb(r, g, b) 형식
            </div>
            <div>
              <strong className="text-purple-600">HSL:</strong> Hue(색조), Saturation(채도), Lightness(명도). 직관적인 색상 조정 가능
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
