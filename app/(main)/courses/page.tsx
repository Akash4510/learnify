import { db } from "@/lib/db";

import { CategoriesBar } from "./_components/categories-bar";
import { Courses } from "./_components/courses";

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
    <>
      {/* It has a fixed position so it won't affect the rest of the page */}
      <CategoriesBar data={categories} />

      <div className="pt-12 pb-6">
        <Courses data={courses} />
      </div>
    </>
  );
};

export default CoursesPage;
