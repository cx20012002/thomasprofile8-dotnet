"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { LuShoppingCart } from "react-icons/lu";
import { formatDateToNZFormat } from "@/lib/utils/dateFormatters";
import Link from "next/link";
import { OrderProductDto } from "@/app/admin/lib/types/product";
import { formatCapitalize } from "@/lib/utils/formatWords";
export default function OrderItemComponent({
  bgColor = "bg-[#F4FFF1]",
  order,
}: {
  bgColor?: string;
  order:any;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const products = order.products as OrderProductDto[];

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;

      const mm = gsap.matchMedia();

      const handleMouseEnter = contextSafe(() => {
        setShouldRender(true);
        timeoutRef.current = setTimeout(() => {
          if (detailsRef.current) {
            gsap.to(detailsRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }, 50);
      });

      const handleMouseLeave = contextSafe(() => {
        if (detailsRef.current) {
          gsap.to(detailsRef.current, {
            opacity: 0,
            x: "100%",
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setShouldRender(false),
          });
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      });

      mm.add("(min-width: 768px)", () => {
        containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
        containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
          containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      return () => {
        containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    },
    { scope: containerRef, dependencies: [order] },
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full flex-col justify-between gap-4 rounded-[14px] ${bgColor} p-4 md:flex-row md:px-10 md:py-5`}
    >
      {/* Left Side */}
      <div className="flex flex-1 flex-col items-start divide-y md:flex-row md:items-center md:divide-x-[1px] md:divide-y-0">
        {/* Order Details */}
        <div className="flex w-full shrink-0 items-center gap-4 py-4 md:w-auto md:gap-10 md:px-10 md:py-5 md:pl-0">
          <div className="flex aspect-square w-[40px] items-center justify-center rounded-full bg-[#9AED7F] md:w-[50px]">
            <LuShoppingCart className="text-[20px] text-white md:text-[24px]" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] font-bold leading-[1.2em] text-[#0d3525] md:text-[16px]">
              Order Created at {formatDateToNZFormat(order.orderDate)}
            </p>
            <p className="text-[12px] leading-[1.2em] text-[#70758c]">#{order.orderNumber}</p>
          </div>
        </div>
        {/* Order Description */}
        <div className="w-full py-4 text-[14px] md:max-w-[500px] md:px-10 md:py-5">
          <p className="font-bold text-[#717171]">
            You ordered {products?.length} items:{" "}
            {products?.map((product, index) => (
              <span key={index} className="font-medium text-[#939393]">
                {formatCapitalize(product?.name)} X {product.quantity}
                {index < products.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-row items-center gap-2 py-4 md:flex-col md:justify-center md:py-0">
        <p className="text-[16px] font-bold leading-[1.2em] text-[#0d3525] md:text-[20px]">${order.totalPrice}</p>
        <div className="rounded-full bg-[#9AED7F] px-4 py-[2px] text-center text-[12px] font-semibold uppercase md:px-5">
          {order.status}
        </div>
      </div>

      {/* Hover Details Panel */}
      {shouldRender && (
        <div
          ref={detailsRef}
          className="absolute right-0 top-1/2 z-50 flex w-full -translate-y-1/2 translate-x-0 cursor-pointer flex-col gap-10 rounded-[24px] bg-white p-5 opacity-0 shadow-lg shadow-black/5 md:w-[500px] md:translate-x-full"
        >
          <div className="flex flex-col">
            {/* Product Item */}
            {products?.map((product, index) => (
              <Link
                key={index}
                href={`/product/${product?.name.replace(/\s+/g, '-')}`}
                className="flex items-center gap-4 rounded-lg p-2 transition-colors duration-500 hover:bg-[#f0e6ff]"
              >
                <Image
                  src={product.pictureUrl || ""}
                  alt="Product"
                  width={64}
                  height={64}
                  sizes="64px"
                  priority
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col">
                    <p className="font-medium text-textDark">{formatCapitalize(product.name) || ""}</p>
                    <p className="text-sm text-gray-500">${(product.price / 100).toFixed(2) || 0}</p>
                  </div>
                  <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
