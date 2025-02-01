import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-xl p-2">
      <Image
        src="/images/hero.png"
        alt="Hero"
        width={1920}
        height={1080}
        className="rounded-xl"
      />
    </div>
  );
};
