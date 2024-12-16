"use server";

import { signIn } from "@/auth";
import { ActionResult } from "@/lib/types/authTypes";
import { SignInSchema } from "../schemas/signInSchema";
import { AuthError } from "next-auth";
import { registerSchema, RegisterSchema } from "../schemas/registerSchema";
import bcrypt from "bcryptjs";
import { User } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { USER_BY_EMAIL_QUERY } from "@/sanity/lib/auth/userQueries";

// sign in user
export async function signInUser(data: SignInSchema): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email);
    if (!existingUser || !existingUser.email) {
      return { status: "error", error: "Invalid credentials" };
    }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

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

// register user
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _type: "user",
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
      providerId: crypto.randomUUID(),
    } as User;

    const createUserResult = await createUser(newUser);

    if (createUserResult.status === "error") {
      return createUserResult;
    }

    // 尝试登录
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return { status: "success", data: { name, email } as User };
  } catch (error) {
    return { status: "error", error: "Something went wrong" };
  }
}

// get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await client.fetch(USER_BY_EMAIL_QUERY, { email }, { cache: "no-cache" });
    return user || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// create user
export const createUser = async (user: User): Promise<ActionResult<User>> => {
  try {
    const existingUser = await getUserByEmail(user.email!);
    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }
    const newUser = await client.create({
      ...user,
    });
    return { status: "success", data: { name: newUser.name, email: newUser.email } as User };
  } catch (error) {
    return { status: "error", error: "Something went wrong" };
  }
};
