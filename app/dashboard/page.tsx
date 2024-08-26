'use client'

import { useEffect, useState } from 'react';

import { FeaturedCards } from '@/types/cards';
import { featureCards } from '@/lib/feature-cards';

import { MaxWidthContainer } from '@/components/max-width-container';
import { FeatureCard } from './_components/feature-card';
import { EmptySearch } from './_components/empty-search';

interface DashboardProps {
    searchParams: {
        search?: string;
    };
};

const Dashboard = ({
    searchParams,
}: DashboardProps) => {
    const [cards, setCards] = useState<FeaturedCards[]>([]);

    useEffect(() => {
        if (!searchParams?.search) {
            setCards(featureCards);
            return;
        };

        const filteredCards = featureCards.filter((card) =>
            card.title.toLowerCase().includes(searchParams?.search!.toLowerCase())
        );

        setCards(filteredCards);
    }, [searchParams]);

    if (searchParams?.search &&  cards.length === 0) {
        return (
            <EmptySearch />
        )
    };

    return (
        <MaxWidthContainer>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8'>
                {cards.map((card) => (
                    <FeatureCard
                        key={card.id}
                        {...card}
                        query={searchParams}
                    />
                ))}
            </div>
        </MaxWidthContainer>
    )
};

export default Dashboard;