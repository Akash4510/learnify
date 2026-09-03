import { CourseCard } from "@/components/course-card";
import { Heading } from "@/components/heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UpcomingCourseCard } from "@/components/upcoming-course-card";
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
    <div className="px-4">
      <div className="space-y-10 my-10">
        <div className="lg:text-center">
          <Heading
            title="Upcoming Courses"
            titleClassName="lg:text-4xl font-medium tracking-normal"
            subtitle="Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth"
            subtitleClassName="lg:text-base"
          />
        </div>

        <ScrollArea className="rounded-md">
          <div className="flex w-max space-x-4 p-4 px-0">
            {courses.map((course) => (
              <div
                key={course.id}
                className="w-[400px] max-w-[85vw] min-w-[300px]"
              >
                <UpcomingCourseCard course={course} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="space-y-10 my-10">
        <div className="lg:text-center">
          <Heading
            title="Explore Our Courses"
            titleClassName="lg:text-4xl font-medium tracking-normal"
            subtitle="Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth"
            subtitleClassName="lg:text-base"
          />
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
    </div>
  );
};
