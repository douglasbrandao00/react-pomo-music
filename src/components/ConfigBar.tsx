import React, { Dispatch } from "react"
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"
import PomodoroTimeSettings from "./PomodoroTimeSettings"
import { PomoTimer } from "../pomodoroUtilites"


type PomodoroTimeSettingsProps = {
  setPomoTimer: Dispatch<PomoTimer>,
}

export default function DrawerExample(prop: PomodoroTimeSettingsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button
        ref={btnRef}
        my={"4"}
        mr={"-56"}
        colorScheme='teal'
        onClick={onOpen}
      >
        Settings
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Pomodoro Settings</DrawerHeader>
          <DrawerBody >
            <PomodoroTimeSettings
              setPomoTimer={prop.setPomoTimer}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
