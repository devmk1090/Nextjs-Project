"use client";

import { useState } from "react";

export default function RandomName() {
  const [nameType, setNameType] = useState<"korean" | "english">("korean");
  const [gender, setGender] = useState<"male" | "female" | "both">("both");
  const [count, setCount] = useState<number>(1);
  const [results, setResults] = useState<string[]>([]);

  // 한국 성씨 (상위 50개)
  const koreanLastNames = [
    "김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
    "한", "오", "서", "신", "권", "황", "안", "송", "류", "전",
    "홍", "고", "문", "양", "손", "배", "백", "허", "유", "남",
    "심", "노", "하", "곽", "성", "차", "주", "우", "구", "신",
    "라", "전", "민", "석", "원", "변", "도", "채", "지", "진"
  ];

  // 한국 이름 (남자)
  const koreanMaleNames = [
    "민준", "서준", "도윤", "예준", "시우", "주원", "하준", "지호", "지후", "준서",
    "건우", "우진", "선우", "연우", "유준", "정우", "승우", "승현", "시윤", "준혁",
    "은우", "민재", "현우", "지환", "승민", "유찬", "지훈", "윤우", "민성", "지우",
    "태윤", "수호", "강민", "도현", "재윤", "현준", "민규", "은찬", "태민", "지안"
  ];

  // 한국 이름 (여자)
  const koreanFemaleNames = [
    "서연", "민서", "지우", "서윤", "지민", "수아", "하은", "윤서", "채원", "지유",
    "다은", "예은", "소율", "지아", "하윤", "예린", "수빈", "지원", "채은", "예나",
    "서현", "수민", "연우", "가은", "유나", "예서", "주아", "시은", "유진", "서아",
    "윤아", "민지", "예진", "지안", "은서", "채린", "서영", "소윤", "예원", "하린"
  ];

  // 영어 성씨
  const englishLastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris",
    "Clark", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres",
    "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell"
  ];

  // 영어 이름 (남자)
  const englishMaleNames = [
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
    "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua",
    "Kenneth", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan",
    "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon"
  ];

  // 영어 이름 (여자)
  const englishFemaleNames = [
    "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
    "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Dorothy", "Kimberly", "Emily", "Donna",
    "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Laura", "Sharon", "Cynthia",
    "Kathleen", "Amy", "Shirley", "Angela", "Helen", "Anna", "Brenda", "Pamela", "Nicole", "Emma"
  ];

  const generateNames = () => {
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      let name = "";

      if (nameType === "korean") {
        const lastName = koreanLastNames[Math.floor(Math.random() * koreanLastNames.length)];
        let firstName = "";

        if (gender === "both") {
          const allNames = [...koreanMaleNames, ...koreanFemaleNames];
          firstName = allNames[Math.floor(Math.random() * allNames.length)];
        } else if (gender === "male") {
          firstName = koreanMaleNames[Math.floor(Math.random() * koreanMaleNames.length)];
        } else {
          firstName = koreanFemaleNames[Math.floor(Math.random() * koreanFemaleNames.length)];
        }

        name = lastName + firstName;
      } else {
        const lastName = englishLastNames[Math.floor(Math.random() * englishLastNames.length)];
        let firstName = "";

        if (gender === "both") {
          const allNames = [...englishMaleNames, ...englishFemaleNames];
          firstName = allNames[Math.floor(Math.random() * allNames.length)];
        } else if (gender === "male") {
          firstName = englishMaleNames[Math.floor(Math.random() * englishMaleNames.length)];
        } else {
          firstName = englishFemaleNames[Math.floor(Math.random() * englishFemaleNames.length)];
        }

        name = `${firstName} ${lastName}`;
      }

      names.push(name);
    }

    setResults(names);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(results.join("\n"));
      alert("복사되었습니다!");
    } catch (e) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          랜덤 이름 생성기
        </h1>

        {/* 설정 영역 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">언어</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="nameType"
                  value="korean"
                  checked={nameType === "korean"}
                  onChange={(e) => setNameType(e.target.value as "korean")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">한국 이름</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="nameType"
                  value="english"
                  checked={nameType === "english"}
                  onChange={(e) => setNameType(e.target.value as "english")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">영어 이름</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">성별</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="both"
                  checked={gender === "both"}
                  onChange={(e) => setGender(e.target.value as "both")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">전체</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value as "male")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">남자</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value as "female")}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-gray-700">여자</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              생성 개수: {count}개
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={generateNames}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            생성하기
          </button>
        </div>

        {/* 결과 */}
        {results.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">결과</h2>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                복사
              </button>
            </div>
            <div className="space-y-2">
              {results.map((name, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md border-2 border-blue-300"
                >
                  <span className="text-xl font-bold text-blue-600">{name}</span>
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
                <strong>한국 이름:</strong> 실제 많이 사용되는 성씨와 이름을 조합하여 생성합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>영어 이름:</strong> 서양권에서 흔한 이름을 조합하여 생성합니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span>
                <strong>활용:</strong> 테스트 데이터, 캐릭터 이름, 가명 등에 사용할 수 있습니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
