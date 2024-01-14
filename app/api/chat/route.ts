import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import {
  OpenAIStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from "ai";
import { prompts } from "@/lib/prompts";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { StringOutputParser } from "langchain/schema/output_parser";
import { Document } from "langchain/document";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import OpenAI from "openai";

const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_AI_API_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const embeddingsModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

const getStuff = async (currentMessageContent: string, id: string) => {
  const vectorStore = PrismaVectorStore.withModel<any>(db).create(
    embeddingsModel,
    {
      prisma: Prisma,
      tableName: "Embeddings",
      vectorColumnName: "embedding",
      columns: {
        id: PrismaVectorStore.IdColumn,
        content: PrismaVectorStore.ContentColumn,
      },
      filter: {
        quizId: {
          equals: id,
        },
      },
    }
  );

  console.log("Created models");

  const similarDocs = await vectorStore.similaritySearch(
    `${currentMessageContent}`,
    10
  );

  return similarDocs;
};

export async function POST(req: Request) {
  try {
    const { id, messages, question } = await req.json();

    console.log("Created vector store");

    console.log("Calling chain");

    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const similarDocs = await getStuff(currentMessageContent, id);

    // const model = new ChatOpenAI(
    //   {
    //     streaming: true,
    //     verbose: true,
    //     temperature: 1,
    //     openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY_CHAT,
    //     modelName: "mistralai/mixtral-8x7b-instruct",
    //   },
    //   {
    //     basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT_CHAT,
    //     defaultHeaders: {
    //       "HTTP-Referer": process.env.NEXTAUTH_URL,
    //     },
    //   }
    // );

    console.log("currentQuestion", question)
    
    const prompt = `
    ${question}

    Question: ${currentMessageContent}
    
    Answer:
  `;

    const response = await fireworks.chat.completions.create({
      model: "accounts/fireworks/models/mixtral-8x7b-instruct",
      stream: true,
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content:
            "Give me a question and I'll ask follow up questions if I need help.",
        },
        {
          role: "assistant",
          content: `Ok, here is a question: ${question} \n Ask me a follow up question if you need help.`,
        },
        {
          role: "user",
          content: currentMessageContent,
        },
      ],
    });

    // Convert the response into a friendly text-stream.
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    const errorString = error!.toString().substring(0, 2000);
    console.log(errorString);
    return NextResponse.json({
      error: errorString,
    });
  }
}
