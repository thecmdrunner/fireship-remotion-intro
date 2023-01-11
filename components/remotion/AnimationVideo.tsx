import { AbsoluteFill, Audio, prefetch, Video } from "remotion";
// import { preloadVideo } from "@remotion/preload";
import { ProjectURL } from "../constants";

const AnimationVideo: React.FC<{ AnimationAudioURL: string }> = ({
  AnimationAudioURL,
}) => {
  const videoURL = ProjectURL + "/CRAnimation.mp4";

  //   preloadVideo(videoURL);
  return (
    <AbsoluteFill>
      <Video src={videoURL} />

      <Audio src={AnimationAudioURL} />
    </AbsoluteFill>
  );
};

export default AnimationVideo;
