"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full mt-40 flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-4xl">Something went wrong!</h2>
        <p className="text-2xl">
          Error: {error.message || "An unexpected error occurred."}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>

        <Button asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
