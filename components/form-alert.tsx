import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface FormAlertProps {
  type: "error" | "success";
  message: string;
}

export const FormAlert = ({ type, message }: FormAlertProps) => {
  const Icon = type === "error" ? AlertTriangle : CheckCircle;

  return (
    <div
      className={cn(
        "p-3 rounded-md flex items-center gap-x-2 text-sm",
        type === "success" && "bg-emerald-500/15 text-emerald-500",
        type === "error" && "bg-destructive/15 text-destructive"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
