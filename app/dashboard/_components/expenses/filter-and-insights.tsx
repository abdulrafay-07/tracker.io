'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useDebounceValue } from 'usehooks-ts';
import { useAuth } from '@clerk/nextjs';

import { useExpenseStore } from '@/store/expense';

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const FilterAndInsights = () => {
   const [month, setMonth] = useState('');

   const { fetchMonthExpenses, makeExpensesFetchedFalse } = useExpenseStore();
   const { userId } = useAuth();

   const url = usePathname();

   const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   const [debouncedValue, _] = useDebounceValue<string>(month, 1000);

   useEffect(() => {
      if (debouncedValue === 'All') {
         makeExpensesFetchedFalse();
      };
      
      if (debouncedValue && debouncedValue !== 'All') {
         fetchMonthExpenses(userId!, debouncedValue);
      };
   }, [debouncedValue]);

   const handleChange = (value: string) => {
      setMonth(value);
   };
   
   return (
      <div className='flex justify-between'>
         <Select onValueChange={handleChange} value={month}>
            <SelectTrigger className='w-[200px] focus:ring-0 focus:ring-offset-0'>
            <SelectValue placeholder='Select a month' />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {months.map((month) => (
                     <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
         <Link href={`${url}/insights`}>
            <Button>
               View Insights
            </Button>
         </Link>
      </div>
   )
};