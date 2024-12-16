import SmileFace from "@/app/components/SmileFace";
import React from "react";

export default function BannerComponent({ category }: { category: string }) {
  return (
    <header className="relative flex h-[270px] w-full flex-col flex-nowrap items-center justify-center gap-[32px] overflow-hidden rounded-[24px] bg-primary px-4 pb-[80px] pt-[96px] text-white md:h-fit md:p-[112px]">
      <div className="relative flex w-full flex-col items-center justify-center text-center md:gap-2 md:pt-10">
        <h1 className="relative font-archivo text-[32px] font-black uppercase leading-[40px] tracking-[-0.04em] md:text-[64px] md:leading-[72px] xl:text-[96px] xl:leading-[104px]">
          {category.replace(/-/g, ' ')}
        </h1>
        <h5 className="text-[16px] font-bold leading-[24px] md:text-[24px] md:leading-[32px]"></h5>
      </div>
    </header>
  );
}
