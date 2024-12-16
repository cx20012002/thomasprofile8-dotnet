import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { auth } from "@/auth";
import React, { ReactNode } from "react";

export default async function Template({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="animate-fade-in">
      <Header session={session} />
      {children}
      <Footer />
    </div>
  );
}
