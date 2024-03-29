"use client";

import Link from "next/link";
import Image from "next/image";
import { Channel } from "@prisma/client";
import { ImageOff, Tv, Tv2 } from "lucide-react";

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard = ({ channel }: ChannelCardProps) => {
  return (
    <div className="min-w-[20rem] w-full h-64 border bg-accent rounded-md relative">
      <div className="absolute w-full h-full inset-0 rounded-md">
        {channel.coverImg ? (
          <Image
            src={channel.coverImg}
            alt="cover-img"
            fill
            className="rounded-md object-cover"
          />
        ) : (
          <div className="h-40 flex items-center justify-center">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="p-4 absolute bottom-0 z-10 w-full bg-black/80 rounded-md flex gap-4">
        <div className="relative h-20 aspect-square rounded-full">
          {channel.logo ? (
            <Image
              src={channel.logo}
              alt="logo"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-full flex items-center justify-center bg-accent">
              <Tv2 className="h-7 w-7" />
            </div>
          )}
        </div>

        <div>
          <Link href={`/dashboard/channels/${channel.id}`}>
            <h1 className="font-bold text-xl hover:underline">
              {channel.name}
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {channel.description}
          </p>
        </div>
      </div>
    </div>
  );
};
