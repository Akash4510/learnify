"use client";

import Link from "next/link";
import Image from "next/image";
import { Channel } from "@prisma/client";
import { ImageOff } from "lucide-react";

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard = ({ channel }: ChannelCardProps) => {
  return (
    <Link
      href={`/dashboard/channels/${channel.id}`}
      className="group border bg-accent/60 rounded-md"
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="relative size-20 overflow-hidden rounded-full">
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

          <div className="flex-1">
            <div className="w-full">
              <h1 className="font-bold text-xl tracking-wide group-hover:underline">
                {channel.name}
              </h1>

              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {channel.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
