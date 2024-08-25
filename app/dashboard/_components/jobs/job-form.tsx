'use client'

import { Dispatch, SetStateAction, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import { format, isBefore, subMonths } from 'date-fns';
import axios, { AxiosError } from 'axios';
import { cn } from '@/lib/utils';

import { createJob } from '@/form-schemas/jobs';
import { ApiResponse } from '@/types/api-response';
import { useJobStore } from '@/store/job';

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Loader2 } from 'lucide-react';

export const JobForm = ({
   setIsOpen,
}: { setIsOpen: Dispatch<SetStateAction<string | undefined>> }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { addToJobs } = useJobStore();

   const { userId } = useAuth();
   const { toast } = useToast();

   const form = useForm<z.infer<typeof createJob>>({
      resolver: zodResolver(createJob),
      defaultValues: {
         userId: userId!,
         companyName: '',
         position: '',
         status: 'Pending',
         createdAt: new Date(),
      },
   });

   const onSubmit = async (data: z.infer<typeof createJob>) => {
      setIsSubmitting(true);
      try {
         const response = await axios.post<ApiResponse>('/api/create-job', data);

         toast({
            title: 'Success!',
            description: response.data.message,
         });

         addToJobs(response.data.job!);
         setIsOpen(undefined);
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
      };
   };

   return (
      <div className='max-w-xl mx-auto mt-6'>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
               <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder='Google'
                              className='focus-visible:ring-1 focus-visible:ring-offset-0'
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='position'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder='Front-end Intern'
                              className='focus-visible:ring-1 focus-visible:ring-offset-0'
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Job Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger className='focus:ring-1 focus:ring-offset-0'>
                                 <SelectValue placeholder='Select the job status' />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <SelectItem value='Pending'>Pending</SelectItem>
                              <SelectItem value='Accepted'>Accepted</SelectItem>
                              <SelectItem value='Rejected'>Rejected</SelectItem>
                           </SelectContent>
                        </Select>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='applicationDate'
                  render={({ field }) => (
                     <FormItem className='flex flex-col'>
                        <FormLabel>Applied Date</FormLabel>
                        <Popover>
                           <PopoverTrigger asChild>
                              <FormControl>
                                 <Button
                                    variant='outline'
                                    className={cn('pl-3 text-left',
                                       !field.value && 'text-muted-foreground'
                                    )}
                                 >
                                    {field.value ? (
                                       format(field.value, 'PPP')
                                    ): (
                                       <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='pl-1 ml-auto h-4 w-4 opacity-50' />
                                 </Button>
                              </FormControl>
                           </PopoverTrigger>
                           <PopoverContent className='p-0' align='center'>
                              <Calendar
                                 mode='single'
                                 selected={field.value}
                                 onSelect={field.onChange}
                                 disabled={(date) => 
                                    date > new Date() || isBefore(date, subMonths(new Date(), 1))
                                 }
                                 initialFocus
                              />
                           </PopoverContent>
                        </Popover>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button
                  type='submit'
                  className='w-1/3'
                  disabled={isSubmitting}
               >
                  {isSubmitting ? (
                     <Loader2 className='animate-spin' />
                  ) : (
                     'Create'
                  )}
               </Button>
            </form>
         </Form>
      </div>
   )
};