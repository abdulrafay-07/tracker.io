import Image from 'next/image';

export const EmptyExpense = () => {
   return (
      <div className='h-full flex flex-col justify-center items-center'>
         <Image
            alt='Empty search'
            src={'/empty-expenses.png'}
            height={550}
            width={550}
         />
         <h2 className='text-2xl font-semibold -mt-12'>
            No expenses found!
         </h2>
         <p className='text-muted-foreground text-sm mt-2'>
            Try creating an expense
         </p>
      </div>
   )
};