import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const Heading = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: HeadingProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h1
        className={cn(
          "text-[1.75rem] md:text-3xl font-bold tracking-wider",
          titleClassName
        )}
      >
        {title}
      </h1>
      <h3 className={cn("text-sm text-muted-foreground", subtitleClassName)}>
        {subtitle}
      </h3>
    </div>
  );
};
