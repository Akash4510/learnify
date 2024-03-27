"use server";

import { UpdateAccountSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";

export const updateAccount = async (values: UpdateAccountSchema) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: "Account updated!" };
};
