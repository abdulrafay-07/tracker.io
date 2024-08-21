import { AccordionExpense } from '../_components/expenses/accordion-expense';
import { ExpenseTable } from '../_components/expenses/expense-table';

interface ExpensesProps {
   searchParams: {
      search?: string
   };
};

const Expenses = ({
   searchParams
}: ExpensesProps) => {
   return (
      <div className='h-full max-w-6xl mx-auto px-4 md:px-12 xl:px-4 py-20 flex flex-col gap-y-10'>
         <AccordionExpense />
         <ExpenseTable />
      </div>
   )
};

export default Expenses;