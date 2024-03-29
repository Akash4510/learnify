"use client";

import { Channel } from "@prisma/client";

import { ChannelCard } from "./channel-card";

interface ChannelsProps {
  data: Channel[];
}

export const Channels = ({ data }: ChannelsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  );
};
