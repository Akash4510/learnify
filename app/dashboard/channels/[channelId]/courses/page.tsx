import { CoursesCarousel } from "@/components/dashboard/courses/courses-carousel";
import { Heading } from "@/components/heading";
import { db } from "@/lib/db";

interface CoursePageProps {
  params: {
    channelId: string;
  };
}

const CoursesPage = async ({ params }: CoursePageProps) => {
  const courses = await db.course.findMany({
    where: {
      channelId: params.channelId,
    },
    include: {
      category: true,
      channel: true,
      chapters: true,
    },
  });

  return (
    <>
      <div>
        <Heading title="Your Courses" subtitle="Manage your courses here" />
      </div>

      <div className="pt-8">
        <CoursesCarousel data={courses} />
      </div>
    </>
  );
};

export default CoursesPage;
