import { NextResponse } from "next/server";
import { Innertube } from "youtubei.js";

function youtube_parser(url: string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  // console.log("youtube_parser - URL:", url); // Log the input URL
  // console.log("youtube_parser - Match:", match); // Log the regex match result
  return match && match[7].length == 11 ? match[7] : false;
}

export async function POST(req: Request) {
  try {
    // console.log("POST - Start"); // Log at the start of the POST function
    const youtube = await Innertube.create({
      /* setup - see above */
    });

    const { data } = await req.json();
    // console.log("POST - Received Data:", data); // Log the received data

    const { link } = data;
    // console.log("POST - Video Link:", link); // Log the video link

    const id = youtube_parser(link);
    // console.log("POST - Video ID:", id); // Log the extracted video ID

    if (!id) {
      console.error("Invalid YouTube link provided.");
      return NextResponse.json({ error: "Invalid YouTube link." }, { status: 400 });
    }

    const info = await youtube.getBasicInfo(id);
    // console.log("POST - Video Info:", info); // Log the fetched video information

    return NextResponse.json({ data: "info" }, { status: 200 });
  } catch (error) {
    console.error("POST - Prisma API error:", error); // Log errors
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}