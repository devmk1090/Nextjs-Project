"use client";

import { useState } from "react";

type ResultType = {
  type: "dice" | "coin";
  value: number | string;
  timestamp: Date;
};

export default function DiceCoin() {
  const [diceCount, setDiceCount] = useState<number>(1);
  const [diceSides, setDiceSides] = useState<number>(6);
  const [coinCount, setCoinCount] = useState<number>(1);
  const [results, setResults] = useState<number[] | string[]>([]);
  const [statistics, setStatistics] = useState<{ [key: string]: number }>({});
  const [history, setHistory] = useState<ResultType[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = () => {
    setIsRolling(true);

    // 애니메이션 효과
    setTimeout(() => {
      const diceResults: number[] = [];
      for (let i = 0; i < diceCount; i++) {
        const result = Math.floor(Math.random() * diceSides) + 1;
        diceResults.push(result);
      }

      setResults(diceResults);

      // 통계 업데이트
      const stats: { [key: string]: number } = {};
      diceResults.forEach((result) => {
        stats[result] = (stats[result] || 0) + 1;
      });
      setStatistics(stats);

      // 히스토리 추가
      diceResults.forEach((result) => {
        setHistory((prev) => [
          { type: "dice", value: result, timestamp: new Date() },
          ...prev.slice(0, 49),
        ]);
      });

      setIsRolling(false);
    }, 500);
  };

  const flipCoin = () => {
    setIsRolling(true);

    setTimeout(() => {
      const coinResults: string[] = [];
      for (let i = 0; i < coinCount; i++) {
        const result = Math.random() < 0.5 ? "앞면" : "뒷면";
        coinResults.push(result);
      }

      setResults(coinResults);

      // 통계 업데이트
      const stats: { [key: string]: number } = {};
      coinResults.forEach((result) => {
        stats[result] = (stats[result] || 0) + 1;
      });
      setStatistics(stats);

      // 히스토리 추가
      coinResults.forEach((result) => {
        setHistory((prev) => [
          { type: "coin", value: result, timestamp: new Date() },
          ...prev.slice(0, 49),
        ]);
      });

      setIsRolling(false);
    }, 500);
  };

  const resetHistory = () => {
    setHistory([]);
    setResults([]);
    setStatistics({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          주사위/동전 던지기
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 주사위 섹션 */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎲 주사위</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                주사위 면 수
              </label>
              <select
                value={diceSides}
                onChange={(e) => setDiceSides(Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={4}>4면체 (D4)</option>
                <option value={6}>6면체 (D6)</option>
                <option value={8}>8면체 (D8)</option>
                <option value={10}>10면체 (D10)</option>
                <option value={12}>12면체 (D12)</option>
                <option value={20}>20면체 (D20)</option>
                <option value={100}>100면체 (D100)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                개수: {diceCount}개
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={diceCount}
                onChange={(e) => setDiceCount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isRolling ? "굴리는 중..." : "주사위 굴리기"}
            </button>
          </div>

          {/* 동전 섹션 */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🪙 동전</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                개수: {coinCount}개
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={coinCount}
                onChange={(e) => setCoinCount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={flipCoin}
              disabled={isRolling}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 mt-20"
            >
              {isRolling ? "던지는 중..." : "동전 던지기"}
            </button>
          </div>
        </div>

        {/* 결과 */}
        {results.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">결과</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-lg border-2 border-blue-300 transform transition-transform hover:scale-110"
                >
                  <span className="text-3xl font-bold text-blue-600">{result}</span>
                </div>
              ))}
            </div>

            {/* 통계 */}
            {Object.keys(statistics).length > 0 && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300">
                <h3 className="font-bold text-gray-800 mb-2">이번 결과 통계</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(statistics).map(([key, value]) => (
                    <div key={key} className="px-3 py-1 bg-blue-100 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">
                        {key}: {value}회
                      </span>
                    </div>
                  ))}
                </div>
                {typeof results[0] === "number" && results.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    합계: <span className="font-bold">{(results as number[]).reduce((a, b) => a + b, 0)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 히스토리 */}
        {history.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">전체 히스토리</h2>
              <button
                onClick={resetHistory}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
              >
                초기화
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-64 overflow-y-auto">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded-lg border border-gray-300 text-center"
                >
                  <div className="text-xs text-gray-500 mb-1">
                    {item.type === "dice" ? "🎲" : "🪙"}
                  </div>
                  <div className="text-lg font-bold text-blue-600">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              총 {history.length}회 시행
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
                <strong>주사위:</strong> 4, 6, 8, 10, 12, 20, 100면체 지원. 보드게임, TRPG에 활용.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>동전:</strong> 앞면/뒷면을 무작위로 결정. 의사결정, 게임에 활용.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>히스토리:</strong> 최근 50회까지 자동 저장. 확률 실험에 활용 가능.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
