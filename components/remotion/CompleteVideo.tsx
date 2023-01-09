import Intro from "./Intro";
import AnimationVideo from "./AnimationVideo";
import Animation from "./Animation";

import { AbsoluteFill, Sequence } from "remotion";

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
        {animationRenderer == "threejs" ? (
          // This renders the Threejs canvas
          <Animation AnimationAudioURL={AnimationAudioURL} />
        ) : (
          //  This plays a pre-rendered mp4 of the Threejs animation
          <AnimationVideo AnimationAudioURL={AnimationAudioURL} />
        )}
      </Sequence>
    </AbsoluteFill>
  );
};

export default CompleteVideo;
