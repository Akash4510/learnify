import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle, CircleX, Info } from "lucide-react";

import { cn } from "@/lib/utils";

const alertMessageVariants = cva("p-3 rounded-md flex gap-x-2 text-sm", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      success: "bg-emerald-500/15 text-emerald-500",
      error: "bg-red-500/15 text-red-500",
      info: "bg-blue-500/15 text-blue-500",
      warning: "bg-amber-500/15 text-amber-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertMessageVariantsProps = VariantProps<typeof alertMessageVariants>;

interface AlertMessageProps extends AlertMessageVariantsProps {
  message: string;
  className?: string;
}

export const AlertMessage = ({
  variant,
  message,
  className,
}: AlertMessageProps) => {
  let Icon;

  switch (variant) {
    case "error":
      Icon = CircleX;
      break;

    case "info":
      Icon = Info;
      break;

    case "success":
      Icon = CheckCircle;
      break;

    case "warning":
      Icon = AlertTriangle;
      break;

    default:
      Icon = Info;
      break;
  }

  return (
    <div className={cn(alertMessageVariants({ variant }), className)}>
      <Icon className="size-[1.15rem] shrink-0" />
      <span>{message}</span>
    </div>
  );
};
