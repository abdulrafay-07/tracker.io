import { z } from 'zod';

const createExpense = z.object({
   userId: z.string(),
   name: z
      .string()
      .min(3, 'Name must be at least 3 characters.')
      .max(40, 'Name must not be longer than 40 characters.'),
   amount: z
      .number()
      .positive()
      .max(999999, 'Amount cannot be greater than $999999.')
      .refine((value) => {
         const decimalPart = value.toString().split('.')[1];
         return !decimalPart || decimalPart.length <= 2;
      }, {
         message: 'Amount can have at most two decimal places.'
      }),
   createdAt: z.date(),
   updatedAt: z.date().optional(),
});

export {
   createExpense,
};