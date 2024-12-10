"use server";

import Mux from "@mux/mux-node";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const deleteChapter = async ({
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

  if (chapter.videoUrl) {
    const existingMuxData = await db.muxData.findFirst({
      where: {
        chapterId,
      },
    });

    if (existingMuxData) {
      await video.assets.delete(existingMuxData.assetId);

      await db.muxData.delete({
        where: {
          id: existingMuxData.id,
        },
      });
    }
  }

  const deletedChapter = await db.chapter.delete({
    where: {
      id: chapterId,
    },
  });

  const publishedChaptersInCourse = await db.chapter.findMany({
    where: {
      courseId,
      isPublished: true,
    },
  });

  // If this was the only published chapter in the course
  // Then we need to mark the course as unpublished
  if (!publishedChaptersInCourse.length) {
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });
  }

  revalidatePath(
    `/creator-dahsboard/channels/${channelId}/courses/${courseId}`
  );
  revalidatePath(
    `/creator-dahsboard/channels/${channelId}/courses/${courseId}/chapters/${chapterId}`
  );

  return {
    success: {
      message: `Chapter '${deletedChapter.title}' deleted successfully`,
      deletedChapter,
    },
  };
};
