"use client";

import { useGSAP } from "@gsap/react";
import React, { HTMLAttributes, memo, ReactNode, useRef } from "react";
import gsap from "gsap";
import { alignToMouseCursor, followMouseCursor } from "@/lib/utils/followMouseCursor";

interface MouseCursorComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  isAbsolute?: boolean;
  duration?: number;
  buttonText?: string;
}

const MouseCursorComponent = ({
  children,
  className,
  isAbsolute = false,
  duration,
  buttonText = "View",
  ...rest
}: MouseCursorComponentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseCursorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;

      // Set initial state
      if (mouseCursorRef.current) {
        gsap.set(mouseCursorRef.current, {
          opacity: 1,
          scale: 2,
        });
      }

      const onMouseMove = contextSafe((e: MouseEvent) => {
        followMouseCursor(containerRef, mouseCursorRef, e, duration);
      });

      const onMouseLeave = contextSafe(() => {
        gsap.to(mouseCursorRef.current, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
        });
      });

      const onMouseEnter = contextSafe((e: MouseEvent) => {
        alignToMouseCursor(containerRef, mouseCursorRef, e);
        gsap.to(mouseCursorRef.current, {
          opacity: 1,
          scale: 2,
          duration: 0.3,
        });
      });

      if (containerRef.current) {
        containerRef.current.addEventListener("mousemove", onMouseMove);
        containerRef.current.addEventListener("mouseleave", onMouseLeave);
        containerRef.current.addEventListener("mouseenter", onMouseEnter);
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("mousemove", onMouseMove);
          containerRef.current.removeEventListener("mouseleave", onMouseLeave);
          containerRef.current.removeEventListener("mouseenter", onMouseEnter);
        }

        if (mouseCursorRef.current) {
          gsap.killTweensOf(mouseCursorRef.current);
        }
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={`${className} ${!isAbsolute && "relative"}`} {...rest}>
      {children}
      <div
        ref={mouseCursorRef}
        className={`pointer-events-none absolute inset-0 z-20 hidden h-[30px] w-[30px] items-center justify-center text-[8px] opacity-0 md:flex`}
      >
        <div className="h-[6px] w-[6px] rounded-full bg-coffeePink"></div>
      </div>
    </div>
  );
};

export default memo(MouseCursorComponent);
