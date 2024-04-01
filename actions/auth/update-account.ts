"use server";

import { UpdateAccountSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const updateAccount = async (values: UpdateAccountSchema) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return {
      error: {
        message: "Unauthenticated",
      },
    };
  }

  const dbUser = await db.user.findUnique({ where: { id: user.id } });

  if (!dbUser) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return {
    success: {
      message: "Account updated!",
    },
  };
};
