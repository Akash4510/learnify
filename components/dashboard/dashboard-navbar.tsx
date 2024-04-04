"use client";

import Link from "next/link";
import { Clapperboard, LogOut, Youtube } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";

export const DashboardNavbar = () => {
  return (
    <nav className="px-4 lg:px-6 flex items-center justify-between h-full">
      <div className="flex items-center justify-center gap-1 md:gap-6">
        <MobileSidebar />

        <Link href="/">
          <Youtube className="w-10 h-10" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button variant="accent" asChild>
          <Link href="/">
            <LogOut size={18} className="md:mr-2" />
            <span className="hidden md:block">Exit</span>
          </Link>
        </Button>

        <Button variant="accent" asChild>
          <Link href="/dashboard/channels">
            <Clapperboard size={18} className="md:mr-2" />
            <span className="hidden md:block">Dashboard Home</span>
          </Link>
        </Button>

        <UserButton />
      </div>
    </nav>
  );
};
