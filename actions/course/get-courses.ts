"use server";

import { getProgress } from "./get-progress";
import { db } from "@/lib/db";
import { CourseWithCategoryWithSafeChannelWithChaptersWithProgress } from "@/types/course";

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: {
  userId: string;
  title?: string;
  categoryId?: string;
}): Promise<CourseWithCategoryWithSafeChannelWithChaptersWithProgress[]> => {
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      title: {
        contains: title,
      },
      categoryId,
    },
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
        select: {
          id: true,
        },
      },
      purchases: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const coursesWithProgress: CourseWithCategoryWithSafeChannelWithChaptersWithProgress[] =
    await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPercentage = await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

  return coursesWithProgress;
};
