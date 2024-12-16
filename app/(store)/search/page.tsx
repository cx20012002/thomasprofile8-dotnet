import React from "react";
import SearchProductComponent from "./components/SearchProductComponent";
import BannerComponent from "./components/BannerComponent";
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;
  
  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent query={query} />
      <SearchProductComponent query={query} />
    </div>
  );
}
