import { AspectRatio } from "@chakra-ui/react";

type YoutubePlayerProp = {
  videoId: string
}
export default function YoutubePlayer(prop: YoutubePlayerProp) {
  return (
    <AspectRatio w={"md"} mt={'5'} maxW='560px' ratio={16 / 9}>
      <iframe
        src={`https://www.youtube.com/embed/${prop.videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </AspectRatio>
  )
}
