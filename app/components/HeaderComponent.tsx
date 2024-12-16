"use client";

import { menuItems } from "@/lib/content";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FiUser } from "react-icons/fi";

import Image from "next/image";
import gsap from "gsap";
import { Session } from "next-auth";
import UserDropdownComponent from "./UserDropdownComponent";
import CartComponent from "./CartComponent";
import { IoSearchOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SearchComponent from "./SearchComponent";
import { Description } from "@radix-ui/react-dialog";

export default function HeaderComponent({
  className,
  session,
  dark,
  setIsUserModalOpen,
}: {
  className?: string;
  session?: Session | null;
  dark?: boolean;
  setIsUserModalOpen: (isOpen: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useGSAP(
    (_, contextSafe) => {
      const nav = containerRef.current;
      const hamburgerMenu = nav?.querySelector(".hamburger-menu");
      const hamburgerMenuList = nav?.querySelector(".hamburger-menu-list");
      const [topLine, middleLine, bottomLine] = hamburgerMenu?.querySelectorAll("span") || [];
      let switchState = false;

      if (!nav || !hamburgerMenu || !hamburgerMenuList || !contextSafe) return;

      const setInitialStyles = (width: number, height: number, xTop: number, xBottom: number) => {
        gsap.set(hamburgerMenuList, { opacity: 0, x: -100 });
        gsap.set(nav, { height, borderRadius: 60 });
        gsap.set(topLine, { rotate: 0, x: xTop, width: 14 });
        gsap.set(middleLine, { display: "block" });
        gsap.set(bottomLine, { rotate: 0, x: xBottom, width: 14 });
        switchState = false;
      };

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => setInitialStyles(62, 62, 0, 0));
      mm.add("(max-width: 767px)", () => setInitialStyles(45, 45, 7, -7));

      const toggleMenu = (isOpen: boolean) => {
        const tl = gsap.timeline();
        if (isOpen) {
          tl.set(middleLine, { display: "none" })
            .to(topLine, { duration: 0.5, rotate: 45, y: 6.5, x: 0, width: 20 }, 0)
            .to(bottomLine, { duration: 0.5, rotate: -45, y: -6.5, x: 0, width: 20 }, 0)
            .to(nav, { duration: 0.5, height: 300, borderRadius: 20 }, 0)
            .to(hamburgerMenuList, { duration: 0.3, opacity: 1, x: 25 });
        } else {
          tl.set(middleLine, { display: "block" })
            .to([topLine, bottomLine], {
              duration: 0.5,
              rotate: 0,
              y: 0,
              x: 0,
              width: 14,
            })
            .to(nav, { duration: 0.5, height: 45, borderRadius: 60 }, 0)
            .set(hamburgerMenuList, { opacity: 0, x: -100 }, 0);
        }
      };

      const hamburgerClickHandler = contextSafe(() => {
        switchState = !switchState;
        toggleMenu(switchState);
      });

      const handleHover = (xTop: number, xBottom: number) => {
        if (switchState) return;
        gsap.to(topLine, { duration: 0.3, x: xTop });
        gsap.to(bottomLine, { duration: 0.3, x: xBottom });
      };

      const hamburgerHoverHandler = contextSafe(() => handleHover(-7, 7));
      const hamburgerLeaveHandler = contextSafe(() => handleHover(7, -7));

      hamburgerMenu.addEventListener("click", hamburgerClickHandler);
      hamburgerMenu.addEventListener("mouseover", hamburgerHoverHandler);
      hamburgerMenu.addEventListener("mouseleave", hamburgerLeaveHandler);
      return () => {
        hamburgerMenu.removeEventListener("click", hamburgerClickHandler);
        hamburgerMenu.removeEventListener("mouseover", hamburgerHoverHandler);
        hamburgerMenu.removeEventListener("mouseleave", hamburgerLeaveHandler);
      };
    },
    { scope: containerRef },
  );

  return (
    <nav ref={containerRef} className={`${className} ${dark ? "bg-primary text-white" : "bg-secondary text-textDark"}`}>
      {/* logo */}
      <Link href="/" className="w-[44px] md:w-[52px]">
        <Image src={`${dark ? "/logo-light.svg" : "/logo.svg"}`} alt="logo" width={52} height={22} />
      </Link>

      <div className="flex h-full gap-2 md:items-center">
        {/* navigation */}
        <ul className={`hidden items-center justify-center gap-6 text-[15px] font-[600] leading-[24px] md:flex`}>
          {menuItems.map((item) => (
            <li key={item.title} className="h-[26px] overflow-hidden">
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1/2"
              >
                <span>{item.title}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* search */}
        <div className="order-3 mt-[-2px] md:order-none md:mt-0">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <IoSearchOutline size={22} className="ml-5 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="top-52 flex w-full border-none p-0 text-center -ml-4 text-white shadow-none md:max-w-[800px] [&>button]:hidden">
              <DialogTitle className="text-[36px] font-[600]"></DialogTitle>
              <Description/>
              <SearchComponent setIsSearchOpen={setIsSearchOpen} />
            </DialogContent>
          </Dialog>
        </div>

        {/* hamburger menu */}
        <div className="hamburger-menu group relative flex h-[16px] w-[26px] cursor-pointer flex-col items-center justify-between md:hidden">
          <span className={`absolute top-0 h-[3px] w-[14px] origin-center ${dark ? "bg-white" : "bg-textDark"}`} />
          <span
            className={`absolute left-1/2 top-1/2 h-[3px] w-[14px] -translate-x-1/2 -translate-y-1/2 ${dark ? "bg-white" : "bg-textDark"}`}
          />
          <span className={`absolute bottom-0 h-[3px] w-[14px] origin-center ${dark ? "bg-white" : "bg-textDark"}`} />
        </div>

        {/* hamburger menu list */}
        <ul className="hamburger-menu-list absolute bottom-5 left-4 flex flex-col justify-center gap-4 text-[16px] font-[600] leading-[24px]">
          {menuItems.map((item) => (
            <li key={item.title} className="h-[26px] overflow-hidden">
              <Link href={item.href} className="flex flex-col transition-transform duration-300 hover:-translate-y-1/2">
                <span>{item.title}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* shopping cart */}
        <CartComponent dark={dark} />

        {/* user icon */}
        {session && session.user ? (
          <UserDropdownComponent session={session} dark={dark} />
        ) : (
          <div onClick={() => setIsUserModalOpen(true)} className="ml-5 flex h-full cursor-pointer items-center">
            <FiUser size={22} />
          </div>
        )}
      </div>
    </nav>
  );
}
