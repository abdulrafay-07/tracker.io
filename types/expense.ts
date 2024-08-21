export interface Expense {
   id: string;
   userId: string;
   name: string;
   amount: number;
   createdAt: Date;
   updatedAt: Date | null;
};

export interface ExpenseStore {
   totalSpent: number;
   isFetched: boolean;
   fetchTotalSpent: (userId: string) => void;
   addExpense: (expense: Expense) => void;
};