import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { JobForm } from './job-form';

export const CreateJobsAccordion = () => {
   return (
      <Accordion type='single' collapsible className='w-full'>
         <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline'>
               Create a job application
            </AccordionTrigger>
            <AccordionContent>
               <JobForm />
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
};