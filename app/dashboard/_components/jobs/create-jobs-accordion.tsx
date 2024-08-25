'use client'

import { useState } from 'react';

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { JobForm } from './job-form';

export const CreateJobsAccordion = () => {
   const [isOpen, setIsOpen] = useState<string | undefined>(undefined);

   return (
      <Accordion
         type='single'
         collapsible
         className='w-full'
         value={isOpen}
         onValueChange={(value) => setIsOpen(value)}
      >
         <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline'>
               Create a job application
            </AccordionTrigger>
            <AccordionContent>
               <JobForm setIsOpen={setIsOpen} />
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
};