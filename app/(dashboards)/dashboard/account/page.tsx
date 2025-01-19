import { redirect } from "next/navigation";
import { KYC_STATUS } from "@prisma/client";

import { getCurrentUserOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";

import { UserInfo } from "./_components/user-info";
import { UserDetailsForm } from "./_components/user-details-form";
import { KYCStatusBanner } from "./_components/kyc-status-banner";

const AccountPage = async () => {
  const sessionUser = await getCurrentUserOrRedirect();

  const user = await db.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    include: {
      kyc: true,
      channels: true,
      subscriptions: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="space-y-4">
      <KYCStatusBanner status={user.kyc?.status || KYC_STATUS.PENDING} />
      <UserInfo user={user} />
      <div className="max-w-[650px] bg-secondary rounded-lg p-5">
        <UserDetailsForm user={user} />
      </div>
    </div>
  );
};

export default AccountPage;
