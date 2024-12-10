"use server";

import { revalidatePath } from "next/cache";

import { CreateChannelSchema } from "@/schemas/channel";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const createChannel = async (values: CreateChannelSchema) => {
  const validatedFields = CreateChannelSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { name, description, logo, coverImg } = validatedFields.data;
  const trimmedName = name.trim();

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

  const existingChannel = await db.channel.findUnique({
    where: { name: trimmedName },
  });

  if (existingChannel) {
    return {
      error: {
        message: `Channel named '${trimmedName}' already exists!`,
      },
    };
  }

  const channel = await db.channel.create({
    data: {
      creatorId: dbUser.id,
      name: trimmedName,
      description,
      logo,
      coverImg,
    },
  });

  revalidatePath(`/creator-dashboard/channels`);

  return {
    success: {
      message: `Channel '${channel.name}' created successfully`,
      channel,
    },
  };
};
