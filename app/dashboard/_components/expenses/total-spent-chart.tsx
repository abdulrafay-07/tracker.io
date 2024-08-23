'use client'

import { useEffect, useState } from 'react';

import { useAuth } from '@clerk/nextjs';

import { useExpenseStore } from '@/store/expense';

import { ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart,
   Bar,
   CartesianGrid,
   XAxis,
} from 'recharts';
import { type ChartConfig } from '@/components/ui/chart';
import { DollarSign, Loader2 } from 'lucide-react';

const chartConfig = {
   total: {
      label: "Total Spent: ",
      color: '#00001F',
      icon: DollarSign
   },
} satisfies ChartConfig;

export const TotalSpentChart = () => {
   const [isLoading, setIsLoading] = useState(true);
   const { monthlySpentData, fetchUserExpenses, expensesFetched } = useExpenseStore();
   const { userId } = useAuth();

   useEffect(() => {
      fetchUserExpenses(userId!);

      if (expensesFetched) {
         setIsLoading(false);
      };
   }, []);

   if (isLoading) {
      return (
         <div className='h-full flex justify-center items-center pt-32'>
            <Loader2 className='h-10 w-10 animate-spin' />
         </div>
      )
   };

   return (
      <div className='flex flex-col gap-y-4 h-full'>
         <div className='flex items-center gap-x-3'>
            <h1 className='text-2xl md:text-4xl font-semibold'>Bar Chart</h1>
            <p className='text-muted-foreground mt-1'>$ spent each month</p>
         </div>
         <ChartContainer config={chartConfig} className='min-h-[50px] max-h-[400px] h-full'>
            <BarChart accessibilityLayer data={monthlySpentData}>
               <CartesianGrid vertical={false} />
               <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
               />
               <ChartTooltip content={<ChartTooltipContent />} />
               <Bar dataKey='total' fill='var(--color-total)' radius={4} />
            </BarChart>
         </ChartContainer>
      </div>
   )
};