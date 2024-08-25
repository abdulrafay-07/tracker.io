import { Expense } from './expense';
import { Job } from './job';

export interface ApiResponse {
   success: boolean;
   message: string;
   totalSpent: number;
   expense?: Expense;
   expenses?: Expense[];
   job?: Job;
   jobs?: Job[];
};