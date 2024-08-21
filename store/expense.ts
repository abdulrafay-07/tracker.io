import { create } from 'zustand';

import axios from 'axios';

import { Expense, ExpenseStore } from '@/types/expense';
import { ApiResponse } from '@/types/api-response';

export const useExpenseStore = create<ExpenseStore>((set) => ({
   totalSpent: 0,
   isFetched: false,
   fetchTotalSpent: async (userId) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-total-spent', { userId });

         set({
            totalSpent: response.data.totalSpent,
            isFetched: true,
         });
      } catch (error) {
         console.log('Failed to fetch total spent', error);
      };
   },
   addToTotalSpent: (expense: Expense) => {
      set((state) => {
         state.totalSpent = parseFloat(state.totalSpent.toString());
         return {
            totalSpent: state.totalSpent + expense.amount,
         };
      });
   },
}));