"use server";

import { signIn } from "@/auth";
import { LoginUser, RegisterUser } from "../types/user";
import { ActionResult } from "@/lib/types/authTypes";
import { SignInSchema } from "@/lib/schemas/signInSchema";
import { AuthError } from "next-auth";

// register user
export async function registerUser(data: RegisterUser) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

// sign in user
export async function signInUser(data: SignInSchema): Promise<ActionResult<string>> {
  try {
    const response = await dotnetLogin(data);

    if (response.status === 400) {
      return { status: "error", error: "Invalid login details" };
    }

    if (response.status === 404) {
      return { status: "error", error: "User not found" };
    }

    if (response.status === 401) {
      return { status: "error", error: "Password is incorrect" };
    }

    if (response.status === 200) {
      await signIn("credentials", {
        userName: response.userName,
        email: response.email,
        password: response.password,
        token: response.token,
        redirect: false,
      });
    }

    return { status: "success", data: "Logged in" };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something went wrong" };
    }
  }
}

export async function dotnetLogin(data: LoginUser) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getUserByEmail(email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/account/getUserByEmail?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
