import Link from "next/link";
import { Plus, Tv } from "lucide-react";
import { redirect } from "next/navigation";

import { Channels } from "@/components/dashboard/channel/channels";
import { DashboardPageTitle } from "@/components/dashboard/page-title";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const ChannelsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const channels = await db.channel.findMany({
    where: {
      creatorId: user.id,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mr-2">
        <DashboardPageTitle
          title="Your Channels"
          subtitle="Create new channels or manage your existing channels"
        />

        <Button variant="accent" asChild>
          <Link href="/dashboard/channels/create">
            <Plus className="h-4 w-4 mr-1" />
            Create New
          </Link>
        </Button>
      </div>

      {channels.length !== 0 ? (
        <Channels data={channels} />
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
