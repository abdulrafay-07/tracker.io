'use client'

import { useEffect, useState } from 'react';

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { TotalSpentCard } from './total-spent-card';
import { ExpenseCardDialog } from './expense-card-dialog';
import { CreateExpenseCard } from './create-expense-card';

import { useAuth } from '@clerk/nextjs';
import { useExpenseStore } from '@/store/expense';

export const AccordionExpense = () => {
   const [isFetching, setIsFetching] = useState(true);
   const { totalSpent, totalSpentFetched, fetchTotalSpent } = useExpenseStore();

   const { userId } = useAuth();

   useEffect(() => {
      if (!totalSpentFetched) {
         fetchTotalSpent(userId!);
      };
      
      if (totalSpentFetched) {
         setIsFetching(false);
      };
   }, [totalSpentFetched]);

   return (
      <Accordion type='single' collapsible className='w-full'>
         <AccordionItem value='item-1'>
            <AccordionTrigger className='hover:no-underline'>
               Expenses Overview & Add New Expense
            </AccordionTrigger>
            <AccordionContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
               <TotalSpentCard
                  isFetching={isFetching}
                  totalSpent={totalSpent}
               />
               <ExpenseCardDialog
                  trigger={CreateExpenseCard}
                  title='Create an expense'
                  description='Create an expense here. Click save when you&apos;re done.'
               />
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
};