'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export const Navbar = () => {
   const url = usePathname();

   return (
      <>
         <Link href='https://github.com/abdulrafay-07' target='_blank'>
            <Github className='top-0 right-0 px-4 pt-3 h-16 w-16 absolute z-[100]' />
         </Link>
         <div className='top-0 right-0 left-0 absolute flex items-center lg:items-end justify-between md:justify-evenly text-neutral-900 bg-white py-3.5 px-3 lg:px-5 shadow-md z-50'>
            
            <Link
               href='/'
               className='text-2xl font-bold'
            >
               tracker.io
            </Link>
            <div className='flex gap-2'>
               <Button variant={url === '/sign-up' ? 'default' : url === '/' ? 'ghost' : url === '/sign-in' ? 'ghost' : 'default'}>
                  <Link href='/sign-in'>
                     Sign in
                  </Link>
               </Button>
               <Button variant={url === '/sign-in' ? 'default' : url === '/' ? 'default' : 'ghost'}>
                  <Link href='/sign-up'>
                     Sign up
                  </Link>
               </Button>
            </div>
         </div>
      </>
   )
};