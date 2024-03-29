import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { AlertMessage } from "@/components/alret-message";
import { DashboardPageTitle } from "@/components/dashboard/page-title";
import { getCurrentUser } from "@/lib/auth";
import { EditChannelForm } from "@/components/dashboard/channel/edit-channel-form";

interface ChannelPageProps {
  params: {
    channelId: string;
  };
}

const ChannelEditPage = async ({ params }: ChannelPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/dashboard/channels");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  if (!channel) {
    return notFound();
  }

  if (channel.creatorId !== user.id) {
    return redirect("/dashboard/channels");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-7">
        {!channel.isApproved && (
          <AlertMessage
            type="warning"
            message="Channel is not approved yet! Your channel will be visible to the users only after it is approved"
          />
        )}

        <DashboardPageTitle
          title={`Edit channel - ${channel.name}`}
          subtitle="Edit the appearance of your channel, make sure to add a good description, a logo and cover image which conveys about your channel"
        />
      </div>

      <EditChannelForm initialData={channel} />
    </div>
  );
};

export default ChannelEditPage;
