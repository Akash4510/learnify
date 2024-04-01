"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const GoogleLogin = () => {
  const onClick = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full hover:bg-background/70"
      onClick={onClick}
    >
      <span className="font-extrabold text-xl mr-2">G</span>
      Continue with Google
    </Button>
  );
};
