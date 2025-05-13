"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface RevenueForecastChartProps {
  targetMMR: number;
  TotalProjectedRevenue: number;
}
export function RevenueForecastChart({ targetMMR, TotalProjectedRevenue }: RevenueForecastChartProps) {
  // Create chart data based on props
  const chartData = [
    {
      name: "target",
      value: targetMMR,
      fill: "hsl(var(--chart-2))"
    },
    {
      name: "projected",
      value: TotalProjectedRevenue,
      fill: "hsl(var(--chart-1))"
    }
  ];

  const chartConfig = {
    target: {
      label: "Target MMR",
      color: "hsl(var(--chart-2))",
    },
    projected: {
      label: "Projected Revenue",
      color: "hsl(var(--chart-1))",
    }
  } satisfies ChartConfig;

  // Calculate percentage of target achieved
  const percentageAchieved = ((TotalProjectedRevenue / targetMMR) * 100).toFixed(1);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue Forecast</CardTitle>
        <CardDescription>Financial Year 2024-2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
            barSize={30}
            startAngle={0}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[130, 80]}
            />
            <RadialBar dataKey="value" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {targetMMR.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Target MMR
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Projected Annual Revenue: ${TotalProjectedRevenue.toLocaleString()} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {percentageAchieved}% of target revenue forecasted for this year
        </div>
      </CardFooter>
    </Card>
  );
}
