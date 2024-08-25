import Image from 'next/image';

export const EmptyX = ({
   emptyMessage
}: { emptyMessage: string }) => {
   return (
      <div className='h-full flex flex-col justify-center items-center'>
         <Image
            alt='Empty search'
            src={'/empty-x.png'}
            height={550}
            width={550}
         />
         <h2 className='text-2xl font-semibold -mt-12'>
            {emptyMessage}
         </h2>
      </div>
   )
};