import { create } from 'zustand';

import axios from 'axios';

import { Expense, ExpenseStore } from '@/types/expense';
import { ApiResponse } from '@/types/api-response';

export const useExpenseStore = create<ExpenseStore>((set) => ({
   totalSpent: '0',
   expenses: [],
   expensesFetched: false,
   monthlySpentData: [],
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
         
         // charts data calculation
         const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         
         const expenses = response.data.expenses;

         // get the first expense's month (last item in the array)
         const firstExpenseMonth = expenses![expenses!.length - 1].month;
         const firstMonthIndex = allMonths.indexOf(firstExpenseMonth);

         // Create a list of months starting from the first expense month
         const orderedMonths = [...allMonths.slice(firstMonthIndex), ...allMonths.slice(0, firstMonthIndex)];

         const chartsData: { [key: string]: number } = {};
         orderedMonths.forEach(month => {
            chartsData[month] = 0;
         });

         expenses?.forEach((expense) => {
            chartsData[expense.month] += expense.amount;
         });

         const formattedChartData = Object.keys(chartsData).map((month) => ({
            month,
            total: chartsData[month].toFixed(2),
         }));

         set({
            expenses: response.data.expenses,
            expensesFetched: true,
            totalSpent: response.data.totalSpent.toString(),
            monthlySpentData: formattedChartData,
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
         
         if (index !== 1) {
            state.expenses[index] = { ...state.expenses[index], name: expense.name, amount: expense.amount};

            return {
               expenses: state.expenses,
            };
         };

         return state;
      });
   },
   fetchMonthExpenses: async (userId, month) => {
      try {
         const response = await axios.post<ApiResponse>('/api/get-month-expense', { userId, month });

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