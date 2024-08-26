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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Edit, Loader2 } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';
import axios, { AxiosError } from 'axios';
import { format, isBefore, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

import { Job } from '@/types/job';
import { createJob } from '@/form-schemas/jobs';
import { ApiResponse } from '@/types/api-response';
import { useJobStore } from '@/store/job';

interface EditJobDialogProps {
   job: Job;
   title: string;
   description: string;
};

export const EditJobDialog = ({
   job,
   title,
   description,
}: EditJobDialogProps) => {
   const [isUpdating, setIsUpdating] = useState(false);

   const { updateJob } = useJobStore();

   const { toast } = useToast();

   const form = useForm<z.infer<typeof createJob>>({
      resolver: zodResolver(createJob),
      defaultValues: {
         userId: job.userId,
         companyName: job.companyName,
         position: job.position,
         status: job.status,
         applicationDate: job.applicationDate,
         month: job.month,
      },
   });

   const onSubmit = async (data: z.infer<typeof createJob>) => {
      setIsUpdating(true);
      try {
         const response = await axios.patch<ApiResponse>('/api/update-job', {
            id: job?.id,
            companyName: data.companyName,
            position: data.position,
            status: data.status,
            applicationDate: data.applicationDate,
         });

         toast({
            title: 'Success!',
            description: response.data.message,
         });

         updateJob(response.data.job!);
      } catch (error) {
         console.log(error);
         const axiosError = error as AxiosError<ApiResponse>;
         toast({
            title: 'Failed!',
            description: axiosError.response?.data.message,
            variant: 'destructive',
         });
      } finally {
         setIsUpdating(false);
      };
   };

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button size='icon' variant='ghost'>
               <Edit className='h-5 w-5 text-green-700 hover:text-green-800' />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  {title}
               </AlertDialogTitle>
               <AlertDialogDescription>
                  {description}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
               >
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
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date?.toISOString())}
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
                  <AlertDialogFooter>
                     <AlertDialogCancel>
                        Cancel
                     </AlertDialogCancel>
                        <AlertDialogAction
                           type='submit'
                           disabled={isUpdating}
                        >
                           Update
                        </AlertDialogAction>
                  </AlertDialogFooter>
               </form>
            </Form>
         </AlertDialogContent>
      </AlertDialog>
   )
};