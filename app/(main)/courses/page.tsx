import { db } from "@/lib/db";

import { Categories } from "@/components/categories";

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
      <div className="w-full h-16 sticky top-0 z-10 px-4 bg-background flex items-center">
        <Categories data={categories} />
      </div>

      <div className="px-4 pb-6">
        <Courses data={courses} />
      </div>
    </>
  );
};

export default CoursesPage;
