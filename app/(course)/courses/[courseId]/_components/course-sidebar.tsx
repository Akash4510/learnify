import { db } from "@/lib/db";
import { Chapter, Course, USER_ROLE, UserProgress } from "@prisma/client";
import { User } from "next-auth";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  user: User & {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: USER_ROLE;
  };
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  user,
  course,
  progressCount,
}: CourseSidebarProps) => {
  const purchase = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-5 flex flex-col border-b">
        <h1 className="text-xl">{course.title}</h1>
        {purchase && (
          <div className="mt-8">
            <CourseProgress value={progressCount} />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
