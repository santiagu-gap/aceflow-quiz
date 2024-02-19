import { db } from "@/lib/db";
import { Quiz } from "@/types";
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface Doc {
  title?: string;
  metadata: {
    author: string;
    description: string;
    source: string;
    view_count: number;
  };
  pageContent: string;
}

const generateQuestions = async (docs: Doc[]) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const combinedText = docs
    .map((doc) => {
      return `Title: ${doc.title}\nAuthor: ${doc.metadata.author}\nDescription: ${doc.metadata.description}\nSource: ${doc.metadata.source}\nView Count: ${doc.metadata.view_count}\n\n${doc.pageContent}`;
    })
    .join("\n\n");

  const prompt = `
    You are a world-class question generator for any text the user inputs. You will generate 10 questions based on the text. Here's how you will perform in 4 steps:

    Step 1: You will receive the text
    Step 2: You will generate 10 multiple choice questions with 4 choices based on the text. The questions should be specific to the text and out of the choices make sure that only one of them is correct. Make the questions obvious if the person doing the test has read the text
    Step 3: You will put the questions in a JSON object array with each object being a question.

    Here is the JSON Schema instance your output must adhere to:
    {"type":"object","properties":{"question":{"type":"string","description":"The question"},"options":{"type":"array","items":{"type":"string"},"description":"The options"},"correctAnswer":{"type":"string","description":"The correct answer"}},"required":["question","options","correctAnswer"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}

    Here is the text: "${combinedText}"
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  });

  console.log(response);
  return response.choices[0].message.content;
};
export async function POST(req: Request) {
  const { data } = await req.json();
  const { userId, title, docs }: Quiz = data;

  if (!userId || !title || !docs) {
    console.log("Missing userId, title or docs");
    return NextResponse.json({ error: "Missing userId, title or docs" });
  }

  try {
    // Step 1: Create the quiz
    const quiz = await db?.quiz.create({
      data: {
        title: title,
        userId: userId,
      },
    });

    // Check if quiz creation was successful
    if (!quiz) {
      throw new Error("Failed to create quiz");
    }

    // Step 2: Generate questions with OpenAI
    const transformedDocs: Doc[] = docs.map((doc: any) => ({
      title: doc.title || "",
      metadata: {
        author: doc.metadata.author || "",
        description: doc.metadata.description || "",
        source: doc.metadata.source || "",
        view_count: doc.metadata.view_count || 0,
      },
      pageContent: doc.pageContent || "",
    }));

    const generatedQuestions = await generateQuestions(transformedDocs);

    // Check if the questions were generated successfully
    if (!generatedQuestions) {
      throw new Error("Failed to generate questions");
    }

    // Step 3: Update the quiz with generated questions
    const updatedQuiz = await db.quiz.update({
      where: { id: quiz.id },
      data: { questions: generatedQuestions },
    });

    return NextResponse.json({ success: true, quiz: updatedQuiz });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
