// require("dotenv").config();
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const NEWSAPI_API_KEY = process.env.NEWSAPI_API_KEY;

async function fetchNews(params: { [key: string]: string }) {
  // v2/top-headlines
  // v2/everything

  const queryObj = {
    language: params.language || undefined,
    country: params.country || undefined,
    query: params.query || undefined,
    sources: params.sources || undefined,
    category: params.category || undefined,
    sortBy: params.sortBy || undefined,
  };

  let qstring = "";

  for (const key in queryObj) {
    if (queryObj[key] == undefined) {
      continue;
    }
    qstring += `&${key}="${queryObj[key]}"`;
  }
  console.log(qstring);

  const NEWSAPI_URL = `https://newsapi.org/v2/top-headlines?q=${params.query}${qstring}&apiKey=${NEWSAPI_API_KEY}`;
  return await fetch(NEWSAPI_URL).then(async (response) => {
    const jsondata = await response.json();
    // console.log(jsondata);
    return jsondata;
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`📞 Call API`);

  const { newsQuery } = req.body || "chatGPT";

  const news = await fetchNews({ query: newsQuery });

  return res.json(news);
}
