import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface NavigateBackProps {
  label: string;
  href: string;
}

export const NavigateBack = ({ label, href }: NavigateBackProps) => {
  return (
    <Link
      href={href}
      className="w-max hover:underline flex items-center gap-1 text-sm text-muted-foreground hover:text-primary-foreground/60 focus:text-primary-foreground/80 focus:underline focus:border-none focus:outline-none focus:ring-0"
    >
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  );
};
