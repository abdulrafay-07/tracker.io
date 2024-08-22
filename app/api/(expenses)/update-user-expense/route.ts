import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
   try {
      const { id, name, amount } = await request.json();

      const updatedData: { name?: string, amount?: number } = {};

      if (name !== undefined) {
         updatedData.name = name;
      }
      if (amount !== undefined) {
         updatedData.amount = amount;
      }

      const updatedExpense = await prisma.expenses.update({
         where: {
            id: id,
         },
         data: updatedData,
      });

      return NextResponse.json({
         success: true,
         message: 'Expense updated successfully.',
         expense: updatedExpense,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error updating an expense.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
};