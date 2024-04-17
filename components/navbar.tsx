"use client";

import Link from "next/link";
import { Bell, Clapperboard, MessageCircleMore } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "./ui/button";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { SearchBar } from "./search/search-bar";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const user = useCurrentUser();
  const pathName = usePathname();

  const showSearchBar =
    pathName.startsWith("/courses") ||
    pathName.startsWith("/explore") ||
    pathName === "/";

  return (
    <nav className="px-4 lg:px-6 flex items-center justify-between gap-4 h-full backdrop-blur-2xl">
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
        <ThemeToggle />
        {user ? (
          <>
            <Button
              variant="accent"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link href="/dashboard/notifications">
                <MessageCircleMore className="size-[1.2rem]" />
              </Link>
            </Button>

            <Button
              variant="accent"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link href="/dashboard/notifications">
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
