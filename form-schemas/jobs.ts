import { z } from 'zod';

const createJob = z.object({
   userId: z.string(),
   companyName: z
      .string()
      .min(3, 'Company name must be at least 3 characters.')
      .max(40, 'Company name must not be longer than 40 characters.'),
   position: z
      .string()
      .min(3, 'position must be at least 3 characters.')
      .max(24, 'position must not be longer than 25 characters.'),
   status: z.enum(['Pending', 'Accepted', 'Rejected']),
   createdAt: z.date(),
   applicationDate: z.date(),
   updatedAt: z.date().optional(),
   month: z.string().optional(),
});

export {
   createJob,
};