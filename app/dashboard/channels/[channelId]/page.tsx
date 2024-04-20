import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Book, Pencil, Tv2 } from "lucide-react";

import { db } from "@/lib/db";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { AlertMessage } from "@/components/ui/alert-message";

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
    notFound();
  }

  const courses = await db.course.findMany({
    where: {
      channelId: channel.id,
    },
  });

  return (
    <div className="space-y-6">
      {!channel.isApproved && (
        <AlertMessage
          variant="warning"
          message="Your channel is not approved yet. It will only be visible to the users after it is approved"
        />
      )}

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
          <Heading title={channel.name} subtitle={channel.description} />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="accent" asChild>
            <Link href={`/dashboard/channels/${channel.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit channel
            </Link>
          </Button>

          <Button variant="accent" asChild>
            <Link href={`/dashboard/channels/${channel.id}/courses`}>
              <Book className="h-4 w-4 mr-2" />
              Go to courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/channels/${channel.id}/courses/${course.id}`}
            className="bg-accent rounded-md p-5"
          >
            <h1>{course.title}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
