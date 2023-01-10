import { NextPage } from "next";
import React from "react";
import { Prism } from "@mantine/prism";
import { Button, Group, MantineProvider } from "@mantine/core";

const Script: NextPage = () => {
  const demoCode = `
{
  "status": "ok",
  "totalResults": 5,
  "articles": [
    {
      "source": {
        "id": "il-sole-24-ore",
        "name": "Il Sole 24 Ore"
      },
      "author": "Biagio Simonetta",
      "title": "Microsoft stregata da ChatGPT: pronto un investimento da 10 miliardi",
      "description": "Il colosso diRedmond vuole mettere le mani sul sistema di intelligenza artificiale più di moda. E magari implementarlo nel suo motore di ricerca Bing",
      "url": "https://www.ilsole24ore.com/art/microsoft-stregata-chatgpt-pronto-investimento-10-miliardi-AE14meVC",
      "urlToImage": "https://i2.res.24o.it/images2010/2023/01/AE14meVC/images/76361ce4-90dc-11ed-87c4-d33a9666bcda-fotohome0.jpg",
      "publishedAt": "2023-01-10T12:04:56Z",
      "content": "Ascolta la versione audio dellarticolor di lettural boom di ChatGPT attira le attenzioni di Big Tech, e secondo lagenzia Bloomberg adesso Microsoft è pronta a investire nella chat basata su i… [+1239 chars]"
    },
    {
      "source": {
        "id": "techcrunch",
        "name": "TechCrunch"
      },
      "author": "Ivan Mehta",
      "title": "App Store and Play Store are flooded with dubious ChatGPT apps",
      "description": "App Store and Play Store are filled with dubious apps ChatGPT apps that are looking to charge people for non-existing features.",
      "url": "https://techcrunch.com/2023/01/10/app-store-and-play-store-are-flooded-with-dubious-chatgpt-apps/",
      "urlToImage": "https://techcrunch.com/wp-content/uploads/2022/05/GettyImages-1031626648.jpg?resize=1200,799",
      "publishedAt": "2023-01-10T10:09:18Z",
      "content": "ChatGPT is the hottest topic of discussion in the tech industry. OpenAI’s chatbot that answers questions in natural language has attracted interest from users and developers. Some developers are tryi… [+2318 chars]"
    },
    {
      "source": {
        "id": "business-insider-uk",
        "name": "Business Insider (UK)"
      },
      "author": "Huileng Tan",
      "title": "Microsoft in talks to invest $10B into ChatGPT owner: Semafor",
      "description": "Microsoft is negotiating to receive 75% of OpenAIs profits until it gets it recovers its investment, after which it would own 49% of the startup.",
      "url": "http://uk.businessinsider.com/microsoft-talks-invest-billions-openai-chatgpt-owner-report-2023-1",
      "urlToImage": "https://i.insider.com/63bcd88823f3620019879008?width=1200&format=jpeg",
      "publishedAt": "2023-01-10T08:05:49Z",
      "content": "Tech giant Microsoft is in talks to invest about $10 billion into OpenAI, the owner of the popular ChatGPT chatbot, per a Semafor report on Tuesday, which cited people familiar with the matter.nThe … [+2102 chars]"
    },
    {
      "source": {
        "id": "bloomberg",
        "name": "Bloomberg"
      },
      "author": null,
      "title": "Microsoft Mulls $10 Billion Investment in ChatGPT Creator",
      "description": "",
      "url": "https://news.google.com/__i/rss/rd/articles/CBMibmh0dHBzOi8vd3d3LmJsb29tYmVyZy5jb20vbmV3cy9hcnRpY2xlcy8yMDIzLTAxLTEwL21pY3Jvc29mdC13ZWlnaHMtMTAtYmlsbGlvbi1jaGF0Z3B0LWludmVzdG1lbnQtc2VtYWZvci1zYXlz0gEA?oc=5",
      "urlToImage": null,
      "publishedAt": "2023-01-10T04:02:00+00:00",
      "content": ""
    },
    {
      "source": {
        "id": "recode",
        "name": "Recode"
      },
      "author": "Rebecca Heilweil",
      "title": "ChatGPT, Lensa, Stable Diffusion, and DALL-E: Generative AI, explained",
      "description": "Between ChatGPT and Stable Diffusion, AI suddenly feels mainstream.",
      "url": "https://www.vox.com/recode/2023/1/5/23539055/generative-ai-chatgpt-stable-diffusion-lensa-dall-e",
      "urlToImage": "https://cdn.vox-cdn.com/thumbor/ZoSMpho1h6_ZzdSgH0onZj1F184=/0x182:3543x2037/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24336251/GettyImages_1245391800.jpg",
      "publishedAt": "2023-01-05T13:00:00Z",
      "content": "Artificial intelligence is suddenly everywhere or at least, thats what it seems like to me: A few weeks ago, a friend mentioned in passing that his law professor had warned students not to cheat with… [+12375 chars]"
    }
  ]
}
`;
  console.log(JSON.parse(demoCode));
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Group position="center">
        <Button variant="gradient">Default gradient button</Button>
        <MantineProvider
          inherit
          theme={{
            defaultGradient: {
              from: "orange",
              to: "red",
              deg: 45,
            },
          }}
        >
          <Button variant="gradient">Gradient from provider</Button>
        </MantineProvider>
      </Group>
      <Prism language="tsx">{demoCode}</Prism>;
    </MantineProvider>
  );
};

export default Script;
