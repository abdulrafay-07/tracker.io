'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useDebounceValue } from 'usehooks-ts';
import qs from 'query-string';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const SearchInput = () => {
    const [value, setValue] = useState('');

    const router = useRouter();

    const [debouncedValue, _] = useDebounceValue<string>(value, 500);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/dashboard',
            query: {
                search: debouncedValue,
            },
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <div className='w-full relative'>
            <Search
                className='absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground h-5 w-5 cursor-pointer'
            />
            <Input
                placeholder='Search...'
                onChange={handleChange}
            />
        </div>
    )
};