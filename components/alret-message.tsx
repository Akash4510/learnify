import { AlertTriangle, CheckCircle, CircleX, Info } from "lucide-react";

import { cn } from "@/lib/utils";

interface AlertMessageProps {
  type: "error" | "info" | "warning" | "success";
  message: string;
}

export const AlertMessage = ({ type, message }: AlertMessageProps) => {
  let Icon;

  switch (type) {
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
  }

  return (
    <div
      className={cn(
        "p-3 rounded-md flex items-center gap-x-2 text-sm",
        type === "success" && "bg-emerald-500/15 text-emerald-500",
        type === "error" && "bg-red-500/15 text-red-500",
        type === "info" && "bg-blue-500/15 text-blue-500",
        type === "warning" && "bg-amber-500/15 text-amber-500"
      )}
    >
      <Icon className="h-[1.15rem] w-[1.15rem] shrink-0" />
      <span>{message}</span>
    </div>
  );
};
