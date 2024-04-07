import { Categories } from "@/components/categories";
import { CoursesCarousel } from "@/components/courses-carousel";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const categories = await db.category.findMany({});

  const courses = await db.course.findMany({
    include: {
      channel: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
    },
  });

  return (
    <div className="pb-3 space-y-2 relative">
      <div className="w-full fixed top-16 py-2 h-14 bg-background/80 backdrop-blur-xl z-20">
        <Categories data={categories} />
      </div>

      <div className="pt-12">
        <CoursesCarousel data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
