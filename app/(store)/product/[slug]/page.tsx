import React from "react";
import TopDetailsComponent from "./components/TopDetailsComponent";
import ProductListComponent from "../../shop/components/ProductListComponent";
import { getProductBySlug } from "@/app/admin/lib/actions/productActions";

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug as string;
  const product = await getProductBySlug(slug);

  return (
    <div className="flex w-full flex-col gap-5 bg-backgroundGray p-2 md:p-4">
      <TopDetailsComponent product={product} />
      <ProductListComponent pageNumber={1} pageSize={4} product={product} bgColor="bg-secondary" />
    </div>
  );
}
