import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { monthNames } from '@/lib/get-month';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   try {
      const { userId } = await request.json();

      const jobs = await prisma.jobs.findMany({
         where: {
            userId: userId,
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

      if (jobs.length === 0) {
         return NextResponse.json({
            success: true,
            message: 'No jobs found.',
            jobs: jobs,
         }, {
            status: 201,
         });
      };

      // for donut chart
      let statusArr: {
         name: string;
         total: number;
      }[] = [];

      const statusCounts = {
         Pending: 0,
         Accepted: 0,
         Rejected: 0,
      };

      // area chart
      let areaChart: {
         month: string;
         accepted: number;
         rejected: number;
         pending: number;
      }[] = [];

      // get the first expense's month (last item in the array)
      const firstJobMonth = jobs[jobs.length - 1].month;
      const firstMonthIndex = monthNames.indexOf(firstJobMonth);

       // create a list of months starting from the first expense month
      const orderedMonths = [...monthNames.slice(firstMonthIndex), ...monthNames.slice(0, firstMonthIndex)];

      areaChart = orderedMonths.map(month => ({
         month: month,
         accepted: 0,
         rejected: 0,
         pending: 0,
      }));

      jobs.forEach((job) => {
         // donut chart
         if (job.status in statusCounts) {
            statusCounts[job.status]++;
         };

         const monthIndex = orderedMonths.indexOf(job.month);

         if (monthIndex !== -1) {
            if (job.status === 'Accepted') {
               areaChart[monthIndex].accepted++;
            } else if (job.status === 'Rejected') {
               areaChart[monthIndex].rejected++;
            } else if (job.status === 'Pending') {
               areaChart[monthIndex].pending++;
            };
         };
      });

      statusArr = Object.entries(statusCounts).map(([name, total]) => ({
         name,
         total,
      }));

      return NextResponse.json({
         success: true,
         message: 'Job found successfully.',
         jobs: jobs,
         statusArr: statusArr,
         areaChart: areaChart
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error fetching job applications.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
};