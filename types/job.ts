import { JobStatus } from '@prisma/client';

export interface Job {
   id: string;
   userId: string;
   companyName: string;
   position: string;
   status: JobStatus;
   applicationDate: Date;
   updatedAt: Date | null;
   month: string;
};