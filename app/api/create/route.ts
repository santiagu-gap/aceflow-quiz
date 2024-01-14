import { db } from "@/lib/db";
import { Embeddings, Quiz } from "@/types";
import { Prisma } from "@prisma/client";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";

export async function POST(req: Request) {
  const { data } = await req.json();

  const { userId, title, docs }: Quiz = data;

  if (!userId || !title || !docs) {
    console.log("Missing userId, title or docs");
    return NextResponse.json({
      error: "Missing userId, title or docs",
    });
  }

  const quiz = await db?.quiz
    .create({
      data: {
        title: title,
        userId: userId,
      },
    })
    .catch((err: Error) => {
      console.log("Create Error", err, "Done!");
    });

  try {
    const embeddingsModel = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
      model: "sentence-transformers/all-MiniLM-L6-v2",
    });

    // const embeddingsModel = new OpenAIEmbeddings(
    //   {
    //     openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    //     stripNewLines: true,
    //     verbose: true,
    //   },
    //   {
    //     // basePath: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    //     basePath: "https://limcheekin-bge-small-en-v1-5.hf.space/v1",
    //   }
    // );

    console.log("Loaded embeddings model from HuggingFace ✅");

    const vectorStore = PrismaVectorStore.withModel<any>(db!).create(
      embeddingsModel,
      {
        prisma: Prisma,
        tableName: "Embeddings",
        vectorColumnName: "embedding",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
      }
    );

    if (docs) {
      await vectorStore.addModels(
        await db!.$transaction(
          docs.map((content) =>
            db!.embeddings.create({
              data: {
                content: content?.pageContent,
                quizId: quiz?.id,
              } as Embeddings,
            })
          )
        )
      );
    }

    console.log("Added embeddings to database ✅");

    return NextResponse.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
