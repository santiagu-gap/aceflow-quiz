import { NextResponse } from "next/server";
import { Innertube } from "youtubei.js";

function youtube_parser(url: string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export async function POST(req: Request) {
  const youtube = await Innertube.create({
    /* setup - see above */
  });

  const { data } = await req.json();

  const { link } = data;

  const id = youtube_parser(link);

  const info = await youtube.getBasicInfo(id as string);

  return NextResponse.json(info);
}
