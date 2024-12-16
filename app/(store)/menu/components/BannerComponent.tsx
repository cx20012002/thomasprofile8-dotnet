"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";

export default function BannerComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const text = containerRef.current?.querySelectorAll("h1");
      const smoothie = containerRef.current?.querySelector(".smoothie");
      const tl = gsap.timeline();

      if (!text || !smoothie) return;

      tl.to(text, { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power1" });
      tl.to(smoothie, { opacity: 1, y: 0, rotate: 0, duration: 1.5, ease: "power2.inOut" }, "<");
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="relative flex h-[270px] w-full flex-col flex-nowrap items-center justify-center gap-[32px] overflow-hidden rounded-[24px] bg-primary px-4 pb-[80px] pt-[96px] text-white md:h-fit md:p-[152px]"
    >
      <h1 className="relative translate-y-[30px] font-archivo text-[64px] font-black uppercase leading-[68px] tracking-[-0.04em] opacity-0 md:text-[136px] md:leading-[150px] xl:text-[175px] xl:leading-[190px]">
        Menu
      </h1>

      <div className="smoothie absolute bottom-[-114px] left-1/2 h-[264px] w-[154px] -translate-x-1/2 translate-y-[100px] -rotate-12 opacity-0 md:bottom-[-243px] md:h-[539px] md:w-[314px]">
        <Image src={"/chocolate-smoothie.avif"} priority alt="banner" width={314} height={539} />
      </div>
    </header>
  );
}
