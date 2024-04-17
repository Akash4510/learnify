"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { dashboardRoutes, mainRoutes } from "@/constants/sidebar-routes";

interface SidebarProps {
  afterNavItemClick?: () => void;
}

export const Sidebar = ({ afterNavItemClick }: SidebarProps) => {
  const pathname = usePathname();
  const routes = pathname.startsWith("/dashboard")
    ? dashboardRoutes
    : mainRoutes;

  return (
    <div className="space-y-6 flex flex-col h-full border-r">
      <div className="p-3 px-2.5 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              onClick={afterNavItemClick}
              href={route.href}
              className={cn(
                "text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent rounded-lg transition",
                pathname === route.href && "bg-accent font-bold"
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
