import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { data } = await req.json();

  const { link } = data;

  console.log(link);

  const loader = YoutubeLoader.createFromUrl(link, {
    language: "en",
    addVideoInfo: true,
  });

  const docs = await loader.load();

  console.log(docs);

  return NextResponse.json({
    docs,
  });
}