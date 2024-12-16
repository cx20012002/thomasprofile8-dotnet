import { getMenuItems } from "@/lib/actions/menuactions";

export default async function About() {
  const menuItems = await getMenuItems();
  console.log(menuItems);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 px-4 py-5">
      welcome 
    </div>
  );
}
