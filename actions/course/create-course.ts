"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateCourseSchema } from "@/schemas/course";

export const createCourse = async (
  channelId: string,
  values: CreateCourseSchema
) => {
  const validatedFields = CreateCourseSchema.safeParse(values);

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

  // Check the user in our database
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  const existingCourse = await db.course.findFirst({
    where: {
      channelId,
      title: trimmedTitle,
    },
  });

  if (existingCourse) {
    return {
      error: {
        message: `Course named - '${trimmedTitle}' already exists on your channel. Please choose a different title`,
      },
    };
  }

  const course = await db.course.create({
    data: {
      channelId,
      title: trimmedTitle,
    },
  });

  revalidatePath(`/creator-dahsboard/channels/${channelId}/courses`);

  return {
    success: {
      message: `Course '${course.title}' created successfully`,
      course,
    },
  };
};
