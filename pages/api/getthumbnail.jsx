import { ImageResponse } from "@vercel/og";
import { NextFont } from "@next/font/dist/types";
import localFont from "@next/font/local";
import { Noto_Color_Emoji } from "@next/font/google";
const CubanoFont = localFont({
  src: "../../components/Cubano.woff2",
});

const notoemoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["latin"],
});

export const config = {
  runtime: "experimental-edge", // perhaps some other day...
};

// Returns formatted date object
// const GetToday = (today) => {
//   const day = today.toLocaleDateString("en-US", { day: "numeric" });
//   const month = today.getMonth(); // This only gets you the month number
//   const year = today.getFullYear();

//   const monthNames = [
//     "JANUARY",
//     "FEBRUARY",
//     "MARCH",
//     "APRIL",
//     "MAY",
//     "JUNE",
//     "JULY",
//     "AUGUST",
//     "SEPTEMBER",
//     "OCTOBER",
//     "NOVEMBER",
//     "DECEMBER",
//   ];

//   // Get last digit of date to determine suffix
//   let dateLastDigit = day % 10;

//   // Figure out date suffix
//   let dateSuffix = "th";
//   if (dateLastDigit == 1 && day == 11) {
//     dateSuffix = "th";
//   } else if (dateLastDigit == 1 && day != 11) {
//     dateSuffix = "st";
//   } else if (dateLastDigit == 2 && day != 12) {
//     dateSuffix = "nd";
//   } else if (dateLastDigit == 3 && day != 13) {
//     dateSuffix = "rd";
//   }

//   const DateObject = {
//     date: `${day}`,
//     dateSuffix: `${dateSuffix}`,
//     month: monthNames[month], // returns three-lettered month
//     year,
//   };

//   return DateObject;
// };

export default function handler(req) {
  // const { searchParams } = new URL(req.url);

  console.log("💅🏻 Trying to serve thumbnail");

  return new ImageResponse(
    <div className="bg-red-500">Some emojis: 😇🚀</div>,

    {
      width: 1920 / 2,
      height: 1080 / 2,
    }
  );
}
