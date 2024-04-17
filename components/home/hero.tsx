import Image from "next/image";

export const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center pb-6">
      <div className="flex-1 col-span-3 space-y-1 max-w-[850px]">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            quality={100}
            className="lg:hidden"
          />
          <h3 className="font-heading text-xl md:text-2xl text-purple-500 pt-2 md:pt-0">
            Learnify
          </h3>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl !leading-tight">
            Your One-Stop Learning Destination for Endless Possibilities!
          </h2>

          <p className="text-sm md:text-base">
            Discover limitless knowledge and master new skills with Learnify,
            the ultimate platform where creators thrive and learners excel, all
            in one seamless experience!
          </p>
        </div>
      </div>

      <div className="col-span-2 hidden lg:flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={280}
          height={280}
          quality={100}
        />
      </div>
    </div>
  );
};
