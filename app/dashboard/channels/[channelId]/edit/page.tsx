import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Heading } from "@/components/heading";
import { getCurrentUser } from "@/lib/auth";
import { EditChannelForm } from "@/components/dashboard/channel/edit-channel-form";
import { NavigateBack } from "@/components/navigate-back";

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
      <div className="space-y-6">
        <NavigateBack
          href={`/dashboard/channels/${params.channelId}`}
          label="Go back"
        />

        <div className="space-y-8">
          <Heading
            title={`Edit channel - ${channel.name}`}
            subtitle="Edit the appearance of your channel, make sure to add a good description, a logo and cover image which conveys about your channel"
          />

          <EditChannelForm initialData={channel} />
        </div>
      </div>
    </div>
  );
};

export default ChannelEditPage;
