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

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">주사위/동전 시뮬레이터란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              주사위와 동전 던지기는 수천 년 동안 인류가 사용해온 가장 오래된 무작위 결정 도구입니다.
              이 디지털 시뮬레이터는 실제 주사위와 동전을 던지는 것과 동일한 확률 분포를 재현하여,
              언제 어디서나 공정한 무작위 결과를 얻을 수 있게 해줍니다.
            </p>
            <p>
              주사위는 보드게임, TRPG(테이블탑 롤플레잉 게임), 교육용 확률 실험 등에 널리 사용됩니다.
              특히 D&amp;D(던전 앤 드래곤) 같은 TRPG에서는 4면체(D4)부터 20면체(D20)까지 다양한 주사위를 사용하며,
              각 주사위는 특정 능력치나 피해량을 결정하는 데 활용됩니다.
            </p>
            <p>
              동전 던지기는 50:50 확률의 대표적인 예시로, 공정한 의사결정이 필요할 때 사용됩니다.
              스포츠 경기의 선공/후공 결정, 두 가지 선택 중 하나를 골라야 할 때, 확률 이론 교육 등
              일상생활과 학문 분야 모두에서 활용되는 보편적인 도구입니다.
            </p>
            <p>
              우리의 시뮬레이터는 단순히 결과를 보여주는 것을 넘어, 히스토리 추적, 통계 분석, 애니메이션 효과를 제공하여
              확률 실험과 게임 플레이를 더욱 흥미롭고 교육적으로 만듭니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">활용 사례</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">1.</span>
              <div>
                <strong className="text-gray-900">보드게임 플레이:</strong> 윷놀이, 부루마블, 모노폴리 등 전통적인 보드게임을 온라인이나
                실물 주사위 없이 플레이할 수 있습니다. 여러 개의 주사위를 동시에 굴려 합계를 계산하는 게임에도 유용합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">2.</span>
              <div>
                <strong className="text-gray-900">TRPG 게임 마스터:</strong> D&amp;D, 패스파인더 같은 TRPG에서 D4, D6, D8, D10, D12, D20 주사위를 굴려
                공격 성공 여부, 피해량, 능력치 체크를 판정합니다. 예: "2D6+3" (6면체 주사위 2개 + 보너스 3)을 시뮬레이션할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">3.</span>
              <div>
                <strong className="text-gray-900">공정한 의사결정:</strong> 두 사람이 의견 충돌이 있을 때 동전 던지기로 공정하게 결정합니다.
                "오늘 저녁 메뉴는 치킨 vs 피자" 같은 일상적인 선택부터, 팀 프로젝트에서 역할 분담까지 활용할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">4.</span>
              <div>
                <strong className="text-gray-900">확률 통계 교육:</strong> 수학 시간에 "동전을 100번 던지면 앞면이 몇 번 나올까?" 같은 확률 실험을 진행합니다.
                히스토리 기능으로 실제 결과를 기록하고 이론적 확률(50%)과 비교하여 "큰 수의 법칙"을 체험할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">5.</span>
              <div>
                <strong className="text-gray-900">스포츠 경기 준비:</strong> 축구, 야구, 배구 등 모든 스포츠에서 경기 시작 전 동전 던지기로
                선공/후공, 코트 선택권을 결정합니다. 실물 동전이 없거나 분실했을 때 디지털 대안으로 사용할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">6.</span>
              <div>
                <strong className="text-gray-900">랜덤 이벤트 생성:</strong> 게임 개발자가 적 AI의 행동 패턴을 테스트할 때 사용합니다.
                예를 들어 D6를 굴려 1~2는 공격, 3~4는 방어, 5~6은 도주 같은 확률 기반 행동을 시뮬레이션합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">7.</span>
              <div>
                <strong className="text-gray-900">벌칙 게임 결정:</strong> 친구들과 게임할 때 벌칙 대상자를 공정하게 선정합니다.
                각자 숫자를 정하고 주사위를 굴려 나온 숫자의 사람이 벌칙을 받거나, 동전으로 토너먼트식 대결을 진행할 수 있습니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 확률의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">확률의 원리</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎲</span>
              <div>
                <strong className="text-gray-900">주사위의 확률 분포:</strong> 공정한 6면체 주사위(D6)에서 각 숫자(1~6)가 나올 확률은 모두 1/6 (약 16.67%)입니다.
                이는 "균등 분포(Uniform Distribution)"라고 하며, 모든 결과가 동일한 확률을 가집니다.
                주사위 2개를 굴릴 때는 합계가 7이 나올 확률이 가장 높은데(6/36 = 16.67%), 이는 (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) 총 6가지 경우가 있기 때문입니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🪙</span>
              <div>
                <strong className="text-gray-900">동전의 50:50 확률:</strong> 공정한 동전은 앞면과 뒷면이 나올 확률이 각각 1/2 (50%)입니다.
                하지만 100번 던진다고 해서 정확히 앞면 50번, 뒷면 50번이 나오는 것은 아닙니다.
                시행 횟수가 많아질수록 50%에 수렴하는 "큰 수의 법칙(Law of Large Numbers)"이 적용됩니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📊</span>
              <div>
                <strong className="text-gray-900">독립 시행의 개념:</strong> 이전에 무엇이 나왔든 다음 결과에는 영향을 주지 않습니다.
                동전에서 앞면이 연속 10번 나왔다고 해서 다음엔 뒷면이 나올 확률이 높아지지 않습니다. 여전히 50:50입니다.
                이를 "독립 시행(Independent Trials)"이라 하며, 많은 사람들이 착각하는 "도박사의 오류"를 피해야 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🎯</span>
              <div>
                <strong className="text-gray-900">기댓값(Expected Value):</strong> D6 주사위를 굴렸을 때 기댓값은 (1+2+3+4+5+6)/6 = 3.5입니다.
                실제로는 3.5가 나올 수 없지만, 여러 번 굴렸을 때 평균값이 3.5에 가까워집니다.
                TRPG에서 "2D6"의 기댓값은 7이므로 게임 밸런스 설계 시 중요한 지표가 됩니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔬</span>
              <div>
                <strong className="text-gray-900">시뮬레이션과 실제 주사위의 차이:</strong> 물리적 주사위는 무게 중심, 표면 마찰, 던지는 힘 등의 영향을 받아
                완벽하게 공정하지 않을 수 있습니다(카지노에서는 0.1g 단위로 무게를 맞춥니다).
                디지털 시뮬레이터는 Math.random()을 사용하여 이론적으로 완벽한 확률 분포를 제공하지만,
                진짜 주사위를 굴리는 물리적 재미는 없습니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 결과가 정말 무작위인가요? 조작되지 않았나요?</h3>
              <p className="text-gray-700">
                A. 네, 완전히 무작위입니다. JavaScript의 Math.random() 함수를 사용하여 생성되며,
                어떠한 조작이나 패턴도 없습니다. 실제 주사위나 동전과 동일한 확률 분포를 따릅니다.
                연속으로 같은 숫자가 나올 수도 있는데, 이는 버그가 아니라 확률의 자연스러운 현상입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. D4, D8, D20은 무엇인가요?</h3>
              <p className="text-gray-700">
                A. TRPG(테이블탑 롤플레잉 게임) 용어로, "D" 뒤의 숫자는 주사위 면 수를 의미합니다.
                D4는 4면체(피라미드 모양), D6는 일반 정육면체, D8은 8면체, D20은 20면체 주사위입니다.
                D&amp;D에서 D20은 행동 성공 여부를, D4~D12는 피해량을 결정할 때 주로 사용됩니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 주사위 여러 개를 동시에 굴릴 수 있나요?</h3>
              <p className="text-gray-700">
                A. 네, 최대 10개까지 동시에 굴릴 수 있습니다. 슬라이더로 개수를 조절하세요.
                결과 화면에는 각 주사위의 개별 값과 함께 합계가 표시됩니다.
                예를 들어 "3D6" (6면체 주사위 3개)처럼 TRPG 표기법을 구현할 수 있습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 앞면이 5번 연속 나왔는데 다음엔 뒷면이 나올 확률이 높나요?</h3>
              <p className="text-gray-700">
                A. 아니요, 여전히 50:50입니다. 이를 "도박사의 오류(Gambler's Fallacy)"라고 합니다.
                각 동전 던지기는 독립적인 사건이므로 이전 결과가 다음 결과에 영향을 주지 않습니다.
                앞면이 100번 연속 나와도 다음 던지기의 확률은 여전히 앞면 50%, 뒷면 50%입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 히스토리는 얼마나 저장되나요?</h3>
              <p className="text-gray-700">
                A. 최근 50회까지 자동으로 저장됩니다. 51번째 결과가 나오면 가장 오래된 결과가 사라집니다.
                히스토리는 브라우저 메모리에만 임시 저장되므로 새로고침하면 모두 사라집니다.
                확률 실험을 위해 데이터를 보관하고 싶다면 "초기화" 전에 별도로 기록해두세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 왜 0.5초 딜레이가 있나요?</h3>
              <p className="text-gray-700">
                A. 실제로 주사위를 굴리거나 동전을 던지는 느낌을 주기 위한 애니메이션 효과입니다.
                "굴리는 중..." 또는 "던지는 중..." 메시지가 표시되는 0.5초 동안 결과가 계산됩니다.
                이는 사용자 경험을 향상시키고, 결과가 즉시 나타나는 것보다 더 몰입감 있는 경험을 제공합니다.
              </p>
            </div>
          </div>
        </div>

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
