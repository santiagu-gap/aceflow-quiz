import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { quizId } = await req.json();

  try {
    const quizWithUser = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        userId: true, 
        user: {
          select: {
            quizzesAnswered: true,
            tutorQuestions: true,
            plan: true,
          },
        },
      },
    });

    if (quizWithUser) {
      return NextResponse.json(
        {
          response: {
            userId: quizWithUser.userId,
            quizzesAnswered: quizWithUser.user.quizzesAnswered,
            tutorQuestions: quizWithUser.user.tutorQuestions,
            plan: quizWithUser.user.plan,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          response: "Quiz not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      {
        response: "Error fetching quiz and user details",
      },
      { status: 500 }
    );
  }
}
