import Link from 'next/link';

import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
   title: string;
   slug: string;
   bgColor: string;
   textColor: string;
   icon: LucideIcon;
   query: {
      search?: string;
   };
};

export const FeatureCard = ({
   title,
   slug,
   bgColor,
   textColor,
   icon: Icon,
}: FeatureCardProps) => {
   return (
      <Link
         href={`/dashboard/${slug}`}
         className='p-4 rounded-xl hover:opacity-60 duration-200 aspect-[100/127]'
         style={{
            backgroundColor: bgColor,
            color: textColor,
         }}
      >
         <div className='flex flex-col justify-between h-full'>
            <h1 className='text-3xl lg:text-4xl font-bold'>
               {title}
            </h1>
            <span className='flex justify-end'>
               {<Icon className='h-8 w-8 lg:h-12 lg:w-12' />}
            </span>
         </div>
      </Link>
   )
};