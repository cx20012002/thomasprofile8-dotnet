"use server";

import { MetaData } from "@/lib/actions/createCheckoutSession";
import { stripe } from "@/lib/utils/stripe";
import Stripe from "stripe";
import { OrderProductDto } from "../types/product";
import { Order } from "../types/order";

// get orders
export const getOrders = async (email: string): Promise<Order[]> => {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/orders?email=${email}`);
    if (response.status === 404) {
      return [];
    }
    const orders = (await response.json()) as Order[];
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
};

// create order
export const createOrder = async (session: Stripe.Checkout.Session) => {
  const { id, amount_total, currency, metadata, payment_intent, customer, total_details } = session;

  const { orderNumber, customerName, customerEmail, providerId } = metadata as MetaData;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const products: OrderProductDto[] = lineItemsWithProduct.data.map(
    (item) =>
      ({
        productId: Number((item.price?.product as Stripe.Product)?.metadata?.id),
        quantity: item.quantity || 0,
        name: (item.price?.product as Stripe.Product)?.name || "Unknown Product",
        price: Math.round((item.price?.unit_amount || 0) / 100),
        pictureUrl: (item.price?.product as Stripe.Product)?.images?.[0] || "https://picsum.photos/200/300",
      }) as OrderProductDto,
  );

  // create order in database
  const order = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderNumber,
      userAuthId: providerId,
      customerName,
      email: customerEmail,
      totalPrice: amount_total ? amount_total / 100 : 0,
      currency,
      orderDate: new Date().toISOString(),
      status: "1",
      products,
    }),
  });

  const data = await order.json();

  console.log("order", data);
  return data;
};
