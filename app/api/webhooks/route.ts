import { createOrder } from "@/app/admin/lib/actions/orderActions";
import { stripe } from "@/lib/utils/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// stripe webhook
export async function POST(request: NextRequest) {
  // Get the raw request body and Stripe signature from headers
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("No webhook secret");
    return NextResponse.json({ error: "No webhook secret" }, { status: 400 });
  }

  let event;
  try {
    // Verify the webhook signature using Stripe's SDK
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Error verifying webhook signature", error);
    return NextResponse.json({ error: `Invalid signature ${error}` }, { status: 400 });
  }

  // Handle successful checkout completion
  if (event.type === "checkout.session.completed") {
    // Type cast the session object to access Stripe.Checkout.Session properties
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Create a new order in Sanity CMS based on the checkout session
      await createOrder(session);
    } catch (error) {
      console.error("Error creating order in sanity", error);
      return NextResponse.json({ error: `Error creating order in sanity ${error}` }, { status: 500 });
    }
  }

  // Return success response for all other event types
  return NextResponse.json({ received: true });
}
