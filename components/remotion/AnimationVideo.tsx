import { AbsoluteFill, Audio, prefetch, Video } from "remotion";
// import { preloadVideo } from "@remotion/preload";
import { ProjectURL } from "../constants";

const videoURL =
  "https://res.cloudinary.com/drnm9lhef/video/upload/v1673514377/fireship-remotion-intro/CRAnimation_wvexmw.mp4";

const AnimationVideo: React.FC = () => {
  // ProjectURL + "/CRAnimation.mp4";

  //   preloadVideo(videoURL);
  return (
    <AbsoluteFill>
      <Video src={videoURL} />

      {/* <Audio src={AnimationAudioURL} /> */}
    </AbsoluteFill>
  );
};

export default AnimationVideo;
