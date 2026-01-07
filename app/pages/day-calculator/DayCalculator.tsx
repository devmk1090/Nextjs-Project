"use client";

import { useState, useEffect } from "react";

export default function DayCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const daysInKorean = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const daysInEnglish = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear().toString());
    setMonth((today.getMonth() + 1).toString());
    setDay(today.getDate().toString());
  }, []);

  const calculateDayOfWeek = () => {
    if (!year || !month || !day) {
      alert("년, 월, 일을 모두 입력해주세요.");
      return;
    }

    const targetYear = parseInt(year);
    const targetMonth = parseInt(month);
    const targetDay = parseInt(day);

    if (
      targetYear < 1 ||
      targetYear > 9999 ||
      targetMonth < 1 ||
      targetMonth > 12 ||
      targetDay < 1 ||
      targetDay > 31
    ) {
      alert("올바른 날짜를 입력해주세요.");
      return;
    }

    const date = new Date(targetYear, targetMonth - 1, targetDay);

    if (
      date.getFullYear() !== targetYear ||
      date.getMonth() !== targetMonth - 1 ||
      date.getDate() !== targetDay
    ) {
      alert("유효하지 않은 날짜입니다.");
      return;
    }

    const dayIndex = date.getDay();
    setDayOfWeek(daysInKorean[dayIndex]);
    setTargetDate(date);
  };

  const getDayColor = (day: string) => {
    if (day === "일요일") return "text-red-600";
    if (day === "토요일") return "text-blue-600";
    return "text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
          요일 계산기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          특정 날짜의 요일을 확인해보세요
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              날짜 입력
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
            onClick={calculateDayOfWeek}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            요일 확인하기
          </button>

          {dayOfWeek && targetDate && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  {targetDate.getFullYear()}년 {targetDate.getMonth() + 1}월{" "}
                  {targetDate.getDate()}일은
                </p>
                <div
                  className={`text-6xl font-bold my-4 ${getDayColor(
                    dayOfWeek
                  )}`}
                >
                  {dayOfWeek}
                </div>
                <p className="text-gray-600 text-sm">
                  {daysInEnglish[daysInKorean.indexOf(dayOfWeek)]}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <h3 className="font-semibold text-gray-700 mb-3 text-center">
                  이 날의 정보
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">연도:</span>
                    <span className="font-medium text-gray-800">
                      {targetDate.getFullYear()}년
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">월:</span>
                    <span className="font-medium text-gray-800">
                      {targetDate.getMonth() + 1}월
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">일:</span>
                    <span className="font-medium text-gray-800">
                      {targetDate.getDate()}일
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-600">주말 여부:</span>
                    <span className="font-medium text-gray-800">
                      {dayOfWeek === "토요일" || dayOfWeek === "일요일"
                        ? "주말"
                        : "평일"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">사용 예시</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 내가 태어난 날은 무슨 요일?</li>
              <li>• 우리 결혼기념일은 무슨 요일?</li>
              <li>• 역사적 사건이 일어난 날의 요일</li>
              <li>• 미래의 특정 날짜 요일 확인</li>
            </ul>
          </div>

          {/* 소개 섹션 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">요일 계산기란?</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                요일 계산기는 특정 날짜의 요일을 자동으로 계산하여 표시하는 도구입니다. 7일 주기의 요일 시스템은 고대 바빌로니아에서 시작되었으며, 태양(일요일), 달(월요일), 화성(화요일), 수성(수요일), 목성(목요일), 금성(금요일), 토성(토요일)의 이름을 따왔습니다. 현대에는 그레고리력(Gregorian Calendar)을 기반으로 요일을 계산하며, 젤러의 공식(Zeller's Congruence) 같은 수학적 알고리즘이 사용됩니다.
              </p>
              <p>
                달력 시스템의 진화는 인류 역사와 함께합니다. 율리우스 카이사르가 기원전 45년에 도입한 율리우스력(Julian Calendar)은 1년을 365.25일로 정의했지만, 실제 태양년(365.2422일)과 11분 14초 차이가 나 1500년 후 10일의 오차가 누적되었습니다. 1582년 교황 그레고리우스 13세가 윤년 규칙을 개선한 그레고리력을 도입하여 현재까지 사용하고 있습니다.
              </p>
              <p>
                이 도구는 JavaScript의 Date 객체를 사용하여 정확한 요일을 계산합니다. 입력한 날짜가 유효한지 검증하고(예: 2월 30일은 불가), 주말 여부(토요일, 일요일)도 함께 표시합니다. 생일, 결혼기념일, 역사적 사건의 요일을 확인하거나, 미래 프로젝트 일정을 계획할 때 유용합니다.
              </p>
              <p>
                요일은 문화적으로도 중요한 의미를 가집니다. 한국에서는 일요일(빨간색)과 토요일(파란색)을 구별하고, 서양에서는 13일의 금요일을 불길하게 여기며, 결혼식은 전통적으로 토요일에 많이 합니다. 요일 계산은 단순해 보이지만 달력 역사, 수학, 문화가 결합된 흥미로운 주제입니다.
              </p>
            </div>
          </div>

          {/* 활용 사례 */}
          <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">요일 계산기 활용 사례</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">1. 생일 요일 확인 (나는 무슨 요일에 태어났을까?)</h3>
                <p className="text-gray-700 text-sm">
                  자신이나 가족, 친구의 생일이 무슨 요일이었는지 확인할 수 있습니다. 예를 들어 "나는 토요일에 태어났어!"라는 사실은 흥미로운 이야깃거리가 됩니다. 일부 사람들은 요일별 성격 이론을 믿기도 하며, 점성술에서도 태어난 요일을 중요하게 여기는 경우가 있습니다. 또한 "태어난 지 10,000일째 되는 날"을 계산할 때 요일을 확인하여 기념 이벤트를 계획할 수 있습니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">2. 역사적 사건의 요일 확인</h3>
                <p className="text-gray-700 text-sm">
                  6.25 전쟁이 일어난 1950년 6월 25일은 일요일이었습니다. 한글날 제정일(1446년 10월 9일, 음력 기준 양력 환산 시), 광복절(1945년 8월 15일)은 수요일이었습니다. 역사 수업이나 다큐멘터리 제작 시 사건의 요일을 알면 당시 상황을 더 생생하게 이해할 수 있습니다. 예: "진주만 공습(1941년 12월 7일)은 일요일 아침에 발생했다."
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">3. 프로젝트 및 이벤트 일정 계획</h3>
                <p className="text-gray-700 text-sm">
                  회사에서 "2025년 12월 25일까지 프로젝트 완료"라는 목표가 있을 때, 그날이 목요일이라면 주말 전까지 마무리할 시간이 있습니다. 결혼식 날짜를 정할 때 특정 날짜의 요일을 확인하여 토요일이나 일요일을 선택할 수 있습니다. 세미나, 컨퍼런스 일정을 계획할 때도 참석률이 높은 요일을 선택하는 데 도움이 됩니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">4. 급여일 및 공휴일 패턴 분석</h3>
                <p className="text-gray-700 text-sm">
                  "매월 25일이 급여일인데, 이번 달은 토요일이라 24일 금요일에 받겠구나" 같은 계산을 할 수 있습니다. 공휴일이 주말과 겹치는지 확인하여 대체 휴일을 예상하거나, 연휴 계획을 세울 수 있습니다. 예: 2025년 설날(1월 29일)은 수요일이므로 전후로 휴가를 쓰면 긴 연휴를 만들 수 있습니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-800 mb-2">5. 특정 요일 트렌드 분석 (데이터 분석)</h3>
                <p className="text-gray-700 text-sm">
                  이커머스 업체는 "화요일과 수요일에 매출이 가장 높다"는 패턴을 발견하기 위해 주문 날짜의 요일을 분석합니다. SNS 마케터는 게시물 업로드 요일에 따른 참여율(Engagement Rate)을 측정합니다. 교통사고 데이터를 요일별로 분석하여 "금요일 저녁이 가장 위험하다"는 통계를 도출할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 원리 섹션 */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">요일 계산의 원리</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">📅</span>
                <div>
                  <strong className="text-gray-900">그레고리력과 율리우스력:</strong> 율리우스력은 기원전 45년 율리우스 카이사르가 도입했으며, 1년을 365.25일로 정의하고 4년마다 윤년을 두었습니다. 하지만 실제 태양년(365.2422일)과 0.0078일(11분 14초) 차이가 나 1500년 후 10일의 오차가 누적되었습니다. 1582년 교황 그레고리우스 13세가 개선한 그레고리력은 "100으로 나누어떨어지는 해는 평년, 400으로 나누어떨어지면 윤년" 규칙을 추가하여 오차를 3,300년에 1일로 줄였습니다.
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">🔢</span>
                <div>
                  <strong className="text-gray-900">젤러의 공식 (Zeller's Congruence):</strong> 1887년 수학자 크리스티안 젤러(Christian Zeller)가 개발한 요일 계산 공식입니다. h = (q + ⌊13(m+1)/5⌋ + K + ⌊K/4⌋ + ⌊J/4⌋ - 2J) mod 7. 여기서 h는 요일(0=토요일, 1=일요일, ..., 6=금요일), q는 일, m은 월(3월=3, ..., 12월=12, 1월=13, 2월=14로 전년도로 계산), K는 연도의 마지막 두 자리, J는 세기입니다. JavaScript는 이 공식을 내부적으로 사용합니다.
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">🌍</span>
                <div>
                  <strong className="text-gray-900">윤년 규칙:</strong> 그레고리력의 윤년 규칙은 3단계입니다. ① 4로 나누어떨어지면 윤년 → 2024년은 윤년 (2월 29일 있음). ② 100으로 나누어떨어지면 평년 → 1900년은 평년 (2월 29일 없음). ③ 400으로 나누어떨어지면 윤년 → 2000년은 윤년 (2월 29일 있음). 이 규칙으로 평균 1년은 365.2425일이 되어 실제 태양년(365.2422일)과 매우 가깝습니다.
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">🔄</span>
                <div>
                  <strong className="text-gray-900">7일 주기의 기원:</strong> 7일 주기는 고대 바빌로니아에서 시작되었으며, 달의 위상 변화(초승달 → 상현달 → 보름달 → 하현달, 각 약 7일)를 관찰한 데서 유래했습니다. 유대교의 안식일(Sabbath), 기독교의 주일(일요일), 이슬람교의 금요일 예배처럼 종교적 의미도 깊습니다. 로마 시대에는 행성 이름을 따 요일을 명명했으며, 이는 영어(Sun-day, Mon-day, Saturn-day) 등에 남아 있습니다.
                </div>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2 mt-1">💻</span>
                <div>
                  <strong className="text-gray-900">JavaScript Date 객체:</strong> Date 객체는 1970년 1월 1일 0시 0분 0초(UTC)부터 경과한 밀리초를 기준으로 날짜를 저장합니다(Unix Timestamp). getDay() 메서드는 요일을 0(일요일)~6(토요일) 숫자로 반환합니다. 내부적으로 젤러의 공식이나 비슷한 알고리즘을 사용하며, 그레고리력 전환일(1582년 10월 15일) 이전 날짜는 율리우스력을 따르지 않고 그레고리력을 소급 적용합니다(Proleptic Gregorian Calendar).
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Q. 음력 날짜의 요일도 계산할 수 있나요?</h3>
                <p className="text-gray-700">
                  이 도구는 양력(그레고리력) 전용입니다. 음력 날짜의 요일을 알려면 먼저 음력을 양력으로 변환한 후 계산해야 합니다. 예: 음력 1월 1일(설날)은 매년 양력 날짜가 다르므로, 해당 연도의 설날 양력 날짜를 찾은 뒤 요일을 확인하세요. 온라인 음력 변환기나 lunar-typescript 같은 라이브러리를 사용할 수 있습니다.
                </p>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Q. 1582년 이전 날짜도 정확하게 계산되나요?</h3>
                <p className="text-gray-700">
                  JavaScript는 Proleptic Gregorian Calendar를 사용하여 1582년 이전 날짜도 그레고리력 규칙으로 계산합니다. 실제로는 1582년 10월 15일 이전은 율리우스력을 사용했으므로, 역사적 정확성이 필요하면 별도의 보정이 필요합니다. 예: 율리우스 카이사르 암살일(기원전 44년 3월 15일)은 당시 율리우스력 기준이며, 그레고리력으로 환산하면 며칠 차이가 납니다.
                </p>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Q. 각 나라마다 주의 시작일이 다른가요?</h3>
                <p className="text-gray-700">
                  네, 문화에 따라 다릅니다. 미국, 캐나다, 일본은 일요일을 주의 시작일로 보고, 유럽 대부분 국가와 한국은 월요일을 주의 시작일로 봅니다. ISO 8601 국제 표준은 월요일을 주의 첫날로 정의합니다. 달력 앱에서 설정을 변경할 수 있지만, 이 도구는 일요일=0, 월요일=1 방식의 JavaScript 표준을 따릅니다.
                </p>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Q. 달력 개혁으로 사라진 날짜가 있나요?</h3>
                <p className="text-gray-700">
                  네, 그레고리력 도입 시 1582년 10월 5일~14일이 "사라졌습니다". 교황 그레고리우스 13세는 10일의 누적 오차를 수정하기 위해 10월 4일 다음 날을 10월 15일로 정했습니다. 각 나라는 서로 다른 시기에 그레고리력을 채택했는데, 영국은 1752년(9월 3일→14일), 러시아는 1918년(2월 1일→14일), 그리스는 1923년에 전환했습니다.
                </p>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Q. 미래의 아주 먼 날짜(예: 2999년)도 정확한가요?</h3>
                <p className="text-gray-700">
                  그레고리력 규칙을 따르는 한 계산은 정확합니다. 다만 실제로 인류가 그레고리력을 계속 사용할지는 불확실합니다. 그레고리력도 3,300년마다 1일의 오차가 발생하므로, 먼 미래에는 새로운 달력 개혁이 있을 수 있습니다. JavaScript Date 객체는 기술적으로 -271821년 4월 20일 ~ 275760년 9월 13일까지 지원하지만, 실용적으로는 1900~2100년 범위가 가장 신뢰할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
