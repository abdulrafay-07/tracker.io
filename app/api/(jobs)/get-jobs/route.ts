import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

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

      let statusArr: {
         name: string;
         total: number;
      }[] = [];

      const statusCounts = {
         Pending: 0,
         Accepted: 0,
         Rejected: 0,
      };

      jobs.forEach((job) => {
         if (job.status in statusCounts) {
            statusCounts[job.status]++;
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