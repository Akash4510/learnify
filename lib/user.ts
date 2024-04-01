import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const getSelf = async () => {
  const sessionUser = await getCurrentUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("Unauthenticated");
  }

  const user = await db.user.findUnique({ where: { id: sessionUser.id } });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
