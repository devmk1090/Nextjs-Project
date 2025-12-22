"use client";

import { useState } from "react";

export default function RandomNumber() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(1);
  const [allowDuplicate, setAllowDuplicate] = useState<boolean>(true);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const generateRandomNumbers = () => {
    if (min >= max) {
      alert("최솟값은 최댓값보다 작아야 합니다.");
      return;
    }

    if (!allowDuplicate && count > max - min + 1) {
      alert("중복 없이 생성할 수 있는 최대 개수를 초과했습니다.");
      return;
    }

    const numbers: number[] = [];

    if (allowDuplicate) {
      // 중복 허용
      for (let i = 0; i < count; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.push(randomNum);
      }
    } else {
      // 중복 불가
      const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        numbers.push(available[randomIndex]);
        available.splice(randomIndex, 1);
      }
    }

    setResults(numbers);
    setHistory((prev) => [numbers, ...prev.slice(0, 9)]); // 최근 10개까지 저장
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(results.join(", "));
      alert("복사되었습니다!");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          랜덤 숫자 생성기
        </h1>

        {/* 설정 영역 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">최솟값</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">최댓값</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              생성 개수: {count}개
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={allowDuplicate}
                onChange={(e) => setAllowDuplicate(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-gray-700">중복 허용</span>
            </label>
          </div>

          <button
            onClick={generateRandomNumbers}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            생성하기
          </button>
        </div>

        {/* 결과 */}
        {results.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">결과</h2>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                복사
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {results.map((num, index) => (
                <div
                  key={index}
                  className="px-6 py-4 bg-white rounded-lg shadow-md border-2 border-blue-300"
                >
                  <span className="text-2xl font-bold text-blue-600">{num}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 히스토리 */}
        {history.length > 0 && (
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">생성 히스토리</h2>
            <div className="space-y-2">
              {history.map((nums, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded-lg border border-gray-300 text-gray-700"
                >
                  <span className="font-mono">{nums.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>범위 설정:</strong> 최솟값과 최댓값을 지정하여 원하는 범위의 난수를 생성합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>중복 허용:</strong> 체크 해제 시 중복 없는 숫자를 생성합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>히스토리:</strong> 최근 10개의 생성 결과가 자동 저장됩니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
