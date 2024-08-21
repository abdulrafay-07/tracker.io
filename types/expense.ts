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
   totalSpentFetched: boolean;
   expenses: Expense[];
   expensesFetched: boolean;
   fetchTotalSpent: (userId: string) => void;
   addToTotalSpent: (expense: Expense) => void;
   removeFromTotalSpent: (expense: Expense) => void;
   fetchUserExpenses: (userId: string) => void;
   addToUserExpense: (expense: Expense) => void;
   removeFromUserExpense: (expense: Expense) => void;
};