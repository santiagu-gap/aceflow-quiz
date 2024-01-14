"use server";

import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { YoutubeTranscript } from "youtube-transcript";

async function getYoutubeTranscript() {
  const loader = YoutubeLoader.createFromUrl("https://youtu.be/bZQun8Y4L2A", {
    language: "en",
    addVideoInfo: true,
  });

  YoutubeTranscript.fetchTranscript("https://youtu.be/bZQun8Y4L2A").then(
    console.log
  );

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 3000,
    chunkOverlap: 250,
    separators: ["\n", "\n\n", "\t"],
  });

  const docs = await loader.loadAndSplit(splitter);

  console.log(docs);
}

export default getYoutubeTranscript;
