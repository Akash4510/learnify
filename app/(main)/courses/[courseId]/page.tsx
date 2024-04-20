import { notFound } from "next/navigation";

import { db } from "@/lib/db";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const course = await db.course.findUnique({
    where: { id: params.courseId },
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
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-2">
      <h1>Title: {course.title}</h1>
      <h1>Description: {course.description}</h1>
      <h1>Category: {course.category?.name}</h1>
      <h1>Channel: {course.channel.name}</h1>
    </div>
  );
};

export default CoursePage;
