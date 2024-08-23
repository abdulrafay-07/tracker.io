import { AccordionExpense } from '../_components/expenses/accordion-expense';
import { ExpenseTable } from '../_components/expenses/expense-table';
import { FilterMonths } from '../_components/expenses/filter-months';

interface ExpensesProps {
   searchParams: {
      search?: string
   };
};

const Expenses = ({
   searchParams
}: ExpensesProps) => {
   return (
      <div className='min-h-screen h-full max-w-6xl mx-auto px-4 md:px-12 xl:px-4 py-20 flex flex-col gap-y-10'>
         <AccordionExpense />
         <div className='flex flex-col gap-y-1'>
            <FilterMonths />
            <ExpenseTable />
         </div>
      </div>
   )
};

export default Expenses;