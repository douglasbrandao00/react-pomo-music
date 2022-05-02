import { Box, Button, ButtonGroup, Stack } from "@chakra-ui/react"
import { Dispatch, useState } from "react"
import { DEFAULT_POMO_25_05, DEFAULT_POMO_50_10, PomoStatus, PomoTimer } from "../pomodoroUtilites"
import CustomPomodoroTimeSettings from "./CustomPomodoroTimeSettings"

type PomodoroTimeSettingsProps = {
  setPomoTimer: Dispatch<PomoTimer>,
}

export default function PomodoroTimeSettings(prop: PomodoroTimeSettingsProps) {
  const [showCustomPomoTimerForm, setShowCustomPomoTimerForm] = useState<boolean>(false)
  function toggleShowCustomPomoTimerForm() {
    setShowCustomPomoTimerForm(!showCustomPomoTimerForm)
  }
  return (
    <Box >
      <ButtonGroup alignContent={"center"} justifyContent={"center"}>
        <Stack marginTop={'4'} spacing={4} direction='column' align='center'>
          <Button
            colorScheme='twitter'
            size='lg'
            onClick={() => prop.setPomoTimer(DEFAULT_POMO_50_10)}
          >
            50 / 10
          </Button>
          <Button
            colorScheme='twitter'
            size='lg'
            onClick={() => prop.setPomoTimer(DEFAULT_POMO_25_05)}
          >
            25 / 05
          </Button>
          <Button
            colorScheme='twitter'
            size='lg'
            onClick={() => toggleShowCustomPomoTimerForm()}
          >
            Custom
          </Button>
          <CustomPomodoroTimeSettings
            showForm={showCustomPomoTimerForm}
            setPomoTimer={prop.setPomoTimer}
          />
        </Stack>
      </ButtonGroup>
    </Box>

  )
}
