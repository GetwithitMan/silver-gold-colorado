'use client';

import { useState } from 'react';
import CoinCard from './CoinCard';
import FilterTab from './FilterTab';
import { coins } from '@/data/coins';

interface PriceData {
  price: number;
  change: number;
  changePercent: number;
}

interface Prices {
  gold: PriceData;
  silver: PriceData;
  platinum: PriceData;
  palladium: PriceData;
}

interface ProductShowcaseProps {
  prices: Prices;
}

export default function ProductShowcase({ prices }: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'gold' | 'silver'>('all');

  const filteredCoins = activeFilter === 'all' ? coins : coins.filter((c) => c.type === activeFilter);

  return (
    <section id="products" className="section-padding px-5 sm:px-10 section-divider">
      <div className="container-full">
        <div className="section-header mb-12">
          <h2 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl font-semibold mb-3 text-mixed-gradient">
            Today&apos;s Prices
          </h2>
          <p className="text-[#666] text-base">
            Live spot prices from Gold-API.com • Prices include spot + premium
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mt-8">
          <FilterTab
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All Products
          </FilterTab>
          <FilterTab
            active={activeFilter === 'gold'}
            onClick={() => setActiveFilter('gold')}
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD700] inline-block mr-2"></span>
            Gold
          </FilterTab>
          <FilterTab
            active={activeFilter === 'silver'}
            onClick={() => setActiveFilter('silver')}
          >
            <span className="w-2 h-2 rounded-full bg-[#C0C0C0] inline-block mr-2"></span>
            Silver
          </FilterTab>
        </div>

        {/* Coins Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {filteredCoins.map((coin, index) => (
            <li key={coin.id}>
              <CoinCard coin={coin} spotPrice={prices} delay={index * 100} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}