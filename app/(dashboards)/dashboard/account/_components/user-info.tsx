import { Channel, KYC, Subscription, User } from "@prisma/client";
import { UserIcon } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";

interface UserInfoProps {
  user: User & {
    kyc: KYC | null;
    channels: Channel[];
    subscriptions: Subscription[];
  };
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="relative flex flex-col gap-4">
        <div className="size-20 rounded-full bg-accent flex items-center justify-center">
          {user.image ? (
            <UserAvatar url={user.image} />
          ) : (
            <UserIcon className="size-9" />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-extrabold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
