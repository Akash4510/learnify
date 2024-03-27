import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { auth } from "@/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn It",
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
        <body className={inter.className}>
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
