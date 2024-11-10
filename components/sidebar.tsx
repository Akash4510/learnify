"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { dashboardRoutes, mainRoutes } from "@/constants/sidebar-routes";
import { ThemeToggle } from "./theme-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { USER_ROLE } from "@prisma/client";

interface SidebarProps {
  afterNavItemClick?: () => void;
}

export const Sidebar = ({ afterNavItemClick }: SidebarProps) => {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const user = useCurrentUser();

  let routes;
  if (isDashboard) {
    if (!user) return null;
    routes = dashboardRoutes;
    if (user.role === USER_ROLE.USER) {
      routes = routes.filter((route) => route.accessLevel === USER_ROLE.USER);
    } else if (user.role === USER_ROLE.CREATOR) {
      routes = routes.filter((route) => route.accessLevel !== USER_ROLE.ADMIN);
    }
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
