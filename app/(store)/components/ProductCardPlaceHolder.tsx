import React from "react";

export default function ProductCardPlaceHolder() {
  return (
    <div className="flex w-full animate-pulse flex-col justify-between overflow-hidden rounded-[16px] bg-white opacity-0">
      <div className="relative h-[400px] w-full bg-gray-200" />
      <div className="flex w-full items-center justify-between p-6">
        <div className="flex w-full flex-col justify-center gap-1">
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
