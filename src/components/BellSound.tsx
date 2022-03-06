import { useEffect, useState } from "react";

interface BellSoundProp {
  play: boolean
  playTimeInSeconds: number
}
function BellSound(props: BellSoundProp) {

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)

  useEffect(() => {
    if (!isAudioPlaying) return
    bell.play()
  }, [isAudioPlaying])

  useEffect(() => {
    setIsAudioPlaying(true)
  }, [props.play])
  return <div></div>
}

export default BellSound
