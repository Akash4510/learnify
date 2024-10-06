import { Hero } from "./_components/hero";
import { CoursesSection } from "./_components/courses-section";
import { Milestone } from "./_components/milestone";

const HomePage = async () => {
  return (
    <div className="px-4 pb-10">
      <Hero />
      <CoursesSection />
      <Milestone />
    </div>
  );
};

export default HomePage;
