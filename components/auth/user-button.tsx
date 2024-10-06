"use client";

import Link from "next/link";
import { LogOut, Settings, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/auth";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  const onLogoutClick = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full p-0.5 flex items-center justify-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-muted">
            <UserIcon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-card shadow-2xl p-4 mr-5 w-80">
        <div className="flex items-center gap-4 px-2 pr-5 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-muted">
              <UserIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-primary-foreground/80">{user.email}</p>
          </div>
        </div>

        <DropdownMenuItem
          asChild
          className="cursor-pointer text-primary-foreground/70"
        >
          <Link href="/account" className="px-3 py-2.5">
            <Settings className="h-4 w-4 mr-3" />
            <span>Manage Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          onClick={onLogoutClick}
          className="cursor-pointer text-primary-foreground/70"
        >
          <div className="px-3 py-2.5">
            <LogOut className="h-4 w-4 mr-3" />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
