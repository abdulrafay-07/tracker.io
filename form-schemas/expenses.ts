import { z } from 'zod';

const createExpense = z.object({
   userId: z.string(),
   name: z
      .string()
      .min(3, 'Name must be at least 3 characters.')
      .max(40, 'Name must not be longer than 40 characters.'),
   amount: z
      .number()
      .positive(),
   createdAt: z.date(),
   updatedAt: z.date().optional(),
});

export {
   createExpense,
};