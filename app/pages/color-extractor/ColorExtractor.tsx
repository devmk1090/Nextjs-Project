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

        {/* 숨겨진 캔버스 */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
