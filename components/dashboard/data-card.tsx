"use client";

import { useIncrementingCount } from "@/hooks/use-incrementing-count";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";

interface DataCardProps {
  label: string;
  value: number;
  shouldFormat?: boolean;
  className?: string;
}

export const DataCard = ({
  label,
  value,
  shouldFormat,
  className,
}: DataCardProps) => {
  const count = useIncrementingCount(value, 2);

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {shouldFormat ? formatPrice(count) : count}
        </div>
      </CardContent>
    </Card>
  );
};
