'use client'

import { useEffect, useState } from 'react';

import { useAuth } from '@clerk/nextjs';
import axios, { AxiosError } from 'axios';

import { useJobStore } from '@/store/job';
import { ApiResponse } from '@/types/api-response';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { DeleteDialog } from '../delete-dialog';
import { EmptyX } from '../empty-x';
import { Loader2 } from 'lucide-react';

interface JobsTableProps {
   query?: string;
};

export const JobsTable = ({
   query,
}: JobsTableProps) => {
   const [isDeleting, setIsDeleting] = useState(false);
   const [isFetching, setIsFetching] = useState(true);

   const { jobs, fetchJobs, jobsFetched, jobsFromSearch, getJobsFromSearch, removeFromJobs } = useJobStore();
   const { userId } = useAuth();

   const { toast } = useToast();

   useEffect(() => {
      if (!jobsFetched) {
         fetchJobs(userId!);
      };

      if (jobsFetched) {
         setIsFetching(false);
      };
   }, [jobsFetched]);

   useEffect(() => {
      getJobsFromSearch(query?.toLowerCase()!);
   }, [query]);

   const handleDelete = async (id: string) => {
      setIsDeleting(true);
      try {
         const response = await axios.delete<ApiResponse>('/api/delete-job', {data: {id}});

         if (response.data.success) {
            toast({
               title: 'Success',
               description: response.data.message,
            });

            removeFromJobs(response.data.job!);
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

   if (jobs.length === 0) {
      return (
         <EmptyX
            emptyMessage='No jobs found!'
         />
      )
   };

   return (
      <Table className='w-full my-8'>
         <TableHeader>
            <TableRow>
               <TableHead className='font-bold'>Applied date</TableHead>
               <TableHead className='font-bold'>Company name</TableHead>
               <TableHead className='font-bold'>Position</TableHead>
               <TableHead className='font-bold'>Status</TableHead>
               <TableHead className='font-bold'>Edit</TableHead>
               <TableHead className='font-bold'>Delete</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {
               jobsFromSearch.length === 0 && jobs ? (
                  jobs.map((job) => (
                     <TableRow key={job.id}>
                        <TableCell className='font-semibold'>
                           {new Date(job.applicationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                           })}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           {job.companyName}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           {job.position}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           {job.status}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           Edit
                        </TableCell>
                        <TableCell className='font-semibold'>
                           <DeleteDialog
                              handleDelete={handleDelete}
                              id={job.id}
                              isDeleting={isDeleting}
                              feature='job application'
                           />
                        </TableCell>
                     </TableRow>
                  ))
               ) : (
                  jobsFromSearch.map((job) => (
                     <TableRow key={job.id}>
                        <TableCell className='font-semibold'>
                           {new Date(job.applicationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                           })}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           {job.companyName}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           {job.position}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           {job.status}
                        </TableCell>
                        <TableCell className='font-semibold'>
                           Edit
                        </TableCell>
                        <TableCell className='font-semibold'>
                           Delete
                        </TableCell>
                     </TableRow>
                  ))
               )
            }
         </TableBody>
      </Table>
   )
};