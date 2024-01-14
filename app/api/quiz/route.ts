import { TogetherAI } from "@langchain/community/llms/togetherai";
import { RunnableSequence } from "langchain/schema/runnable";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { OpenAI } from "langchain/llms/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import {
  OutputFixingParser,
  StructuredOutputParser,
} from "langchain/output_parsers";
import { NextResponse } from "next/server";
import { prompts } from "@/lib/prompts";
import { z } from "zod";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const model = new OpenAI(
  {
    temperature: 0.7,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: "accounts/fireworks/models/mixtral-8x7b-instruct",
    verbose: true,
    maxTokens: 8000,
  },
  {
    baseURL: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
  }
);

// const model = new TogetherAI({
//   modelName: "mistralai/Mistral-7B-Instruct-v0.1",
//   streaming: true,
//   verbose: true,
//   apiKey: process.env.NEXT_PUBLIC_TOGETHERAI_API_KEY,
// });

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    question: z.string().describe("The question"),
    options: z.array(z.string()).length(4).describe("The options"),
    correctAnswer: z.string().describe("The correct answer"),
  })
);

const runLLMChain = async (id: string, question: string) => {
  console.log("Running LLM chain");

  const embeddingsModel = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.NEXT_PUBLIC_HUGGINGFACEHUB_API_KEY,
    model: "sentence-transformers/all-MiniLM-L6-v2",
  });

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

  console.log("vectorStore", "done");

  const similarDocs = await vectorStore.similaritySearch(question, 5);

  const prompt = `
  You are a world-class question generator for any text the user inputs. You will generate 10 questions based on the text. Here's how you will perform in 4 steps:

  Step 1: You will receive the text
  Step 2: You will generate 10 multiple choice questions with 4 choices based on the text. The questions should be specific to the text and out of the choices make sure that only one of them is correct. Make the questions obvious if the person doing the test has read the text
  Step 3: You will put the questions in a JSON object array with each object being a question.

  You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

  "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

  For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
  would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
  Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

  Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

  Here is the JSON Schema instance your output must adhere to:
  {"type":"object","properties":{"question":{"type":"string","description":"The question"},"options":{"type":"array","items":{"type":"string"},"description":"The options"},"correctAnswer":{"type":"string","description":"The correct answer"}},"required":["question","options","correctAnswer"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}

  Try to focus on this topic: ${question}

  <doc>
    ${combineDocumentsFn(similarDocs)}
  </doc>
  `;

  console.log(prompt);

  const result = await model.invoke(prompt);
  // let response = "";
  // for await (const item of result) {
  //   console.log("stream item:", item);
  //   response += item;
  // }
  // console.log(response);

  console.log("result", result);
  console.log(JSON.parse(result));

  await db.quiz.update({
    where: {
      id,
    },
    data: {
      questions: result,
    },
  });

  return result;
};

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const { id, question } = data;

    const completion = await runLLMChain(id, question);

    console.log("completion", completion);

    return NextResponse.json({
      completion,
    });
  } catch (err) {
    console.log("err", err);
    return NextResponse.error();
  }
}
