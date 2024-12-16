import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";

const userDropdownMenu = [
  { label: "My Orders", href: "/order", icon: FiShoppingBag },
  { label: "Profile", href: "/profile", icon: FiUser },
  { label: "Logout", onClick: () => signOut(), icon: FiLogOut },
];

export default function UserDropdownComponent({ session, dark }: { session: Session; dark?: boolean }) {
  if (!session.user) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={`ml-8 md:ml-5 flex w-6 h-6 md:h-8 md:w-8 cursor-pointer items-center justify-center rounded-full font-bold capitalize relative -top-[4px] md:top-0 ${
          dark ? "bg-secondary text-primary" : "bg-primary text-secondary"
        } focus:outline-none active:outline-none`}
      >
        {(session.user.userName?.split(" ")[0] ?? "User")[0]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4} className="w-[250px] border-none bg-secondary p-3">
        <DropdownMenuLabel className="py-3 text-[16px] font-bold capitalize text-primary">
          Hey, {session.user.userName}
        </DropdownMenuLabel>
        {userDropdownMenu.map((item) => (
          <DropdownMenuItem
            asChild
            key={item.label}
            onClick={item.onClick}
            className="cursor-pointer py-2 hover:!bg-primary hover:!text-secondary"
          >
            <Link href={item.href ?? ""}>
              <item.icon />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
