'use client'

import { useEffect, useState } from 'react';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Loader2, Trash2 } from 'lucide-react';

import axios, { AxiosError } from 'axios';
import { useAuth } from '@clerk/nextjs';

import { Expense } from '@/types/expense';
import { ApiResponse } from '@/types/api-response';

export const ExpenseTable = () => {
   const [isFetching, setIsFetching] = useState(true);
   const [expenses, setExpenses] = useState<Expense[]>();

   const { userId } = useAuth();

   const { toast } = useToast();

   const fetchUserExpenses = async () => {
      setIsFetching(true);
      try {
         const response = await axios.post<ApiResponse>('/api/get-user-expenses', { userId });

         if (response.data.success) {
            setExpenses(response.data.expenses);
         };
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>;
         console.log(axiosError.response?.data.message);
      } finally {
         setIsFetching(false);
      };
   };

   useEffect(() => {
      fetchUserExpenses();
   }, []);

   const handleDelete = async (id: string) => {
      try {
         const response = await axios.delete<ApiResponse>('/api/delete-user-expense', {data: {id}});

         if (response.data.success) {
            toast({
               title: 'Success',
               description: response.data.message,
            });

            fetchUserExpenses();
         };
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>;
         toast({
            title: 'Failed',
            description: axiosError.response?.data.message,
            variant: 'destructive',
         });
      };
   };

   if (isFetching) {
      return <Loader2 className='h-10 w-10 animate-spin self-center my-10' />
   };

   return expenses ? (
      <Table className='w-full my-8'>
         <TableHeader>
            <TableRow>
               <TableHead className='font-bold'>Date</TableHead>
               <TableHead className='font-bold'>Name</TableHead>
               <TableHead className='font-bold'>Amount</TableHead>
               <TableHead className='font-bold'>Edit</TableHead>
               <TableHead className='font-bold'>Delete</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {expenses.map((expense) => (
               <TableRow key={expense.id}>
                  <TableCell className='font-semibold'>
                     {new Date(expense.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                     })}
                  </TableCell>
                  <TableCell className='font-semibold'>
                     {expense.name}
                  </TableCell>
                  <TableCell className='font-semibold'>
                     ${expense.amount}
                  </TableCell>
                  <TableCell>
                     <Button size='icon' variant='ghost'> {/* TODO: Add edit functionality */}
                        <Edit className='h-5 w-5' />
                     </Button>
                  </TableCell>
                  <TableCell>
                     <Button
                        size='icon'
                        variant='ghost'
                        onClick={() => handleDelete(expense.id)}
                     >
                        <Trash2 className='h-5 w-5' />
                     </Button>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   ) : (
      <h1 className='text-center text-xl'>No expenses found</h1>
   )
};