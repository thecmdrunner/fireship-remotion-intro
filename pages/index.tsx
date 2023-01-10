import { AbsoluteFill } from "remotion";
import { Player, RenderPoster } from "@remotion/player";
import { preloadAudio, resolveRedirect } from "@remotion/preload";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import CompleteVideo from "../components/remotion/CompleteVideo";
import { ProjectURL } from "../components/constants";
import dayjs from "dayjs";
import { Calendar } from "@mantine/dates";
import { SegmentedControl } from "@mantine/core";
import localFont from "@next/font/local";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { NextFont } from "@next/font/dist/types";
import Image from "next/image";

interface TTSServerResponse {
  msg: string;
  url?: string;
  error?: string;
}

// Cubano Font
const CubanoFont: NextFont = localFont({ src: "../components/Cubano.woff2" });

// API
const API_URL = ProjectURL + "/api/geturl";

// Date when the page is rendered for the first time
const initialDate = new Date();

// Send this to API for response
const createServerReqObject = (dateToSpeak: string) => {
  return {
    ssml: `<speak> It is ${dateToSpeak} and <emphasis level="moderate"> YOU </emphasis> are watching <emphasis level="moderate"> THE CODE REPORT. </emphasis></speak>`,
    text: `It is ${dateToSpeak}, and you are watching the code report!`,
  };
};

// Fetch response from API
const getTTSFromAPI = async (
  API_URL: string,
  POSTObject: object
): Promise<TTSServerResponse> => {
  const data = await axios.post(API_URL, POSTObject).then((someData) => {
    return someData.data;
  });

  return data;
};

// const fetchDynamicVideoThumbnail = async (providedDate: Date) => {
//   const today = GetToday(providedDate);
//   const imgURL = ProjectURL + `/api/getthumbnail?`;
// };

