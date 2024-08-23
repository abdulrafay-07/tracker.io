import { create } from 'zustand';

import axios from 'axios';

import { Expense, ExpenseStore } from '@/types/expense';
import { ApiResponse } from '@/types/api-response';

export const useExpenseStore = create<ExpenseStore>((set) => ({
   totalSpent: '0',
   expenses: [],
   expensesFetched: false,
   makeExpensesFetchedFalse: () => {
      set({
         expensesFetched: false,
      });
   },
   addToTotalSpent: (expense: Expense) => {
      set((state) => {
         const toFloat = parseFloat(state.totalSpent);
         const updatedTotalSpent = toFloat + expense.amount;
         return {
            totalSpent: updatedTotalSpent.toFixed(2),
         };
      });
   },
   removeFromTotalSpent: (expense: Expense) => {
      set((state) => {
         const toFloat = parseFloat(state.totalSpent);
         const updatedTotalSpent = toFloat - expense.amount;
         return {
            totalSpent: updatedTotalSpent.toFixed(2),
         };
      });
   },
   fetchUserExpenses: async (userId) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-user-expenses', { userId });

         set({
            expenses: response.data.expenses,
            expensesFetched: true,
            totalSpent: response.data.totalSpent.toString(),
         });
      } catch (error) {
         console.log('Failed to fetch user expenses', error);
      };
   },
   addToUserExpense: (expense: Expense) => {
      set((state) => {
         const currentExpenses = Array.isArray(state.expenses) ? state.expenses : [];
         return {
            expenses: [expense, ...currentExpenses],
         };
      });
   },
   removeFromUserExpense: (expense: Expense) => {
      set((state) => {
         return {
            expenses: state.expenses.filter((exp) => exp.id != expense.id),
         };
      });
   },
   updateUserExpense: (expense: Expense) => {
      set((state) => {
         const index = state.expenses.findIndex(exp => exp.id = expense.id);
         
         if (!index) {
            state.expenses[index] = { ...state.expenses[index], name: expense.name, amount: expense.amount}
         };

         return {
            expenses: state.expenses,
         };
      });
   },
   fetchMonthExpenses: async (userId, month) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-month-expense', { userId, month });
         console.log(response.data.expenses);

         set({
            expenses: response.data.expenses,
            expensesFetched: true,
            totalSpent: response.data.totalSpent.toString(),
         });
      } catch (error) {
         console.log('Failed to fetch user monthly expenses', error);
      };
   },
}));