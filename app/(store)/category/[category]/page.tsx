import React from "react";
import BannerComponent from "../components/BannerComponent";
import ProductListComponent from "../../shop/components/ProductListComponent";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent category={category} />
      <ProductListComponent category={category} />
    </div>
  );
}
