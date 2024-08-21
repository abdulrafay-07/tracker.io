import { Plus } from 'lucide-react';

export const CreateExpenseCard = () => {
   return (
      <div className='flex flex-col items-center justify-center p-4 rounded-xl hover:opacity-80 duration-200 aspect-[127/65] bg-[#AFB666] text-white cursor-pointer'>
         <Plus className='h-10 w-10' />
         <h1 className='text-xl lg:text-2xl font-semibold'>Create an expense</h1>
      </div>
   )
};