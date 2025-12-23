"use client";

import { useState } from "react";

export default function ColorPalette() {
  const [baseColor, setBaseColor] = useState<string>("#3B82F6");

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const { h, s, l } = hexToHsl(baseColor);

  const monochromatic = [
    hslToHex(h, s, Math.max(10, l - 30)),
    hslToHex(h, s, Math.max(10, l - 15)),
    baseColor,
    hslToHex(h, s, Math.min(90, l + 15)),
    hslToHex(h, s, Math.min(90, l + 30)),
  ];

  const analogous = [
    hslToHex((h - 30 + 360) % 360, s, l),
    hslToHex((h - 15 + 360) % 360, s, l),
    baseColor,
    hslToHex((h + 15) % 360, s, l),
    hslToHex((h + 30) % 360, s, l),
  ];

  const complementary = [
    baseColor,
    hslToHex((h + 180) % 360, s, l),
  ];

  const triadic = [
    baseColor,
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l),
  ];

  const tetradic = [
    baseColor,
    hslToHex((h + 90) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 270) % 360, s, l),
  ];

  const copyPalette = (colors: string[], name: string) => {
    const text = colors.join(", ");
    navigator.clipboard.writeText(text);
    alert(`${name} 팔레트가 복사되었습니다!`);
  };

  const ColorBox = ({ color }: { color: string }) => (
    <div className="flex-1">
      <div
        className="h-24 rounded-lg border-2 border-gray-300 cursor-pointer hover:scale-105 transition-transform"
        style={{ backgroundColor: color }}
        onClick={() => navigator.clipboard.writeText(color)}
      />
      <p className="text-center mt-2 font-mono text-sm">{color}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          컬러 팔레트 생성기
        </h1>

        {/* 기본 색상 선택 */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">기본 색상</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-32 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg font-mono text-lg"
            />
          </div>
        </div>

        {/* 단색 조화 */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">단색 조화 (Monochromatic)</h2>
            <button
              onClick={() => copyPalette(monochromatic, "단색 조화")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="flex gap-2">
            {monochromatic.map((color, i) => (
              <ColorBox key={i} color={color} />
            ))}
          </div>
        </div>

        {/* 유사 색상 */}
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">유사 색상 (Analogous)</h2>
            <button
              onClick={() => copyPalette(analogous, "유사 색상")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="flex gap-2">
            {analogous.map((color, i) => (
              <ColorBox key={i} color={color} />
            ))}
          </div>
        </div>

        {/* 보색 */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">보색 (Complementary)</h2>
            <button
              onClick={() => copyPalette(complementary, "보색")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="flex gap-2">
            {complementary.map((color, i) => (
              <ColorBox key={i} color={color} />
            ))}
          </div>
        </div>

        {/* 삼각 조화 */}
        <div className="mb-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">삼각 조화 (Triadic)</h2>
            <button
              onClick={() => copyPalette(triadic, "삼각 조화")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="flex gap-2">
            {triadic.map((color, i) => (
              <ColorBox key={i} color={color} />
            ))}
          </div>
        </div>

        {/* 사각 조화 */}
        <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">사각 조화 (Tetradic)</h2>
            <button
              onClick={() => copyPalette(tetradic, "사각 조화")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
            >
              복사
            </button>
          </div>
          <div className="flex gap-2">
            {tetradic.map((color, i) => (
              <ColorBox key={i} color={color} />
            ))}
          </div>
        </div>

        {/* 가이드 */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 조화 설명</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li><strong>단색 조화:</strong> 같은 색상의 밝기만 다른 조합. 깔끔하고 세련된 느낌</li>
            <li><strong>유사 색상:</strong> 색상환에서 인접한 색상들. 조화로운 느낌</li>
            <li><strong>보색:</strong> 색상환에서 정반대 위치. 강한 대비와 생동감</li>
            <li><strong>삼각 조화:</strong> 색상환에서 120° 간격. 균형잡힌 활기</li>
            <li><strong>사각 조화:</strong> 색상환에서 90° 간격. 풍부하고 다채로운 느낌</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