const Home: NextPage<{
  data: TTSServerResponse;
}> = (props) => {
  const { data } = props;

  const playerRef = useRef(null);
  const [dateProp, setDateProp] = useState<Date>(initialDate);
  const [audioToLoad, setAudioToLoad] = useState<string>(data.url);
  const [animationRenderer, setAnimationRenderer] = useState<string>("mp4"); // possible values: "threejs", "mp4"

  const changeDateAndFetchNewAudio = async (newSetDate: Date) => {
    console.log(`Setting new audio URL...`);

    setDateProp(newSetDate);

    // fetch new tts audio with new date
    const newDate = GetToday(newSetDate);
    const dateToSpeak = `${newDate.month} ${newDate.date}${newDate.dateSuffix} ${newDate.year}`;

    // Fetch data from external API
    const POSTObject = createServerReqObject(dateToSpeak);

    const newFirebaseURL = await getTTSFromAPI(API_URL, POSTObject).then(
      (apiRes) => {
        const newURL = apiRes.url;
        return newURL;
      }
    );

    // console.log(`🌟 Here is your new data from server: `, newFirebaseURL);

    // finally set new firebase url as audio url now.
    setAudioToLoad(newFirebaseURL);
    console.log(`🎵 New audio URL set!`);
  };

  const fetchNewAudio = async (newSetDate: Date) => {
    console.log(`Fetching new audio URL...`);

    // fetch new tts audio with new date
    const newDate = GetToday(newSetDate);
    const dateToSpeak = `${newDate.month} ${newDate.date}${newDate.dateSuffix} ${newDate.year}`;

    // Fetch data from external API
    const POSTObject = createServerReqObject(dateToSpeak);

    const newFirebaseURL = await getTTSFromAPI(API_URL, POSTObject).then(
      (apiRes) => {
        const newURL = apiRes.url;
        return newURL;
      }
    );

    // console.log(`🌟 Here is your new data from server: `, newFirebaseURL);

    // finally set new firebase url as audio url now.
    setAudioToLoad(newFirebaseURL);
    console.log(`🎵 New audio URL set!`);
  };

  useEffect(() => {
    fetchNewAudio(dateProp);
  }, [dateProp]);

  // Fetch final audio link beyond directs
  let redirectedAudioToLoad = audioToLoad;
  resolveRedirect(audioToLoad)
    .then((resolved) => {
      // Was able to resolve a redirect, setting this as the audio to load
      redirectedAudioToLoad = resolved;
    })
    .catch((err) => {
      // Was unable to resolve redirect e.g. due to no CORS support
      console.log("Could not resolve redirect", err);
    })
    .finally(() => {
      // In either case, we try to preload the original or resolved URL
      preloadAudio(redirectedAudioToLoad);
    });

  const renderPoster: RenderPoster = useCallback(({ height, width }) => {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#202A36",
          color: "white",
          // backgroundImage: ProjectURL + `/api/getthumbnail`,
        }}
      >
        <Image
          width={800}
          height={800}
          alt="thumbnail"
          src={`http://localhost:3000/api/getthumbnail`}
        />
        Click to play! ({height}x{width})
      </AbsoluteFill>
    );
  }, []);

  const FirstHalfUI = () => {
    return (
      <div
        id="firstHalf"
        className="flex flex-col justify-start items-center w-full 2xl:w-3/5 h-max 2xl:h-full bg-gray-800 py-4 px-3"
      >
        <p className={`${CubanoFont.className} text-white text-3xl mb-6`}>
          Code Report for {`${GetToday(dateProp).date}`}
          <span className="text-[24px]">{`${
            GetToday(dateProp).dateSuffix
          }`}</span>
          {` ${GetToday(dateProp).month} ${GetToday(dateProp).year}`}
        </p>
        <div className="my-4 text-white text-lg">
          <p className="text-center font-bold my-1">
            Render animation via
            <span
              className="italic font-normal"
              onClick={() => {
                playerRef.current.seekTo(80);
              }}
            >
              {" ("}skip to{" "}
              <code className="cursor-pointer bg-gray-700 text-yellow-400 rounded-md px-2 py-1">
                01:20
              </code>
              {")"}
            </span>
          </p>
          {/* <span className="mx-2">Default 👉</span> */}
          <span className="inline-block">
            <SegmentedControl
              color="blue"
              size="lg"
              radius="sm"
              value={animationRenderer}
              onChange={setAnimationRenderer}
              data={[
                { label: "📽 MP4 Video", value: "mp4" },
                {
                  label: "🪩 Three.js Canvas",
                  value: "threejs",
                },
              ]}
            />
          </span>

          {/* <span className="mx-2">🤘 Special</span> */}
        </div>
        <div className="bg-white mb-8 w-5/6 max-w-full 2xl:mx-8 2xl:mt-4 flex justify-center items-center h-max px-3 py-3 rounded-3xl border border-white">
          <Player
            ref={playerRef}
            style={{
              width: "100%",
              borderRadius: "1rem",
            }}
            component={CompleteVideo}
            // renderPoster={renderPoster}
            showPosterWhenUnplayed={true}
            durationInFrames={47 + 240 / 2}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            autoPlay={false}
            clickToPlay={animationRenderer == "mp4"} // For less annoying panning in threejs
            initiallyShowControls
            spaceKeyToPlayOrPause
            loop={false} // Avoids audio delay and glitches
            controls
            inputProps={{
              animationRenderer: animationRenderer,
              AnimationAudioURL: audioToLoad,
              selectedDate: dateProp,
              CubanoFontFamily: CubanoFont.className,
            }}
          />
        </div>

        <Footer />
      </div>
    );
  };

  const SecondHalfUI = () => {
    return (
      <div
        id="secondHalf"
        className="flex flex-col justify-start lg:w-2/3 2xl:w-2/5 2xl:px-1 px-5 pt-4 pb-8"
      >
        <div className="flex flex-wrap w-full items-start justify-center">
          <div className="border-2 bg-gray-50 border-gray-400 rounded-2xl mx-8 px-4 py-4">
            <Calendar
              className="select-none"
              value={dateProp}
              onChange={setDateProp}
              // Absolute Dates
              // minDate={dayjs(new Date("December 1, 2022 23:15:30")).toDate()}
              // maxDate={dayjs(new Date("February 28, 2023 23:15:30")).toDate()}
              // Relative dates
              minDate={dayjs(new Date())
                .startOf("month")
                .subtract(15, "days")
                .toDate()}
              maxDate={dayjs(new Date())
                .endOf("month")
                .add(15, "days")
                .toDate()}
            />
          </div>
          <div className="max-w-xl min-w-0 text-xl flex flex-wrap flex-col text-center items-center justify-center">
            <div className="bg-cyan-400 p-2 rounded-md font-semibold my-2">
              A new voice gets synthesized for each new date, and is cached in a
              firebase bucket.
            </div>
            <div className="bg-yellow-400 p-2 rounded-md font-semibold my-2">
              Only 15 days of the previous and next months are shown, to keep
              the Google Cloud billing in control.
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-6">
          <ol className="wrap w-5/6 text-xl font-sans">
            <p className="mb-4 text-3xl underline font-semibold italic">
              How to use?
            </p>

            {/* <br /> */}
            <li className="list-decimal">
              Pause the video and change the date to see it reflect in the video
              programatically - from{" "}
              <code
                onClick={() => {
                  playerRef.current.seekTo(23);
                }}
                className="bg-blue-300 hover:bg-blue-200 px-1 py-1 rounded cursor-pointer shadow-md select-none"
              >
                00:23
              </code>{" "}
              to{" "}
              <code
                onClick={() => {
                  playerRef.current.seekTo(44);
                }}
                className="bg-blue-300 hover:bg-blue-200 px-1 py-1 rounded cursor-pointer shadow-md select-none"
              >
                01:14
              </code>
              .
            </li>
            <li className="list-decimal">
              Wait for atleast 5 seconds before playing the video, because TTS
              audio takes time to generate and upload to cloud bucket.
            </li>
            <li className="list-decimal">
              It is recommended that you refresh your page after playing the{" "}
              <i>entire</i> video atleast once, so that consequent runs are much
              smoother.
            </li>
          </ol>

          <ul className="mt-6 text-bold w-5/6 text-xl font-sans">
            <li className="list-disc">
              ⚠️ Assets like fonts & audio will take a while to load, so be
              patient!
            </li>
            <li className="list-disc">
              👀 Keep an eye on the network tab in developer console.
              <br /> {"("} Press{" "}
              <span className="font-mono bg-gray-600 border border-gray-900 text-white rounded-md px-2 py-1">
                F12
              </span>
              {")"}
            </li>
          </ul>

          {/* <p className="text-xl mt-8 italic font-semibold text-center bg-yellow-400 px-3 py-2 rounded-xl"></p> */}
          {/* <p className="text-xl mx-2 mt-5 italic font-semibold text-center bg-cyan-300 px-3 py-2 rounded-xl"></p> */}
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="flex flex-col items-center py-4">
        <p className="text-white text-xl">
          Made possible by{" "}
          <Link href="https://www.remotion.dev/">
            <span className="text-yellow-400">Remotion</span>
          </Link>
          {" and "}
          <Link href="https://cloud.google.com/text-to-speech">
            <span className="text-yellow-400"> Google TTS</span>
          </Link>
          .
        </p>

        <p className="text-white mt-2 text-xl">
          Written in{" "}
          <Link href="https://nextjs.org/">
            <span className="text-yellow-400">Next.js</span>
          </Link>
          {", "}
          hosted on Vercel.
        </p>

        <div className="text-white mt-8 text-xl">
          Made with ❤️ by{" "}
          <Link href="https://github.com/thecmdrunner/fireship-remotion-intro">
            <code className="text-cyan-400 bg-gray-700 px-2 py-1 rounded-md">
              thecmdrunner
            </code>{" "}
            on GitHub
            {/* Github logo svg */}
            <svg
              role="img"
              className="text-white w-8 ml-[1ch] mb-1 inline-block lg:hover:-translate-y-1 hover:shadow-md transition-all"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              ></path>
            </svg>
          </Link>
        </div>

        <br className="select-none" />

        <p className="2xl:xl:hidden text-white italic underline animate-pulse font-semibold text-xl">
          Try changing the date on the calendar for the fun part 📅
        </p>
      </div>
    );
  };
  return (
    <div className="h-screen flex w-full 2xl:flex-row flex-col mx-auto selection:marker:bg-cyan-200">
      {FirstHalfUI()}
      {SecondHalfUI()}
    </div>
  );
};

