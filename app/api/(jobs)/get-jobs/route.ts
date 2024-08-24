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
            applicationDate: 'desc',
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

      return NextResponse.json({
         success: true,
         message: 'Job found successfully.',
         jobs: jobs,
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