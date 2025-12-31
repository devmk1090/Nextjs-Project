import { Metadata } from "next";
import TimerStopwatch from "./TimerStopwatch";

export const metadata: Metadata = {
  title: "타이머 & 스톱워치 - 포모도로 기법, 시간 측정, 랩타임 기록",
  description:
    "무료 온라인 타이머, 스톱워치, 포모도로 타이머를 한 곳에서 이용하세요. 카운트다운 타이머로 요리, 운동 시간을 측정하고, 스톱워치로 랩타임을 기록하며, 포모도로 기법(25분 집중 + 5분 휴식)으로 생산성을 높이세요. 알람 기능, 랩타임 기록, 완료 포모도로 추적 기능 제공. 공부, 업무, 운동, 명상, 회의 시간 관리에 최적화된 도구입니다.",
  keywords: [
    "타이머",
    "스톱워치",
    "포모도로",
    "포모도로 기법",
    "pomodoro",
    "온라인 타이머",
    "카운트다운",
    "시간 측정",
    "랩타임",
    "알람",
    "집중 타이머",
    "생산성 도구",
    "시간 관리",
    "공부 타이머",
    "운동 타이머",
    "요리 타이머",
    "무료 타이머",
  ],
  openGraph: {
    title: "타이머 & 스톱워치 - 포모도로, 시간 측정",
    description:
      "무료 온라인 타이머, 스톱워치, 포모도로 타이머. 요리, 운동, 공부, 업무 시간 관리의 필수 도구",
    type: "website",
  },
};

export default function Page() {
  return <TimerStopwatch />;
}
