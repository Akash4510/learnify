import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { USER_ROLE } from "@prisma/client";

import { getCurrentUserOrRedirect } from "@/lib/auth";

const ManageLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUserOrRedirect("/dashboard");

  if (user.role !== USER_ROLE.ADMIN) {
    redirect("/dashboard");
  }

  return <>{children}</>;
};

export default ManageLayout;
