import { useState } from 'react'
import Countdown from './components/countdown'
import './App.css'

function App() {
  const [timeDown, setTimeDown] = useState<number>(5)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  function resetTimeDown() {
    setIsPlaying(false)
    return setTimeout(() => {
      return setIsPlaying(true)
    }, 200);
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
