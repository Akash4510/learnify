import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

const ChannelNotFound = () => {
  return (
    <div className="flex items-center justify-center h-[30rem]">
      <div className="text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Error <span className="text-primary">404!</span>
          </h1>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground">
            Oops! Channel Not Found {":("}
          </h3>
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <Button variant="accent" asChild>
            <Link href="/creator-dashboard/channels">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Go to channels</span>
            </Link>
          </Button>

          <Button variant="accent" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              <span>Go to Home Page</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelNotFound;
