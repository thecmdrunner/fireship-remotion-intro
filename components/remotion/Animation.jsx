import { ThreeCanvas } from "@remotion/three";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  OrbitControls,
  Text,
  PerspectiveCamera,
  useGLTF,
  Sparkles,
} from "@react-three/drei";
// import * as THREE from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

const FireshipLogo = "/fireship-simple.glb";
const CodeReportText = "/code-report.glb";
const fireshipTexture = "/big-gradient.png";

const Animation = ({ AnimationAudioURL }) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  // Interpolate
  const cameraX = 0;
  const cameraY = interpolate(frame, [0, durationInFrames / 2], [0, 0], {
    extrapolateRight: "clamp",
  });
  const cameraZ = interpolate(frame, [0, durationInFrames / 2], [-7, -7], {
    extrapolateRight: "clamp",
  });

  const modelScale = interpolate(frame, [0, fps / 4], [30, 30], {
    extrapolateRight: "clamp",
  });
  // const modelRotate = interpolate(frame, [0, durationInFrames], [0, 0]);
  const modelPositionY = interpolate(frame, [0, fps / 4], [-7, -3], {
    extrapolateRight: "clamp",
  });
  const modelPositionZ = spring({
    frame: frame - fps / 10,
    fps,
    config: {
      stiffness: 31,
      // mass: 0.5,
    },
    from: -500,
    to: 0,
    durationInFrames: 30,
  });

  const textPositionX = interpolate(frame, [0, fps / 4], [-3, -6.15], {
    extrapolateRight: "clamp",
  });
  const textPositionY = modelPositionY - 8.5;
  const textPositionZ = spring({
    frame: frame - 6,
    fps,
    config: {
      // stiffness: 31,
      damping: 2000,
    },
    from: -850,
    to: 0,
    durationInFrames: 30,
  });
  // const TextGradientColors = interpolateColors(
  // 	frame,
  // 	[0, durationInFrames / 2 - 10, durationInFrames * 0.75, durationInFrames],
  // 	['#c4eeff', 'white', '#c4eeff', 'white']
  // );
  const TextGradientColors = "white";
  const textScale = interpolate(frame, [0, fps / 4], [30, 40], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(
    frame,
    [durationInFrames / 2, durationInFrames - fps],
    [1, 1]
  );

  // Load assets
  const FireshipLogoObject = useGLTF(FireshipLogo);
  const TextObject = useGLTF(CodeReportText);

  // Load gradient map
  const fireshipGradient = useLoader(TextureLoader, fireshipTexture);

  return (
    <div
      style={{
        backgroundColor: interpolateColors(
          frame,
          [0, durationInFrames],
          ["#18181F", "#000"]
        ),
      }}
    >
      <ThreeCanvas linear width={width} height={height}>
        <PerspectiveCamera position={[cameraX, cameraY, cameraZ]}>
          <group dispose={null}>
            <directionalLight
              intensity={interpolate(
                frame,
                [0, durationInFrames - 10, durationInFrames],
                [0.9, 0.7, 0]
              )}
              position={[
                10,

                interpolate(
                  frame,
                  [durationInFrames / 3, durationInFrames],
                  [150, -50]
                ),

                250,
              ]}
              // args={["wireframe"]}
            />
            <mesh
              position={[-5, modelPositionY, modelPositionZ]}
              geometry={FireshipLogoObject.nodes.Curve.geometry}
              scale={modelScale}
              material={FireshipLogoObject.materials.SVGMat}
            >
              <meshStandardMaterial map={fireshipGradient} />
            </mesh>
            <mesh
              position={[textPositionX, textPositionY, textPositionZ]}
              geometry={TextObject.nodes.path240001.geometry}
              scale={textScale}
              material={TextObject.materials["SVGMat.015"]}
            >
              <meshStandardMaterial color={TextGradientColors} map={""} />
            </mesh>
          </group>

          <Sparkles
            position={[
              0,
              0,
              interpolate(
                frame,
                // [durationInFrames / 2, (3 * durationInFrames) / 4],
                [fps, durationInFrames],
                [-70, 160]
                // [80, -140]
                // [0, -150]
              ),
            ]}
            count={2000}
            speed={0}
            // noise={1}
            scale={200}
            size={30}
          />

          <OrbitControls />
        </PerspectiveCamera>
      </ThreeCanvas>

      <Audio src={AnimationAudioURL} />
      {/* <Audio src={static1File(AnimationAudioURL)} /> */}
    </div>
  );
};

export default Animation;
