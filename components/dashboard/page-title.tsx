import { cn } from "@/lib/utils";

interface DashboardPageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const DashboardPageTitle = ({
  title,
  subtitle,
  className,
}: DashboardPageTitleProps) => {
  return (
    <div className={cn(className)}>
      <h1 className="text-[1.75rem] md:text-3xl font-bold">{title}</h1>
      <h3 className="text-sm text-muted-foreground mt-0.5 md:mt-1">
        {subtitle}
      </h3>
    </div>
  );
};
