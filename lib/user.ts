import { getCurrentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";

export const getSelf = async () => {
  const sessionUser = await getCurrentUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("Unauthenticated");
  }

  const user = await getUserById(sessionUser.id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
