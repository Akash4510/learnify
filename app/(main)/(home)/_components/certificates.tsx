import Image from "next/image";

import { Heading } from "@/components/heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const testimonials = [
  {
    name: "Micheal Gough",
    designation: "CEO at Google",
    message:
      "Learnify is just awesome. It contains tons of predesigned courses and tutorials on dev starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
    avatarSrc: "/logo.png",
  },
  {
    name: "Micheal Gough",
    designation: "CEO at Google",
    message:
      "Learnify is just awesome. It contains tons of predesigned courses and tutorials on dev starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
    avatarSrc: "/logo.png",
  },
  {
    name: "Micheal Gough",
    designation: "CEO at Google",
    message:
      "Learnify is just awesome. It contains tons of predesigned courses and tutorials on dev starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
    avatarSrc: "/logo.png",
  },
];

export const Certificates = () => {
  return (
    <div className="my-10 lg:mt-20 space-y-12 p-4">
      <div className="lg:text-center">
        <Heading
          title="Our Certificates"
          titleClassName="lg:text-4xl font-medium tracking-normal"
          subtitle="Over the years, we have received numerous certificates from trustworthy sources including Government as a consequence of our dedication to excellence"
          subtitleClassName="lg:text-base"
        />
      </div>

      <ScrollArea className="rounded-md">
        <div className="relative flex w-full h-56 items-center justify-center gap-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-72 h-44 bg-accent/10 rounded-md flex items-center justify-center"
            >
              <Image
                src={`/images/certificates-${index + 1}.png`}
                alt="Certificate"
                quality={100}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
