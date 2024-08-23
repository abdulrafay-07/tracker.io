'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';

import { SearchInput } from './search-input';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export const Navbar = () => {
    const url = usePathname();

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
            <div
                className={`hidden sm:flex w-full sm:max-w-[320px]
                    ${url.startsWith('/dashboard/') ? 'lg:max-w-[516px]' : 'md:max-w-[516px]'}
                `}
            >
                <SearchInput />
            </div>
            <div className='flex gap-x-8'>
                {url === '/dashboard/expenses' && (
                    <Link
                        href='/dashboard'
                        className='hidden md:block'
                    >
                        <Button
                            size='sm'
                            className='flex items-center gap-1'
                        >
                            Go to dashboard <ChevronRight className='h-4 w-4' />
                        </Button>
                    </Link>
                )}
                {url === '/dashboard/expenses/insights' && (
                    <Link
                        href='/dashboard/expenses'
                        className='hidden md:block'
                    >
                        <Button
                            size='sm'
                            className='flex items-center gap-1'
                        >
                            Go to expenses <ChevronRight className='h-4 w-4' />
                        </Button>
                    </Link>
                )}
                <UserButton
                    appearance={{
                        elements: {
                            userButtonTrigger: {
                                display: 'flex',
                                alignItems: 'start',
                                marginTop: '4.5px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
};