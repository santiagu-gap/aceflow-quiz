import { NextResponse } from "next/server";
import { Innertube } from "youtubei.js";

function youtube_parser(url: string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export async function POST(req: Request) {
  try {
    const youtube = await Innertube.create({
      /* setup - see above */
    });

    const { data } = await req.json();

    const { link } = data;

    const id = youtube_parser(link);

    const info = await youtube.getBasicInfo(id as string);

    return NextResponse.json({ data: info }, { status: 200 });
  } catch (error) {
    console.error("Prisma API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
