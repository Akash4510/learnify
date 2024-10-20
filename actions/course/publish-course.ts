"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const publishCourse = async ({
  channelId,
  courseId,
}: {
  channelId: string;
  courseId: string;
}) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return {
      error: {
        message: "Unauthenticated",
      },
    };
  }

  // Check the user in our database
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  const channel = await db.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) {
    return {
      error: {
        message: "Channel not found!",
      },
    };
  }

  if (channel.creatorId !== dbUser.id) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      channelId,
    },
    include: {
      chapters: {
        include: {
          muxData: true,
        },
      },
    },
  });

  if (!course) {
    return {
      error: {
        message: "Course not found!",
      },
    };
  }

  const hasPublishedChapter = course.chapters.some(
    (chapter) => chapter.isPublished
  );

  if (
    !course.title ||
    !course.description ||
    !course.thumbnail ||
    !course.categoryId ||
    !hasPublishedChapter
  ) {
    return {
      error: {
        message: "Missing required fields",
      },
    };
  }

  const publishedCourse = await db.course.update({
    where: {
      id: courseId,
      channelId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(`dashboard/channels/${channelId}`);
  revalidatePath(`dashboard/channels/${channelId}/courses/${courseId}`);

  return {
    success: {
      message: `Course ${publishedCourse.title} published successfully`,
      publishedCourse,
    },
  };
};
