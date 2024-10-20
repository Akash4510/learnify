"use server";

import { revalidatePath } from "next/cache";
import Mux from "@mux/mux-node";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const deleteCourse = async ({
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

  // Delete the videos of all the chapters
  for (const chapter of course.chapters) {
    if (chapter.muxData?.assetId) {
      await video.assets.delete(chapter.muxData.assetId);
    }
  }

  const deletedCourse = await db.course.delete({
    where: {
      id: courseId,
    },
  });

  revalidatePath(`/dahsboard/channels/${channelId}/courses`);

  return {
    success: {
      message: `Course '${deletedCourse.title}' deleted successfully`,
      course: deletedCourse,
    },
  };
};
