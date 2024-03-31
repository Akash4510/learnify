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

export const deleteAttachment = async (
  courseId: string,
  attachmentId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId, courseId },
      include: {
        course: {
          include: {
            channel: {
              select: {
                id: true,
                creatorId: true,
              },
            },
          },
        },
      },
    });

    if (!attachment) {
      return { error: "Attachment not found!" };
    }

    if (!attachment.course) {
      return { error: "Course not found!" };
    }

    const channel = attachment.course.channel;
    if (!channel) {
      return { error: "Channel not found!" };
    }

    if (channel.creatorId !== currentUser.id) {
      return { error: "Unauthorized" };
    }

    await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId,
      },
    });

    revalidatePath(`/dashboard/channels/${channel.id}/courses/${courseId}`);

    return {
      success: {
        message: `Attachment ${attachment.name} deleted`,
      },
    };
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
