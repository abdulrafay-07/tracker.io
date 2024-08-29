'use client'

import {
   Label,
   Pie,
   PieChart,
} from 'recharts';
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '@/components/ui/chart';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';

import { Job } from '@/types/job';

const chartConfig = {
   totalJobs: {
      label: 'Jobs',
      color: 'hsl(var(--chart-1))',
   },
   pending: {
      label: 'Pending',
      color: '#F7CB73',
   },
   accepted: {
      label: 'Accepted',
      color: '#006600',
   },
   rejected: {
      label: 'Rejected',
      color: '#D9512C',
   },
} satisfies ChartConfig;

// define the type for status keys
type StatusKey = keyof typeof chartConfig;

// define the shape of each status item in statusData
interface StatusDataItem {
   name: string;
   total: number;
};

interface DonutChartProps {
   jobs: Job[];
   statusData: StatusDataItem[];
};

export const DonutChart = ({
   jobs,
   statusData,
}: DonutChartProps) => {
   // map the chartConfig colors to the statusData (gpt)
   const dataWithColors = statusData.map((item: StatusDataItem) => {
      const key = item.name.toLowerCase() as StatusKey;
      return {
         ...item,
         fill: chartConfig[key].color,
      };
   });

   return (
      <Card className='flex flex-col gap-y-2 w-full lg:w-1/3 lg:justify-center'>
         <CardHeader className='flex items-center'>
            <CardTitle>Donut Chart</CardTitle>
            <CardDescription>total jobs</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer
               config={chartConfig}
               className='aspect-square max-h-[300px] w-full'
            >
               <PieChart>
                  <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                     data={dataWithColors}
                     dataKey='total'
                     nameKey='name'
                     innerRadius={60}
                     strokeWidth={5}
                  >
                     <Label
                        content={({ viewBox }) => {
                           if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                              return (
                                 <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor='middle'
                                    dominantBaseline='middle'
                                 >
                                    <tspan
                                       x={viewBox.cx}
                                       y={viewBox.cy}
                                       className='fill-foreground text-3xl font-bold'
                                    >
                                       {jobs.length}
                                    </tspan>
                                       <tspan
                                       x={viewBox.cx}
                                       y={(viewBox.cy || 0) + 24}
                                       className='fill-muted-foreground'
                                       >
                                       Jobs Total
                                    </tspan>
                                 </text>
                              )
                           }
                        }}
                     />
                  </Pie>
               </PieChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
};