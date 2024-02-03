import { NextResponse } from "next/server";
import axios from "axios";

interface StripeSubscription {
  id: string;
  customer: string;
}

async function fetchActiveSubscriptions(customerId: string) {
  try {
    const response = await axios.get(
      "https://api.stripe.com/v1/subscriptions",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET}`,
        },
      }
    );
    const activeSubscriptions = response.data.data.filter(
      (subscription: StripeSubscription) => subscription.customer === customerId
    );
    // console.log("Active subscriptions:", activeSubscriptions);
    return activeSubscriptions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching active subscriptions:", error.message);
      throw new Error("Failed to fetch active subscriptions");
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  //   console.log("Email:", email);
  try {
    const stripeResponse = await axios.get(
      "https://api.stripe.com/v1/customers/search",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET}`,
        },
        params: {
          query: `email: '${email}'`,
        },
      }
    );
    const customers = stripeResponse.data.data;
    if (customers.length > 0) {
      const customerId = customers[0].id;
      const subscriptionsData = await fetchActiveSubscriptions(customerId);
      if (subscriptionsData.length > 0) {
        const subscriptionId = subscriptionsData[0].id;
        let currentperiodend = subscriptionsData[0].current_period_end;
        currentperiodend = new Date(currentperiodend * 1000);
        currentperiodend = currentperiodend.toUTCString();
        const priceId = subscriptionsData[0].plan.id;
        return NextResponse.json(
          {
            result: {
              customerId: customerId,
              subscriptionId: subscriptionId,
              currentperiodend: currentperiodend,
              priceId: priceId,
            },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            result: {
              customerId: null,
              subscriptionId: null,
              currentperiodend: null,
              priceId: null,
            },
          },
          { status: 200 }
        );
      }
    } else {
      console.log("No customers found.");
      return NextResponse.json(
        {
          result: {
            customerId: null,
            subscriptionId: null,
            currentperiodend: null,
            priceId: null,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching data from Stripe:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
