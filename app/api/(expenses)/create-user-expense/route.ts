import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { getMonth } from '@/lib/get-month';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   try {
      const { userId, name, amount, createdAt } = await request.json();

      // get month
      const month = getMonth(new Date(createdAt));

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