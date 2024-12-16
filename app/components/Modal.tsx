import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { TfiClose } from "react-icons/tfi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen) return;

      const tl = gsap.timeline();
      tl.to(".modal-overlay", {
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.inOut",
      }).to(
        ".modal-content",
        {
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1,0.7)",
          scale: 1,
        },
        "-=0.2",
      );
    },
    { scope: containerRef, dependencies: [isOpen] },
  );

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(".modal-content", {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: "power2.inOut",
    }).to(
      ".modal-overlay",
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "-=0.2",
    );
  };

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
      <div onClick={handleClose} className="modal-overlay absolute inset-0 z-10 h-full w-full bg-black opacity-0" />
      <div className="modal-content relative z-20 scale-50 opacity-0">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-black/50 transition-colors hover:text-gray-300 z-50"
        >
          <TfiClose size={25} />
        </button>
        {children}
      </div>
    </div>
  );
}
