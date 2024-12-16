"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MenuItem } from "@/lib/types/generalTypes";

export default function MenuComponent({ menuItems }: { menuItems: MenuItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const menuSections = document.querySelectorAll(".menu-section");

    menuSections.forEach((section) => {
      const menuTitle = section.querySelector(".menu-title");
      const menuDetails = section.querySelector(".menu-details");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(menuTitle, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }).to(menuDetails, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  const numberOfColumns = 2;

  // count how many types there are without duplicates
  const menuCategories = [...new Set(menuItems.map((item) => item.type))];

  return (
    <section
      ref={containerRef}
      className="flex w-full flex-col gap-4 rounded-[24px] bg-[#eaedf6] p-2 font-inter md:p-4"
    >
      {menuCategories.map((category) => {
        const items = menuItems.filter((item) => item.type === category);

        const itemsPerColumn = Math.ceil(items.length / numberOfColumns);
        const columns = Array.from({ length: numberOfColumns }, (_, columnIndex) =>
          items.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn),
        );

        return (
          <div
            key={category}
            className="menu-section flex w-full flex-col gap-0 rounded-[16px] bg-white p-10 md:gap-10 xl:px-20 xl:py-16"
          >
            {/* Menu Title */}
            <div className="menu-title flex w-full translate-y-16 flex-col items-center gap-1 border-b-[1px] border-[#e5e8f0] pb-10 opacity-0 md:gap-3">
              <h4 className="text-[34px] font-bold leading-[60px] tracking-[-0.04em] md:text-[56px]">{category}</h4>
              <p className="text-[16px] font-normal leading-[24px] text-[#70758c]">{category}</p>
            </div>

            {/* Menu Details */}
            <div className="menu-details flex w-full translate-y-16 flex-col justify-between gap-0 divide-y-[1px] divide-[#e5e8f0] opacity-0 xl:flex-row xl:gap-[112px] xl:divide-y-0">
              {columns.map((columnItems, columnIndex) => (
                <div key={columnIndex} className="flex w-full flex-col divide-y-[1px] divide-[#e5e8f0]">
                  {columnItems.map((item, index) => (
                    <div key={index} className="flex w-full items-center justify-between py-6 md:py-10">
                      <div className="flex w-full flex-col items-center gap-6 md:flex-row">
                        <Image
                          src={item.imageUrl || ""}
                          alt={item.name || ""}
                          width={95}
                          height={95}
                          className="aspect-square w-[95px] rounded-full"
                        />
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex w-full flex-col items-center justify-between md:flex-row">
                            <h3 className="text-[16px] font-bold leading-[32px] tracking-[-0.02em]">{item.name}</h3>
                            <span className="text-[16px] font-bold leading-[32px] text-[#70758c]">{item.price}</span>
                          </div>
                          <p className="w-full text-center text-[14px] font-normal leading-[24px] text-[#70758c] md:w-[290px] md:text-left">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
