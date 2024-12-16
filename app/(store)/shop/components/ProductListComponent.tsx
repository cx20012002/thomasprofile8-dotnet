"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import ProductCard from "../../components/ProductCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProductCardPlaceHolder from "../../components/ProductCardPlaceHolder";
import { Product } from "@/app/admin/lib/types/product";
import { getProducts } from "@/app/admin/lib/actions/productActions";

// Types and Interfaces
interface ProductListState {
  products: Product[];
  isLoading: boolean;
  currentPage: number;
  totalProducts: number;
  bgColor?: string;
}

export default function ProductListComponent({
  pageNumber = 1,
  pageSize = 6,
  product,
  category,
  bgColor = "bg-[#eaedf6]",
}: {
  // Props definition
  pageNumber?: number;
  pageSize?: number;
  product?: Product;
  category?: string;
  bgColor?: string;
}) {
  // State and Refs
  const [state, setState] = useState<ProductListState>({
    products: [],
    isLoading: true,
    currentPage: 1,
    totalProducts: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMore = useRef(false);
  const productId = product?.id;

  // Data Fetching Logic
  const fetchProducts = useCallback(async (start: number, end: number, category?: string) => {
    try {
      const result = await getProducts(start, end, category);
      return result;
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  }, []);

  // Initial Products Load
  useEffect(() => {
    const fetchInitialProducts = async () => {
      let result;

      if (productId) {
        result = await fetchProducts(pageNumber, pageSize, product?.categories?.[0]?.slug);
      } else {
        result = await fetchProducts(pageNumber, pageSize, category);
      }

      if (result) {
        const { products: initialProducts, totalCount } = result;
        const filteredProducts = productId
          ? initialProducts.filter((p) => p.id !== productId).slice(0, 3)
          : initialProducts;

        setState((prev) => ({
          ...prev,
          products: filteredProducts,
          totalProducts: totalCount,
          isLoading: false,
        }));
      }
    };

    setState((prev) => ({ ...prev, isLoading: true }));
    fetchInitialProducts();
  }, [pageNumber, pageSize, category, productId]);

  // Load more products
  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore.current || state.products.length >= state.totalProducts) return;

    isLoadingMore.current = true;
    const start = state.currentPage + 1;
    const end = pageSize;

    try {
      const result = await fetchProducts(start, end, category);
      if (result?.products?.length) {
        setState((prev) => ({
          ...prev,
          products: [...prev.products, ...result.products],
          currentPage: prev.currentPage + 1,
        }));
      }
    } finally {
      isLoadingMore.current = false;
    }
  }, [state.currentPage, state.products.length, state.totalProducts, pageSize, category, fetchProducts]);

  // Animation and Scroll Trigger to load more products
  useGSAP(
    () => {
      if (!containerRef.current || !state.products.length) return;

      // Container reference
      const productsContainer = containerRef.current.querySelector(".products-container");

      // Infinite scroll trigger setup
      if (state.products.length < state.totalProducts && !productId) {
        ScrollTrigger.create({
          trigger: productsContainer,
          start: "bottom 85%",
          once: true,
          onEnter: loadMoreProducts,
        });
      }

      // Product items animation
      const productItems = containerRef.current.querySelectorAll(".product-item");
      productItems.forEach((item) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
            },
          })
          .to(item, {
            y: 0,
            opacity: 1,
            duration: 1,
          });
      });
    },
    {
      scope: containerRef,
      dependencies: [state.products, state.totalProducts, loadMoreProducts],
    },
  );

  if (state.products.length === 0) return;

  // Render Component
  return (
    <div ref={containerRef} className={`flex w-full flex-col rounded-[24px] ${bgColor} px-2 py-2 md:px-4 md:py-4`}>
      {/* Products Grid */}
      <div className="products-container grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {state.isLoading
          ? Array.from({ length: pageSize }, (_, index) => <ProductCardPlaceHolder key={`placeholder-${index}`} />)
          : state.products.map((product, index) => (
              <ProductCard key={`product-${product.id}-${index}`} product={product} />
            ))}
      </div>
    </div>
  );
}
