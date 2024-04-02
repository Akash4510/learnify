"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
