"use client";

import { useState, useEffect } from "react";

export default function DdayCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dday, setDday] = useState<number | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear().toString());
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
  }, []);

  const calculateDday = () => {
    if (!year || !month || !day) {
      alert("년, 월, 일을 모두 입력해주세요.");
      return;
    }

    const targetYear = parseInt(year);
    const targetMonth = parseInt(month);
    const targetDay = parseInt(day);

    if (
      targetYear < 1900 ||
      targetYear > 2100 ||
      targetMonth < 1 ||
      targetMonth > 12 ||
      targetDay < 1 ||
      targetDay > 31
    ) {
      alert("올바른 날짜를 입력해주세요.");
      return;
    }

    const target = new Date(targetYear, targetMonth - 1, targetDay);
    target.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setTargetDate(target);
    setDday(Math.abs(diffDays));
    setIsPast(diffDays < 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          디데이 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          특정 날짜까지 남은 일수를 계산해보세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 날짜
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="년"
                className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="월"
                className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="일"
                className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={calculateDday}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            계산하기
          </button>

          {dday !== null && targetDate && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  {targetDate.getFullYear()}년 {targetDate.getMonth() + 1}월{" "}
                  {targetDate.getDate()}일
                </p>
                <div className="text-5xl font-bold text-blue-600 my-4">
                  {isPast ? "D+" : "D-"}
                  {dday}
                </div>
                <p className="text-gray-600">
                  {isPast
                    ? `${dday}일이 지났습니다`
                    : dday === 0
                    ? "오늘이 바로 그날입니다!"
                    : `${dday}일 남았습니다`}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <h3 className="font-semibold text-gray-700 mb-3">주요 기념일</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">100일:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 100 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">200일:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 200 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">300일:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 300 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-gray-600">1년:</span>
                    <span className="ml-2 font-medium text-gray-800">
                      {new Date(
                        targetDate.getTime() - 365 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">사용 예시</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 수능, 입시일까지 남은 일수</li>
              <li>• 결혼식, 돌잔치까지 카운트다운</li>
              <li>• 제대일, 퇴사일까지 남은 일수</li>
              <li>• 시험일, 여행일까지 D-day 확인</li>
            </ul>
          </div>

          {/* 소개 섹션 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              디데이 계산기란?
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                디데이(D-day) 계산기는 특정 목표 날짜까지 남은 일수를 계산하고
                시각적으로 표시하는 도구입니다. D-day는 원래 제2차 세계대전의
                노르망디 상륙작전일(1944년 6월 6일)을 의미하는 군사 용어였으나,
                현대에는 중요한 목표일까지의 카운트다운을 의미하는 일상 용어로
                자리 잡았습니다. 특히 한국에서는 수험생의 입시 준비, 군 복무자의
                전역일, 커플의 기념일 등 다양한 목표 달성을 위한 필수 도구로
                활용됩니다.
              </p>
              <p>
                심리학 연구에 따르면 목표까지의 남은 시간을 시각적으로 확인하는
                것은 동기 부여에 큰 영향을 줍니다. 목표 설정 이론(Goal-Setting
                Theory)의 창시자 에드윈 로크(Edwin Locke) 박사는 "구체적이고
                측정 가능한 목표가 성과를 향상시킨다"고 강조했습니다. D-day
                계산기는 추상적인 미래 목표를 "D-30", "D-100"과 같은 구체적인
                숫자로 변환하여 목표 달성의 긴박감과 동기를 높이는 역할을 합니다.
              </p>
              <p>
                날짜 계산의 원리는 그레고리력(Gregorian Calendar)을 기반으로
                합니다. 그레고리력은 1582년 교황 그레고리우스 13세가 도입한
                현대 표준 달력으로, 율리우스력의 오차를 수정하여 1년을 평균
                365.2425일로 정의했습니다. D-day 계산은 두 날짜 간의
                밀리초(millisecond) 차이를 계산한 뒤 일수로 환산하며, 윤년(leap
                year)과 각 월의 일수 차이를 자동으로 고려합니다.
              </p>
              <p>
                본 디데이 계산기는 단순히 일수를 계산하는 것을 넘어, 목표일로부터
                역산한 주요 기념일(100일 전, 200일 전 등)을 자동 표시하여
                중간 목표 설정에도 도움을 줍니다. 과거의 날짜를 입력하면
                "D+일수" 형식으로 경과일을 표시하여 과거 사건 이후 시간 추적에도
                활용할 수 있습니다.
              </p>
            </div>
          </div>

          {/* 활용 사례 */}
          <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              디데이 계산기 활용 사례
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">
                  1. 수험생의 입시 준비 (수능, 공무원 시험)
                </h3>
                <p className="text-gray-700 text-sm">
                  수험생은 D-day 계산기로 수능, 공무원 시험, 자격증 시험까지
                  남은 일수를 매일 확인하며 학습 계획을 조정합니다. 예를 들어
                  "D-100"일 때 전략을 재점검하고, "D-30"부터는 최종 정리에
                  집중하는 등 단계별 학습 전략을 수립할 수 있습니다. 100일,
                  200일, 300일 기념일을 중간 목표로 설정하여 장기 학습의 지루함을
                  극복하는 데도 효과적입니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">
                  2. 임산부의 출산 예정일 카운트다운
                </h3>
                <p className="text-gray-700 text-sm">
                  출산 예정일을 입력하면 D-day로 표시되어 아기를 만날 날까지의
                  기대감을 높입니다. 산전 검사, 태교 활동, 출산 준비물 구매 등의
                  일정을 D-day 기준으로 관리할 수 있으며, 특히 첫 아기를 기다리는
                  부모에게는 매일 줄어드는 D-day 숫자가 큰 설렘이 됩니다.
                  출산일로부터 100일 전, 200일 전 등의 기념일을 확인하여 태교
                  여행이나 특별한 이벤트를 계획할 수도 있습니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">
                  3. 결혼 준비 (웨딩 플래닝)
                </h3>
                <p className="text-gray-700 text-sm">
                  결혼식 날짜를 입력하면 남은 일수를 확인하며 웨딩 준비 일정을
                  관리할 수 있습니다. 보통 결혼 준비는 6개월~1년 전부터
                  시작하므로 "D-365"부터 카운트다운하며 스튜디오 예약, 드레스
                  선택, 하객 명단 작성, 청첩장 발송 등의 체크리스트를 단계별로
                  진행합니다. 결혼 100일 전에는 세부 사항을 확정하고, D-30부터는
                  최종 점검에 들어가는 등 구체적인 타임라인 관리가 가능합니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">
                  4. 군 복무자의 전역일 계산
                </h3>
                <p className="text-gray-700 text-sm">
                  군 복무 중인 장병들에게 전역일까지의 D-day는 매우 중요한
                  의미를 갖습니다. "전역 D-100" 같은 표현은 군대 내에서
                  일상적으로 사용되며, 남은 복무 기간을 확인하며 심리적 버팀목을
                  얻습니다. 전역 300일 전, 200일 전, 100일 전 등의 기념일에는
                  동기들과 함께 축하하는 문화가 있어 군 생활의 활력소가 됩니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">
                  5. 프로젝트 마감일 관리 (업무, 학업)
                </h3>
                <p className="text-gray-700 text-sm">
                  직장인은 프로젝트 마감일, 보고서 제출일을 D-day로 관리하며
                  업무 우선순위를 설정합니다. 학생은 과제 제출일, 발표일을 D-day로
                  표시하여 시간 관리를 합니다. 예를 들어 "D-7"부터는 집중 작업에
                  돌입하고, "D-1"에는 최종 검토를 하는 등 마감 압박을 효과적으로
                  관리할 수 있습니다. 여러 프로젝트가 동시에 진행될 때 각
                  마감일의 D-day를 비교하며 작업 배분을 조정하는 데도
                  유용합니다.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">
                  6. 여행 카운트다운 및 기념일 추적
                </h3>
                <p className="text-gray-700 text-sm">
                  해외여행, 휴가 날짜를 입력하면 떠날 날까지의 설렘을 D-day로
                  표현할 수 있습니다. 또한 과거의 날짜(생일, 첫 만남, 결혼기념일
                  등)를 입력하면 "D+365" 같은 형식으로 경과일을 확인하며 "우리가
                  만난 지 1000일", "결혼한 지 2000일" 같은 특별한 날을 미리
                  파악하여 기념 이벤트를 준비할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 원리 섹션 */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              날짜 계산의 원리와 기초 지식
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">📅</span>
                <div>
                  <strong className="text-gray-900">
                    그레고리력(Gregorian Calendar)과 윤년:
                  </strong>{" "}
                  현재 전 세계적으로 사용하는 그레고리력은 1582년 교황
                  그레고리우스 13세가 도입한 달력입니다. 율리우스력의 오차(1년을
                  365.25일로 계산)를 수정하여 1년을 평균 365.2425일로 정의했으며,
                  윤년 규칙도 개선했습니다. 윤년은 4로 나누어떨어지는 해이지만,
                  100으로 나누어떨어지면 평년, 다시 400으로 나누어떨어지면
                  윤년입니다(예: 2000년은 윤년, 1900년은 평년). D-day 계산 시
                  JavaScript의 Date 객체는 이 규칙을 자동으로 적용합니다.
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">⏱️</span>
                <div>
                  <strong className="text-gray-900">
                    밀리초 기반 날짜 계산:
                  </strong>{" "}
                  컴퓨터는 날짜를 1970년 1월 1일 0시 0분 0초(UTC)부터 경과한
                  밀리초(millisecond)로 저장합니다(Unix Timestamp). D-day 계산은
                  목표 날짜의 밀리초에서 현재 날짜의 밀리초를 뺀 뒤, 하루의
                  밀리초 수(1000 × 60 × 60 × 24 = 86,400,000ms)로 나누어 일수를
                  구합니다. Math.ceil()을 사용하여 올림 처리하므로 당일도 1일로
                  계산됩니다.
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">🌍</span>
                <div>
                  <strong className="text-gray-900">
                    시간대(Timezone)와 자정(Midnight) 처리:
                  </strong>{" "}
                  D-day 계산에서는 일반적으로 시간을 무시하고 날짜만 비교합니다.
                  이를 위해 setHours(0, 0, 0, 0)을 사용하여 시, 분, 초,
                  밀리초를 모두 0으로 설정합니다. 이렇게 하면 "오늘 오전
                  10시"와 "목표일 오후 3시"를 비교할 때도 시간 차이가 일수에
                  영향을 주지 않습니다. 단, 국제적인 이벤트의 경우 시간대
                  차이(UTC, KST 등)를 고려해야 할 수 있습니다.
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">🎯</span>
                <div>
                  <strong className="text-gray-900">
                    D-day vs D+day 표기 규칙:
                  </strong>{" "}
                  한국의 D-day 문화에서는 목표일 당일을 "D-day" 또는 "D-0"으로
                  표기하고, 목표일 이전을 "D-1", "D-30" 같이 마이너스로
                  표현합니다. 목표일이 지난 후에는 "D+1", "D+100" 같이 플러스로
                  표현하여 경과일을 나타냅니다. 이는 군사 용어에서 유래한
                  표기법으로, 명확한 시간 개념 전달에 효과적입니다.
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">💯</span>
                <div>
                  <strong className="text-gray-900">
                    기념일 계산(100일, 200일, 300일, 1년):
                  </strong>{" "}
                  본 계산기는 목표일로부터 역산하여 100일 전, 200일 전, 300일 전,
                  365일 전(1년 전)의 날짜를 자동 계산합니다. 이는 장기 목표 달성
                  과정에서 중간 지점을 표시하여 동기 부여를 돕는 기능입니다.
                  계산은 목표일의 밀리초에서 (일수 × 86,400,000ms)를 빼는
                  방식으로 이루어지며, 윤년 여부와 관계없이 정확한 날짜를
                  산출합니다.
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  Q. 음력 날짜로도 D-day를 계산할 수 있나요?
                </h3>
                <p className="text-gray-700">
                  본 계산기는 양력(그레고리력) 기준으로 작동합니다. 음력 날짜를
                  사용하려면 먼저 음력을 양력으로 변환한 뒤 입력해야 합니다.
                  예를 들어 설날(음력 1월 1일)의 D-day를 계산하려면 해당 연도의
                  설날이 양력으로 몇 월 몇 일인지 확인한 뒤 입력하세요. 음력은
                  매년 양력 날짜가 달라지므로(윤달 등의 영향) 변환이 필요합니다.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  Q. 시간까지 포함하여 계산할 수 있나요?
                </h3>
                <p className="text-gray-700">
                  본 계산기는 날짜 단위로만 계산하며, 시간(시/분/초)은 자정(0시
                  0분 0초)으로 설정되어 무시됩니다. 만약 "시험이 내일 오후
                  2시"라면 날짜만 입력하면 되고, 구체적인 시간은 별도로 기억해야
                  합니다. 시간 단위 카운트다운이 필요하다면 타이머 도구를
                  사용하는 것이 더 적합합니다.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  Q. 과거 날짜를 입력하면 어떻게 되나요?
                </h3>
                <p className="text-gray-700">
                  과거 날짜를 입력하면 "D+숫자" 형식으로 경과일이 표시됩니다.
                  예를 들어 1000일 전 날짜를 입력하면 "D+1000"으로 표시되어 "그
                  날로부터 1000일이 지났다"는 의미를 전달합니다. 이는 생일,
                  결혼기념일, 첫 만남 등 과거 이벤트로부터 경과한 시간을 추적할
                  때 유용하며, "우리가 만난 지 1000일" 같은 기념일을 찾는 데
                  활용됩니다.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  Q. 주말이나 공휴일을 제외한 영업일만 계산할 수 있나요?
                </h3>
                <p className="text-gray-700">
                  본 계산기는 달력상 모든 날짜를 동일하게 계산하며, 주말이나
                  공휴일을 제외하지 않습니다. 만약 업무상 영업일 기준 계산이
                  필요하다면(예: 계약서 "영업일 기준 30일 이내") 별도의 영업일
                  계산기를 사용하거나, 전체 D-day에서 주말 일수를 수동으로 빼야
                  합니다. 일반적인 목표 달성용 D-day에는 모든 날을 포함하는 것이
                  표준입니다.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  Q. 계산 결과가 정확한가요? (윤년, 각 월의 일수 차이 등)
                </h3>
                <p className="text-gray-700">
                  본 계산기는 JavaScript의 Date 객체를 사용하므로 윤년 규칙(4년,
                  100년, 400년 규칙)과 각 월의 일수 차이(1월 31일, 2월 28/29일,
                  4월 30일 등)를 자동으로 정확하게 처리합니다. 예를 들어 2024년
                  2월 29일(윤년)부터 2025년 3월 1일까지의 D-day를 계산하면
                  366일로 정확히 계산됩니다. 밀리초 단위 계산을 사용하므로 수동
                  계산보다 정확하며, 1900년~2100년 사이 모든 날짜에 대해 신뢰할
                  수 있습니다.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">
                  Q. 기념일 날짜(100일 전, 200일 전 등)는 어떻게 계산되나요?
                </h3>
                <p className="text-gray-700">
                  기념일 계산은 목표 날짜로부터 정확히 100일, 200일, 300일,
                  365일(1년)을 역산합니다. 예를 들어 목표일이 2025년 12월 31일이면
                  100일 전은 2025년 9월 22일입니다. 이 계산도 윤년과 월별 일수를
                  자동으로 반영하므로 항상 정확합니다. 이 기념일들은 장기 목표를
                  위한 중간 체크포인트로 활용하기 좋으며, 특히 수험생이나 장기
                  프로젝트 관리자에게 유용한 기준점이 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
