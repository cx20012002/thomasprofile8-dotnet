import React from "react";
import ProductListComponent from "./components/ProductListComponent";
import BannerComponent from "@/app/components/BannerComponent";

export default function Shop() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent title="SHOP" subtitle="Goodness to your doorstep." />
      <ProductListComponent />
    </div>
  );
}
