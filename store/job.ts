import { create } from 'zustand';

import axios from 'axios';

import { Job, JobStore } from '@/types/job';
import { ApiResponse } from '@/types/api-response';
import { addToAreaChart, addToJobStatus, removeFromAreaChart, removeFromJobStatus, updateAreaChart, updateStatusData } from '@/lib/job-store';

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
         const jobStatus = job.status;

         // adds the newest job status to statusArr (without having to call database)
         const updatedStatusData = addToJobStatus(state, jobStatus);

         // adds the newest job data to areaChart (without having to call database)
         const updatedAreaChartData = addToAreaChart(state, jobStatus, job.month);

         const currentJobs = Array.isArray(state.jobs) ? state.jobs : [];
         return {
            jobs: [job, ...currentJobs],
            statusData: updatedStatusData,
            areaChart: updatedAreaChartData,
         };
      });
   },
   removeFromJobs: (job: Job) => {
      set((state) => {
         const jobStatus = job.status;

         // removes the deleted job status from statusArr (without having to call database)
         const updatedStatusData = removeFromJobStatus(state, jobStatus);

         // removes the deleted job data from areaChart (without having to call database)
         const updatedAreaChartData = removeFromAreaChart(state, jobStatus, job.month);

         return {
            jobs: state.jobs.filter((storeJob) => storeJob.id != job.id),
            statusData: updatedStatusData,
            areaChart: updatedAreaChartData,
         };
      });
   },
   updateJob: (job: Job) => {
      set((state) => {
         const jobStatus = job.status;

         const index = state.jobs.findIndex(storeJob => storeJob.id === job.id);
         
         if (index !== -1) {
            // if status hasnt changed, we just simply update any other data and return it
            if (state.jobs[index].status === jobStatus) {
               state.jobs[index] = { ...state.jobs[index], 
                  companyName: job.companyName,
                  position: job.position,
                  applicationDate: job.applicationDate,
                  month: job.month
               };

               return {
                  jobs: state.jobs,
               };
            };

            // update the statusArr without calling the database
            const updatedStatusData = updateStatusData(state, jobStatus, index);

            // update the areaChart without calling the database
            const updatedAreaChartData = updateAreaChart(state, state.jobs[index].status, jobStatus, job.month, index);

            state.jobs[index] = {
               ...state.jobs[index], 
               companyName: job.companyName,
               position: job.position,
               status: job.status,
               applicationDate: job.applicationDate,
               month: job.month
            };

            return {
               jobs: state.jobs,
               statusData: updatedStatusData,
               areaChart: updatedAreaChartData,
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