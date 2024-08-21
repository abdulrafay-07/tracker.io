import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
   try {
      const { id } = await request.json();

      const deletedExpense = await prisma.expenses.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json({
         success: true,
         message: 'Expense deleted successfully.',
         expense: deletedExpense,
      }, {
         status: 200,
      });
   } catch (error) {
      return NextResponse.json({
         success: false,
         message: 'Error deleting an expense.',
      }, {
         status: 404,
      });
   } finally {
      await prisma.$disconnect();
   };
};