import { NextResponse } from 'next/server';
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      allow_promotion_codes: true,
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICING_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${new URL(req.url).origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(req.url).origin}/?cancelled=true`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
