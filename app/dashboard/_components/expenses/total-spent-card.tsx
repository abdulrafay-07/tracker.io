import { Loader2 } from 'lucide-react';

interface TotalSpentCardProps {
   isFetching: boolean;
   totalSpent: string;
};

export const TotalSpentCard = ({
   isFetching,
   totalSpent,
}: TotalSpentCardProps) => {
   return (
      <div className='flex flex-col justify-between p-4 rounded-xl hover:opacity-80 duration-200 aspect-[127/65] bg-[#00001F] text-white'>
         <div className='flex items-center justify-between'>
            <h1 className='text-2xl lg:text-4xl font-bold'>Total Spent:</h1>
            <p className='text-xl lg:text-2xl font-semibold'>
               {isFetching ? (
                  <Loader2 className='animate-spin' />
               ): (
                  <>
                     ${totalSpent}
                  </>
               )}
            </p>
         </div>
         {/* Dropdown */}
      </div>
   )
};