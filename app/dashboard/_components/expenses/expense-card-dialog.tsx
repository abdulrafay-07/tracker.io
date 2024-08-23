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
import { Loader2 } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import axios, { AxiosError } from 'axios';

import { createExpense } from '@/form-schemas/expenses';
import { ApiResponse } from '@/types/api-response';
import { Expense } from '@/types/expense';
import { useExpenseStore } from '@/store/expense';

interface ExpenseCardDialogProps {
   trigger: React.FC;
   title: string;
   description: string;
   expense?: Expense;
};

export const ExpenseCardDialog = ({
   trigger: TriggerComponent,
   title,
   description,
   expense,
}: ExpenseCardDialogProps) => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { userId } = useAuth();

   const { addToTotalSpent, addToUserExpense, updateUserExpense, fetchTotalSpent } = useExpenseStore();

   const { toast } = useToast();

   const form = useForm<z.infer<typeof createExpense>>({
      resolver: zodResolver(createExpense),
      defaultValues: {
         userId: expense?.userId || userId!,
         name: expense?.name || '',
         amount: expense?.amount || 0,
         createdAt: expense?.createdAt || new Date(),
         month: expense?.month || '',
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

   // TEMP: when updating expense, onSubmit wasn't getting called so this is a temp fix.
   const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsSubmitting(true);
      const name = form.getValues('name');
      const amount = form.getValues('amount');
      try {
         const response = await axios.patch<ApiResponse>('/api/update-user-expense', 
            {
               id: expense?.id,
               name: name,
               amount: amount,
            },
         );

         toast({
            title: 'Success!',
            description: response.data.message,
         });

         const expenseObj = { ...expense!, name: name, amount: amount };
         
         fetchTotalSpent(userId!);
         updateUserExpense(expenseObj);
      } catch (error) {
         console.log(error);
         const axiosError = error as AxiosError<ApiResponse>;
         toast({
            title: 'Failed!',
            description: axiosError.response?.data.message,
            variant: 'destructive',
         });
      } finally {
         setIsSubmitting(false);
         setIsDialogOpen(false);
      };
   };

   return (
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <AlertDialogTrigger>
            <TriggerComponent />
         </AlertDialogTrigger>
         <AlertDialogContent className='max-w-xl'>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  {title}
               </AlertDialogTitle>
               <AlertDialogDescription>
                  {description}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <form className='space-y-6 w-full'>
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
               <div className='space-y-2'>
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
                     onClick={expense ? submitForm : handleActionClick}
                     type='submit'
                     disabled={isSubmitting}
                     className='w-full sm:w-[80px]'
                  >
                     {isSubmitting ? (
                        <Loader2 className='animate-spin' />
                     ) : (
                        <>
                           {expense ? 'Update' : 'Create'}
                        </>
                     )}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </form>
         </AlertDialogContent>
      </AlertDialog>
   )
};