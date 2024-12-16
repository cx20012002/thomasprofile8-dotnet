import React from "react";
import BannerComponent from "./components/BannerComponent";
import MenuComponent from "./components/MenuComponent";
import { getMenuItems } from "@/lib/actions/menuactions";

export default async function page() {
  const menuItems = await getMenuItems();



  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent />
      <MenuComponent menuItems={menuItems} />
    </div>
  );
}
