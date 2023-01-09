import { AbsoluteFill, Audio, Video } from "remotion";
// import { preloadVideo } from "@remotion/preload";
import { ProjectURL } from "../constants";

const AnimationVideo: React.FC<{ AnimationAudioURL: string }> = ({
  AnimationAudioURL,
}) => {
  //   preloadVideo("/CRAnimation.mp4");
  return (
    <AbsoluteFill>
      <Video src={`${ProjectURL}/CRAnimation.mp4`} />

      <Audio src={AnimationAudioURL} />
    </AbsoluteFill>
  );
};

export default AnimationVideo;
