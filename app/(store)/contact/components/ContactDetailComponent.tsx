"use client";

import SmileFace from "@/app/components/SmileFace";
import { createContact } from "@/lib/actions/contactActions";
import { contactSchema, ContactSchema } from "@/lib/schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactDetailComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onSubmit",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactSchema) => {
    setIsSubmitting(true);
    const result = await createContact(data);
    if (result.status === "error") {
      toast.error(result.error as string);
    } else {
      toast.success("Message sent successfully");
    }
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="flex w-full flex-col gap-4 rounded-[24px] bg-[#eaedf6] px-2 py-2 md:px-4 md:py-4">
      <div className="flex w-full flex-col items-center gap-10 rounded-[20px] bg-white px-4 py-14">
        <div className="flex flex-col items-center gap-4">
          <SmileFace />
          <h6 className="text-[20px] font-bold leading-8 text-textLight md:text-[24px] text-center">
            We’re always here to make your coffee experience better.
          </h6>
        </div>

        <form action="" className="flex w-full max-w-[750px] flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            className="h-[52px] w-full rounded-[12px] border-[1px] border-textLight p-6 focus:outline-none"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className="h-[52px] w-full rounded-[12px] border-[1px] border-textLight p-6 focus:outline-none"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Phone number"
            className="h-[52px] w-full rounded-[12px] border-[1px] border-textLight p-6 focus:outline-none"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <textarea
            placeholder="Message"
            className="h-[150px] w-full rounded-[12px] border-[1px] border-textLight p-6 focus:outline-none"
            {...register("message")}
          />
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`rounded-full bg-primary px-10 py-4 font-bold text-white ${isSubmitting ? 'opacity-50' : ''} hover:text-secondary transition-colors duration-300`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
