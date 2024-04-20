import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 py-10 text-center">
      <Loader2 className="animate-spin size-5" />
      <p className="text-lg font-righteous">Loading...</p>
    </div>
  );
};

export default LoadingPage;
