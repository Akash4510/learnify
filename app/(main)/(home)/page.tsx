import { Hero } from "./_components/hero";
import { CoursesSection } from "./_components/courses-section";
import { Milestone } from "./_components/milestone";
import { FounderAndCEO } from "./_components/founder-and-ceo";
import { Instructors } from "./_components/instructors";
import { WhyUPIND } from "./_components/why-upind";
import { Testimonials } from "./_components/testimonials";
import { Certificates } from "./_components/certificates";
import { Achievers } from "./_components/achievers";

const HomePage = async () => {
  return (
    <div className="">
      <Hero />
      <CoursesSection />
      <Milestone />
      <FounderAndCEO />
      <Instructors />
      <WhyUPIND />
      <Testimonials />
      <Certificates />
      <Achievers />
    </div>
  );
};

export default HomePage;
