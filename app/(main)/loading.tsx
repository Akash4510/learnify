import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="pt-28 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin size-6" />
      <p className="animate-pulse text-xl font-bold">Loading...</p>
    </div>
  );
};

export default LoadingPage;
