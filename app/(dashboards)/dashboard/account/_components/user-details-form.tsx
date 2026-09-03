"use client";

import { Channel, KYC, Subscription, User } from "@prisma/client";
import { KYCForm } from "./kyc-form";

interface UserDetailsProps {
  user: User & {
    kyc: KYC | null;
    channels: Channel[];
    subscriptions: Subscription[];
  };
}

export const UserDetailsForm = ({ user }: UserDetailsProps) => {
  return <KYCForm initialData={user.kyc || undefined} />;
};
