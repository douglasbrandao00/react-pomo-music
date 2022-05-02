import { Button, FormControl, FormLabel, Grid, GridItem, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { Dispatch, useEffect, useState } from "react"
import { convertSecondsToMinutes, PomoStatus, PomoTimer } from "../pomodoroUtilites"

type CustomPomodoroTimeSettingsProps = {
  showForm: boolean
  setPomoTimer: Dispatch<PomoTimer>
}
const defaultCustomTimer = { work: 0, rest: 0 }
export default function CustomPomodoroTimeSettings(prop: CustomPomodoroTimeSettingsProps) {
  const [customPomoTimer, setCustomTimer] = useState<PomoTimer>(defaultCustomTimer)
  const [isFormValid, setFormValidit] = useState<boolean>(false)
  function handleCustomPomoTimer(pomoProp: PomoStatus) {
    return (_: string, newValue: number) => {
      if (pomoProp === 'WORK') {
        setCustomTimer({
          rest: customPomoTimer.rest,
          work: convertSecondsToMinutes(newValue)
        })
        return
      }
      setCustomTimer({ work: customPomoTimer.work, rest: convertSecondsToMinutes(newValue) })
    }
  }

  useEffect(() => {
    const isValid = customPomoTimer.work > 0 || customPomoTimer.rest > 0
    if (isValid) {
      setFormValidit(false)
      return
    }
    setFormValidit(true)
  }, [customPomoTimer])

  function setTimer() {
    if (isFormValid) {
      prop.setPomoTimer(customPomoTimer)
      setCustomTimer(defaultCustomTimer)
      return
    }
  }

  if (!prop.showForm) {
    return <></>
  }
  return (
    < Grid alignItems='center' templateColumns='repeat(2, 1fr)' gap={2}>
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
        disabled={isFormValid}
        onClick={setTimer}
      >
        Submit
      </Button>
    </Grid>
  )
}
