'use client'

import { useEffect, useState } from 'react';

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
import { Loader2 } from 'lucide-react';

import { useAuth } from '@clerk/nextjs';

import { useJobStore } from '@/store/job';

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
}

export const DonutChart = () => {
   const [isLoading, setIsLoading] = useState(true);
   const { statusData, jobs, jobsFetched, fetchJobs } = useJobStore();

   const { userId } = useAuth();

   // map the chartConfig colors to the statusData (gpt)
   const dataWithColors = statusData.map((item: StatusDataItem) => {
      const key = item.name.toLowerCase() as StatusKey;
      return {
         ...item,
         fill: chartConfig[key].color,
      };
   });

   useEffect(() => {
      if (!jobsFetched) {
         fetchJobs(userId!);
      };

      if (jobsFetched) {
         setIsLoading(false)
      };
   }, [jobsFetched]);

   if (isLoading) {
      return (
         <div className='h-full w-full flex justify-center items-center pt-32'>
            <Loader2 className='h-10 w-10 animate-spin' />
         </div>
      )
   };

   return (
      <div className='flex flex-col gap-y-2 h-full'>
         <div className='flex items-center gap-x-3'>
            <h1 className='text-2xl md:text-3xl font-semibold text-center'>Donut Chart</h1>
            <p className='text-muted-foreground mt-1'>jobs status total</p>
         </div>
         <ChartContainer
            config={chartConfig}
            className='aspect-square max-h-[300px]'
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
      </div>
   )
};