"use client";

import Link from "next/link";
import { Clapperboard } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "./ui/button";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { SearchBar } from "./search/search-bar";
import { Logo } from "./logo";

export const Navbar = () => {
  const user = useCurrentUser();

  return (
    <nav className="px-4 lg:px-6 flex items-center justify-between h-full">
      <div className="flex items-center gap-1">
        <MobileSidebar />
        <Logo full asLink />
      </div>

      <div className="w-full max-w-[600px] mx-4 md:mx-8">
        <SearchBar />
      </div>

      <div className="flex items-center justify-center gap-4">
        {user ? (
          <>
            <Button variant="accent" asChild>
              <Link href="/dashboard">
                <Clapperboard size={18} className="md:mr-2" />
                <span className="hidden md:block">Creator Dashboard</span>
              </Link>
            </Button>
            <UserButton />
          </>
        ) : (
          <>
            <Button variant="accent" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
