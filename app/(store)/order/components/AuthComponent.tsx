import React from 'react'
import { FaBan } from 'react-icons/fa'

export default function AuthComponent() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
        <section className="flex w-full flex-col gap-4 rounded-[24px] bg-[#e98e8e] p-2 font-inter md:p-4">
          <div className="flex h-[800px] w-full flex-col justify-center gap-4 rounded-[16px] p-4 md:gap-10 md:p-10 xl:px-20 xl:py-16">
            <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
              <h4 className="flex flex-col items-center gap-2 text-[34px] font-bold leading-[1.2em] tracking-[-0.04em] md:text-[56px] md:leading-[60px]">
                <FaBan className="text-[#9a0707a7]" size={100} />
                You are not authenticated
              </h4>
              <p className="text-[20px] font-semibold leading-[1.2em] text-white md:leading-[24px]">
                Please sign in to view your orders
              </p>
            </div>
          </div>
        </section>
      </div>
  )
}
