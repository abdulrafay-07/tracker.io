interface ExpensesProps {
   searchParams: {
      search?: string
   };
};

const Expenses = ({
   searchParams
}: ExpensesProps) => {
   return (
      <div className='h-full flex justify-center items-center pt-52'>
         <h1 className='text-6xl text-center font-semibold'>Expenses</h1>
      </div>
   )
};

export default Expenses;