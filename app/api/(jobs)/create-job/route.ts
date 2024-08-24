import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { getMonth } from '@/lib/get-month';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   try {
      const { userId, companyName, position, status, applicationDate } = await request.json();

      // get month
      const month = getMonth(new Date(applicationDate));

      const newJob = await prisma.jobs.create({
         data: {
            userId,
            companyName,
            position,
            status,
            applicationDate,
            month,
         },
      });

      return NextResponse.json({
         success: true,
         message: 'Job created successfully.',
         job: newJob,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error creating a job application.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
};