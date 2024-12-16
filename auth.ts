import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dotnetLogin, getUserByEmail, registerUser } from "./app/admin/lib/actions/authActions";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    userName?: string;
    apiToken?: string;
  }
}

declare module "next-auth" {
  interface User {
    token?: string;
  }

  interface Session {
    user: {
      token?: string;
      email: string;
      userName?: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.NODE_ENV === "development" ? process.env.AUTH_GITHUB_ID_LOCAL : process.env.AUTH_GITHUB_ID,
      clientSecret:
        process.env.NODE_ENV === "development" ? process.env.AUTH_GITHUB_SECRET_LOCAL : process.env.AUTH_GITHUB_SECRET,
    }),
    Google,
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        const { userName, email, password, token } = credentials as {
          userName: string;
          email: string;
          password: string;
          token?: string;
        };

        if (!email || !password) {
          return null;
        }

        return {
          name: userName,
          email: email,
          token: token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      const hasTokenUpdate = user?.token && !token.apiToken;

      if (hasTokenUpdate) {
        token.apiToken = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          token: token.apiToken || session.user.token,
          userName: token.name ?? "",
          email: token.email ?? "",
        },
      };
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (["github", "google"].includes(account?.provider ?? "")) {
        if (!user.email) return false;

        try {
          await registerUser({
            userName: user.name || "",
            email: user.email,
            password: "Pa$$w0rd",
          });

          const { token } = await dotnetLogin({
            email: user.email,
            password: "Pa$$w0rd",
          });

          if (token) {
            user.token = token;
            return true;
          }

          return false;
        } catch (error) {
          console.error("Error in OAuth signIn:", error);
          return false;
        }
      }

      return false;
    },
  },
});
