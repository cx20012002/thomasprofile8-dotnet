import React, { useState } from "react";
import { useBasketStore } from "../(store)/store";
import { BasketItem } from "@/lib/types/productTypes";

export default function AddOrRemoveComponent({ item }: { item: BasketItem }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateQuantity } = useBasketStore();

  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1) return;
    const updatedQuantity = quantity + value;
    setQuantity(updatedQuantity);
    updateQuantity(item.product.id, updatedQuantity);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleQuantityChange(-1)}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[18px] font-bold leading-[1em] text-primary transition-colors duration-300 hover:bg-secondary"
      >
        -
      </button>
      <span className="w-[40px] text-center text-[14px] text-white">{quantity}</span>
      <button
        onClick={() => handleQuantityChange(1)}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[18px] font-bold leading-[1em] text-primary transition-colors duration-300 hover:bg-secondary"
      >
        +
      </button>
    </div>
  );
}
