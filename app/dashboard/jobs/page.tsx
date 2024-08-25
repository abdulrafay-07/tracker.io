import { MaxWithContainer } from '@/components/max-width-container';
import { CreateJobsAccordion } from '../_components/jobs/create-jobs-accordion';

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
      </MaxWithContainer>
   )
};

export default Jobs;