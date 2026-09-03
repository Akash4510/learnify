import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-12">
      <div className="overflow-hidden rounded-xl p-2">
        <Image
          src="/images/about.png"
          alt="About us"
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-xl object-cover"
        />
      </div>
      <div>
        <div className="p-4 py-6 mb-10 space-y-4">
          <h1 className="text-3xl md:text-4xl">About Learnify</h1>

          <div className="text-primary-foreground/80 space-y-1.5">
            <p>
              Learnify is a flexible learning management platform for exploring
              courses, building skills, and sharing knowledge.
            </p>
            <p>
              Learners can discover structured lessons at their own pace, while
              creators can publish and manage educational content in one place.
            </p>
            <p>
              Our goal is to make online learning clear, practical, and
              accessible for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
