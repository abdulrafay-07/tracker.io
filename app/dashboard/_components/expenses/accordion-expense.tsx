'use client'

import { useEffect, useState } from 'react';

import { useAuth } from '@clerk/nextjs';
import axios, { AxiosError } from 'axios';

import { ApiResponse } from '@/types/api-response';

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { TotalSpentCard } from './total-spent-card';
import { ExpenseCardDialog } from './expense-card-dialog';

export const AccordionExpense = () => {
   const [isFetching, setIsFetching] = useState(true);
   const [totalSpent, setTotalSpent] = useState(0);
   const { userId } = useAuth();

   const fetchTotalSpent = async () => {
      setIsFetching(true);
      try {
         const response = await axios.post<ApiResponse>('/api/get-total-spent', {userId});

         if (!response.data.success) {
            throw Error;
         };

         setTotalSpent(response.data.totalSpent!);
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>;
         console.log(axiosError.response?.data.message);
      } finally {
         setIsFetching(false);
      };
   };

   useEffect(() => {
      fetchTotalSpent();
   }, []);

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
               <ExpenseCardDialog />
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
};