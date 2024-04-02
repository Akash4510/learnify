"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateChapterSchema } from "@/schemas/chapter";

export const createChapter = async (
  channelId: string,
  courseId: string,
  values: CreateChapterSchema
) => {
  const validatedFields = CreateChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { title } = validatedFields.data;
  const trimmedTitle = title.trim();

  const user = await getCurrentUser();

  if (!user?.id) {
    return {
      error: {
        message: "Unauthenticated",
      },
    };
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      channels: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!dbUser) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  // I have to user this approach because, when I was using
  // !dbUser.channels.includes({ id: channelId })
  // I was getting wrong ans I don't know why :)
  const userChannelIds = [];
  for (let channel of dbUser.channels) {
    userChannelIds.push(channel.id);
  }

  if (!userChannelIds.includes(channelId)) {
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
        orderBy: {
          position: "desc",
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

  for (let ch of course.chapters) {
    if (ch.title === trimmedTitle) {
      return {
        error: {
          message: `Chapter with name - '${trimmedTitle}' already exists`,
        },
      };
    }
  }

  const newPosition = course.chapters.length + 1;

  const chapter = await db.chapter.create({
    data: {
      title: trimmedTitle,
      courseId,
      position: newPosition,
    },
  });

  revalidatePath(`/dahsboard/channels/${channelId}/courses`);
  revalidatePath(`/dahsboard/channels/${channelId}/courses/${courseId}`);

  return {
    success: {
      message: `Chapter - '${title}' added`,
      chapter,
    },
  };
};
