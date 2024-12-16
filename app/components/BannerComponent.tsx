"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

export default function BannerComponent({
  title = "Title here",
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const text = containerRef.current?.querySelectorAll("h1");
      const subtitle = containerRef.current?.querySelectorAll("h5");


      const tl = gsap.timeline();

      if (!text?.length || !subtitle?.length) return;

      tl.to(text, { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power1" });
      tl.to(subtitle, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power1" }, "+0.5");
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="relative flex h-[270px] w-full flex-col flex-nowrap items-center justify-center gap-[32px] overflow-hidden rounded-[24px] bg-primary px-4 pb-[80px] pt-[96px] text-white md:h-fit md:p-[112px]"
    >
      <div className="relative flex w-full flex-col items-center justify-center md:gap-2 md:pt-10">
        <h1 className="relative translate-y-[30px] font-archivo text-[64px] text-center font-black uppercase leading-[68px] tracking-[-0.04em] opacity-0 md:text-[136px] md:leading-[150px] xl:text-[175px] xl:leading-[190px]">
          {title}
        </h1>
        {subtitle && (
          <h5 className="translate-y-[80px] text-[20px] font-bold leading-[32px] opacity-0 md:text-[34px] md:leading-[40px]">
            {subtitle}
          </h5>
        )}
        {children}
      </div>
    </header>
  );
}
