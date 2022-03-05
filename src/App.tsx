import { useState } from 'react'
import Countdown from './components/countdown'
import './App.css'

function playBellSound() {
  const AUDIO_ASSET_PATH = '../../assets/bell.wav'
  const bell = new Audio(AUDIO_ASSET_PATH)
  bell.pause()
  bell.play()
  return setTimeout(() => {
    bell.pause()
  }, 3_000)

}
function App() {
  const [timeDown, setTimeDown] = useState<number>(120)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  function resetTimeDown() {
    playBellSound()
  }
  return (
    <div className="App">
      <header className="App-header">
        <Countdown
          timeDown={timeDown}
          isPlaying={isPlaying}
          onComplete={resetTimeDown}
        />
      </header>
    </div>
  )
}

export default App
