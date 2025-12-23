"use client";

import { useState, useEffect } from "react";

export default function CharCounter() {
  const [text, setText] = useState<string>("");
  const [stats, setStats] = useState({
    totalChars: 0,
    charsNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    spaces: 0,
    readingTime: 0,
  });

  useEffect(() => {
    if (!text) {
      setStats({
        totalChars: 0,
        charsNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        spaces: 0,
        readingTime: 0,
      });
      return;
    }

    // 전체 문자 수
    const totalChars = text.length;

    // 공백 제외 문자 수
    const charsNoSpaces = text.replace(/\s/g, "").length;

    // 공백 수
    const spaces = totalChars - charsNoSpaces;

    // 단어 수 (공백 기준)
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    // 문장 수 (., !, ? 기준)
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;

    // 단락 수 (연속된 줄바꿈 기준)
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

    // 줄 수
    const lines = text.split("\n").length;

    // 읽기 시간 (분) - 평균 읽기 속도 200 단어/분
    const readingTime = Math.ceil(words / 200);

    setStats({
      totalChars,
      charsNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      spaces,
      readingTime,
    });
  }, [text]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          글자 수 세기
        </h1>

        {/* 입력 영역 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">텍스트 입력</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="글자 수를 세고 싶은 텍스트를 입력하세요..."
            className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">전체 문자</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalChars.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-1">공백 제외</p>
            <p className="text-3xl font-bold text-green-600">{stats.charsNoSpaces.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">단어</p>
            <p className="text-3xl font-bold text-purple-600">{stats.words.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200">
            <p className="text-sm text-gray-600 mb-1">문장</p>
            <p className="text-3xl font-bold text-orange-600">{stats.sentences.toLocaleString()}</p>
          </div>
        </div>

        {/* 상세 통계 */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">상세 통계</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">공백 수:</span>
              <span className="text-lg font-bold text-gray-800">{stats.spaces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">단락 수:</span>
              <span className="text-lg font-bold text-gray-800">{stats.paragraphs.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">줄 수:</span>
              <span className="text-lg font-bold text-gray-800">{stats.lines.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">예상 읽기 시간:</span>
              <span className="text-lg font-bold text-gray-800">약 {stats.readingTime}분</span>
            </div>
          </div>
        </div>

        {/* 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>전체 문자:</strong> 공백, 특수문자를 포함한 모든 문자</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>공백 제외:</strong> 공백을 제외한 순수 문자 수</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>단어:</strong> 공백으로 구분된 단어의 개수</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>문장:</strong> 마침표(.), 느낌표(!), 물음표(?)로 끝나는 문장</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>단락:</strong> 빈 줄로 구분된 단락</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-2">•</span>
              <span><strong>읽기 시간:</strong> 평균 읽기 속도 200 단어/분 기준</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
