"use server";

import { client } from "@/sanity/lib/client";
import { ORDER_QUERY } from "@/sanity/lib/order/orderQueries";
import Stripe from "stripe";
import { MetaData } from "./createCheckoutSession";
import { stripe } from "../utils/stripe";

// get orders
export const getOrders = async (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const orders = await client.fetch(
      ORDER_QUERY,
      { email }
    );
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
};

// create order
export const createOrderInSanity = async (session: Stripe.Checkout.Session) => {
  const { id, amount_total, currency, metadata, payment_intent, customer, total_details } = session;

  const { orderNumber, customerName, customerEmail, providerId } = metadata as MetaData;

  // get line items with product
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  // create sanity products
  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  // create sanity order
  const order = await client.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    userAuthId: providerId,
    email: customerEmail,
    currency: currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products: sanityProducts as any,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
};

