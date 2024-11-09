"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { enrollCourse } from "@/actions/course/checkout";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(() => {
      enrollCourse({ courseId })
        .then((data) => {
          const { error, success } = data;

          if (success) {
            const { url } = success;
            window.location.assign(url!);
          }
          if (error) {
            toast.error(error.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <Button
      size="sm"
      className={cn("w-full md:w-auto", isPending && "md:w-32")}
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        `Enroll for ${formatPrice(price)}`
      )}
    </Button>
  );
};
