import React, { ReactElement } from "react";
import {
  Audio,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { ProjectURL } from "../constants";
import { preloadAudio } from "@remotion/preload";
import { Press_Start_2P } from "@next/font/google";
import { Fira_Code } from "@next/font/google";

const pressstart2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});
const firacode = Fira_Code({
  weight: "400",
  subsets: ["latin"],
});

const Intro: React.FC<{
  selectedDate: Date;
  CubanoFontFamily: string;
}> = ({ selectedDate, CubanoFontFamily }) => {
  const frame: number = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const AudioURL =
    "https://res.cloudinary.com/drnm9lhef/video/upload/v1677604008/fireship-remotion-intro/camera-shutter.mp3";

  // Color for <AbsoluteFill/>
  const backgroundColor: string = "#100E18";

  // Timer based on 'frame'
  const timer = (frameNumber: number): string => {
    // calculating timer values, basic clock math
    let timerFrames = frameNumber % fps;
    let timerSeconds = Math.floor(frameNumber / fps);
    let timerMinutes = Math.floor(timerSeconds / 60);
    let timerHours = Math.floor(timerMinutes / 60);

    // Format single digit values with "0" prefix
    let formattedTimerFrames =
      timerFrames < 10 ? `0${timerFrames}` : timerFrames;
    let formattedTimerSeconds =
      timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds;
    let formattedTimerMinutes =
      timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes;
    let formattedTimerHours = timerHours < 10 ? `0${timerHours}` : timerHours;

    // Return formatted values in a timer-style string
    return `${formattedTimerHours}:${formattedTimerMinutes}:${formattedTimerSeconds}:${formattedTimerFrames}`;
  };

  const GetToday = (providedDate: Date) => {
    const today: Date = providedDate || new Date();
    const date: any = today.toLocaleDateString("en-US", { day: "numeric" });
    const month: number = today.getMonth(); // This only gets you the month number
    const year: number = today.getFullYear();

    // Three lettered Months
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // Get last digit of date to determine suffix
    let dateLastDigit = date % 10;

    // Figure out date suffix
    let dateSuffix = "th";

    if (dateLastDigit == 1 && date != 11) {
      dateSuffix = "st";
    } else if (dateLastDigit == 2 && date != 12) {
      dateSuffix = "nd";
    } else if (dateLastDigit == 3 && date != 13) {
      dateSuffix = "rd";
    }

    return {
      date: (
        <>
          {date}
          <span className="text-[14rem]">{dateSuffix}</span>
        </>
      ),
      month: monthNames[month], // returns three-lettered month
      year,
    };
  };

  const Today = GetToday(selectedDate);

  interface IntroWord {
    startFrame: number;
    word: number | string | ReactElement;
    duration: number;
    fontSize: string;
  }

  const introWords: IntroWord[] = [
    {
      startFrame: 0,
      word: "The",
      duration: 9,
      fontSize: "40rem",
    },
    {
      startFrame: 9,
      word: "Code",
      duration: 7,
      fontSize: "38rem",
    },
    {
      startFrame: 16,
      word: "Report",
      duration: 7,
      fontSize: "25rem",
    },
    {
      startFrame: 23,
      word: Today.month,
      duration: 7,
      fontSize: "45rem",
    },
    {
      startFrame: 30,
      word: Today.date,
      duration: 8,
      fontSize: "40rem",
    },
    {
      startFrame: 38,
      word: Today.year,
      duration: 7,
      fontSize: "40rem",
    },
    ,
  ];

  // Camera Recording UI
  const CameraUI: React.FC = () => {
    return (
      <svg
        width={width}
        height={height}
        className="h-full w-full absolute left-0 top-0 z-50"
      >
        <path
          style={{
            fill: "none",
            fillOpacity: 1,
            stroke: "#fff",
            strokeWidth: 10.9267,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
          d="M95.037 297.218v-175.25c0-25.565 20.581-46.146 46.146-46.146v0h263.973M1824.963 297.218v-175.25c0-25.565-20.581-46.146-46.146-46.146v0h-263.973M95.037 782.782v175.25c0 25.565 20.581 46.146 46.146 46.146v0h263.973M1824.963 782.782v175.25c0 25.565-20.581 46.146-46.146 46.146v0h-263.973"
        />
        <path
          style={{
            color: "#000",
            fill: "#fff",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          d="M1629.217 886.766c-5.393 0-9.822 4.43-9.822 9.822v36.47c0 5.393 4.429 9.823 9.822 9.823h95.268c5.393 0 9.824-4.43 9.824-9.824v-36.469c0-5.393-4.43-9.822-9.824-9.822zm0 5.662h95.268c2.354 0 4.16 1.807 4.16 4.16v36.47c0 2.353-1.806 4.161-4.16 4.161h-95.268c-2.354 0-4.16-1.808-4.16-4.162v-36.469c0-2.353 1.806-4.16 4.16-4.16z"
        />
        <path
          style={{
            fill: "#fff",
            strokeWidth: 1.31823,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          d="M1731.642 902.7h7.183a2.561 2.561 0 0 1 2.567 2.567v19.113a2.561 2.561 0 0 1-2.567 2.567h-7.183a2.561 2.561 0 0 1-2.567-2.567v-19.113a2.561 2.561 0 0 1 2.567-2.567z"
        />
        <path
          style={{
            fill: "#fff",
            strokeWidth: 8.68517,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          d="M1633.248 896.881h12.85a3.557 3.557 0 0 1 3.565 3.564v28.757a3.557 3.557 0 0 1-3.564 3.564h-12.85a3.557 3.557 0 0 1-3.565-3.564v-28.757a3.557 3.557 0 0 1 3.564-3.564zM1658.033 896.881h12.851a3.557 3.557 0 0 1 3.564 3.564v28.757a3.557 3.557 0 0 1-3.564 3.564h-12.85a3.557 3.557 0 0 1-3.565-3.564v-28.757a3.557 3.557 0 0 1 3.564-3.564zM1682.819 896.881h12.85a3.557 3.557 0 0 1 3.565 3.564v28.757a3.557 3.557 0 0 1-3.565 3.564h-12.85a3.557 3.557 0 0 1-3.565-3.564v-28.757a3.557 3.557 0 0 1 3.565-3.564z"
        />
      </svg>
    );
  };

  return (
    // items-center justify-center
    <div
      style={{ backgroundColor: "#18181F" }}
      className={`top-0 left-0 right-0 bottom-0 w-full h-full flex-col items-center justify-center`}
    >
      {introWords.map((item, index) => {
        return (
          <Sequence
            key={index}
            durationInFrames={item.duration}
            from={item.startFrame}
          >
            <p
              style={{
                fontSize: item.fontSize,
                // fontFamily: "Cubano",
              }}
              className={`${CubanoFontFamily} text-white mx-auto my-auto`}
            >
              {item.word}
            </p>
          </Sequence>
        );
      })}

      <p
        className={`${firacode.className} absolute w-full text-white text-[3.8rem] text-center bottom-16`}
      >
        {timer(frame)}
      </p>

      {/* CAMERA FRAME UI */}
      <CameraUI />

      {/* CAMERA RECORDING UI */}
      <div className="absolute right-40 text-white top-40 flex text-6xl">
        <span
          // style={{
          //   opacity: interpolate(
          //     frame,
          //     [0, (fps * 2) / 3, (fps * 4) / 3, fps * 2],
          //     [1, 0, 1, 0]
          //   ),
          // }}
          style={{
            opacity: interpolate(
              frame,
              [
                0,
                (durationInFrames - 5) / 4,
                (durationInFrames - 5) / 2,
                (3 * (durationInFrames - 5)) / 4,
                durationInFrames - 5,
              ],
              [1, 0, 1, 0, 1]
            ),
          }}
          className="text-red-500 relative bottom-7 text-8xl animate-puls"
        >
          ●
        </span>
        <p className={`${pressstart2p.className} pl-7`}>REC</p>
      </div>

      <Audio src={AudioURL} />
    </div>
  );
};

export default Intro;
