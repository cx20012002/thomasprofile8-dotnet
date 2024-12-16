"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Product } from "@/app/admin/lib/types/product";
import { getProducts } from "@/app/admin/lib/actions/productActions";

export default function SearchProductComponent({ query }: { query: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getSearchProducts = async () => {
      setIsLoading(true);
      const {products} = await getProducts(1, 6, undefined, query);
      setProducts(products);
      setIsLoading(false);
    };
    getSearchProducts();
  }, [query]);

  useGSAP(
    () => {
      const productsContainer = containerRef.current?.querySelector(".products-container");
      const productItems = containerRef.current?.querySelectorAll(".product-item");

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
      dependencies: [products.length],
    },
  );

  if (isLoading)
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-32 w-32 animate-spin" />
      </div>
    );

  return (
    <section ref={containerRef} className="flex w-full h-full flex-col rounded-[24px] bg-[#eaedf6] px-2 py-2 md:px-4 md:py-4">
      {products.length ? (
        <div className="products-container grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <h1 className="text-[34px] font-bold">No products found</h1>
        </div>
      )}
    </section>
  );
}
