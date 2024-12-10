"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const publishChapter = async ({
  channelId,
  courseId,
  chapterId,
}: {
  channelId: string;
  courseId: string;
  chapterId: string;
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
  });

  if (!course) {
    return {
      error: {
        message: "Course not found!",
      },
    };
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
  });

  if (!chapter) {
    return {
      error: {
        message: "Chapter not found!",
      },
    };
  }

  if (chapter.courseId !== course.id) {
    return {
      error: {
        message: "This chapter doesn't belongs to this course!",
      },
    };
  }

  const muxData = await db.muxData.findUnique({
    where: {
      chapterId,
    },
  });

  if (!muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
    return {
      error: {
        message: "Missing required fields!",
      },
    };
  }

  const publishedChapter = await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      isPublished: true,
    },
  });

  revalidatePath(
    `/creator-dahsboard/channels/${channelId}/courses/${courseId}`
  );
  revalidatePath(
    `/creator-dahsboard/channels/${channelId}/courses/${courseId}/chapters/${chapterId}`
  );

  return {
    success: {
      message: `Chapter '${publishedChapter.title}' published successfully`,
      publishedChapter,
    },
  };
};
