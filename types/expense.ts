export interface Expense {
   id: string;
   userId: string;
   name: string;
   amount: number;
   createdAt: Date;
   updatedAt: Date | null;
   month: string;
};

export interface ExpenseStore {
   totalSpent: string;
   expenses: Expense[];
   expensesFetched: boolean;
   monthlySpentData: {}[],
   makeExpensesFetchedFalse: () => void;
   addToTotalSpent: (expense: Expense) => void;
   removeFromTotalSpent: (expense: Expense) => void;
   fetchUserExpenses: (userId: string) => void;
   addToUserExpense: (expense: Expense) => void;
   removeFromUserExpense: (expense: Expense) => void;
   updateUserExpense: (expense: Expense) => void;
   fetchMonthExpenses: (userId: string, month: string) => void;
};