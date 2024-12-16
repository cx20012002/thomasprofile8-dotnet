"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { GoHeartFill } from "react-icons/go";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function FeatureProductsComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const movingText = container.querySelectorAll(
        ".moving-text",
      ) as NodeListOf<HTMLDivElement>;
      const movingText2 = container.querySelectorAll(
        ".moving-text2",
      ) as NodeListOf<HTMLDivElement>;

      if (!movingText.length || !movingText2.length) return;

      const commonConfig = {
        repeat: -1,
        defaults: { ease: "none" },
      };

      gsap.timeline(commonConfig).to(movingText, {
        x: -movingText[0].clientWidth,
        duration: 30,
        ease: "none",
      });

      gsap
        .timeline(commonConfig)
        .fromTo(
          movingText2,
          { x: -movingText2[0].clientWidth },
          { x: 0, duration: 30, ease: "none" },
        );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="flex w-full flex-col gap-2 md:gap-4">
      <div className="flex w-full flex-col justify-between gap-2 md:gap-4 xl:flex-row">
        {/* Product 1 */}
        <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-[24px] md:h-[500px] xl:flex-1">
          <Image
            src="/feature-product1.avif"
            alt="product-1"
            width={936}
            height={500}
            className="absolute h-full w-full object-cover"
          />
          <h3 className="relative z-10 font-archivo text-[56px] font-bold text-white md:text-[76px]">
            Munch!
          </h3>
        </div>

        {/* Product 2 */}
        <div className="relative flex h-[400px] w-full flex-col items-center justify-end overflow-hidden rounded-[24px] bg-secondary pt-16 md:h-[500px] xl:w-[500px]">
          <div className="flex w-full flex-col items-center gap-2">
            <h3 className="relative z-10 text-center font-archivo text-[20px] font-bold md:text-[34px]">
              The one® is back
            </h3>
            <p className="w-[334px] text-center text-[16px] font-[400] opacity-70">
              Selected from the best coffee-growing regions around the world
            </p>
          </div>

          <div className="relative flex h-full w-full items-end justify-center">
            <Image
              src="/feature-product2.avif"
              alt="product-2"
              width={500}
              height={336}
              className="absolute -bottom-10 h-[336px] w-[500px] object-cover md:bottom-0"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-between gap-2 md:gap-4 xl:flex-row">
        {/* Product 3 */}
        <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-[24px] md:h-[500px] xl:flex-1">
          <Image
            src="/feature-product3.avif"
            alt="product-1"
            width={936}
            height={500}
            className="absolute h-full w-full object-cover"
          />
          <div className="relative flex aspect-square w-[207px] items-center justify-center rounded-full bg-white">
            <Image
              src="/circle-text.svg"
              alt="circle-text"
              width={175}
              height={175}
              className="animate-spin-infinity absolute w-full"
            />
            <GoHeartFill color="#80604A" size={30} />
          </div>
        </div>

        {/* Product 4 */}
        <div className="relative flex h-[400px] w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-[24px] bg-primary md:h-[500px] xl:w-[500px] xl:flex-1">
          <div className="flex h-[78px] w-[1500px] rotate-[-16deg] bg-coffeePink text-[24px] font-bold text-primary">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="moving-text flex h-full w-fit shrink-0 items-center justify-between gap-5 px-5 uppercase"
              >
                {Array.from({ length: 4 }).map((_, innerIndex) => (
                  <span
                    key={innerIndex}
                    className="flex shrink-0 items-center gap-5"
                  >
                    <Image
                      src="/star.svg"
                      alt="star"
                      width={24}
                      height={24}
                      className="w-[24px]"
                    />
                    New Menu
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="flex h-[78px] w-[1000px] rotate-[-16deg] text-[24px] font-bold text-coffeePink">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="moving-text2 flex h-full w-fit shrink-0 items-center justify-between gap-5 px-5 uppercase"
              >
                {Array.from({ length: 4 }).map((_, innerIndex) => (
                  <span
                    key={innerIndex}
                    className="flex shrink-0 items-center rounded-full border border-coffeePink bg-[#5938de] px-5 py-3"
                  >
                    Mori Salad
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
