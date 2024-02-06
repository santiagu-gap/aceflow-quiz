import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // console.log("running POST /api/premium route with email:");
    const { email, customerId, subscriptionId, currentPeriodEnd, priceId } =
      await req.json();
    // Update the user's plan to 'premium'
    const period = new Date(currentPeriodEnd).toISOString();
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        plan: "premium",
        stripeCurrentPeriodEnd: period,
        stripeCustomerId: customerId,
        stripePriceId: priceId,
        stripeSubscriptionId: subscriptionId,
        quizzesAnswered: 0,
      },
    });
    console.log(updatedUser);
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
