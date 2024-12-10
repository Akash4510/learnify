"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  name: {
    label: "Name",
    color: "#2563eb",
  },
  total: {
    label: "Total",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface DataChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const DataChart = ({ data }: DataChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          dataKey="total"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="total" fill="#0369A1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};
