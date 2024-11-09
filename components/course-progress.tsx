import { cva, type VariantProps } from "class-variance-authority";

import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const courseProgressVariants = cva("", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      success: "text-emerald-500",
    },
    size: {
      default: "text-sm",
      sm: "text-xs mt-1.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface CourseProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof courseProgressVariants> {
  value: number;
}

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2",
          courseProgressVariants({ variant, size })
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
