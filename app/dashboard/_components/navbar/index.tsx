'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

import { SearchInput } from './search-input';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Navbar = () => {
    const url = usePathname();

    // mapping of URL to button label and target link
    const buttonConfig = [
        {
            key: '/dashboard/expenses/insights',
            label: 'Go to expenses',
            href: '/dashboard/expenses',
        },
        {
            key: '/dashboard/jobs/analytics',
            label: 'Go to job applications',
            href: '/dashboard/jobs',
        },
        {
            key: '/dashboard/expenses',
            label: 'Go to dashboard',
            href: '/dashboard',
        },
        {
            key: '/dashboard/jobs',
            label: 'Go to dashboard',
            href: '/dashboard',
        },
    ];

    // find the matching button configuration based on the URL
    const buttonProps = buttonConfig.find(({ key }) => url.startsWith(key));

    // condition to hide search bar
    const hideSearchBar = ['/dashboard/expenses/insights', '/dashboard/jobs/analytics'].includes(url);

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
            {!hideSearchBar && (
                <div
                    className={`hidden sm:flex w-full sm:max-w-[320px]
                        ${url.startsWith('/dashboard/') ? 'lg:max-w-[516px]' : 'md:max-w-[516px]'}
                    `}
                >
                    <SearchInput />
                </div>
            )}
            <div className='flex gap-x-8'>
                <div className='hidden md:flex'>
                    {buttonProps && (
                        <Link
                            href={buttonProps.href}
                            className={cn('flex items-center gap-x-1',
                                buttonVariants({ size: 'sm' })
                            )}
                        >
                            {buttonProps.label} <ArrowRight className='h-4 w-4' />
                        </Link>
                    )}
                </div>
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