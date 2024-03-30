"use server";

import { revalidatePath } from "next/cache";

import { CreateChannelSchema } from "@/schemas/channel";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const createChannel = async (values: CreateChannelSchema) => {
  const validatedFields = CreateChannelSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, description, logo, coverImg } = validatedFields.data;

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return { error: "Unauthenticated" };
  }

  // Check the user in our database
  const user = await db.user.findUnique({ where: { id: currentUser.id } });

  if (!user) {
    return { error: "User not found" };
  }

  const existingChannel = await db.channel.findUnique({
    where: { name },
  });

  if (existingChannel) {
    return { error: `Channel named '${name}' already exists!` };
  }

  try {
    const channel = await db.channel.create({
      data: {
        creatorId: user.id,
        name,
        description,
        logo,
        coverImg,
      },
    });

    revalidatePath(`/dashboard/channels`);

    return {
      success: {
        message: `Channel '${channel.name}' created successfully`,
        channel,
      },
    };
  } catch (err) {
    return { error: "Something went wrong!" };
  }
};
