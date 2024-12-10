"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditChannelSchema } from "@/schemas/channel";

export const editChannel = async (
  channelId: string,
  values: EditChannelSchema
) => {
  const validatedFields = EditChannelSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields",
      },
    };
  }

  const { description, logo, coverImg } = validatedFields.data;

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
  });

  if (!dbUser) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  const channel = await db.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) {
    return {
      error: {
        message: "Channel not found",
      },
    };
  }

  if (channel.creatorId !== user.id) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const editedChannel = await db.channel.update({
    where: { id: channelId },
    data: {
      description,
      logo,
      coverImg,
    },
  });

  revalidatePath(`/creator-dashbaord/channels`);
  revalidatePath(`/creator-dashbaord/channels/${channelId}`);
  revalidatePath(`/creator-dashbaord/channels/${channelId}/edit`);

  return {
    success: {
      message: "Channel updated succesfully",
      channel: editedChannel,
    },
  };
};
