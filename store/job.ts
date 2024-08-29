import { create } from 'zustand';

import axios from 'axios';

import { Job, JobStore } from '@/types/job';
import { ApiResponse } from '@/types/api-response';

export const useJobStore = create<JobStore>((set) => ({
   jobs: [],
   jobsFetched: false,
   jobsFromSearch: [],
   statusData: [],
   areaChart: [],
   fetchJobs: async (userId) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-jobs', { userId });

         set({
            jobs: response.data.jobs,
            jobsFetched: true,
            statusData: response.data.statusArr,
            areaChart: response.data.areaChart,
         });
      } catch (error) {
         console.log('Failed to fetch user job applications', error);
      };
   },
   addToJobs: (job: Job) => {
      set((state) => {
         const newJobStatus = job.status;

         const updatedStatusData = [...state.statusData];

         const statusIndex = updatedStatusData.findIndex(status => status.name === newJobStatus);

         updatedStatusData[statusIndex] = {
            ...updatedStatusData[statusIndex],
            total: updatedStatusData[statusIndex].total + 1,
         };

         const currentJobs = Array.isArray(state.jobs) ? state.jobs : [];
         return {
            jobs: [job, ...currentJobs],
            statusData: updatedStatusData,
         };
      });
   },
   removeFromJobs: (job: Job) => {
      set((state) => {
         const removedJobStatus = job.status;

         const updatedStatusData = [...state.statusData];

         const statusIndex = updatedStatusData.findIndex(status => status.name === removedJobStatus);

         updatedStatusData[statusIndex] = {
            ...updatedStatusData[statusIndex],
            total: updatedStatusData[statusIndex].total - 1,
         };

         return {
            jobs: state.jobs.filter((storeJob) => storeJob.id != job.id),
            statusData: updatedStatusData,
         };
      });
   },
   updateJob: (job: Job) => {
      set((state) => {
         const jobStatus = job.status;

         const index = state.jobs.findIndex(storeJob => storeJob.id === job.id);
         
         if (index !== -1) {

            if (state.jobs[index].status === jobStatus) {
               state.jobs[index] = { ...state.jobs[index], 
                  companyName: job.companyName,
                  position: job.position,
                  status: job.status,
                  applicationDate: job.applicationDate,
                  month: job.month
               };

               return {
                  jobs: state.jobs,
               };
            };

            const updatedStatusData = [...state.statusData];

            const incrementStatusIndex = updatedStatusData.findIndex(status => status.name === jobStatus);
            const decrementStatusIndex = state.statusData.findIndex(status => status.name === state.jobs[index].status)

            // this will increment the status
            updatedStatusData[incrementStatusIndex] = {
               ...updatedStatusData[incrementStatusIndex],
               total: updatedStatusData[incrementStatusIndex].total + 1,
            };
            
            // this will decrement the status
            updatedStatusData[decrementStatusIndex] = {
               ...updatedStatusData[decrementStatusIndex],
               total: updatedStatusData[decrementStatusIndex].total - 1,
            };

            state.jobs[index] = { ...state.jobs[index], 
               companyName: job.companyName,
               position: job.position,
               status: job.status,
               applicationDate: job.applicationDate,
               month: job.month
            };

            return {
               jobs: state.jobs,
               statusData: updatedStatusData,
            }
         };

         return state;
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