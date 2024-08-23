import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   try {
      const { userId, name, amount, createdAt } = await request.json();

      // get month from created At
      const date = new Date(createdAt);
      const month = monthNames[date.getMonth()];

      const newExpense = await prisma.expenses.create({
         data: {
            userId,
            name,
            amount,
            createdAt,
            month,
         },
      });

      return NextResponse.json({
         success: true,
         message: 'Expense created successfully.',
         expense: newExpense,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error creating an expense.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
}