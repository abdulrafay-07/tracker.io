import Image from 'next/image';
import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';

import { SearchInput } from './search-input';

export const Navbar = () => {
    return (
        <div className='flex justify-between items-center gap-x-4 p-4'>
            <Link href='/dashboard' className='flex gap-x-1.5'>
                <Image
                    alt='tracker.io'
                    src={'/logo.png'}
                    width={30}
                    height={30}
                />
                <h1 className='text-2xl font-bold -mb-2'>
                    tracker.io
                </h1>
            </Link>
            <div className='hidden sm:flex w-full sm:max-w-[320px] md:max-w-[516px]'>
                <SearchInput />
            </div>
            <UserButton />
        </div>
    )
};