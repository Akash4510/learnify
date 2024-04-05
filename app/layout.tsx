import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { fontRaleway, fontRighteous } from "./fonts";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Learnify",
  description: "A platform for all",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            fontRighteous.className,
            fontRaleway.variable,
            fontRaleway.className,
            fontRaleway.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            storageKey="learn-it-theme"
            disableTransitionOnChange
          >
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
