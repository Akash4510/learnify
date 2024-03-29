import { redirect } from "next/navigation";

import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full h-16 border-b shadow-sm backdrop-blur-xl">
        <DashboardNavbar />
      </header>

      <div className="pt-16 flex flex-row flex-1 h-screen">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <main className="w-full">
          <ScrollArea className="px-4 md:px-5 h-full">
            <div className="py-4 md:py-5">{children}</div>
          </ScrollArea>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
