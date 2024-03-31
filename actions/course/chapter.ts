"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateChapterSchema } from "@/schemas/chapter";

export const createChapter = async (
  courseId: string,
  values: CreateChapterSchema
) => {
  const validatedFields = CreateChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title } = validatedFields.data;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        channel: {
          select: {
            id: true,
            creatorId: true,
          },
        },
        chapters: {
          orderBy: {
            position: "desc",
          },
        },
      },
    });

    if (!course) {
      return { error: "Course not found!" };
    }

    const channel = course.channel;

    if (!channel) {
      return { error: "Channel not found" };
    }

    if (channel.creatorId !== currentUser.id) {
      return { error: "Unauthorized" };
    }

    const newPosition = course.chapters.length + 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });

    revalidatePath(`/dahsboard/channels/${channel.id}/courses`);
    revalidatePath(`/dahsboard/channels/${channel.id}/courses/${courseId}`);

    return {
      success: {
        message: `Chapter - '${title}' added`,
        chapter,
      },
    };
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};

export const reorderChapters = async (
  courseId: string,
  values: { id: string; position: number }[]
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        channel: {
          select: {
            id: true,
            creatorId: true,
          },
        },
        chapters: {
          orderBy: {
            position: "desc",
          },
        },
      },
    });

    if (!course) {
      return { error: "Course not found!" };
    }

    const channel = course.channel;

    if (!channel) {
      return { error: "Channel not found" };
    }

    if (channel.creatorId !== currentUser.id) {
      return { error: "Unauthorized" };
    }

    for (let item of values) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    revalidatePath(`/dahsboard/channels/${channel.id}/courses`);
    revalidatePath(`/dahsboard/channels/${channel.id}/courses/${courseId}`);

    return {
      success: {
        message: `Chapters reodered`,
      },
    };
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
