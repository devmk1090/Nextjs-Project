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
      </div>
    </div>
  );
}
