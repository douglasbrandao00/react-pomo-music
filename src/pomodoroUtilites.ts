
export const SECONDS_IN_ONE_MINUTE = 60

export function playBellSound() {
  const AUDIO_ASSET_PATH = '../../assets/bell.wav'
  const bell = new Audio(AUDIO_ASSET_PATH)
  bell.pause()
  bell.play()
  return setTimeout(() => {
    const interval = setInterval(() => {
      bell.volume = bell.volume * 0.90
    }, 200)
    setTimeout(() => clearInterval(interval), 1_000)
  }, 3_000)

}
export type PomoTimer = {
  work: number,
  rest: number
}
export type PomoStatus = 'WORK' | 'REST'
export const DEFAULT_POMO_25_05: PomoTimer = {
  work: convertSecondsToMinutes(25),
  rest: convertSecondsToMinutes(5)
}
export const DEFAULT_POMO_50_10: PomoTimer = {
  work: convertSecondsToMinutes(50),
  rest: convertSecondsToMinutes(10)
}
export function convertSecondsToMinutes(seconds: number) {
  return seconds * SECONDS_IN_ONE_MINUTE
}

