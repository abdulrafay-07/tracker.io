import { create } from 'zustand';

import axios from 'axios';

import { Job, JobStore } from '@/types/job';
import { ApiResponse } from '@/types/api-response';

export const useJobStore = create<JobStore>((set) => ({
   jobs: [],
   jobsFetched: false,
   jobsFromSearch: [],
   fetchJobs: async (userId) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-jobs', { userId });

         set({
            jobs: response.data.jobs,
            jobsFetched: true,
         });
      } catch (error) {
         console.log('Failed to fetch user job applications', error);
      };
   },
   addToJobs: (job: Job) => {
      set((state) => {
         const currentJobs = Array.isArray(state.jobs) ? state.jobs : [];
         return {
            jobs: [job, ...currentJobs],
         };
      });
   },
   removeFromJobs: (job: Job) => {
      set((state) => {
         return {
            jobs: state.jobs.filter((storeJob) => storeJob.id != job.id),
         };
      });
   },
   updateJob: (job: Job) => {
      set((state) => {
         const index = state.jobs.findIndex(storeJob => storeJob.id = job.id);
         
         if (!index) {
            state.jobs[index] = { ...state.jobs[index], 
               companyName: job.companyName,
               position: job.position,
               status: job.status,
               applicationDate: job.applicationDate,
               month: job.month
            };
         };

         return {
            jobs: state.jobs,
         };
      });
   },
   getJobsFromSearch: (query) => {
      set((state) => {
         let searchedJobs: Job[] = [];
         if (query) {
            searchedJobs = state.jobs.filter((job) => (
               job.companyName.toLowerCase().includes(query) || 
               job.position.toLowerCase().includes(query) || 
               job.status.toLowerCase().includes(query) ||
               job.month.toLowerCase().includes(query)
            ));
         } else {
            searchedJobs = [];
         };

         return {
            jobsFromSearch: searchedJobs,
         };
      });
   },
}));