import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
   try {
      const { userId, name, amount } = await request.json();

      const newExpense = await prisma.expenses.create({
         data: {
            userId,
            name,
            amount,
         },
      });

      return NextResponse.json({
         success: true,
         message: 'Expense created successfully.',
         expense: newExpense,
      }, {
         status: 201,
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