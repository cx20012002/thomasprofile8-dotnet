"use server";

import { stripe } from "@/lib/utils/stripe";
import { BasketItem } from "../types/productTypes";

export type MetaData = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  providerId: string;
};

export async function createCheckoutSession(items: BasketItem[], metadata: MetaData) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product?.price);

    if (itemsWithoutPrice.length > 0) {
      throw new Error("Items must have a priceId");
    }
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;


    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["NZ"],
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: "nzd",
          unit_amount: Math.round(item.product?.price!),
          product_data: {
            name: item.product?.name || "Unnamed product",
            description: `Product ID ${item.product?.id}`,
            metadata: {
              id: item.product?.id || "",
            },
            images: item.product?.pictureUrl ? [item.product.pictureUrl] : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.log(error);
  }
}
