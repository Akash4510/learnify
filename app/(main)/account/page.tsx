import { redirect } from "next/navigation";

import { getCurrentUserOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";

import { UserInfo } from "./_components/user-info";

const AccountPage = async () => {
  const sessionUser = await getCurrentUserOrRedirect();

  const user = await db.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    include: {
      channels: true,
      subscriptions: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="space-y-4 pt-4">
      <UserInfo user={user} />
    </div>
  );
};

export default AccountPage;
