"use client";

import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

interface BudgetChartProps {
  chartData: {
    category: string;
    maxSpend: number;
    theme: string;
  }[];
  totalSpend: number;
}
function BudgetsChart({ chartData, totalSpend }: BudgetChartProps) {
  const limit = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.maxSpend, 0);
  }, []);
  const config: ChartConfig = {};
  chartData.forEach((item) => {
    config[item.category] = {
      label: item.category,
      color: `hsl(var(--clr-${item.theme}))`,
    };
  });

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="maxSpend"
              nameKey="category"
              innerRadius={70}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={config[entry.category]?.color || "gray"} // Fallback to gray if missing
                />
              ))}
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {`$${Number(
                            (totalSpend / 100).toFixed(2)
                          ).toLocaleString()}`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          of ${Number(limit.toFixed(2)).toLocaleString()} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default BudgetsChart;
