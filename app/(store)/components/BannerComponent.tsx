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
      const coffeeCup = containerRef.current?.querySelector(".coffee-cup");
      const circleBadge = containerRef.current?.querySelector(".circle-badge");
      const coffeeBean = containerRef.current?.querySelector(".coffee-bean");
      const tl = gsap.timeline();

      if (!text || !coffeeCup || !circleBadge || !coffeeBean) return;

      tl.from(Array.from(text).slice(0, 6), { duration: 1, opacity: 0, y: 20, stagger: 0.2 })
        .from(coffeeCup, { duration: 0.5, opacity: 0, y: 180, rotation: 0 }, "0.5")
        .from(coffeeBean, { duration: 2.5, opacity: 0, y: 180, rotate: 5, ease: "power4.out" }, "0.8")
        .from(Array.from(text).slice(6), { duration: 1, opacity: 0, stagger: 0.2 }, "1.3")
        .from(circleBadge, { duration: 0.5, opacity: 0, rotate: 0, scale: 0 }, "1.8");
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="relative flex h-[450px] w-full flex-col flex-nowrap items-center justify-start overflow-hidden rounded-[24px] bg-primary px-[16px] pt-[72px] text-white md:h-[715px] md:px-[24px] md:pt-[144px] xl:h-[820px]"
    >
      {/* <HeaderComponent
        className="absolute left-[20px] right-[20px] top-[20px] z-50 flex h-[45px] items-start justify-between overflow-hidden rounded-[60px] bg-secondary px-[20px] py-[14px] md:h-[62px] md:items-center md:rounded-full md:px-10 md:py-[18px]"
        session={session}
      /> */}

      <div className="relative h-[375px] min-h-[375px] w-[350px] font-archivo text-[64px] font-black leading-[68px] tracking-[-0.04em] md:h-[609px] md:min-h-[609px] md:w-[778px] md:text-[136px] md:leading-[150px] xl:w-[930px] xl:text-[175px] xl:leading-[190px]">
        <h1 className="absolute left-[47%] top-[64px] -translate-x-1/2 md:left-[46%] md:top-[84px] xl:left-[45%] xl:top-[81px]">
          F
        </h1>
        <div className="coffee-bean absolute left-[46%] top-[50px] h-[106px] w-[144px] -translate-x-1/2 rotate-[-10deg] md:left-[207px] md:top-[6px] md:h-[205px] md:w-[280px] md:translate-x-0 xl:left-[257px] xl:top-[22px]">
          <Image src={"/coffee-bean.avif"} priority alt="banner" width={930} height={609} />
        </div>
        <h1 className="absolute left-[42px] top-[64px] md:left-[107px] md:top-[84px] xl:left-[97px] xl:top-[81px]">
          K
        </h1>
        <h1 className="absolute left-[93px] top-[64px] md:left-[207px] md:top-[84px] xl:left-[229px] xl:top-[81px]">
          O
        </h1>
        <h1 className="absolute left-[185px] top-[64px] md:left-[400px] md:top-[84px] xl:left-[478px] xl:top-[81px]">
          F
        </h1>
        <h1 className="absolute left-[227px] top-[64px] md:left-[487px] md:top-[84px] xl:left-[591px] xl:top-[81px]">
          E
        </h1>
        <h1 className="absolute left-[272px] top-[64px] md:left-[579px] md:top-[84px] xl:left-[713px] xl:top-[81px]">
          E
        </h1>
        <h1 className="absolute left-[84px] top-[115px] md:left-[153px] md:top-[191px] xl:left-[178px] xl:top-[53%] xl:-translate-y-1/2">
          L
        </h1>
        <h1 className="absolute left-[231px] top-[115px] md:left-[520px] md:top-[191px] xl:left-[613px] xl:top-[53%] xl:-translate-y-1/2">
          E
        </h1>
        <div className="coffee-cup absolute bottom-[-118px] left-[58%] h-[355px] w-[200px] -translate-x-1/2 rotate-[-11deg] md:bottom-[-209px] md:left-[54%] md:h-[635px] md:w-[358px] md:rotate-[-11deg] xl:bottom-[-353px] xl:left-[52%] xl:h-[766px] xl:w-[432px] xl:rotate-[-10deg]">
          <Image src={"/coffee-cup.avif"} priority alt="banner" width={432} height={766} />
        </div>
        <h1 className="absolute left-[130px] top-[115px] md:left-[272px] md:top-[191px] xl:left-[314px] xl:top-[53%] xl:-translate-y-1/2">
          A
        </h1>
        <h1 className="absolute left-[180px] top-[115px] md:left-[393px] md:top-[191px] xl:left-[449px] xl:top-[53%] xl:-translate-y-1/2">
          N
        </h1>
        <div className="circle-badge absolute left-[calc(74%-100px/2)] top-[calc(60%-100px/2)] flex aspect-square w-[100px] rotate-[14deg] items-center justify-center rounded-full bg-coffeePink md:right-[144px] md:top-[162px] xl:left-[702px] xl:top-[184px] xl:w-[150px]">
          <div className="flex aspect-square w-[87px] items-center justify-center rounded-full border-[1px] border-dashed border-[#7322ff] xl:w-[130px]">
            <p className="text-center text-[14px] font-black leading-[1em] tracking-[-0.02em] text-[#7322ff] xl:text-[22px]">
              Roasted Goodness
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
