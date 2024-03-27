"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Settings, Tv2, User } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarProps {
  afterNavItemClick?: () => void;
}

const routes = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: Tv2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
];

export const Sidebar = ({ afterNavItemClick }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6 flex flex-col h-full min-w-24 border-r">
      <div className="p-3 px-2.5 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              onClick={afterNavItemClick}
              href={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary-foreground hover:bg-accent rounded-lg transition",
                pathname === route.href && "bg-accent text-primary-foreground"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                <span className="text-center">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
