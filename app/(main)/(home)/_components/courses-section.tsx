import { CourseCard } from "@/components/course-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";

export const CoursesSection = async () => {
  const courses = await db.course.findMany({
    include: {
      channel: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
      category: true,
    },
  });

  return (
    <div className="space-y-10 my-10">
      <div className="lg:text-center">
        <h1 className="text-4xl">Explore Our Courses</h1>
        <h4 className="text-muted-foreground">
          Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth
        </h4>
      </div>

      <ScrollArea className="rounded-md">
        <div className="flex w-max space-x-4 p-4 px-0">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-[400px] max-w-[85vw] min-w-[300px]"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