// Returns formatted date object
const GetToday = (today: Date) => {
  const day: any = today.toLocaleDateString("en-US", { day: "numeric" });
  const month = today.getMonth(); // This only gets you the month number
  const year = today.getFullYear();

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  // Get last digit of date to determine suffix
  let dateLastDigit = day % 10;

  // Figure out date suffix
  let dateSuffix = "th";
  if (dateLastDigit == 1 && day == 11) {
    dateSuffix = "th";
  } else if (dateLastDigit == 1 && day != 11) {
    dateSuffix = "st";
  } else if (dateLastDigit == 2 && day != 12) {
    dateSuffix = "nd";
  } else if (dateLastDigit == 3 && day != 13) {
    dateSuffix = "rd";
  }

  const DateObject = {
    date: `${day}`,
    dateSuffix: `${dateSuffix}`,
    month: monthNames[month], // returns three-lettered month
    year,
  };

  return DateObject;
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  const Today = GetToday(new Date(initialDate));
  const dateToSpeak = `${Today.month} ${Today.date}${Today.dateSuffix} ${Today.year}`;

  // Fetch data from external API
  const POSTObject = createServerReqObject(dateToSpeak);

  const data = await getTTSFromAPI(API_URL, POSTObject);

  // Pass data to the page via props
  return { props: { data } };
};

export default Home;
