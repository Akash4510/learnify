import { CategoriesBar } from "@/components/categories-bar";
import { CoursesCarousel } from "@/components/courses-carousel";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const categories = await db.category.findMany({});

  const courses = await db.course.findMany({
    include: {
      category: true,
      channel: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      price: "desc",
    },
  });

  return (
    <div className="pb-3 space-y-2">
      <div className="w-full h-16 fixed top-16 left-0 md:left-[5.7rem] pl-4 z-10 bg-background flex items-center">
        <CategoriesBar data={categories} />
      </div>

      <div className="pt-12">
        <CoursesCarousel data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
