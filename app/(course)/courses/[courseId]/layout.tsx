import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/course/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    courseId: string;
  };
}) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/");
  }

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
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: user.id,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const progressCount = await getProgress(user.id, course.id);

  return (
    <div className="h-screen">
      <div className="h-[69px] md:pl-80 fixed inset-y-0 w-full z-100">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>

      <div className="flex flex-row flex-1 h-screen">
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0">
          <CourseSidebar user={user} course={course} progressCount={2} />
        </div>

        <div className="mt-[69px] w-full h-[calc(100vh-69px)] md:pl-80 overflow-y-auto">
          <div className="h-full flex flex-col">
            <main className="h-full">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
