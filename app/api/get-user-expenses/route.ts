import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   try {
      const { userId } = await request.json();

      const expenses = await prisma.expenses.findMany({
         where: {
            userId: userId,
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

      if (expenses.length === 0) {
         return NextResponse.json({
            success: true,
            message: 'No expenses found.'
         }, {
            status: 201,
         });
      };

      return NextResponse.json({
         success: true,
         message: 'Expenses found successfully.',
         expenses: expenses,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error fetching expenses.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
};