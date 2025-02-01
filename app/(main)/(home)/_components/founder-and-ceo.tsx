import Image from "next/image";

export const FounderAndCEO = () => {
  return (
    <div className="px-4 my-10 md:mt-20 flex flex-col md:flex-row gap-6">
      <div className="rounded-md max-w-[320px] relative bg-accent">
        <Image
          src="/images/ceo.jpg"
          alt="abc"
          width={1080}
          height={1350}
          className="object-cover rounded-md"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-primary-foreground/80">Founder & CEO</h3>
          <h1 className="text-[1.75rem] md:text-3xl font-bold tracking-wider">
            Mr. Manzur
          </h1>
        </div>

        <p className="text-muted-foreground">
          Meet MR. Manzur, the founder of an innovative education course selling
          platform LEARNUPIND, dedicated to democratizing access to quality
          education. He is on a mission to empower over 1000 entrepreneurs in
          india. With visionary leadership, they inspire growth, learning, and
          entrepreneurship for a brighter future
        </p>
      </div>
    </div>
  );
};
