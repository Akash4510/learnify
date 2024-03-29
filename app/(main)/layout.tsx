import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full h-16 border-b shadow-sm backdrop-blur-xl">
        <Navbar />
      </header>

      <div className="pt-16 flex flex-row flex-1 h-screen">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <main className="w-full">
          <ScrollArea className="px-4 h-full">
            <div className="py-4">{children}</div>
          </ScrollArea>
        </main>
      </div>
    </>
  );
};

export default RootLayout;
