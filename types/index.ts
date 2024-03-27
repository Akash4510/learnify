export type SafeCreator = {
  id: string;
  userId: string;
  isLive: boolean;
  isStreaming: boolean;
  thumbnailUrl: string | null;
  currentLiveSessionId: string | null;
};
