import { NextRequest, NextResponse } from 'next/server';

import { JobStatus, PrismaClient } from '@prisma/client';
import { getMonth } from '@/lib/get-month';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
   try {
      const { id, companyName, position, status, applicationDate } = await request.json();

      const updatedData: {
         companyName?: string;
         position?: string;
         status?: JobStatus;
         applicationDate?: Date;
         month?: string;
      } = {};

      if (companyName !== undefined) {
         updatedData.companyName = companyName;
      };
      if (position !== undefined) {
         updatedData.position = position;
      };
      if (status !== undefined) {
         updatedData.status = status;
      };
      if (applicationDate !== undefined) {
         updatedData.applicationDate = new Date(applicationDate);
      };

      // get month
      const month = getMonth(new Date(applicationDate));
      updatedData.month = month;

      const updatedJob = await prisma.jobs.update({
         where: {
            id: id,
         },
         data: updatedData,
      });

      return NextResponse.json({
         success: true,
         message: 'Job updated successfully.',
         job: updatedJob,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error updating a job application.',
      }, {
         status: 404,
      });
   } finally {
      prisma.$disconnect();
   };
};