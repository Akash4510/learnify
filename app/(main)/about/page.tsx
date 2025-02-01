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
          <h1 className="text-3xl md:text-4xl">About LearnUPIND</h1>

          <div className="text-primary-foreground/80 space-y-1.5">
            <p>
              Its started on [__DATE__] Since then we are inspiring youngsters
              or those people who willing to learn the valuable and modish
              courses.
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
      </div>
    </div>
  );
};

export default AboutPage;
