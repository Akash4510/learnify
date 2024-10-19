"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditChapterSchema } from "@/schemas/chapter";

export const editChapter = async (
  channelId: string,
  courseId: string,
  chapterId: string,
  values: EditChapterSchema
) => {
  const validatedFields = EditChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { title, description } = validatedFields.data;

  if (title && title.trim() === "") {
    return {
      error: {
        message: "Title cannot be empty",
      },
    };
  }

  const trimmedTitle = title?.trim();
  const trimmedDescription = description?.trim();

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

  // If the user is modifying the title
  if (trimmedTitle) {
    const existingChapters = await db.chapter.findMany({
      where: {
        courseId,
        title: trimmedTitle,
      },
    });

    // It means that the course with the same name already exists on the channel
    for (let chapter of existingChapters) {
      if (chapter.id !== chapterId) {
        return {
          error: {
            message: `Chapter '${trimmedTitle}' already exists on this course. Please select a different title.`,
          },
        };
      }
    }
  }

  const updatedChapter = await db.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription,
    },
  });

  revalidatePath(`/dahsboard/channels/${channelId}/courses/${courseId}`);
  revalidatePath(
    `/dahsboard/channels/${channelId}/courses/${courseId}/chapters/${chapterId}`
  );

  return {
    success: {
      message: `Chapter '${updatedChapter.title}' updated successfully`,
      chapter: updatedChapter,
    },
  };
};
