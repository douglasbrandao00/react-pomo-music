import { useEffect, useState } from 'react'
import ConfigBar from './components/ConfigBar'
import Countdown from './components/Countdown'
import './App.css'
import { Box, Button, ButtonGroup, Center, FormControl, FormLabel, Grid, GridItem, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from '@chakra-ui/react'

const SECONDS_IN_ONE_MINUTE = 60

function playBellSound() {
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
type PomoTimer = {
  work: number,
  rest: number
}
function convertSecondsToMinutes(seconds: number) {
  return seconds * SECONDS_IN_ONE_MINUTE
}
const DEFAULT_POMO_25_05: PomoTimer = {
  work: convertSecondsToMinutes(25),
  rest: convertSecondsToMinutes(5)
}
const DEFAULT_POMO_50_10: PomoTimer = {
  work: convertSecondsToMinutes(50),
  rest: convertSecondsToMinutes(10)
}
type PomoStatus = 'WORK' | 'REST'
function App() {
  const [pomoTimer, setPomoTimer] = useState<PomoTimer>(DEFAULT_POMO_50_10)
  const [showCustomPomoTimerForm, setShowCustomPomoTimerForm] = useState<boolean>(false)
  const [customPomoTimer, setCustomTimer] = useState<PomoTimer>({ work: 0, rest: 0 })
  const [timeDown, setTimeDown] = useState<number>(pomoTimer.work)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [pomodoroStatus, setPomodoroStatus] = useState<PomoStatus>('WORK')
  const [pomoKey, setPomoKey] = useState(0)

  function setCustomPomoTimer() {
    setPomoTimer(customPomoTimer)
  }
  function toggleShowCustomPomoTimerForm() {
    setShowCustomPomoTimerForm(!showCustomPomoTimerForm)
  }
  function handleCustomPomoTimer(pomoProp: PomoStatus) {
    return (_: string, newValue: number) => {
      if (pomoProp === 'WORK') {
        setCustomTimer({ rest: customPomoTimer.rest, work: convertSecondsToMinutes(newValue) })
        return
      }
      setCustomTimer({ work: customPomoTimer.work, rest: convertSecondsToMinutes(newValue) })
    }
  }
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
      <ConfigBar />
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

        {isPlaying && <button onClick={() => setIsPlaying(false)}>pause</button>}
        {!isPlaying && <button onClick={() => setIsPlaying(true)}>start</button>}

      </Box>
      <Box>
        <ButtonGroup>
          <Stack marginTop={'4'} spacing={4} direction='row' align='center'>
            <Button colorScheme='twitter' size='lg' onClick={() => setPomoTimer(DEFAULT_POMO_50_10)}>
              50 / 10
            </Button>
            <Button colorScheme='twitter' size='lg' onClick={() => setPomoTimer(DEFAULT_POMO_25_05)}>
              25 / 05
            </Button>
            <Button colorScheme='twitter' size='lg' onClick={() => toggleShowCustomPomoTimerForm()}>
              Custom
            </Button>
          </Stack>

        </ButtonGroup>
      </Box>
      {showCustomPomoTimerForm && < Grid alignItems='center' templateColumns='repeat(2, 1fr)' gap={2}>
        <GridItem>
          <FormControl>
            <FormLabel>Work time</FormLabel>
            <NumberInput
              placeholder="Work time in minutes"
              max={120}
              min={0}
              onChange={handleCustomPomoTimer('WORK')}
            >
              <NumberInputField id='work' /> <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Rest time</FormLabel>
            <NumberInput
              placeholder="Rest time in minutes"
              max={120}
              min={0}
              onChange={handleCustomPomoTimer('REST')}
            >
              <NumberInputField id='rest' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

        </GridItem>
        <Button
          mt={4}
          colorScheme='teal'
          size={'sm'}
          type='submit'
          onClick={setCustomPomoTimer}
        >
          Submit
        </Button>
      </Grid>
      }
    </Center>

  )
}

export default App
