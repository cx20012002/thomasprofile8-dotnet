"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/lib/content";
import SmileFace from "./SmileFace";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { subscriptionSchema } from "@/lib/schemas/subscriptionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createSubscriber } from "@/lib/actions/subscriberAction";
import { Subscriber } from "@/lib/types/generalTypes";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/" },
  { name: "Shop", href: "/" },
  { name: "Locations", href: "/" },
  { name: "Contact", href: "/" },
];

export default function Footer() {
  const pathname = usePathname();
  const isProductPage = pathname.includes("/product/");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Subscriber>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: Subscriber) => {
    setIsSubmitting(true);
    const result = await createSubscriber(data);
    if (result.status === "error") {
      toast.error(result.error as string);
    } else {
      toast.success("You have been subscribed to our newsletter");
    }
    reset();
    setIsSubmitting(false);
  };

  return (
    <footer
      className={`flex w-full flex-col items-center justify-center gap-2 px-2 pb-2 md:gap-4 md:px-4 md:pb-4 ${isProductPage && "bg-backgroundGray"}`}
    >
      {/* newsletter */}
      <section className="flex w-full flex-col items-center justify-center rounded-[24px] bg-secondary py-[72px] md:py-24">
        {/* content */}
        <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-[25px] px-4">
          {/* title */}
          <div className="flex w-full flex-col items-center justify-center gap-2 md:gap-4">
            <h4 className="text-[34px] font-[700] leading-[40px] tracking-[-0.04em] text-textDark md:text-[56px] md:leading-[60px]">
              Stay in touch!
            </h4>
            <p className="text-[16px] font-[600] leading-[24px] text-textDark opacity-70">
              Latest offers, news, & goodies to your inbox.
            </p>
          </div>

          {/* form */}
          <form
            className="relative flex w-full flex-col items-start justify-start gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="email"
              className="h-[52px] w-full rounded-full bg-white p-6 focus:outline-none md:h-[68px]"
              placeholder="Your email address"
              {...register("email")}
            />

            <button
              type="submit"
              className={cn(
                "flex h-[52px] w-full items-center justify-between gap-2 rounded-full",
                "bg-primary px-5 py-[14px] font-[700] text-white",
                "transition-colors duration-300 hover:text-secondary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "md:absolute md:right-2 md:top-1/2 md:w-auto md:-translate-y-1/2",
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
            {errors.email && (
              <p className="absolute -bottom-[30px] pl-4 text-sm text-coffeePink">{errors.email.message}</p>
            )}
          </form>
        </div>
      </section>

      {/* footer and navigation */}
      <section className="flex w-full flex-col items-center justify-center gap-[44px] rounded-[24px] bg-primary py-10 md:gap-[60px] md:py-[80px]">
        {/* logo and smile face */}
        <div className="flex flex-col items-center justify-center gap-3">
          <SmileFace />
          <Link href={"/"}>
            <Image
              src={"/footer-logo.svg"}
              alt="logo"
              width={400}
              height={181}
              className="aspect-[244/110] h-auto w-[244px] object-contain md:aspect-[400/181] md:w-[400px]"
            />
          </Link>
        </div>
        {/* navigation */}
        <div className="flex flex-col items-center justify-center gap-4">
          <ul className="flex items-center justify-center gap-6 text-[16px] font-[600] leading-[24px] text-white">
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
        </div>
      </section>
    </footer>
  );
}
