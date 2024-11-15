import Link from "next/link";
import { Plus, Tv } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { ChannelCard } from "@/components/dashboard/channel-card";
import { getCurrentUser } from "@/lib/auth";

const ChannelsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const channels = await db.channel.findMany({
    where: {
      creatorId: user.id,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <Heading
          title="Your Channels"
          subtitle="Create new channels or manage your existing channels"
        />

        <Button variant="accent" asChild className="sm:w-max">
          <Link href="/dashboard/channels/create">
            <Plus className="h-4 w-4 mr-1" />
            Create New Channel
          </Link>
        </Button>
      </div>

      {channels.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="h-80 flex flex-col items-center justify-center gap-6">
          <Tv className="h-20 w-20" />
          <div className="text-center">
            <h1 className="text-2xl font-medium">No channels found</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first channel to get started.
            </p>

            <Button variant="accent" className="mt-6" asChild>
              <Link href="/dashboard/channels/create">
                <Plus className="h-4 w-4 mr-1" />
                Create a channel
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelsPage;
