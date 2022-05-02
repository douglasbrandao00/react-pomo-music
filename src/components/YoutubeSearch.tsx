import queryString from 'query-string'
import axios from "axios"
import _ from "lodash"
import { Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import YoutubeSearchResult from './YoutubeSearchResult'
import YoutubePlayer from './YoutubePlayer'
import { SearchIcon } from '@chakra-ui/icons'


const YOUTUBE_KEY = "AIzaSyDVlHGOhwMmRwN0WJ-oJGEHeUhE61VRupY"

type StringOrUndefined = string | undefined
export type YoutubeVideo = {
  videoId: string,
  title: string,
  tumbnail: string,
  channelId: string,
  channelName: string
}

export default function YoutubeSearch() {
  const [previousPageToken, setPreviousPageToken] = useState<StringOrUndefined>(undefined)
  const [nextPageToken, setNextPageToken] = useState<StringOrUndefined>(undefined)
  const [searchQuery, setSearchQuery] = useState<StringOrUndefined>(undefined)
  const [videoList, setVideoList] = useState<YoutubeVideo[]>()
  const [selectedVideo, setSelectedVideo] = useState<string>("")

  function selectVideo(videoId: string) {
    setVideoList(undefined)
    setSelectedVideo(videoId)
  }
  async function previousPage() {

    await search(previousPageToken)
  }
  async function nextPage() {
    await search(nextPageToken)
  }

  async function search(pageId: StringOrUndefined = undefined) {
    const searchCriteria = {
      key: YOUTUBE_KEY,
      q: searchQuery,
      part: "snippet",
      type: "video",
      maxResults: 5
    }
    const fields = "prevPageToken,nextPageToken,items/id/videoId,items/snippet/title,items/snippet/channelId,items/snippet/channelTitle,items/snippet/thumbnails/medium/url"
    const url = "https://www.googleapis.com/youtube/v3/search"
    const queryPage = pageId ? { pageToken: pageId } : {}
    const query = queryString.stringify({ ...searchCriteria, ...queryPage })

    const response = await axios.get(`${url}?${query}&fields=${fields}`)

    const searchResult = response
      .data
      .items
      .map((item: any) => {
        const { snippet } = item
        return {
          videoId: item.id.videoId,
          title: snippet.title,
          tumbnail: snippet.thumbnails.medium.url,
          channelId: snippet.channelId,
          channelName: snippet.channelTitle
        }
      })
    setPreviousPageToken(response.data.prevPageToken)
    setNextPageToken(response.data.nextPageToken)
    setVideoList(searchResult)
  }
  function searchTerm() {
    function debouncedSearch(event: ChangeEvent<HTMLInputElement>) {
      setSearchQuery(event.target.value)
      search()
    }
    return _.debounce(debouncedSearch, 400, { leading: false })
  }

  return (
    <>
      <Stack mb={"5"} spacing={4}>
        <InputGroup>
          <InputLeftAddon children={<SearchIcon color='gray.800' />} />
          <Input type='text' placeholder='Type to search...' onChange={searchTerm()} />
        </InputGroup>
      </Stack>
      {
        videoList?.length &&
        <YoutubeSearchResult
          videoList={videoList}
          onSelect={selectVideo}
          onPrevious={previousPage}
          onNext={nextPage}
        />}
      {selectedVideo && <YoutubePlayer videoId={selectedVideo} />}
    </>
  )
}
