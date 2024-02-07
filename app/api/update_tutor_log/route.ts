import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Increment the user's tutorQuestions count
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        tutorQuestions: {
          increment: 1,
        },
      },
    });

    console.log(updatedUser);
    return NextResponse.json(
      { message: "User tutor questions incremented by 1", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Prisma API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
