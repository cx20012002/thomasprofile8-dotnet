"use client";

import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useBasketStore } from "../store";
import { useEffect } from "react";

export default function Success() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const { clearBasket } = useBasketStore();

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-2 md:gap-4 md:p-4">
      <div className="flex h-[800px] w-full flex-col items-center justify-center gap-10 rounded-3xl bg-primary px-10 text-white">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Check className="h-10 w-10" />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <h3 className="text-[52px] font-bold leading-[1em] tracking-[-0.04em] text-secondary md:text-[72px]">
            Thank you for <br /> your purchase!
          </h3>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[18px] font-medium tracking-[-0.04em] md:text-[24px]">
              Your payment has been successfully made
            </p>
            <p className="mt-2 rounded-lg bg-secondary px-4 py-2 font-medium text-primary">
              Order Number: {orderNumber || "Order Number"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
