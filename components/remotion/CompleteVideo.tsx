import Intro from "./Intro";
import AnimationVideo from "./AnimationVideo";
import Animation from "./Animation";
import { AbsoluteFill, Audio, prefetch, Sequence } from "remotion";
import { ProjectURL } from "../constants";

const CompleteVideo: React.FC<{
  animationRenderer: string;
  AnimationAudioURL: string;
  CubanoFontFamily: string;
  selectedDate: Date;
}> = ({
  animationRenderer,
  AnimationAudioURL,
  CubanoFontFamily,
  selectedDate,
}) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={47}>
        <Intro
          CubanoFontFamily={CubanoFontFamily}
          selectedDate={selectedDate}
        />
      </Sequence>
      <Sequence from={47}>
        <Audio src={AnimationAudioURL} />
        {animationRenderer == "threejs" ? (
          // This renders the Threejs canvas
          <Animation />
        ) : (
          //  This plays a pre-rendered mp4 of the Threejs animation
          <AnimationVideo />
        )}
      </Sequence>
    </AbsoluteFill>
  );
};

export default CompleteVideo;
