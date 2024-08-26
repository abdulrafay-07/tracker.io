import { MaxWidthContainer } from '@/components/max-width-container';
import { AccordionExpense } from '../_components/expenses/accordion-expense';
import { ExpenseTable } from '../_components/expenses/expense-table';
import { FilterAndInsights } from '../_components/expenses/filter-and-insights';

interface ExpensesProps {
   searchParams: {
      search?: string
   };
};

const Expenses = ({
   searchParams
}: ExpensesProps) => {
   return (
      <MaxWidthContainer className='flex flex-col gap-y-10'>
         <AccordionExpense />
         <div className='flex flex-col gap-y-1'>
            <FilterAndInsights />
            <ExpenseTable />
         </div>
      </MaxWidthContainer>
   )
};

export default Expenses;