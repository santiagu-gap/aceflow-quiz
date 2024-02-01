import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("running POST /api/premium route with email:");
    const { email } = await req.json();
    // Update the user's plan to 'premium'
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { plan: "premium" },
    });
    return NextResponse.json(
      { message: "User plan updated to premium", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Prisma API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
