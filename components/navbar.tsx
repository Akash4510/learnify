"use client";

import Link from "next/link";
import { Bell, Clapperboard, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { SearchBar } from "@/components/search/search-bar";
import { Logo } from "@/components/logo";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navbar = () => {
  const user = useCurrentUser();
  const pathName = usePathname();

  const showSearchBar =
    pathName.startsWith("/courses") ||
    pathName.startsWith("/explore") ||
    pathName === "/";

  return (
    <nav className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
      <div className="flex flex-shrink-0 items-center">
        <MobileSidebar />
        <div className="-mt-1">
          <Logo full asLink />
        </div>
      </div>

      {showSearchBar && (
        <div className="w-full max-w-[750px] sm:mx-2">
          <SearchBar />
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        {user ? (
          <>
            <Button
              variant="accent"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link href="/dashboard">
                <MessageCircleMore className="size-[1.2rem]" />
              </Link>
            </Button>

            <Button
              variant="accent"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link href="/dashboard">
                <Bell className="size-[1.2rem]" />
              </Link>
            </Button>

            <Button variant="accent" className="mr-2" asChild>
              <Link href="/dashboard">
                <Clapperboard className="size-5 md:mr-2" />
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
