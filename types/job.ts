import { JobStatus } from '@prisma/client';

export interface Job {
   id: string;
   userId: string;
   companyName: string;
   position: string;
   status: JobStatus;
   createdAt: Date;
   applicationDate: Date;
   updatedAt: Date | null;
   month: string;
};

export interface JobStore {
   jobs: Job[];
   jobsFetched: boolean;
   jobsFromSearch: Job[];
   statusData: {
      name: string;
      total: number;
   }[];
   areaChart: {
      month: string;
      accepted: number;
      rejected: number;
      pending: number;
   }[],
   fetchJobs: (userId: string) => void;
   addToJobs: (job: Job) => void;
   removeFromJobs: (job: Job) => void;
   updateJob: (job: Job) => void;
   getJobsFromSearch: (query: string) => void;
};