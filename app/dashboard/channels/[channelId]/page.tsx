import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Tv2 } from "lucide-react";

import { db } from "@/lib/db";
import { DashboardPageTitle } from "@/components/dashboard/page-title";
import { Button } from "@/components/ui/button";

interface ChannelPageProps {
  params: {
    channelId: string;
  };
}

const ChannelPage = async ({ params }: ChannelPageProps) => {
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  if (!channel) {
    return notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between mr-2">
        <div className="flex items-center justify-center gap-4">
          <div className="relative h-20 aspect-square rounded-full">
            {channel.logo ? (
              <Image
                src={channel.logo}
                alt="logo"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-20 aspect-square rounded-full flex items-center justify-center bg-accent">
                <Tv2 className="h-7 w-7" />
              </div>
            )}
          </div>
          <DashboardPageTitle
            title={channel.name}
            subtitle={channel.description}
          />
        </div>

        <Button variant="accent" asChild>
          <Link href={`/dashboard/channels/${channel.id}/edit`}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit channel
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ChannelPage;
