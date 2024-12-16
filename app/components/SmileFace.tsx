"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SmileFace() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const firstImage = containerRef.current?.querySelector(".first-image");
      if (!firstImage) return;
      gsap
        .timeline({ repeat: -1 })
        .to(firstImage, { opacity: 0, duration: 0.1 })
        .to(firstImage, { opacity: 1, duration: 0.1 }, "+=0.5")
        .to(firstImage, { opacity: 1, duration: 4.8 });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className="relative h-[62px] w-full">
      <Image
        src={"/smile-face2.svg"}
        alt="smile-face"
        width={60}
        height={60}
        className="absolute inset-0 left-1/2 aspect-square w-[62px] -translate-x-1/2"
      />
      <Image
        src={"/smile-face.svg"}
        alt="smile-face"
        width={60}
        height={60}
        className="first-image absolute inset-0 left-1/2 aspect-square w-[62px] -translate-x-1/2"
      />
    </div>
  );
}
