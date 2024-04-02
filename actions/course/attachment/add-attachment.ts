"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addAttachment = async (
  courseId: string,
  attachmentUrl: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const existingCourse = await db.course.findUnique({
      where: { id: courseId },
      include: {
        channel: {
          select: {
            id: true,
            creatorId: true,
          },
        },
      },
    });

    if (!existingCourse) {
      return { error: "Course not found!" };
    }

    if (existingCourse.channel.creatorId !== currentUser.id) {
      return { error: "Unauthorized" };
    }

    const attachmentName =
      attachmentUrl.split("/").pop() || new Date().toISOString();

    const attachment = await db.attachment.create({
      data: {
        url: attachmentUrl,
        name: attachmentName,
        courseId,
      },
    });

    revalidatePath(
      `/dahsboard/channels/${existingCourse.channel.id}/courses/${courseId}`
    );

    return {
      success: {
        message: `Attachment '${attachmentName}' added succesfully`,
        attachment,
      },
    };
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
