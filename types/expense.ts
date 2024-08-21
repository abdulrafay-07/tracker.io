export interface Expense {
   id: string;
   userId: string;
   name: string;
   amount: number;
   createdAt: Date;
   updatedAt: Date | null;
};