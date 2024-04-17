import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Background gradient */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-2xl md:blur-[75px] lg:blur-[150px] md:-top-40"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-0 lg:left-[calc(50%-45rem)] aspect-[1155/678] w-[90%] rotate-[30deg] bg-gradient-to-tr from-[#d06efe] to-[#775cef] opacity-20"
          />
        </div>
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row min-h-screen items-center md:justify-between gap-10 md:gap-6 py-[3.8rem] overflow-hidden">
        <div className="w-full lg:max-w-[min(600px,50%)]">
          <h1 className="scroll-m-20 text-primary-foreground/70 md:text-primary-foreground scroll-p-20 font-extrabold tracking-wider text-3xl md:text-4xl lg:text-5xl">
            Learn It
          </h1>
          <p className="leading-7 mt-4 md:mt-6 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Reprehenderit,
            aperiam!
          </p>
        </div>

        <div className="flex-1 w-full">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
