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
    console.log("Active subscriptions:", activeSubscriptions);
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

async function fetchSubscriptionItems(subscriptionURL: string) {
  try {
    const url = `https://api.stripe.com${subscriptionURL}`;
    // console.log("URL:", url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET}`,
      },
    });

    const subscriptionItems = response.data;
    console.log("Subscription items:", subscriptionItems);
    let product = "";

    if (JSON.stringify(subscriptionItems).length > 0) {
      console.log("Subscription items found.");
      for (let i = 0; i < subscriptionItems.data.length; i++) {
        console.log("Product:", subscriptionItems.data[i].plan.product);
        product = subscriptionItems.data[i].plan.product;
      }
    }
    return product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching subscription items:", error.message);
      throw new Error("Failed to fetch subscription items");
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
    const customers = stripeResponse.data;
    console.log(customers);
    // if (customers.length > 0) {
    //   const customerId = customers[0].id;
    //   console.log("Customer ID:", customerId);
    //   const subscriptionsData = await fetchActiveSubscriptions(customerId);
    //   if (subscriptionsData.length > 0 && !subscriptionsData[0].plan) {
    //     if (subscriptionsData[0].items.total_count > 1) {
    //       console.log("Multiple subscriptions found.");
    //       const subscriptionsItemsData = await fetchSubscriptionItems(
    //         subscriptionsData[0].items.url
    //       );
    //       console.log("Subscription items data:", subscriptionsItemsData);
    //       return NextResponse.json(
    //         { result: { id: customerId, product: subscriptionsItemsData } },
    //         { status: 200 }
    //       );
    //     }
    //   } else {
    //     console.log("No premium subscription found.");
    //     return NextResponse.json(
    //       { result: { id: customerId, product: null } },
    //       { status: 200 }
    //     );
    //   }
    // } else {
    //   console.log("No customers found.");
    //   return NextResponse.json(
    //     { result: { id: null, product: null } },
    //     { status: 200 }
    //   );
    // }
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
