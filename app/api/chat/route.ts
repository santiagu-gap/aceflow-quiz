import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { id, messages, input, currentQuestion } = await req.json(); // Extract currentQuestion from the request body
    // console.log(id, messages, input, currentQuestion);
    const last = messages.slice(-1)[0];
    // console.log("last : ", last.content);

    // Pass currentQuestion along with user's query to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "user",
          content: last.content,
        },
        {
          role: "assistant",
          content: `Based on your question: ${currentQuestion}, here's a response:`,
        },
        {
          role: "user",
          content: currentQuestion,
        },
      ],
    });

    // Convert the response into a friendly text-stream.
    console.log(response.choices[0].message.content);

    return NextResponse.json({response: response.choices[0].message.content });
  } catch (error) {
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }
}
