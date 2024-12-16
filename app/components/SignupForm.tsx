import { registerSchema } from "@/lib/schemas/registerSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/admin/lib/actions/authActions";
import { toast } from "react-toastify";
import { RegisterUser } from "../admin/lib/types/user";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: RegisterUser) => {
    try {
      setIsLoading(true);
      const result = await registerUser(data);
      
      if (result.status === 201) {
        toast.success("User created successfully");
        window.location.href = "/";
      } else {
        toast.error(result.title || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const inputClassName = "w-full rounded-full border-[1px] border-gray-300 p-4 focus:outline-primary focus:border-primary transition-colors duration-200";
  const errorClassName = "text-sm text-coffeePink pl-4";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-neutral-600 w-full">
      <div className="space-y-1">
        <input
          className={`${inputClassName} ${errors.userName ? 'border-coffeePink' : ''}`}
          type="text"
          placeholder="Username*"
          {...register("userName")}
          disabled={isLoading}
        />
        {errors.userName && <p className={errorClassName}>{errors.userName.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          className={`${inputClassName} ${errors.email ? 'border-coffeePink' : ''}`}
          type="email"
          placeholder="Email*"
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && <p className={errorClassName}>{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <input
          className={`${inputClassName} ${errors.password ? 'border-coffeePink' : ''}`}
          type="password"
          placeholder="Password*"
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && <p className={errorClassName}>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="rounded-full bg-secondary px-4 py-4 text-[18px] font-semibold text-primary transition-colors duration-300 hover:bg-green-500 disabled:bg-green-200 disabled:cursor-not-allowed"
        disabled={isLoading || isSubmitting}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
