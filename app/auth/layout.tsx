import { ReactNode } from "react";
import Image from "next/image";

import { Footer } from "@/components/footer";

const BackgroundGradient = () => {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-[75px] lg:blur-[100px] -top-40"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-0 right-0 top-0 w-[90%] h-screen rotate-[30deg] bg-gradient-to-tr from-[#d06efe] to-[#775cef] opacity-25"
        />
      </div>
    </div>
  );
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundGradient />

      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row min-h-screen items-center md:justify-between gap-10 md:gap-6 py-[3.8rem] overflow-hidden">
        <div className="w-full lg:max-w-[min(600px,50%)]">
          <div className="flex items-center gap-2">
            <div className="w-12 md:w-20 h-12 md:h-20 relative">
              <Image src="/logo.png" alt="logo" fill quality={100} />
            </div>
            <h1 className="scroll-m-20 text-primary-foreground/70 md:text-primary-foreground scroll-p-20 font-extrabold tracking-wider text-3xl md:text-4xl lg:text-5xl pt-3 ml-1">
              Learnify
            </h1>
          </div>

          <p className="leading-7 mt-4 md:mt-6 text-muted-foreground hidden md:flex">
            Your One-Stop Learning Destination for Endless Possibilities! The
            ultimate platform where creators thrive and learners excel
          </p>
        </div>

        <div className="flex-1 w-full">{children}</div>

        <p className="leading-7 mt-4 md:mt-6 text-muted-foreground md:hidden text-center">
          Learnify is your One-Stop Learning Destination for Endless
          Possibilities! The ultimate platform where creators thrive and
          learners excel
        </p>
      </div>

      <Footer />
    </>
  );
};

export default AuthLayout;
