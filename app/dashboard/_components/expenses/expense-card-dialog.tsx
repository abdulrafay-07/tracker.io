'use client'

import { useState } from 'react';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreateExpenseCard } from './create-expense-card';
import { Loader2 } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import axios, { AxiosError } from 'axios';

import { createExpense } from '@/form-schemas/expenses';
import { ApiResponse } from '@/types/api-response';
import { useExpenseStore } from '@/store/expense';

export const ExpenseCardDialog = () => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { userId } = useAuth();

   const { addToTotalSpent, addToUserExpense } = useExpenseStore();

   const { toast } = useToast();

   const form = useForm<z.infer<typeof createExpense>>({
      resolver: zodResolver(createExpense),
      defaultValues: {
         userId: userId!,
         name: '',
         amount: 0,
         createdAt: new Date(),
      },
   });

   const onSubmit = async (data: z.infer<typeof createExpense>) => {
      setIsSubmitting(true);
      try {
         const response = await axios.post<ApiResponse>('/api/create-user-expense', data);

         toast({
            title: 'Success!',
            description: response.data.message,
         });
         addToTotalSpent(response.data.expense!);
         addToUserExpense(response.data.expense!);
      } catch (error) {
         console.log(error);
         const axiosError = error as AxiosError<ApiResponse>;
         toast({
            title: 'Failed!',
            description: axiosError.response?.data.message,
            variant: 'destructive',
         });
      } finally {
         form.reset();
         setIsSubmitting(false);
         setIsDialogOpen(false);
      };
   };

   const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      form.handleSubmit(onSubmit)();
   };

   return (
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <AlertDialogTrigger>
            <CreateExpenseCard />
         </AlertDialogTrigger>
         <AlertDialogContent className='max-w-xl'>
            <AlertDialogHeader>
               <AlertDialogTitle>Create an expense</AlertDialogTitle>
               <AlertDialogDescription>
                  Create an expense here. Click save when you're done.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
               {form.formState.errors.root && (
                  <p className='text-red-600 text-sm'>
                     {form.formState.errors.root?.message}
                  </p>
               )}
               <div className='space-y-2'>
                  <Label htmlFor='name'>
                     Name
                  </Label>
                  <Input
                     id='name'
                     type='text'
                     placeholder='Groceries...'
                     {...form.register('name', {
                        required: true,
                     })}
                  />
                  {form.formState.errors.name && (
                     <p className='text-red-600 text-sm'>
                        {form.formState.errors.name?.message}
                     </p>
                  )}
               </div>
               <div>
                  <Label htmlFor='amount'>
                     Amount
                  </Label>
                  <Input
                     id='amount'
                     placeholder='24.99'
                     type='number'
                     step='any'
                     {...form.register('amount', {
                        required: true,
                        setValueAs: (value) => parseFloat(value),
                     })}
                  />
                  {form.formState.errors.amount && (
                     <p className='text-red-600 text-sm'>
                        {form.formState.errors.amount?.message}
                     </p>
                  )}
               </div>
               <AlertDialogFooter>
                  <AlertDialogCancel
                     onClick={() => setIsDialogOpen(false)}
                  >
                     Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                     onClick={handleActionClick}
                     disabled={isSubmitting}
                     className='w-full sm:w-[80px]'
                  >
                     {isSubmitting ? (
                        <Loader2 className='animate-spin' />
                     ) : (
                        <>
                           Create
                        </>
                     )}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </form>
         </AlertDialogContent>
      </AlertDialog>
   )
};