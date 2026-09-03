import { Heading } from "@/components/heading";
import Image from "next/image";

export const Instructors = () => {
  return (
    <div className="my-10 lg:mt-20 p-4">
      <div className="lg:text-center space-y-4">
        <Heading
          title="Our Instructors"
          titleClassName="lg:text-4xl font-medium tracking-normal"
          subtitle="Accelerate your digital journey with our featured online course, designed to empower you with the latest tools and strategies for sustainable growth"
          subtitleClassName="lg:text-base"
        />

        <div className="flex items-center justify-center gap-6">
          <div className="relative m-4 aspect-square w-[400px] rounded-md bg-accent ">
            <Image
              src="/images/instructor.jpg"
              alt="Instructors"
              className="rounded-md"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};
