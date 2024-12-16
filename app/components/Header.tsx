"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Session } from "next-auth";
import HeaderComponent from "./HeaderComponent";
import { usePathname } from "next/navigation";
import Modal from "./Modal";
import SignPanel from "./SignPanel";

export default function Header({ session }: { session: Session | null }) {
  gsap.registerPlugin(ScrollTrigger);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isProductPage = pathname.includes("/product");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: container,
          start: "600 20%",
          end: "600 20%",
          scrub: 1,
          animation: gsap.to(container, {
            width: "50%",
            left: "50%",
            ease: "power2.inOut",
          }),
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <div
        ref={containerRef}
        className={`fixed left-1/2 top-5 ${isProductPage ? "px-2 md:top-4 md:px-4" : "px-5 md:top-8 md:px-8"} z-50 flex w-full -translate-x-1/2 items-center justify-between`}
      >
        <HeaderComponent
          session={session}
          className="flex w-full items-start justify-between rounded-[60px] bg-secondary px-[20px] py-[14px] md:h-[62px] md:items-center md:rounded-full md:px-10 md:py-[18px]"
          setIsUserModalOpen={setIsUserModalOpen}
        />
      </div>
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
        }}
      >
        <SignPanel />
      </Modal>
    </>
  );
}
