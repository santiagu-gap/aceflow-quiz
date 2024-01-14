import { Document } from "langchain/document";
import { User as NextAuthUser } from "next-auth";

export interface Quiz {
  id: string;
  user: NextAuthUser;
  userId: string;
  title: string;
  description: string;
  createdDate: Date;
  slug: string;
  imgUrl: string;
  content: string;
  embeddings: string;
  tags: string[];
  docs: Document[];
  isPrivate: boolean;
  additionalContext: string;
}

export interface Embeddings {
  id: string;
  content: string;
  content_title: string;
  content_url: string;
  content_tokens: number;
  quizId: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  quizId: string;
}
