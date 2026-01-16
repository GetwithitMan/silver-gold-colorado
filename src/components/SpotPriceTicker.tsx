'use client';

import { useEffect, useRef, useState } from 'react';

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

interface SpotPriceTickerProps {
  prices: Prices;
  loading?: boolean;
}

export default function SpotPriceTicker({ prices, loading }: SpotPriceTickerProps) {
  const [flash, setFlash] = useState<Record<string, string>>({});
  const prevPrices = useRef(prices);

  useEffect(() => {
    const newFlash: Record<string, string> = {};
    Object.keys(prices).forEach((metal) => {
      const key = metal as keyof Prices;
      if (prevPrices.current[key]?.price !== prices[key]?.price) {
        newFlash[metal] = prices[key].price > prevPrices.current[key]?.price ? 'up' : 'down';
      }
    });
    setFlash(newFlash);
    prevPrices.current = prices;

    const timeout = setTimeout(() => setFlash({}), 500);
    return () => clearTimeout(timeout);
  }, [prices]);

  const formatPrice = (price: number) => price.toFixed(2);
  const formatChange = (change: number, percent: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}$${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;
  };

  const metals = [
    { key: 'gold' as const, label: 'GOLD', color: '#FFD700' },
    { key: 'silver' as const, label: 'SILVER', color: '#C0C0C0' },
    { key: 'platinum' as const, label: 'PLATINUM', color: '#E5E4E2' },
    { key: 'palladium' as const, label: 'PALLADIUM', color: '#CED0DD' },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-b border-[rgba(255,215,0,0.3)] flex items-center py-3 overflow-hidden relative">
      {/* Live Spot Label */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] px-5 py-2 font-[var(--font-cinzel)] text-[11px] font-bold tracking-[2px] text-[#FFD700] flex items-center gap-2 border-r border-[rgba(255,215,0,0.3)] shrink-0">
        <span className={`w-2 h-2 rounded-full shadow-[0_0_10px_#00ff00] ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-[#00ff00] animate-pulse-dot'}`}></span>
        {loading ? 'LOADING' : 'LIVE SPOT'}
      </div>

      {/* Scrolling Ticker */}
      <div className="flex gap-10 px-8 animate-scroll">
        {/* Duplicate for seamless scroll */}
        {[...metals, ...metals].map(({ key, label, color }, index) => (
          <div
            key={`${key}-${index}`}
            className={`flex items-center gap-3 whitespace-nowrap transition-all duration-300 px-2 rounded ${
              flash[key] === 'up' ? 'animate-[flashGreen_0.5s_ease]' :
              flash[key] === 'down' ? 'animate-[flashRed_0.5s_ease]' : ''
            }`}
          >
            <span
              className="font-[var(--font-cinzel)] text-xs font-bold tracking-[1px]"
              style={{ color, textShadow: `0 0 10px ${color}` }}
            >
              {label}
            </span>
            <span className="font-[var(--font-jetbrains)] text-sm font-semibold text-white">
              ${formatPrice(prices[key].price)}
            </span>
            <span
              className={`font-[var(--font-jetbrains)] text-[11px] ${
                prices[key].change >= 0 ? 'price-positive' : 'price-negative'
              }`}
            >
              {formatChange(prices[key].change, prices[key].changePercent)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
