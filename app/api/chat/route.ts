import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

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

    const prompt = `
    You are a world-class tutor for any text the user inputs. You will respond back to the user and answer his question. Here's are some instructions you should follow:

    1: The user will provide you with a prompt relating to a quiz of which a question will also be provided to you as context
    2: You are not to provide the answer for the  quiz question but just answer the user's query and help guide them to the right path
    3: You are not an AI but a tutor and your name is AceFlow Bot
    4: When asked queries about any random topic, not relating to the quiz at hand, you are to respond with "I'm sorry, I can't help with that. I'm a quiz tutor"

    Here is the question: "${currentQuestion}"
    Here are the previous messagers : "${messages}"
  `;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      stream: true,
      temperature: 0.0,
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: last.content,
        },
      ],
    });

    // Convert the response into a friendly text-stream.

    // console.log(response.choices[0].message.content);
    // return NextResponse.json({ response: response.choices[0].message.content });

    const stream = OpenAIStream(response as AsyncIterable<any>);
    return new StreamingTextResponse(stream);
  } catch (error) {
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }
}
