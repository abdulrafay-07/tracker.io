'use client'

import { useEffect, useState } from 'react';

import { MaxWidthContainer } from '@/components/max-width-container';
import { DonutChart } from '../../_components/jobs/donut-chart';
import { BarChartInteractive } from '../../_components/jobs/bar-chart-interactive';
import { Loader2 } from 'lucide-react';

import { useJobStore } from '@/store/job';
import { useAuth } from '@clerk/nextjs';

const Analytics = () => {
   const [isLoading, setIsLoading] = useState(true);

   const { jobsFetched, fetchJobs, jobs, statusData, areaChart } = useJobStore();

   const { userId } = useAuth();

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
      <MaxWidthContainer className='flex flex-col gap-y-10'>
         <div className='flex flex-col lg:flex-row lg:justify-between gap-y-8 lg:gap-x-16'>
            <DonutChart
               jobs={jobs}
               statusData={statusData}
            />
            <BarChartInteractive
               areaChart={areaChart}
            />
         </div>
      </MaxWidthContainer>
   )
};

export default Analytics;