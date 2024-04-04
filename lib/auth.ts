import { redirect } from "next/navigation";

import { auth } from "@/auth";

export const getCurrentUser = async () => {
  const session = await auth();

  const sessionUser = session?.user;
  if (!sessionUser) {
    return null;
  }

  return sessionUser;
};

export const getCurrentUserOrRedirect = async (redirectTo?: string) => {
  const redirectPath = redirectTo || "/";

  const user = await getCurrentUser();
  if (!user) {
    return redirect(redirectPath);
  }

  return user;
};
