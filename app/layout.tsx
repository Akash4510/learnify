import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

import "./globals.css";
import { fontRaleway, fontRighteous } from "./fonts";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ConfettiProvider } from "@/providers/confetti-provider";

export const metadata: Metadata = {
  title: "LearnUPIND",
  description: "The ultimate platform where creators thrive and learners excel",
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
            fontRighteous.variable,
            fontRaleway.className,
            fontRaleway.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="learnify-theme"
            disableTransitionOnChange
          >
            <ConfettiProvider />
            <Toaster richColors />
            {children}
          </ThemeProvider>

          {/* Razorpay script tag, to allow payments */}
          <Script
            type="text/javascript"
            src="https://checkout.razorpay.com/v1/checkout.js"
          />
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
