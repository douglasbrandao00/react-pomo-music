import { useState } from 'react'
import Countdown from './components/countdown'
import './App.css'
import { Box, Center } from '@chakra-ui/react'

function playBellSound() {
  const AUDIO_ASSET_PATH = '../../assets/bell.wav'
  const bell = new Audio(AUDIO_ASSET_PATH)
  bell.pause()
  bell.play()
  return setTimeout(() => {
    bell.pause()
  }, 3_000)

}
const pomoTimer = {
  work: 0.09 * 60,
  rest: 0.05 * 60
}
type PomoStatus = 'WORK' | 'REST'
function App() {
  const [timeDown, setTimeDown] = useState<number>(pomoTimer.work)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [pomodoroStatus, setPomodoroStatus] = useState<PomoStatus>('WORK')
  const [pomoKey, setPomoKey] = useState(0)

  function resetTimeDown() {
    playBellSound()
    setIsPlaying(false)
    revertStatus()
    setIsPlaying(true)
  }
  function revertStatus() {
    if (pomodoroStatus === 'WORK') {
      setPomodoroTo('REST')
      return
    }
    setPomodoroTo('WORK')
  }
  function setPomodoroTo(status: PomoStatus) {
    const time = status === 'WORK' ? pomoTimer.work : pomoTimer.rest
    setTimeDown(time)
    setPomodoroStatus(status)
    setPomoKey(state => state + 1)
  }
  return (
    <Center>
      <Box
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        maxW='sm'
        borderRadius='lg'

      >

        <Countdown
          timeDown={timeDown}
          isPlaying={isPlaying}
          key={pomoKey}
          onComplete={resetTimeDown}
        />

        {isPlaying && <button onClick={() => setIsPlaying(false)}>pause</button>}
        {!isPlaying && <button onClick={() => setIsPlaying(true)}>start</button>}

      </Box>
    </Center>

  )
}

export default App
