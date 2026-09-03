"use client";

import React from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoUrl: string; // YouTube video URL
  width?: string | number; // Optional width of the video player
  height?: string | number; // Optional height of the video player
  autoplay?: boolean;
  showControls?: boolean;
}

export const VideoPlayer = ({
  videoUrl,
  width = "100%",
  height = "400px",
  autoplay = false,
  showControls = false,
}: VideoPlayerProps) => {
  // Extract the video ID from the YouTube URL
  const getVideoId = (url: string): string | null => {
    // This updated Regex now accounts for the /shorts/ path
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <div className="text-red-500">Invalid YouTube URL</div>;
  }

  // Options for the YouTube player
  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: !!autoplay,
      controls: showControls,
      rel: 0, // Do not show related videos at the end
    },
  };

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};
