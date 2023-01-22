// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const { createHash } = require("crypto");
import md5 from "blueimp-md5";
import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import textToSpeech from "@google-cloud/text-to-speech";
import { NextApiRequest, NextApiResponse } from "next";

// Init TTS
const client = new textToSpeech.TextToSpeechClient();
// Initialize Firebase
initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
});

// For upload and creation reference
const bucketName = "tts-audio-files";

// process.env.GOOGLE_APPLICATION_CREDENTIALS = "serviceaccount.json";

const uploadToFirebase = async (audioData: any, fileName: string) => {
  // init firebase storage
  const storage = getStorage();

  // make a reference for file to upload
  const storageRef = ref(storage, `${bucketName}/${fileName}`);

  // upload file
  return uploadBytes(storageRef, audioData).then((snapshot) => {
    console.log("🫰🏼 File uploaded!");
    return snapshot; // returns a big object with lots of data about the file.
  });
}; // will return big object

const createFirebaseUrl = async (fullPathOfFile: string): Promise<string> => {
  // init firebase storage
  const storage = getStorage();

  // Return download URL
  return getDownloadURL(ref(storage, fullPathOfFile)).then((url) => {
    // console.log(`👉🏻 Here's the file URL:`);
    // console.table(url);
    return url;
  });
}; // will return url

const isAudioAlreadySynthesized = async (
  fileName: string
): Promise<string | false> => {
  try {
    // init firebase storage
    const storage = getStorage();

    // Try getting download URL
    return await getDownloadURL(ref(storage, `${bucketName}/${fileName}`))
      .then((url) => {
        // return URL if file exists
        console.log(`ℹ️ File already exists in bucket.`);
        return url;
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch {
    // Return false if not found
    return false;
  }
}; // return url if present, or else false

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Grab text, ssml, language config
  const {
    // audioEncoding,
    // voice,
    text,
    ssml,
  } = req.body;

  if (!text && !ssml) {
    return res.status(400).json({
      msg: "missing some arguments",
      error: "400 - BAD REQUEST",
    });
  }

  console.log("👉🏻 New request received:");
  console.table(req.body);

  // Make TTS file

  // Construct the GTTS request
  const gttsRequestObject: any = {
    // Set Raw text or ideally SSML (recommended)
    input: {
      // text,
      ssml,
    },
    // Set the language and voice.
    voice: {
      name: "en-US-News-M",
      languageCode: "en-US",
      // ssmlGender: 'NEUTRAL'
    },
    // select the type of audio encoding

    audioConfig: {
      // audioEncoding: "MP3",
      audioEncoding: "LINEAR16",
      effectsProfileId: ["large-home-entertainment-class-device"],
      pitch: 0,
      speakingRate: 1,
    },
  };

  const fileName = `${gttsRequestObject.voice.name}-${md5(
    text ? text : ssml
  )}.mp3`;

  // Check if audio already exists
  const doesAudioExist = await isAudioAlreadySynthesized(fileName);

  // Return url if file already exists
  if (doesAudioExist) {
    console.log("👌🏻 URL already exists.");
    return res.status(200).json({
      url: doesAudioExist,
    });
  }

  // AVOIDING CREATION OF NEW AUDIO FILES TO PREVENT API ABUSE

  // REMOVE THIS BLOCK TO REVERT BACK TO NORMAL BEHAVIOUR.
  // console.log("Tried to generate audio for new date");
  // return res.status(200).json({
  //   msg: "Synthesis of new audio not allowed until I. Here's a random audio URL instead.",
  //   url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3",
  // });
  // REMOVE THIS BLOCK TO REVERT BACK TO NORMAL BEHAVIOUR.

  try {
    // Performs the text-to-speech request
    console.log("🎤 Trying to create audio, with filename: ", fileName);
    const [response]: any = await client.synthesizeSpeech(gttsRequestObject);
    // console.log("👉🏻 Do we have a response? ", response);

    // Upload the file to firebase
    const fileUploaded = await uploadToFirebase(
      response.audioContent,
      fileName
    );

    // get full path in the bucket
    const fullPathOfUploadedFile = fileUploaded.metadata.fullPath; // for ex: tts-audio-files/31-DECEMBER-2022.mp3
    console.log("🏆 File uploaded at: ", fullPathOfUploadedFile);

    // fetch and return the URL
    const firebaseURL = await createFirebaseUrl(fullPathOfUploadedFile);

    const finalRes = {
      msg: "OK",
      url: firebaseURL,
    };

    // Send final response to client
    console.log(`👍🏻 Final response for client:`);
    console.table(finalRes);

    return res.status(200).json(finalRes);
  } catch (error) {
    return res.status(400).json({
      msg: "Oops, something went wrong.... Check logs in GCP. I will not send the error here.",
    });
  }
}
