import Image from "next/image";

const BackgroundGradient = () => {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-[75px] md:-top-40"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-0 right-0 w-[90%] -top-10 md:top-[4rem] lg:top-0 h-[300px] md:h-[400px] lg:h-[500px] mx-auto rotate-[20deg] bg-gradient-to-tr from-[#f568cf] to-[#9738eb] opacity-60 lg:opacity-25"
        />
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <div className="pt-2 md:pt-4 lg:pt-10 pb-4 md:pb-10 space-y-3 lg:text-center">
      <BackgroundGradient />

      <div className="flex items-center lg:justify-center gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          quality={100}
        />
        <span className="font-heading text-xl md:text-2xl pt-2">
          LearnUPIND
        </span>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl !leading-tight">
          Your One-Stop Learning <br className="hidden lg:flex" /> Destination
          for Endless Possibilities!
        </h2>

        <p className="text-sm md:text-base text-muted-foreground lg:max-w-[900px] mx-auto">
          Discover limitless knowledge and master new skills with Learnify, the
          ultimate platform where creators thrive and learners excel, all in one
          seamless experience!
        </p>
      </div>
    </div>
  );
};
