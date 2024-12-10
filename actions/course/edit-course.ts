"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditCourseSchema } from "@/schemas/course";

export const editCourse = async ({
  channelId,
  courseId,
  values,
}: {
  channelId: string;
  courseId: string;
  values: EditCourseSchema;
}) => {
  const validatedFields = EditCourseSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { title, description, thumbnail, categoryId, price } =
    validatedFields.data;

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

  // If the user is modifying the title
  if (trimmedTitle) {
    const existingCourses = await db.course.findMany({
      where: {
        channelId,
        title: trimmedTitle,
      },
    });

    // It means that the course with the same name already exists on the channel
    for (let course of existingCourses) {
      if (course.id !== courseId) {
        return {
          error: {
            message: `Course '${trimmedTitle}' already exists on your channel. Please select a different title.`,
          },
        };
      }
    }
  }

  const updatedCourse = await db.course.update({
    where: {
      id: courseId,
      channelId,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription,
      thumbnail,
      categoryId,
      price,
    },
  });

  revalidatePath(`/creator-dahsboard/channels/${channelId}/courses`);
  revalidatePath(
    `/creator-dahsboard/channels/${channelId}/courses/${courseId}`
  );

  return {
    success: {
      message: `Course '${updatedCourse.title}' updated successfully`,
      course: updatedCourse,
    },
  };
};
