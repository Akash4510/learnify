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
    return { error: "Invalid fields" };
  }

  const { description, logo, coverImg } = validatedFields.data;

  const channel = await db.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) {
    return { error: "Channel not found" };
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "Unauthenticated" };
  }

  if (channel.creatorId !== currentUser.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.channel.update({
      where: { id: channelId },
      data: {
        description,
        logo,
        coverImg,
      },
    });

    revalidatePath(`/dashbaord/channels`);
    revalidatePath(`/dashbaord/channels/${channelId}`);
    revalidatePath(`/dashbaord/channels/${channelId}/edit`);
    return { success: "Channel updated succesfully" };
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
