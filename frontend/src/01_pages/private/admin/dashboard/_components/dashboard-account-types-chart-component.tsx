import { useEffect, useState } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { chartColors } from '@/08_configs/chart-colors.config';
import PieChartSkeleton from '@/components/skeleton/pie-chart-skeleton';
import { Card, CardBody, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import useTanstackQuery from '@/hooks/tanstack/use-tanstack-query';
import { type AccountType } from '../_types/account-type';

// Type definition for chart data structure
type ChartData = {
  account_type: string; // Type of user account (e.g., 'Admin', 'User')
  count: number; // Number of users with this account type
  fill: string; // Color for this segment in the pie chart
};

// Component to display a pie chart of different account types
const DashboardAccountTypesChartComponent = () => {
  // State to store chart data
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const { data, isFetching } = useTanstackQuery<AccountType[]>({
    endpoint: '/dashboard/account-types',
  });

  useEffect(() => {
    if (data) {
      setChartData(
        data.map((item: AccountType, index: number) => ({
          ...item,
          fill: chartColors[index % chartColors.length],
        })),
      );
    }
  }, [data]);

  // Calculate total number of users from chart data
  const totalUsers = chartData.reduce((acc, curr) => acc + curr.count, 0);

  // Create configuration object for chart tooltips and labels
  const chartConfig = chartData.reduce<
    Record<string, { label: string; color: string }>
  >((config, item, index) => {
    config[item.account_type] = {
      label: item.account_type,
      color: chartColors[index % chartColors.length],
    };
    return config;
  }, {});

  return (
    <Card className="col-span-12 @3xl/main:col-span-3">
      <CardBody className="h-full">
        <CardTitle>Account Types Chart</CardTitle>

        <div className="flex h-full items-center justify-center">
          <div className="w-full">
            {/* Show loading skeleton while data is being fetched */}
            {isFetching ? (
              <PieChartSkeleton />
            ) : (
              <ChartContainer
                config={chartConfig}
                className="mx-auto mt-auto aspect-[4/3] max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="account_type"
                    innerRadius={60}
                    strokeWidth={1}
                    label={({ name }) => name}
                  >
                    {/* Custom label showing total user count in center of pie */}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalUsers.toLocaleString()}
                              </tspan>

                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Total Users
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DashboardAccountTypesChartComponent;
