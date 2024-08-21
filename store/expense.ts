import { create } from 'zustand';

import axios from 'axios';

import { Expense, ExpenseStore } from '@/types/expense';
import { ApiResponse } from '@/types/api-response';

export const useExpenseStore = create<ExpenseStore>((set) => ({
   totalSpent: 0,
   totalSpentFetched: false,
   expenses: [],
   expensesFetched: false,
   fetchTotalSpent: async (userId) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-total-spent', { userId });

         set({
            totalSpent: response.data.totalSpent,
            totalSpentFetched: true,
         });
      } catch (error) {
         console.log('Failed to fetch total spent', error);
      };
   },
   addToTotalSpent: (expense: Expense) => {
      set((state) => {
         const updatedTotalSpent = parseFloat((state.totalSpent + expense.amount).toFixed(2));
         return {
            totalSpent: updatedTotalSpent,
         };
      });
   },
   removeFromTotalSpent: (expense: Expense) => {
      set((state) => {
         const updatedTotalSpent = parseFloat((state.totalSpent - expense.amount).toFixed(2));
         return {
            totalSpent: updatedTotalSpent,
         };
      });
   },
   fetchUserExpenses: async (userId) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-user-expenses', { userId });

         set({
            expenses: response.data.expenses,
            expensesFetched: true,
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
}));