import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/app/admin/lib/types/product";

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;
  return (
    <div className="product-item flex w-full translate-y-[200px] flex-col justify-between overflow-hidden rounded-[16px] bg-white opacity-0">
      <Link href={`/product/${product.slug}`} className="group relative w-full">
        <Image
          src={product.pictureUrl || "/product-image.avif"}
          alt="product"
          width={548}
          height={400}
          className="w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex w-full items-center justify-between p-6">
        <div className="flex w-full flex-col justify-center gap-1">
          <Link href={`/product/${product.slug}`} className="group">
            <h3 className="text-[16px] font-semibold text-textDark transition-colors duration-300 group-hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <div className="text-[12px] text-[#70758c]">
            {product.categories?.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.slug}`}
                className="transition-colors duration-300 hover:text-primary"
              >
                <span>
                  {category.name}
                  {index !== (product.categories?.length ?? 0) - 1 ? ", " : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-full bg-[#eaedf6] p-3 text-sm font-semibold text-textDark">
          ${(product.price / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
