'use client'

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import {
   Bar,
   BarChart,
   CartesianGrid,
   XAxis,
} from 'recharts';
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo, useState } from 'react';

const chartConfig = {
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

interface BarChartInteractiveProps {
   areaChart: {
      month: string;
      accepted: number;
      rejected: number;
      pending: number;
   }[];
};

export const BarChartInteractive = ({
   areaChart,
}: BarChartInteractiveProps) => {
   const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>('pending');

   const total = areaChart && useMemo(() => ({
      pending: areaChart.reduce((acc, curr) => acc + curr.pending, 0),
      accepted: areaChart.reduce((acc, curr) => acc + curr.accepted, 0),
      rejected: areaChart.reduce((acc, curr) => acc + curr.rejected, 0),
   }), []);

   return (
      <Card className='w-full lg:w-2/3'>
         <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
            <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
               <CardTitle>Interactive Bar Chart</CardTitle>
               <CardDescription className='text-center lg:text-start'>
                  Shows job status of a year
               </CardDescription>
            </div>
            <div className='flex'>
               {['pending', 'accepted', 'rejected'].map((key) => {
                  const chart = key as keyof typeof chartConfig
                  return (
                  <button
                     key={chart}
                     data-active={activeChart === chart}
                     className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                     onClick={() => setActiveChart(chart)}
                  >
                     <span className='text-xs text-muted-foreground'>
                        {chartConfig[chart].label}
                     </span>
                     <span className='text-lg font-bold leading-none sm:text-3xl'>
                        {total[key as keyof typeof total].toLocaleString()}
                     </span>
                  </button>
                  )
               })}
            </div>
         </CardHeader>
         <CardContent className='px-2 sm:p-6'>
            <ChartContainer
               config={chartConfig}
               className='aspect-auto h-[300px]'
            >
               <BarChart
                  accessibilityLayer
                  data={areaChart}
                  margin={{
                  left: 12,
                  right: 12,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey='month'
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     minTickGap={32}
                     tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   )
};