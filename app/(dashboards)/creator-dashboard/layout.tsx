import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { USER_ROLE } from "@prisma/client";

import { getCurrentUserOrRedirect } from "@/lib/auth";

const CreatorDashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const user = await getCurrentUserOrRedirect("/");

  if (user.role === USER_ROLE.USER) {
    redirect("/dashboard");
  }

  return <>{children}</>;
};

export default CreatorDashboardLayout;
