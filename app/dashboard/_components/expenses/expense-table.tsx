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
import { useToast } from '@/components/ui/use-toast';
import { EmptyX } from '../empty-x';
import { ExpenseCardDialog } from './expense-card-dialog';
import { EditExpense } from './edit-expense';
import { DeleteDialog } from '../delete-dialog';
import { Loader2 } from 'lucide-react';

import axios, { AxiosError } from 'axios';
import { useAuth } from '@clerk/nextjs';

import { ApiResponse } from '@/types/api-response';
import { useExpenseStore } from '@/store/expense';


export const ExpenseTable = () => {
   const [isDeleting, setIsDeleting] = useState(false);
   const [isFetching, setIsFetching] = useState(true);
   const { expenses, fetchUserExpenses, expensesFetched, removeFromUserExpense, removeFromTotalSpent } = useExpenseStore();

   const { userId } = useAuth();

   const { toast } = useToast();

   useEffect(() => {
      if (!expensesFetched) {
         setIsFetching(true);
         fetchUserExpenses(userId!);
      };

      if (expensesFetched) {
         setIsFetching(false);
      };
   }, [expensesFetched]);

   const handleDelete = async (id: string) => {
      setIsDeleting(true);
      try {
         const response = await axios.delete<ApiResponse>('/api/delete-user-expense', {data: {id}});

         if (response.data.success) {
            toast({
               title: 'Success',
               description: response.data.message,
            });

            removeFromUserExpense(response.data.expense!);
            removeFromTotalSpent(response.data.expense!);
         };
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>;
         toast({
            title: 'Failed',
            description: axiosError.response?.data.message,
            variant: 'destructive',
         });
      } finally {
         setIsDeleting(false);
      };
   };

   if (isFetching) {
      return <Loader2 className='h-10 w-10 animate-spin self-center my-10' />
   };

   return expenses && expenses.length != 0 ? (
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
                     <ExpenseCardDialog
                        trigger={EditExpense}
                        title='Edit an expense'
                        description='Update an expense here. Click update when you&apos;re done.'
                        expense={expense}
                     />
                  </TableCell>
                  <TableCell>
                     <DeleteDialog
                        handleDelete={handleDelete}
                        id={expense.id}
                        isDeleting={isDeleting}
                        feature='expense'
                     />
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   ) : (
      <EmptyX
         emptyMessage='No expenses found!'
      />
   )
};