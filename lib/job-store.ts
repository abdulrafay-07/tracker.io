import { JobStore } from '@/types/job';
import { JobStatus } from '@prisma/client';

const addToJobStatus = (state: JobStore, jobStatus: JobStatus) => {
   const statusData = [...state.statusData];

   const statusIndex = statusData.findIndex(status => status.name === jobStatus);

   statusData[statusIndex] = {
      ...statusData[statusIndex],
      total: statusData[statusIndex].total + 1,
   };

   return statusData;
};

const addToAreaChart = (state: JobStore, jobStatus: JobStatus, jobMonth: string) => {
   const areaChartData = [...state.areaChart];

   const monthIndex = areaChartData.findIndex(data => data.month === jobMonth);

   if (jobStatus === 'Accepted') {
      areaChartData[monthIndex].accepted++;
   } else if (jobStatus === 'Rejected') {
      areaChartData[monthIndex].rejected++;
   } else if (jobStatus === 'Pending') {
      areaChartData[monthIndex].pending++;
   };

   return areaChartData;
};

const removeFromJobStatus = (state: JobStore, jobStatus: JobStatus) => {
   const statusData = [...state.statusData];

   const statusIndex = statusData.findIndex(status => status.name === jobStatus);

   statusData[statusIndex] = {
      ...statusData[statusIndex],
      total: statusData[statusIndex].total - 1,
   };

   return statusData;
};

const removeFromAreaChart = (state: JobStore, jobStatus: JobStatus, jobMonth: string) => {
   const areaChartData = [...state.areaChart];

   const monthIndex = areaChartData.findIndex(data => data.month === jobMonth);

   if (jobStatus === 'Accepted') {
      areaChartData[monthIndex].accepted--;
   } else if (jobStatus === 'Rejected') {
      areaChartData[monthIndex].rejected--;
   } else if (jobStatus === 'Pending') {
      areaChartData[monthIndex].pending--;
   };

   return areaChartData;
};

const updateStatusData = (state: JobStore, jobStatus: JobStatus, jobIndex: number) => {
   const statusData = [...state.statusData];

   const incrementStatusIndex = statusData.findIndex(status => status.name === jobStatus);
   const decrementStatusIndex = state.statusData.findIndex(status => status.name === state.jobs[jobIndex].status);

   // this will increment the status
   statusData[incrementStatusIndex] = {
      ...statusData[incrementStatusIndex],
      total: statusData[incrementStatusIndex].total + 1,
   };
   
   // this will decrement the status
   statusData[decrementStatusIndex] = {
      ...statusData[decrementStatusIndex],
      total: statusData[decrementStatusIndex].total - 1,
   };

   return statusData;
};

const updateAreaChart = (state: JobStore, oldJobStatus: JobStatus, jobStatus: JobStatus, jobMonth: string, jobIndex: number) => {
   const areaChartData = [...state.areaChart];

   const monthIndex = areaChartData.findIndex(data => data.month === jobMonth);
   
   // decrement old job status value
   if (oldJobStatus === 'Accepted') {
      areaChartData[monthIndex].accepted--;
   } else if (oldJobStatus === 'Rejected') {
      areaChartData[monthIndex].rejected--;
   } else if (oldJobStatus === 'Pending') {
      areaChartData[monthIndex].pending--;
   };

   // increment new job status value

   if (jobStatus === 'Accepted') {
      areaChartData[monthIndex].accepted++;
   } else if (jobStatus === 'Rejected') {
      areaChartData[monthIndex].rejected++;
   } else if (jobStatus === 'Pending') {
      areaChartData[monthIndex].pending++;
   };

   return areaChartData;
};

export {
   addToJobStatus,
   addToAreaChart,
   removeFromJobStatus,
   removeFromAreaChart,
   updateStatusData,
   updateAreaChart,
};