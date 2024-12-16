"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import Form from "next/form";
import { debounce } from "@/lib/utils/debounce";
import SearchResultComponent from "./SearchResultComponent";
import { Loader2 } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import { getProducts } from "../admin/lib/actions/productActions";
import { Product } from "../admin/lib/types/product";

export default function SearchComponent({ setIsSearchOpen }: { setIsSearchOpen: (value: boolean) => void }) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = useCallback(
    debounce(async () => {
      try {
        setIsLoading(true);
        if (searchInputRef.current) {
          const query = searchInputRef.current.value;
          if (query.length > 2) {
            const {products} = await getProducts(1, 4, undefined, query);
            setIsSearchResultOpen(true);
            setSearchResults(products);
          } else {
            setIsSearchResultOpen(false);
            setSearchResults([]);
          }
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [],
  );

  const handleReset = () => {
    setIsSearchResultOpen(false);
    setIsSearchOpen(false);
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  useEffect(() => {
    searchInputRef.current = document.querySelector("input[name='query']");
    if (!searchInputRef.current) return;

    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchResultOpen(false);
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSearchResultOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    searchInputRef.current.addEventListener("input", handleInput);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      searchInputRef.current?.removeEventListener("input", handleInput);
    };
  }, [handleInput]);

  return (
    <div className="flex w-full items-center justify-center gap-5" ref={searchContainerRef}>
      <Form action={"/search"} className="relative flex w-full items-center gap-2">
        <div className="relative w-full">
          <input
            type="text"
            name="query"
            placeholder="Search"
            className="h-[70px] w-full rounded-xl border border-primary bg-transparent px-4 py-2 text-[14px] font-medium outline-none transition-all duration-300 placeholder:text-[18px] placeholder:text-textLight focus:border-primary"
          />
          {isLoading && (
            <div className="absolute right-16 top-1/2 flex -translate-y-1/2 items-center justify-center md:right-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>

        <button
          onClick={() => setIsSearchOpen(false)}
          type="submit"
          className="hidden h-[70px] w-[200px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white transition-all duration-300 hover:opacity-80 md:block"
        >
          Search
        </button>

        <button
          onClick={() => setIsSearchOpen(false)}
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary md:hidden"
        >
          <IoIosSearch size={40} />
        </button>

        {searchResults.length > 0 && isSearchResultOpen && (
          <SearchResultComponent searchResults={searchResults} handleReset={handleReset} />
        )}
      </Form>
    </div>
  );
}
