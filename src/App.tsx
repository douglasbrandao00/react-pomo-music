import { useEffect, useState } from 'react'
import ConfigBar from './components/ConfigBar'
import Countdown from './components/Countdown'
import YoutubeSearch from './components/YoutubeSearch'
import { Box, Button, ButtonGroup, Center, FormControl, FormLabel, Grid, GridItem, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from '@chakra-ui/react'
import { convertSecondsToMinutes, DEFAULT_POMO_50_10, playBellSound, PomoStatus, PomoTimer } from './pomodoroUtilites'
import PomodoroTimeSettings from './components/PomodoroTimeSettings'

function App() {
  const [pomoTimer, setPomoTimer] = useState<PomoTimer>(DEFAULT_POMO_50_10)
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
  useEffect(() => {
    setTimeDown(pomoTimer.work)
    setPomodoroTo('WORK')
    return () => { }
  }, [pomoTimer])
  return (
    <Center flexDirection={'column'}>
      <ConfigBar
        setPomoTimer={setPomoTimer}
      />
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
          countDownKey={pomoKey}
          onComplete={resetTimeDown}
        />
        {isPlaying && <Button my={"4"} colorScheme={"orange"} onClick={() => setIsPlaying(false)}>pause</Button>}
        {!isPlaying && <Button my={"4"} colorScheme={"messenger"} onClick={() => setIsPlaying(true)}>start</Button>}
      </Box>
      <YoutubeSearch />
    </Center>
  )
}

export default App
