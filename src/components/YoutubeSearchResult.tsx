import { Box, List, ListItem, Image, Stack, Text, ButtonGroup, Button, Spacer } from '@chakra-ui/react'
import { YoutubeVideo } from './YoutubeSearch'

type YoutubeResult = {
  videoList: YoutubeVideo[] | undefined
  onSelect: (videoId: string) => void
  onPrevious: () => void
  onNext: () => void
}
export default function YoutubeSearchResult(prop: YoutubeResult) {
  return (
    <Stack>
      <ButtonGroup>
        <Button onClick={prop.onPrevious}>Prev</Button>
        <Spacer />
        <Button onClick={prop.onNext}>Next</Button>
      </ButtonGroup>
      {prop?.videoList?.map(video => {
        return (
          <Box
            mt={"5"}
            px={"2"}
            cursor={"pointer"}
            onClick={() => prop.onSelect(video.videoId)}
            border={"1px"}
            borderColor={"lightgray"}
            borderRadius={"lg"}
            shadow={"lg"}
            key={video.videoId}
            display={"flex"}
            flexDir={"row"}
            w={"md"}
            overflow='hidden'>
            <Box pr={"2"}>
              <Image
                w='100px'
                h="70px"
                maxW={"inherit"}
                objectFit='fill'
                src={video.tumbnail} />
            </Box>
            <Box display={"flex"} flexDir={"column"}>
              <Text fontSize={"md"}><strong>channel</strong>: {video.channelName}</Text>
              <Text fontSize={"sm"}><strong>tittle</strong>: {video.title}</Text>
            </Box>
          </Box>
        )
      })}
    </Stack>
  )
}
