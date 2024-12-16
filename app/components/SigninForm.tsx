"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/schemas/signInSchema";
import { toast } from "react-toastify";
import { LoginUser } from "../admin/lib/types/user";
import { signInUser } from "../admin/lib/actions/authActions";
export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginUser>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      setIsLoading(true);
      const result = await signInUser(data);
      console.log(result);

      if (result.status === "success") {
        window.location.href = "/";
      } else {
        toast.error((result.error as string) || "Something went wrong");
        setIsLoading(false);
        reset();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const inputClassName =
    "w-full rounded-full border-[1px] border-gray-300 p-4 focus:outline-primary focus:border-primary transition-colors duration-200";
  const errorClassName = "text-sm text-coffeePink pl-4";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 text-neutral-600">
      <div className="space-y-1">
        <input
          className={`${inputClassName} ${errors.email ? "border-coffeePink" : ""}`}
          type="email"
          placeholder="Email*"
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && <p className={errorClassName}>{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          className={`${inputClassName} ${errors.password ? "border-coffeePink" : ""}`}
          type="password"
          placeholder="Password*"
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && <p className={errorClassName}>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="rounded-full bg-secondary px-4 py-4 text-[18px] font-semibold text-primary transition-colors duration-300 hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-200"
        disabled={isLoading || isSubmitting}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
