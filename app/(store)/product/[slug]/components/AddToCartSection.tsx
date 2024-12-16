"use client";

import { useBasketModalStore, useBasketStore } from "@/app/(store)/store";
import React, { useState } from "react";
import { Product } from "@/app/admin/lib/types/product";

export default function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useBasketStore();
  const { setCartOpen } = useBasketModalStore();

  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1) return;
    setQuantity((prev) => prev + value);
  };

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    setCartOpen(true);
    setQuantity(1);
  };
  return (
    <>
      {/* Quantity add/remove */}
      <div className="flex items-center gap-4 md:mt-10">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="h-[40px] w-[40px] rounded-full bg-primary text-[18px] font-bold text-white transition-colors duration-300 hover:bg-secondary"
        >
          -
        </button>
        <span className="w-[40px] text-center text-[18px] text-textDark">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="h-[40px] w-[40px] rounded-full bg-primary text-[18px] font-bold text-white transition-colors duration-300 hover:bg-secondary"
        >
          +
        </button>
      </div>

      {/* Purchase Button */}
      <button
        onClick={handleAddToCart}
        className="w-full rounded-full bg-secondary px-6 py-4 text-[16px] font-bold text-textDark transition-colors duration-300 hover:bg-green-500"
      >
        Purchase
      </button>
    </>
  );
}
