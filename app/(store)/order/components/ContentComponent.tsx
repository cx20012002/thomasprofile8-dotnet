"use client";

import React, { useRef } from "react";
import OrderItemComponent from "./OrderItemComponent";
import { Order } from "@/app/admin/lib/types/order";
export default function ContentComponent({ orders }: { orders: Order[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
 
  return (
    <div ref={containerRef} className="flex w-full flex-col gap-4 pt-4 md:pt-0">
      {orders.map((order, index) => (
        <OrderItemComponent key={index} order={order} bgColor={index % 2 === 0 ? "bg-[#F4FFF1]" : "bg-[#FAFAFA]"} />
      ))}
    </div>
  );
}
