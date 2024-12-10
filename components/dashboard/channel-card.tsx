"use client";

import Link from "next/link";
import Image from "next/image";
import { Channel } from "@prisma/client";
import { Book, ImageOff, Users2 } from "lucide-react";

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard = ({ channel }: ChannelCardProps) => {
  return (
    <Link
      href={`/creator-dashboard/channels/${channel.id}`}
      className="group border bg-accent/60 rounded-md"
    >
      <div className="p-4 pb-5 space-y-3">
        <div className="flex items-center gap-4">
          <div className="relative size-20 overflow-hidden rounded-full bg-secondary">
            {channel.logo ? (
              <Image
                src={channel.logo}
                alt="cover-img"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-background/50">
                <ImageOff className="size-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="w-full">
              <h1 className="font-bold text-xl tracking-wide">
                {channel.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <p className="flex items-center gap-1">
              <span className="rounded-full bg-secondary p-1 size-5">
                <Users2 className="size-3.5" />
              </span>
              4 Subscribers
            </p>
            <p className="flex items-center gap-1">
              <span className="rounded-full bg-secondary p-1 size-5">
                <Book className="size-3.5" />
              </span>
              3 Courses
            </p>
          </div>

          <div className="space-y-0.5">
            <p className="text-muted-foreground font-bold">Description:</p>
            <p className="text-sm line-clamp-3 text-justify">
              {channel.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
