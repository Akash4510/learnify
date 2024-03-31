"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditCourseSchema } from "@/schemas/course";

export const editCourse = async (
  courseId: string,
  values: EditCourseSchema
) => {
  const validatedFields = EditCourseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, thumbnail, categoryId, price } =
    validatedFields.data;

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return { error: "Unauthenticated" };
  }

  // Check the user in our database
  const user = await db.user.findUnique({
    where: { id: currentUser.id },
  });

  if (!user) {
    return { error: "User not found" };
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      channel: true,
    },
  });

  if (!course) {
    return { error: "Course not found!" };
  }

  // If the user is not the creator of the course
  if (course.channel.creatorId !== currentUser.id) {
    return { error: "Unauthorized" };
  }

  // If the user is modifying the title
  if (title) {
    const existingCourses = await db.course.findMany({
      where: {
        channelId: course.channel.id,
        title,
      },
    });

    // It means that the course with the same name already exists on the channel
    for (let course of existingCourses) {
      if (course.id !== courseId) {
        return {
          error: `Course '${title}' already exists on your channel. Please select a different title.`,
        };
      }
    }
  }

  try {
    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: {
        title,
        description,
        thumbnail,
        categoryId,
        price,
      },
    });

    revalidatePath(`/dahsboard/channels/${course.channel.id}/courses`);
    revalidatePath(
      `/dahsboard/channels/${course.channel.id}/courses/${courseId}`
    );

    return {
      success: {
        message: `Course '${updatedCourse.title}' updated successfully`,
        course: updatedCourse,
      },
    };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
