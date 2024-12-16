import React, { useEffect } from "react";
import { Product } from "@/app/admin/lib/types/product";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function SearchResultComponent({
  searchResults,
  handleReset,
}: {
  searchResults: Product[];
  handleReset: () => void;
}) {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

  // handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const newIndex = prev < searchResults.length - 1 ? prev + 1 : prev;
          document.getElementById(`search-result-${newIndex}`)?.focus();
          return newIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : prev;
          document.getElementById(`search-result-${newIndex}`)?.focus();
          return newIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchResults.length]);

  useGSAP(() => {
    gsap.to(".search-result", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
  });

  return (
    <div className="search-result absolute left-0 top-20 flex w-full flex-col rounded-lg bg-primary p-3 text-white opacity-0 shadow-lg">
      {searchResults.map((result, index) => (
        <Link
          id={`search-result-${index}`}
          onClick={handleReset}
          href={`/product/${result.slug}`}
          key={index}
          className="flex items-center gap-5 rounded-lg p-2 transition-all duration-300 hover:bg-purple-800/30 focus:bg-purple-800/30 focus:outline-none"
        >
          <Image
            src={result.pictureUrl || ""}
            alt={result.name || ""}
            width={100}
            height={100}
            loading="eager"
            sizes="50px"
            className="aspect-square w-[50px] rounded-lg object-cover"
          />
          <div className="text-left text-[14px] font-medium">
            <h3 className="font-bold">{result.name}</h3>
            <p className="text-[12px]">${result.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
