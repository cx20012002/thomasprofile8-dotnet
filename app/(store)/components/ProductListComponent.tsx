"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SmileFace from "@/app/components/SmileFace";
import ProductCard from "./ProductCard";
import ProductCardPlaceHolder from "./ProductCardPlaceHolder";
import { useGSAP } from "@gsap/react";
import { getProducts } from "@/app/admin/lib/actions/productActions";
import { Product } from "@/app/admin/lib/types/product";

export default function ProductListComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductsHelper = async (start: number, end: number) => {
    try {
      const {products} = await getProducts(start, end);
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  };

  useGSAP(
    () => {
      const productsContainer = containerRef.current?.querySelector(".products-container");
      const productItems = containerRef.current?.querySelectorAll(".product-item");

      if (!productsContainer) return;

      // ScrollTrigger for initial load
      ScrollTrigger.create({
        trigger: productsContainer,
        start: "top 95%",
        once: true,
        onEnter: async () => {
          try {
            if (products.length === 0) {
              await fetchProductsHelper(0, 6);
            }
          } finally {
            setIsLoading(false);
          }
        },
      });

      // Animation for product items
      if (productItems?.length) {
        gsap.to(productItems, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: productsContainer,
            start: "top 95%",
          },
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [products.length, fetchProductsHelper],
    },
  );

  if (!products) return null;

  return (
    <section
      ref={containerRef}
      className="flex w-full flex-col overflow-hidden rounded-[24px] bg-[#eaedf6] px-2 pb-2 md:px-4 md:pb-4"
    >
      <div className="relative flex w-full flex-col items-center justify-center px-4 pb-10 pt-12 md:pb-14 md:pt-20">
        <div className="relative flex w-[545px] flex-col items-center justify-start gap-5">
          <SmileFace />
          <div className="relative flex w-full flex-col items-center justify-center text-center text-[20px] font-bold leading-[32px] tracking-[-0.04em] text-textDark md:text-[56px] md:leading-[60px]">
            <h4>Roasted goodness to your doorstep!</h4>
          </div>
        </div>
      </div>

      <div className="products-container grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {isLoading
          ? // Loading skeleton
            [...Array(6)].map((_, index) => <ProductCardPlaceHolder key={index} />)
          : // Existing product list
            products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
    </section>
  );
}
