"use client";

import Link from "next/link";
import { Clapperboard, LogOut, Youtube } from "lucide-react";
import { redirect } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import { MobileSidebar } from "../sidebar/mobile-sidebar";

export const DashboardNavbar = () => {
  const user = useCurrentUser();

  if (!user) {
    return redirect("/");
  }

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
