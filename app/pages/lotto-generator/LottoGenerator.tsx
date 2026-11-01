"use client";

import { useState } from "react";

type LottoSet = {
  numbers: number[];
  timestamp: Date;
};

export default function LottoGenerator() {
  const [gameCount, setGameCount] = useState<number>(5);
  const [excludeNumbers, setExcludeNumbers] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<string>("");
  const [results, setResults] = useState<LottoSet[]>([]);
  const [favorites, setFavorites] = useState<LottoSet[]>([]);

  const generateLotto = () => {
    const exclude = excludeNumbers
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    const include = includeNumbers
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    if (include.length > 6) {
      alert("포함 번호는 최대 6개까지 지정할 수 있습니다.");
      return;
    }

    // 중복 체크
    const duplicates = include.filter((n) => exclude.includes(n));
    if (duplicates.length > 0) {
      alert("포함 번호와 제외 번호에 중복이 있습니다.");
      return;
    }

    const lottoSets: LottoSet[] = [];

    for (let i = 0; i < gameCount; i++) {
      // 사용 가능한 번호 풀 생성
      let availableNumbers = Array.from({ length: 45 }, (_, i) => i + 1).filter(
        (n) => !exclude.includes(n)
      );

      const numbers: number[] = [...include];

      // 나머지 번호를 랜덤으로 선택
      const needed = 6 - include.length;
      availableNumbers = availableNumbers.filter((n) => !include.includes(n));

      for (let j = 0; j < needed; j++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        numbers.push(availableNumbers[randomIndex]);
        availableNumbers.splice(randomIndex, 1);
      }

      // 정렬
      numbers.sort((a, b) => a - b);

      lottoSets.push({
        numbers,
        timestamp: new Date(),
      });
    }

    setResults(lottoSets);
  };

  const addToFavorites = (lottoSet: LottoSet) => {
    if (favorites.some((fav) => JSON.stringify(fav.numbers) === JSON.stringify(lottoSet.numbers))) {
      alert("이미 즐겨찾기에 추가된 번호입니다.");
      return;
    }
    setFavorites([...favorites, lottoSet]);
  };

  const removeFromFavorites = (index: number) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const copyToClipboard = async (numbers: number[]) => {
    try {
      await navigator.clipboard.writeText(numbers.join(", "));
      alert("복사되었습니다!");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  const getNumberColor = (num: number) => {
    if (num <= 10) return "bg-yellow-400 text-white";
    if (num <= 20) return "bg-blue-400 text-white";
    if (num <= 30) return "bg-red-400 text-white";
    if (num <= 40) return "bg-gray-600 text-white";
    return "bg-green-500 text-white";
  };

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink mb-6">
          로또 번호 생성기
        </h1>

        {/* 설정 영역 */}
        <div className="mb-8 p-6 bg-canvas rounded-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              게임 수: {gameCount}게임
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={gameCount}
              onChange={(e) => setGameCount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              포함할 번호 (쉼표로 구분, 최대 6개)
            </label>
            <input
              type="text"
              value={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.value)}
              placeholder="예: 7, 13, 21"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              제외할 번호 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={excludeNumbers}
              onChange={(e) => setExcludeNumbers(e.target.value)}
              placeholder="예: 4, 14, 24"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <button
            onClick={generateLotto}
            className="w-full px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-hover transition-all hover:shadow-md"
          >
            번호 생성하기
          </button>
        </div>

        {/* 결과 */}
        {results.length > 0 && (
          <div className="mb-8 bg-orange-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">생성된 번호</h2>
            <div className="space-y-4">
              {results.map((lottoSet, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-700">
                      {String.fromCharCode(65 + index)} 게임
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(lottoSet.numbers)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                      >
                        복사
                      </button>
                      <button
                        onClick={() => addToFavorites(lottoSet)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                      >
                        즐겨찾기
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {lottoSet.numbers.map((num, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 flex items-center justify-center rounded-full ${getNumberColor(
                          num
                        )} font-bold text-lg `}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 즐겨찾기 */}
        {favorites.length > 0 && (
          <div className="mb-8 bg-canvas rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">즐겨찾기</h2>
            <div className="space-y-4">
              {favorites.map((lottoSet, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-700">즐겨찾기 {index + 1}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(lottoSet.numbers)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                      >
                        복사
                      </button>
                      <button
                        onClick={() => removeFromFavorites(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {lottoSet.numbers.map((num, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 flex items-center justify-center rounded-full ${getNumberColor(
                          num
                        )} font-bold text-lg `}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 가이드 */}
        <div className="bg-canvas rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>번호 범위:</strong> 1~45 사이의 숫자 중 6개를 중복 없이 생성합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>포함 번호:</strong> 반드시 포함되어야 할 번호를 지정할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>제외 번호:</strong> 생성에서 제외할 번호를 지정할 수 있습니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>색상 구분:</strong> 1~10(노랑), 11~20(파랑), 21~30(빨강), 31~40(회색), 41~45(초록)
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>즐겨찾기:</strong> 마음에 드는 번호를 저장하여 나중에 다시 확인할 수 있습니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
