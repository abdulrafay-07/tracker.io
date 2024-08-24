import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
   try {
      const { id } = await request.json();

      const deletedJob = await prisma.jobs.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json({
         success: true,
         message: 'Job deleted successfully.',
         job: deletedJob,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error deleting a job.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
};