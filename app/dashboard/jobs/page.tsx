import Link from 'next/link';

import { MaxWidthContainer } from '@/components/max-width-container';
import { CreateJobsAccordion } from '../_components/jobs/create-jobs-accordion';
import { JobsTable } from '../_components/jobs/jobs-table';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface JobsProps {
   searchParams: {
      search?: string
   };
};

const Jobs = ({
   searchParams,
}: JobsProps) => {
   return (
      <MaxWidthContainer className='flex flex-col gap-y-10'>
         <div className='flex flex-col gap-y-5'>
            <CreateJobsAccordion />
            <Link
               href='/dashboard/jobs/analytics'
               className={cn('w-full md:w-[200px] md:self-end', buttonVariants())}
            >
               View Analytics
            </Link>
         </div>
         <JobsTable
            query={searchParams.search}
         />
      </MaxWidthContainer>
   )
};

export default Jobs;