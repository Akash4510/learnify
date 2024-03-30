import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";

interface CoursePageProps {
  params: {
    channelId: string;
    courseId: string;
  };
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  if (!channel) {
    return redirect("/dashboard");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    return redirect(`/dashboard/channels/${params.channelId}`);
  }

  // If the course doesn't belongs to the channel
  if (course.channelId !== channel.id) {
    return notFound();
  }

  return (
    <div>
      <p>{course.id}</p>
      <h1>{course.title}</h1>
    </div>
  );
};

export default CoursePage;
