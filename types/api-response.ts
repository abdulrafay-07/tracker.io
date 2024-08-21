import { Expense } from "./expense";

export interface ApiResponse {
   success: boolean;
   message: string;
   totalSpent: number;
   expense?: Expense;
   expenses?: Expense[];
};