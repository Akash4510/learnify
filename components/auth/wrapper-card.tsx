"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleLogin } from "./google-login";

interface WrapperCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  switchFormLabel?: string;
  switchFormHref?: string;
  showSocials?: boolean;
}

export const WrapperCard = ({
  children,
  title,
  subtitle,
  switchFormLabel,
  switchFormHref,
  showSocials,
}: WrapperCardProps) => {
  return (
    <Card className="md:min-w-[400px] lg:max-w-[450px] shadow-md md:p-2 ml-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {showSocials && (
          <>
            <div className="flex items-center justify-between gap-3">
              <GoogleLogin />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </>
        )}

        <div className="my-2">{children}</div>
      </CardContent>

      <CardFooter className="flex flex-col items-start justify-start gap-4">
        <Link
          className="text-sm text-muted-foreground hover:underline"
          href={switchFormHref || ""}
        >
          {switchFormLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
