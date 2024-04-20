import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full h-16 border-b">
        <Navbar />
      </header>

      <div className="pt-16 flex flex-row flex-1 h-screen">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <div className="w-full">
          <div className="h-[calc(100vh-4rem)] overflow-y-scroll">
            <div className="h-full flex flex-col">
              <main className="p-4 flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
