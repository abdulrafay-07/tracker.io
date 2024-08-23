import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   try {
      const { userId, month } = await request.json();

      if (month === 'all') {
         return;
      } else {
         const expenses = await prisma.expenses.findMany({
            where: {
               userId: userId,
               month: month,
            },
            orderBy: {
               createdAt: 'desc',
            },
         });

         if (expenses.length === 0) {
            return NextResponse.json({
               success: true,
               message: `No expenses found in the month: ${month}.`,
               totalSpent: 0,
            }, {
               status: 201,
            });
         };

         const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);

         return NextResponse.json({
            success: true,
            message: `Expenses found successfully in the month: ${month}.`,
            expenses: expenses,
            totalSpent: totalSpent,
         }, {
            status: 200,
         });
      };
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error fetching month expenses.',
      }, {
         status: 404,
      });
   } finally {
      prisma.$disconnect();
   };
};