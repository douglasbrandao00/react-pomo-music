import { useEffect, useState } from "react";

const AUDIO_ASSET_PATH = '../../assets/bell.wav'
interface BellSoundProp {
  play: boolean
  playTimeInSeconds: number
}
function BellSound(props: BellSoundProp) {
  console.log(props.play);

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const bell = new Audio(AUDIO_ASSET_PATH)

  useEffect(() => {
    if (!isAudioPlaying) return
    bell.play()

    setTimeout(async () => {
      await bell.pause()
      setIsAudioPlaying(false)
    }, props.playTimeInSeconds * 1_000)
  }, [isAudioPlaying])

  useEffect(() => {
    setIsAudioPlaying(true)
  }, [props.play])
  return <div></div>
}

export default BellSound
