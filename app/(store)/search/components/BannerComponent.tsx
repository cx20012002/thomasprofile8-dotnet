import SmileFace from '@/app/components/SmileFace';
import React from 'react'

export default function BannerComponent({ query }: { query: string }) {
  return (
    <header className="relative flex h-[270px] w-full flex-col flex-nowrap items-center justify-center gap-[32px] overflow-hidden rounded-[24px] bg-primary px-4 pb-[80px] pt-[96px] text-white md:h-fit md:p-[112px]">
        <div className="relative flex w-full flex-col items-center justify-center text-center md:gap-2 md:pt-10">
          <SmileFace />
          <h1 className="relative font-archivo text-[32px] flex flex-col font-black uppercase leading-[40px] tracking-[-0.04em] md:text-[64px] md:leading-[72px] xl:text-[96px] xl:leading-[104px]">
            Search Results for <span className="text-secondary text-[50px] font-bold leading-[60px]">"{query}"</span>
          </h1>
      </div>
    </header>
  );
}


