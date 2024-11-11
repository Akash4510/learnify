import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <div className="w-full h-64 relative">
        <Image src="/about.png" alt="about" fill className="object-cover" />
      </div>

      <div className="p-4 py-6 mb-10 space-y-4">
        <h1 className="text-3xl md:text-4xl">About LearnUPIND</h1>

        <div className="text-primary-foreground/80 space-y-1.5">
          <p>
            Its started on [__DATE__] Since then we are inspiring youngsters or
            those people who willing to learn the valuable and modish courses.
          </p>
          <p>
            We are trying to bring learning to people instead of people to
            learning. Hence, we are trying to modify their entrepreneurship
            nature.
          </p>
          <p>
            Here we are with a lot of courses designed in a way that will help
            people to learn a lot of things and take things to a new level.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
