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
  onComplete: () => void
}

function Countdown(props: CountdownProps) {
  return (
    <CountdownCircleTimer
      isPlaying={props.isPlaying}
      duration={props.timeDown}
      initialRemainingTime={props.timeDown}
      colors={'#004777'}
      onComplete={() => {
        props.onComplete
        return { shouldRepeat: true, delay: 0.2 }
      }}
    >
      {({ remainingTime }) => formatTime(convertSecondsToTime(remainingTime))}
    </CountdownCircleTimer>

  )
}

export default Countdown
