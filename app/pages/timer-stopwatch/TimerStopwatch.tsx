"use client";

import { useState, useEffect, useRef } from "react";

type Mode = "timer" | "stopwatch" | "pomodoro";

export default function TimerStopwatch() {
  const [mode, setMode] = useState<Mode>("timer");

  // Timer 상태
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Stopwatch 상태
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Pomodoro 상태
  const [pomodoroMode, setPomodoroMode] = useState<"work" | "break">("work");
  const [pomodoroRemaining, setPomodoroRemaining] = useState(25 * 60); // 25분
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroWorkTime, setPomodoroWorkTime] = useState(25);
  const [pomodoroBreakTime, setPomodoroBreakTime] = useState(5);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 알람 소리 재생
  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // 오디오 재생 실패 시 무시
      });
    }
  };

  // Timer 시작
  const startTimer = () => {
    const totalSeconds = timerHours * 3600 + timerMinutes * 60 + timerSeconds;
    if (totalSeconds > 0) {
      setTimerRemaining(totalSeconds);
      setTimerRunning(true);
    }
  };

  // Timer 일시정지
  const pauseTimer = () => {
    setTimerRunning(false);
  };

  // Timer 리셋
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerRemaining(0);
  };

  // Stopwatch 시작/일시정지
  const toggleStopwatch = () => {
    setStopwatchRunning(!stopwatchRunning);
  };

  // Stopwatch 랩타임
  const recordLap = () => {
    setLaps([...laps, stopwatchTime]);
  };

  // Stopwatch 리셋
  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };

  // Pomodoro 시작/일시정지
  const togglePomodoro = () => {
    setPomodoroRunning(!pomodoroRunning);
  };

  // Pomodoro 리셋
  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setPomodoroMode("work");
    setPomodoroRemaining(pomodoroWorkTime * 60);
    setCompletedPomodoros(0);
  };

  // Pomodoro 모드 전환
  const switchPomodoroMode = () => {
    if (pomodoroMode === "work") {
      setPomodoroMode("break");
      setPomodoroRemaining(pomodoroBreakTime * 60);
      setCompletedPomodoros(completedPomodoros + 1);
    } else {
      setPomodoroMode("work");
      setPomodoroRemaining(pomodoroWorkTime * 60);
    }
    setPomodoroRunning(false);
  };

  // Timer 효과
  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, timerRemaining]);

  // Stopwatch 효과
  useEffect(() => {
    if (stopwatchRunning) {
      intervalRef.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stopwatchRunning]);

  // Pomodoro 효과
  useEffect(() => {
    if (pomodoroRunning && pomodoroRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setPomodoroRemaining((prev) => {
          if (prev <= 1) {
            setPomodoroRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pomodoroRunning, pomodoroRemaining]);

  // 시간 포맷 함수
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatStopwatch = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          타이머 & 스톱워치
        </h1>

        {/* 오디오 요소 (알람 소리) */}
        <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSiQ1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+PyvmshBSiO1fLPlC0FHXbI8OGYSQsUW7Lq6qNaEg1Mn+Pyw==" preload="auto"></audio>

        {/* 모드 선택 탭 */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          <button
            onClick={() => setMode("timer")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              mode === "timer"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            ⏱️ 타이머
          </button>
          <button
            onClick={() => setMode("stopwatch")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              mode === "stopwatch"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            ⏲️ 스톱워치
          </button>
          <button
            onClick={() => setMode("pomodoro")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              mode === "pomodoro"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            🍅 포모도로
          </button>
        </div>

        {/* 타이머 모드 */}
        {mode === "timer" && (
          <div className="space-y-6">
            {!timerRunning && timerRemaining === 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">시간 설정</h2>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">시간</label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={timerHours}
                      onChange={(e) => setTimerHours(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">분</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">초</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-6 font-mono">
                  {formatTime(timerRemaining)}
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {!timerRunning && timerRemaining === 0 && (
                    <button
                      onClick={startTimer}
                      className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md"
                    >
                      시작
                    </button>
                  )}
                  {timerRunning && (
                    <button
                      onClick={pauseTimer}
                      className="px-8 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-all shadow-md"
                    >
                      일시정지
                    </button>
                  )}
                  {!timerRunning && timerRemaining > 0 && (
                    <button
                      onClick={() => setTimerRunning(true)}
                      className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md"
                    >
                      재개
                    </button>
                  )}
                  {timerRemaining > 0 && (
                    <button
                      onClick={resetTimer}
                      className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md"
                    >
                      리셋
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 스톱워치 모드 */}
        {mode === "stopwatch" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-8 border-2 border-green-200">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-6 font-mono">
                  {formatStopwatch(stopwatchTime)}
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={toggleStopwatch}
                    className={`px-8 py-3 ${
                      stopwatchRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                    } text-white rounded-lg font-semibold transition-all shadow-md`}
                  >
                    {stopwatchRunning ? "일시정지" : "시작"}
                  </button>
                  {stopwatchRunning && (
                    <button
                      onClick={recordLap}
                      className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md"
                    >
                      랩타임
                    </button>
                  )}
                  {stopwatchTime > 0 && (
                    <button
                      onClick={resetStopwatch}
                      className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md"
                    >
                      리셋
                    </button>
                  )}
                </div>
              </div>
            </div>

            {laps.length > 0 && (
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 max-h-64 overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-4">랩타임 기록</h3>
                <div className="space-y-2">
                  {laps.map((lap, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-semibold text-gray-700">랩 {laps.length - index}</span>
                      <span className="font-mono text-gray-800">{formatStopwatch(lap)}</span>
                    </div>
                  )).reverse()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 포모도로 모드 */}
        {mode === "pomodoro" && (
          <div className="space-y-6">
            {!pomodoroRunning && pomodoroRemaining === (pomodoroMode === "work" ? pomodoroWorkTime * 60 : pomodoroBreakTime * 60) && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">포모도로 설정</h2>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                      집중 시간 (분)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={pomodoroWorkTime}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setPomodoroWorkTime(value);
                        if (pomodoroMode === "work") setPomodoroRemaining(value * 60);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                      휴식 시간 (분)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={pomodoroBreakTime}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setPomodoroBreakTime(value);
                        if (pomodoroMode === "break") setPomodoroRemaining(value * 60);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={`rounded-xl p-8 border-2 ${
              pomodoroMode === "work"
                ? "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
                : "bg-gradient-to-r from-green-50 to-cyan-50 border-green-200"
            }`}>
              <div className="text-center">
                <div className="mb-4">
                  <span className={`text-2xl font-bold ${
                    pomodoroMode === "work" ? "text-red-600" : "text-green-600"
                  }`}>
                    {pomodoroMode === "work" ? "🔥 집중 시간" : "☕ 휴식 시간"}
                  </span>
                </div>
                <div className="text-6xl font-bold text-gray-800 mb-6 font-mono">
                  {formatTime(pomodoroRemaining)}
                </div>
                <div className="mb-6">
                  <span className="text-lg font-semibold text-gray-700">
                    완료한 포모도로: {completedPomodoros}개
                  </span>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={togglePomodoro}
                    className={`px-8 py-3 ${
                      pomodoroRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                    } text-white rounded-lg font-semibold transition-all shadow-md`}
                  >
                    {pomodoroRunning ? "일시정지" : "시작"}
                  </button>
                  {pomodoroRemaining === 0 && (
                    <button
                      onClick={switchPomodoroMode}
                      className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md"
                    >
                      {pomodoroMode === "work" ? "휴식 시작" : "집중 시작"}
                    </button>
                  )}
                  <button
                    onClick={resetPomodoro}
                    className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md"
                  >
                    리셋
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 소개 섹션 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">타이머 & 스톱워치란?</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              타이머와 스톱워치는 시간을 측정하고 관리하는 필수 도구입니다. 타이머는 설정한 시간이 되면 알람으로 알려주는 카운트다운 방식이고, 스톱워치는 경과 시간을 정밀하게 측정하는 카운트업 방식입니다. 두 도구 모두 일상생활, 업무, 운동, 학습 등 다양한 상황에서 시간 관리의 핵심 역할을 합니다.
            </p>
            <p>
              포모도로 기법(Pomodoro Technique)은 1980년대 프란체스코 치릴로가 개발한 시간 관리 방법으로, 25분 집중 + 5분 휴식을 반복하여 생산성을 극대화합니다. 토마토 모양의 주방 타이머에서 이름을 따왔으며, 짧은 집중 시간과 규칙적인 휴식을 통해 뇌의 피로를 줄이고 몰입도를 높이는 과학적 원리를 활용합니다.
            </p>
            <p>
              현대 디지털 타이머는 기계식 타이머의 한계를 극복하고, 정확성과 편의성을 크게 향상시켰습니다. 브라우저 기반 타이머는 설치 없이 어디서나 사용할 수 있으며, 알람 소리, 시각적 알림, 자동 반복 등 다양한 기능을 제공합니다.
            </p>
            <p>
              이 도구는 세 가지 모드(타이머, 스톱워치, 포모도로)를 통합하여 제공하며, 직관적인 인터페이스와 큰 숫자 표시로 가독성을 높였습니다. 요리, 운동, 공부, 회의 시간 관리 등 다양한 용도로 활용할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 활용 사례 */}
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">타이머 & 스톱워치 활용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">1. 요리 및 베이킹</h3>
              <p className="text-gray-700 text-sm">
                파스타 삶기(8~12분), 계란 삶기(반숙 6분, 완숙 12분), 빵 굽기(180도 20분) 등 정확한 시간이 요구되는 요리에서 타이머는 필수입니다. 여러 요리를 동시에 준비할 때도 각각의 타이머를 설정하여 과도하게 익거나 타는 것을 방지할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">2. 운동 및 피트니스</h3>
              <p className="text-gray-700 text-sm">
                HIIT(고강도 인터벌 트레이닝)에서 30초 운동 + 10초 휴식을 반복하거나, 플랭크, 스쿼트 등의 정적 운동 시간을 측정할 때 타이머를 사용합니다. 스톱워치는 달리기, 수영 등의 기록 측정과 랩타임 기록에 유용하며, 자신의 운동 기록을 추적하여 발전을 확인할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">3. 집중 학습 (포모도로 기법)</h3>
              <p className="text-gray-700 text-sm">
                25분 집중 + 5분 휴식을 4회 반복 후 15~30분 긴 휴식을 취하는 포모도로 기법은 수험생, 직장인, 프리랜서에게 매우 효과적입니다. 짧은 집중 시간은 부담을 줄이고, 규칙적인 휴식은 장시간 학습 시 집중력 저하를 방지합니다. 하루에 완료한 포모도로 개수를 기록하면 생산성을 시각화할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">4. 회의 및 프레젠테이션 시간 관리</h3>
              <p className="text-gray-700 text-sm">
                정해진 시간 내에 발표를 마쳐야 하는 프레젠테이션, 각 안건별 시간을 제한하는 회의, 온라인 강의 녹화 등에서 타이머로 시간을 관리합니다. 시각적 타이머를 화면에 띄워두면 발표자가 남은 시간을 확인하며 진행 속도를 조절할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">5. 아이 양육 및 시간 제한</h3>
              <p className="text-gray-700 text-sm">
                아이의 게임 시간, TV 시청 시간, 숙제 시간 등을 타이머로 설정하여 스스로 시간을 지키는 습관을 기르게 합니다. 타임아웃(Time-out) 훈육법에서도 연령별(예: 5세 아이에게 5분 타임아웃) 정확한 시간을 측정하기 위해 타이머를 사용합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">6. 업무 생산성 향상</h3>
              <p className="text-gray-700 text-sm">
                이메일 답장(15분), 보고서 작성(45분), 코드 리뷰(30분) 등 업무별로 시간을 할당하고 타이머로 관리하면 파킨슨의 법칙(일은 주어진 시간만큼 늘어난다)을 극복하고 효율적으로 일할 수 있습니다. 프리랜서는 클라이언트별 작업 시간을 스톱워치로 기록하여 정확한 청구서를 작성합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">7. 명상 및 호흡 운동</h3>
              <p className="text-gray-700 text-sm">
                5분, 10분, 20분 등 정해진 시간 동안 명상하거나, 4-7-8 호흡법(4초 들이마시기, 7초 멈추기, 8초 내쉬기)처럼 정확한 시간이 중요한 호흡 운동에서 타이머를 사용합니다. 알람 소리가 부드럽게 끝을 알려주어 시간 걱정 없이 집중할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 시간 관리의 원리 */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">시간 관리의 과학적 원리</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">파킨슨의 법칙 (Parkinson's Law)</h3>
              <p className="text-gray-700 text-sm">
                "일은 그것을 완수하는 데 필요한 시간만큼 늘어난다"는 법칙입니다. 마감 시한이 없으면 불필요한 세부 사항에 시간을 낭비하게 됩니다. 타이머로 명확한 시간 제한을 두면 집중력이 높아지고, 핵심 작업에 집중하게 되어 생산성이 향상됩니다. 이메일 답장에 15분, 회의에 30분처럼 시간을 할당하는 것이 효과적입니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">울트라디안 리듬 (Ultradian Rhythm)</h3>
              <p className="text-gray-700 text-sm">
                인간의 뇌는 약 90~120분 주기로 집중력이 높아졌다가 낮아지는 울트라디안 리듬을 따릅니다. 포모도로 기법의 25분 집중은 이 리듬의 절반 정도로, 피로가 쌓이기 전에 휴식을 취하게 합니다. 규칙적인 휴식은 뇌의 글리코겐(에너지원)을 회복시키고, 장기 기억 형성을 돕습니다. 따라서 장시간 공부보다 짧은 집중+휴식 반복이 학습 효율이 높습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">자이가르닉 효과 (Zeigarnik Effect)</h3>
              <p className="text-gray-700 text-sm">
                완료되지 않은 작업이 완료된 작업보다 더 잘 기억되는 심리 현상입니다. 포모도로 한 세션(25분)이 끝나도 작업이 완료되지 않으면, 뇌는 그 작업을 계속 생각하게 되어 휴식 후 더 빠르게 몰입할 수 있습니다. 이는 중간에 멈추는 것이 오히려 동기부여를 유지하는 데 도움이 됨을 의미합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">타임박싱 (Timeboxing)</h3>
              <p className="text-gray-700 text-sm">
                모든 작업에 고정된 시간 블록을 할당하는 기법입니다. "완벽할 때까지" 하는 것이 아니라 "정해진 시간 동안만" 합니다. 이는 완벽주의로 인한 지연을 방지하고, 여러 작업을 균형 있게 처리할 수 있게 합니다. 타이머는 이러한 시간 블록을 강제하여 결정 피로를 줄이고, 하루를 구조화하는 데 도움을 줍니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-800 mb-2">플로우 상태 (Flow State)와 시간 감각</h3>
              <p className="text-gray-700 text-sm">
                미하이 칙센트미하이의 플로우 이론에 따르면, 적절한 난이도의 작업에 완전히 몰입하면 시간 감각을 잃고 최고의 생산성을 경험합니다. 그러나 플로우 상태에서는 시간이 빠르게 지나가므로, 건강을 위해 주기적인 휴식이 필요합니다. 타이머는 플로우를 방해하지 않으면서도 과도한 집중으로 인한 피로를 방지합니다.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                포모도로 기법의 25분은 왜 25분인가요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 프란체스코 치릴로가 실험을 통해 발견한 최적 시간입니다. 25분은 대부분의 사람이 높은 집중력을 유지할 수 있으면서도 부담스럽지 않은 길이입니다. 너무 짧으면 몰입하기 어렵고, 너무 길면 피로가 쌓입니다. 개인차가 있으므로 15~50분 사이에서 자신에게 맞는 시간을 찾는 것도 좋습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                타이머가 끝났는데 알람이 들리지 않아요.
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 브라우저의 소리 설정이나 기기 볼륨이 음소거되어 있는지 확인하세요. 일부 브라우저는 사용자가 페이지와 상호작용(클릭)하기 전에는 자동 재생을 차단합니다. 타이머 시작 전에 버튼을 클릭하면 알람이 정상적으로 작동합니다. 또한 다른 탭을 보고 있어도 알람은 울립니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                스톱워치의 정확도는 얼마나 되나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 이 스톱워치는 10밀리초(0.01초) 단위까지 측정합니다. JavaScript의 setInterval 함수는 브라우저와 시스템 부하에 따라 약간의 오차가 있을 수 있지만, 일상적인 사용에는 충분히 정확합니다. 올림픽 수준의 정밀 측정이 필요하다면 전문 장비를 사용하는 것이 좋습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                랩타임은 몇 개까지 기록할 수 있나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 이론적으로는 제한이 없지만, 너무 많은 랩타임을 기록하면 브라우저 성능에 영향을 줄 수 있습니다. 일반적인 사용(100개 미만)에서는 전혀 문제없습니다. 랩타임 목록은 스크롤 가능하며, 가장 최근 기록이 위에 표시됩니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                탭을 닫으면 타이머가 멈추나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 네, 브라우저 탭을 닫거나 새로고침하면 타이머 상태가 초기화됩니다. 현재 이 도구는 로컬 저장소에 상태를 저장하지 않으므로, 장시간 타이머를 사용할 때는 탭을 유지하세요. 다른 탭을 보거나 최소화하는 것은 괜찮으며, 타이머는 백그라운드에서 계속 작동합니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-purple-600 mr-2">Q.</span>
                포모도로 휴식 시간을 건너뛸 수 있나요?
              </h3>
              <p className="text-gray-700 text-sm pl-6">
                <span className="text-purple-600 font-bold">A.</span> 기술적으로는 휴식 시간을 건너뛰고 바로 다음 집중 시간을 시작할 수 있지만, 권장하지 않습니다. 휴식은 뇌의 에너지를 회복하고 장기 기억을 형성하는 데 필수적입니다. 휴식을 건너뛰면 점차 집중력이 떨어지고 번아웃으로 이어질 수 있습니다. 5분 휴식이라도 꼭 지키는 것이 장기적으로 생산성을 높입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">사용 가이드</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong className="text-blue-600">⏱️ 타이머:</strong> 시간을 설정하고 시작 버튼을 누르면 카운트다운이 시작됩니다. 0초가 되면 알람이 울립니다.
            </div>
            <div>
              <strong className="text-green-600">⏲️ 스톱워치:</strong> 시작 버튼을 누르면 시간 측정이 시작되고, 랩타임 버튼으로 구간 기록을 남길 수 있습니다.
            </div>
            <div>
              <strong className="text-red-600">🍅 포모도로:</strong> 기본 25분 집중 + 5분 휴식 사이클입니다. 설정에서 시간을 변경할 수 있으며, 완료한 포모도로 개수가 기록됩니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
