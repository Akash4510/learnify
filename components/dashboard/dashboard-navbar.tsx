"use client";

import Link from "next/link";
import { Bell, LogOut, MessageCircleMore } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar";
import { Logo } from "@/components/logo";

export const DashboardNavbar = () => {
  return (
    <nav className="px-4 lg:px-6 flex items-center justify-between gap-4 h-full">
      <div className="flex flex-shrink-0 items-center">
        <MobileSidebar />
        <div className="-mt-1">
          <Logo full asLink />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* <ThemeToggle /> */}

        <Button variant="accent" size="icon" className="hidden md:flex" asChild>
          <Link href="/dashboard">
            <MessageCircleMore className="size-[1.2rem]" />
          </Link>
        </Button>

        <Button variant="accent" size="icon" className="hidden md:flex" asChild>
          <Link href="/dashboard">
            <Bell className="size-[1.2rem]" />
          </Link>
        </Button>

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
