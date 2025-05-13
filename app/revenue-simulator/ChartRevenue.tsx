"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import NumberFlow from "@number-flow/react";
interface TierRevenueDetail {
  name: string;
  projectedRevenue: number;
  suggestedPrice: number;
}

interface RevenueForecastChartProps {
  TotalProjectedRevenue: number;
  tierRevenueDetails: { [tierId: string]: TierRevenueDetail; };
  targetMMR: number;
  // targetMMR is also passed from page.tsx, but not used in this chart directly yet
}

const baseChartConfig = {
  // Base config items if any, or can be empty if all dynamic
} satisfies ChartConfig;

export function RevenueForecastChart({ TotalProjectedRevenue, targetMMR, tierRevenueDetails }: RevenueForecastChartProps) {
  const targetGap = targetMMR > TotalProjectedRevenue ? targetMMR - TotalProjectedRevenue : 0;
  const chartData = Object.entries(tierRevenueDetails)
    .filter(([_, value]) => value && typeof value.projectedRevenue === 'number' && value.projectedRevenue > 0)
    .map(([key, value], index) => ({
      ...value, // name, projectedRevenue, suggestedPrice
      tierId: key,
      fill: `hsl(var(--chart-${index + 1}))`, // Dynamic fill color
    }));

  if (targetGap > 0) {
    chartData.push({
      name: "Target Gap",
      projectedRevenue: targetGap,
      suggestedPrice: 0, // No suggested price for target gap
      tierId: "target-gap",
      fill: "hsl(var(--muted-foreground))", // Gray color for the gap
    });
  }

  const chartConfig = chartData.reduce<ChartConfig>((acc, data, index) => {
    acc[data.name] = {
      label: data.name,
      color: data.fill, // Use the fill color directly from chartData
    };
    return acc;
  }, { ...baseChartConfig });

  // Ensure 'Target Gap' has a config entry if it exists, using its specific fill
  if (targetGap > 0 && chartData.find(d => d.name === "Target Gap")) {
    chartConfig["Target Gap"] = {
      label: "Target Gap",
      color: "hsl(var(--muted-foreground))",
    };
  }

  if (Object.keys(tierRevenueDetails).length === 0 || chartData.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-4 min-h-[200px]">
        <CardHeader>
          <CardTitle>Revenue Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No revenue data to display.</p>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue Distribution</CardTitle>
        <CardDescription>Projected revenue by tier</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                formatter={(value, name, props) => {
                  // The 'name' argument corresponds to the 'nameKey' of the Pie data item
                  const segmentData = chartData.find(d => d.name === name);
                  if (segmentData) {
                    if (segmentData.name === "Target Gap") {
                      return (
                        <div className="flex flex-col p-2 bg-background border rounded-md shadow-lg">
                          <span className="font-semibold text-sm text-foreground">{segmentData.name}</span>
                          <span className="text-xs text-muted-foreground">Amount: ${segmentData.projectedRevenue.toLocaleString()}</span>
                        </div>
                      );
                    }
                    return (
                      <div className="flex flex-col p-2 bg-background border rounded-md shadow-lg">
                        <span className="font-semibold text-sm text-foreground">{segmentData.name}</span>
                        <span className="text-xs text-muted-foreground">
                          <NumberFlow value={segmentData.projectedRevenue} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />

                        </span>
                        <span className="text-xs text-muted-foreground">Suggested Price:
                          <NumberFlow value={segmentData.suggestedPrice} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
                        </span>
                      </div>
                    );
                  }
                  // Fallback for the label itself if needed, though hideLabel might be active
                  // For the central label, this formatter isn't directly used.
                  return name; // Default display if no specific formatting
                }}
                hideLabel // Hides the default label line from tooltip if not needed
              />}
            />
            <Pie
              data={chartData} // Uses dynamically generated chartData from props
              dataKey="projectedRevenue" // Pie segment size based on projectedRevenue
              nameKey="name" // Tier name for identification and tooltip
              innerRadius={60}
              strokeWidth={5}
              labelLine={false} // Hide default connector lines for labels
            >
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
                          className="fill-foreground text-xl font-bold"
                        >


                          US${targetMMR.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Target MMR
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4 border-t">
        <div className="leading-none text-muted-foreground">
          Hover over segments for tier-specific revenue and price details.
        </div>
      </CardFooter>
    </Card>
  );
}
