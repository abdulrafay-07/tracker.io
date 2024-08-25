import { MaxWithContainer } from '@/components/max-width-container';
import { CreateJobsAccordion } from '../_components/jobs/create-jobs-accordion';
import { JobsTable } from '../_components/jobs/jobs-table';

interface JobsProps {
   searchParams: {
      search?: string
   };
};

const Jobs = ({
   searchParams,
}: JobsProps) => {
   return (
      <MaxWithContainer className='flex flex-col gap-y-10'>
         <CreateJobsAccordion />
         <JobsTable
            query={searchParams.search}
         />
      </MaxWithContainer>
   )
};

export default Jobs;