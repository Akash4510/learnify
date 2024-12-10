"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  adminDashboarRoutes,
  creatorDashboardRoutes,
  dashboardRoutes,
  mainRoutes,
} from "@/constants/sidebar-routes";
import { ThemeToggle } from "./theme-toggle";

interface SidebarProps {
  afterNavItemClick?: () => void;
}

export const Sidebar = ({ afterNavItemClick }: SidebarProps) => {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isCreatorDashboard = pathname.startsWith("/creator-dashboard");
  const isAdminDashboard = pathname.startsWith("/admin-dashboard");

  let routes;
  if (isDashboard) {
    routes = dashboardRoutes;
  } else if (isCreatorDashboard) {
    routes = creatorDashboardRoutes;
  } else if (isAdminDashboard) {
    routes = adminDashboarRoutes;
  } else {
    routes = mainRoutes;
  }

  return (
    <div className="space-y-6 flex flex-col h-full border-r">
      <div className="p-3 px-2.5 flex flex-col justify-between flex-1">
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
        <div className="border-t flex justify-center py-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger className="md:hidden pr-4" onClick={() => setIsOpen(true)}>
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="p-0 pt-10 w-30">
        <Sidebar afterNavItemClick={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
