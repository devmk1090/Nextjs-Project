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

        {/* 가이드 */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
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
