import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const SECONDS_IN_ONE_TIME = 60

function convertSecondsToTime(seconds: number) {
  const minutesInSeconds = Math.floor(seconds / SECONDS_IN_ONE_TIME)
  const secondsInTime = seconds % SECONDS_IN_ONE_TIME
  return {
    minutes: minutesInSeconds,
    seconds: secondsInTime
  }
}
function addPadStart(num: number): string {
  return String(num).padStart(2, '0')
}
function formatTime(time: { minutes: number, seconds: number }): string {
  return `${addPadStart(time.minutes)}:${addPadStart(time.seconds)}`
}

export interface CountdownProps {
  isPlaying: boolean;
  timeDown: number;
  key: number;
  onComplete: () => void
}

function Countdown(props: CountdownProps) {

  return (
    <CountdownCircleTimer
      isPlaying={props.isPlaying}
      duration={props.timeDown}
      strokeWidth={6}
      size={220}
      colors={'#FE6F6B'}
      key={props.key}
      onComplete={() => {
        props.onComplete()
        return { shouldRepeat: true, delay: 1 }
      }}
    >
      {({ remainingTime }) => formatTime(convertSecondsToTime(remainingTime))}
    </CountdownCircleTimer>

  )
}

export default Countdown
