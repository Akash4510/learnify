"use client";

import Link from "next/link";
import { Bell, Clapperboard, LogOut } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar";
import { Logo } from "@/components/logo";
import { useCurrentUser } from "@/hooks/use-current-user";
import { USER_ROLE } from "@prisma/client";

export const DashboardNavbar = () => {
  const user = useCurrentUser();

  return (
    <nav className="px-4 lg:px-6 flex items-center justify-between gap-4 h-full">
      <div className="flex flex-shrink-0 items-center">
        <MobileSidebar />
        <div className="-mt-1">
          <Logo full asLink />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button variant="accent" size="icon" className="hidden md:flex" asChild>
          <Link href="/dashboard">
            <Bell className="size-[1.2rem]" />
          </Link>
        </Button>

        {user?.role !== USER_ROLE.USER && (
          <Button variant="accent" asChild>
            <Link href="/creator-dashboard">
              <Clapperboard size={18} className="md:mr-2" />
              <span className="hidden md:flex">Go to Creator Dashboard</span>
            </Link>
          </Button>
        )}

        <Button variant="accent" asChild>
          <Link href="/">
            <LogOut size={18} className="md:mr-2" />
            <span className="hidden md:flex">Exit Dashboard</span>
          </Link>
        </Button>

        <UserButton />
      </div>
    </nav>
  );
};
