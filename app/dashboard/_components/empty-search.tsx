import Image from 'next/image';

export const EmptySearch = () => {
   return (
      <div className='h-full flex flex-col justify-center items-center'>
         <Image
            alt='Empty search'
            src={'/empty-search.jpg'}
            height={500}
            width={500}
         />
         <h2 className='text-2xl font-semibold -mt-12'>
            No results found!
         </h2>
         <p className='text-muted-foreground text-sm mt-2'>
            Try searching for something else
         </p>
      </div>
   )
};