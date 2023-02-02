import { AbsoluteFill, prefetch, Video } from "remotion";

import { animationVideoURL } from "../constants";

const { free, waitUntilDone } = prefetch(animationVideoURL);

waitUntilDone().then(() => {
  console.log("Animation video has finished loading");
});

const AnimationVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Video src={animationVideoURL} />

      {/* <Audio src={AnimationAudioURL} /> */}
    </AbsoluteFill>
  );
};

export default AnimationVideo;
