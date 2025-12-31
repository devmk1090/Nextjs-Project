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

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">랜덤 숫자 생성기란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              랜덤 숫자 생성기는 지정한 범위 내에서 예측할 수 없는 무작위 숫자를 만들어내는 도구입니다.
              컴퓨터는 완전한 무작위를 만들 수 없기 때문에 "의사 난수(Pseudo-random number)"를 생성하는데,
              이는 복잡한 수학 알고리즘을 통해 실제 무작위와 거의 구별할 수 없는 숫자를 만들어냅니다.
            </p>
            <p>
              JavaScript의 Math.random() 함수는 0 이상 1 미만의 부동소수점 난수를 반환합니다.
              이 도구는 이 값을 사용자가 지정한 범위(예: 1~100)로 변환하여 실용적인 정수 난수를 제공합니다.
              시드(Seed) 값에 기반하여 생성되기 때문에 이론적으로는 예측 가능하지만, 일반적인 용도로는 충분히 무작위적입니다.
            </p>
            <p>
              난수는 일상생활과 프로그래밍에서 매우 광범위하게 활용됩니다.
              추첨, 게임, 통계 샘플링, 시뮬레이션, A/B 테스트, 보안 코드 생성 등 공정하고 예측 불가능한 결과가 필요한
              모든 상황에서 필수적인 도구입니다.
            </p>
            <p>
              우리의 랜덤 숫자 생성기는 단순히 숫자를 만드는 것을 넘어, 중복 허용/불허 옵션, 여러 개 동시 생성,
              히스토리 저장, 복사 기능까지 제공하여 다양한 상황에서 편리하게 사용할 수 있습니다.
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
                <strong className="text-gray-900">추첨/경품 당첨자 선정:</strong> 1부터 100까지 참가자 번호가 있을 때,
                공정한 무작위 추첨으로 당첨자를 선정할 수 있습니다. 중복 불허 옵션으로 1등, 2등, 3등을 동시에 뽑을 수도 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">2.</span>
              <div>
                <strong className="text-gray-900">게임 개발:</strong> RPG 게임에서 몬스터 출현(1~100 확률), 크리티컬 히트 판정,
                아이템 드롭 확률, 적의 공격력 범위(80~120) 등 다양한 게임 메커니즘에 난수가 활용됩니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">3.</span>
              <div>
                <strong className="text-gray-900">통계 샘플링:</strong> 전체 1000명 중에서 무작위로 50명을 선정하여 설문조사를 진행할 때,
                편향 없는 표본을 추출하기 위해 난수 생성기를 사용합니다. 중복 불허로 같은 사람이 두 번 선정되지 않도록 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">4.</span>
              <div>
                <strong className="text-gray-900">보안 코드 생성:</strong> 간단한 인증번호(예: 6자리 숫자 000000~999999)를 생성할 때 사용합니다.
                단, 암호학적으로 안전한 보안이 필요한 경우에는 crypto.getRandomValues() 같은 보안 전용 난수 생성기를 사용해야 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">5.</span>
              <div>
                <strong className="text-gray-900">A/B 테스트 그룹 분배:</strong> 웹사이트 방문자를 무작위로 A그룹(기존 디자인)과 B그룹(새 디자인)으로
                나눌 때 사용합니다. 각 방문자에게 1~100 난수를 할당하여 1~50은 A그룹, 51~100은 B그룹으로 배정합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">6.</span>
              <div>
                <strong className="text-gray-900">시뮬레이션 실험:</strong> 몬테카를로 시뮬레이션처럼 수천~수만 번의 무작위 시도를 통해
                복잡한 확률 문제를 해결할 때 사용합니다. 예를 들어 동전을 10000번 던졌을 때의 통계를 확인할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-2 mt-1">7.</span>
              <div>
                <strong className="text-gray-900">교육용 문제 생성:</strong> 수학 문제를 자동으로 생성할 때, 예를 들어 "1~100 사이의 두 수를 더하시오"
                같은 연습 문제를 무한대로 만들 수 있습니다. 학생들에게 매번 다른 문제를 제공할 수 있어 유용합니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 난수의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">난수의 원리</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔢</span>
              <div>
                <strong className="text-gray-900">컴퓨터가 난수를 생성하는 방법:</strong> 컴퓨터는 결정론적 기계이기 때문에 완전한 무작위를 만들 수 없습니다.
                대신 "선형 합동 생성기(Linear Congruential Generator)" 같은 복잡한 수학 공식을 사용하여 무작위처럼 보이는 숫자열을 생성합니다.
                이를 의사 난수(Pseudo-random number)라고 합니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🌱</span>
              <div>
                <strong className="text-gray-900">시드(Seed)의 개념:</strong> 난수 생성기는 초기값(시드)을 기반으로 숫자를 생성합니다.
                같은 시드를 사용하면 항상 같은 난수 패턴이 나옵니다. JavaScript의 Math.random()은 브라우저가 자동으로 현재 시간 등을 시드로 사용하여
                매번 다른 결과를 만듭니다. 게임에서 "시드 번호"를 입력하면 같은 맵이 생성되는 것도 이 원리입니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">📊</span>
              <div>
                <strong className="text-gray-900">균등 분포(Uniform Distribution)란:</strong> 좋은 난수 생성기는 모든 숫자가 동일한 확률로 나와야 합니다.
                예를 들어 1~100 범위에서 1이 나올 확률과 50이 나올 확률이 모두 1%로 같아야 합니다.
                Math.random()은 균등 분포를 보장하도록 설계되어 있어 공정한 추첨에 사용할 수 있습니다.
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-yellow-600 mr-2 mt-1">🔐</span>
              <div>
                <strong className="text-gray-900">암호학적으로 안전한 난수:</strong> 비밀번호, 암호키, 보안 토큰 생성에는 Math.random()을 사용하면 안 됩니다.
                해커가 패턴을 예측할 수 있기 때문입니다. 보안이 중요한 경우 crypto.getRandomValues()나 crypto.randomUUID() 같은
                암호학적으로 안전한(Cryptographically Secure) 난수 생성기를 사용해야 합니다.
              </div>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 이 난수는 정말 무작위인가요? 공정한가요?</h3>
              <p className="text-gray-700">
                A. 통계적으로 무작위이며 일반적인 용도로는 충분히 공정합니다. Math.random()은 균등 분포를 따르므로
                모든 숫자가 동일한 확률로 나옵니다. 다만 완전한 무작위는 아니고 알고리즘 기반의 의사 난수입니다.
                복권 추첨이나 게임처럼 공정성이 중요한 곳에서 사용할 수 있지만, 암호나 보안 용도로는 적합하지 않습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 중복을 방지할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 네, "중복 허용" 체크박스를 해제하면 같은 숫자가 두 번 나오지 않습니다.
                예를 들어 1~10 범위에서 5개를 생성하면 모두 다른 숫자가 나옵니다.
                단, 중복 불허 시에는 (최댓값 - 최솟값 + 1)보다 많은 개수를 생성할 수 없습니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 음수나 소수점 숫자도 생성할 수 있나요?</h3>
              <p className="text-gray-700">
                A. 음수는 가능합니다. 최솟값을 -100, 최댓값을 100으로 설정하면 음수와 양수를 모두 포함하는 범위에서 생성됩니다.
                하지만 이 도구는 정수만 생성하도록 설계되어 소수점 숫자(예: 3.14)는 나오지 않습니다.
                소수점 난수가 필요하면 별도의 도구를 사용하거나 직접 Math.random()을 활용해야 합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 히스토리는 어디에 저장되나요? 새로고침하면 사라지나요?</h3>
              <p className="text-gray-700">
                A. 히스토리는 브라우저 메모리(RAM)에만 임시 저장되며, 페이지를 새로고침하거나 닫으면 모두 사라집니다.
                로컬 스토리지나 서버에 저장하지 않으므로 개인정보가 유출될 걱정이 없습니다.
                히스토리를 보관하고 싶다면 "복사" 버튼으로 결과를 복사하여 메모장이나 엑셀에 저장하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 범위를 넘어선 숫자가 나올 수 있나요?</h3>
              <p className="text-gray-700">
                A. 아니요, 절대 불가능합니다. 최솟값 10, 최댓값 20으로 설정하면 10~20 사이의 숫자만 나옵니다.
                9나 21 같은 범위 밖의 숫자는 나올 수 없습니다. Math.random()의 결과값을 수학 공식으로 변환하여
                정확히 지정한 범위 내의 정수만 생성하도록 보장합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">Q. 여러 번 돌려도 같은 숫자만 나오는데 버그인가요?</h3>
              <p className="text-gray-700">
                A. 버그가 아니라 확률의 속성입니다. 예를 들어 1~10 범위에서 1개를 생성할 때, 연속으로 7이 3번 나올 확률은
                1/1000으로 낮지만 가능합니다. 주사위를 던져도 6이 연속으로 나올 수 있듯이, 난수도 같은 값이 반복될 수 있습니다.
                더 많이 생성할수록 모든 숫자가 고르게 나오는 "큰 수의 법칙"이 적용됩니다.
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