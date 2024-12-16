import BannerComponent from "@/app/components/BannerComponent";
import React from "react";
import ContactDetailComponent from "./components/ContactDetailComponent";

export default function Contact() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent title="CONTACT" subtitle="We’d love to hear from you!" />
      <ContactDetailComponent />
    </div>
  );
}
