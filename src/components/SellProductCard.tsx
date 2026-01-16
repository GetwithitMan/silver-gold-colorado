'use client';

import { SellProduct, calculateSellPrice, formatSellPremium } from '@/data/sellPrices';

interface SellProductCardProps {
  product: SellProduct;
  spotPrices: { gold: number; silver: number; platinum: number };
  delay?: number;
}

export default function SellProductCard({ product, spotPrices, delay = 0 }: SellProductCardProps) {
  const wePay = calculateSellPrice(product, spotPrices);
  const premium = formatSellPremium(product);

  const isGold = product.metalType === 'gold';
  const isPlatinum = product.metalType === 'platinum';

  let metalColor = '#C0C0C0'; // silver default
  let metalGradient = 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #E8E8E8 100%)';

  if (isGold) {
    metalColor = '#FFD700';
    metalGradient = 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)';
  } else if (isPlatinum) {
    metalColor = '#E5E4E2';
    metalGradient = 'linear-gradient(135deg, #E5E4E2 0%, #D4D4D2 50%, #E5E4E2 100%)';
  }

  return (
    <div
      className="opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative h-full rounded-2xl p-5 flex flex-col bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[rgba(192,192,192,0.2)] hover:border-[rgba(192,192,192,0.5)] hover:translate-y-[-5px] transition-all duration-300 group">
        {/* Sell Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0] text-black text-[9px] font-bold px-2 py-1 rounded-full tracking-[0.5px] z-10">
          WE BUY
        </div>

        {/* Product Image */}
        <div className="relative flex justify-center items-center h-[100px] my-3">
          <div
            className="absolute w-[70px] h-[70px] rounded-full blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity"
            style={{ background: metalGradient }}
          ></div>
          <div
            className="w-[70px] h-[70px] rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110"
            style={{
              background: metalGradient,
              boxShadow: '0 6px 20px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
            }}
          >
            <span className="text-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{product.image}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mb-auto">
          <div className="text-[10px] text-[#666] tracking-[1.5px] uppercase mb-1">
            {product.country} • {product.year}
          </div>
          <h3 className="font-[var(--font-cinzel)] text-sm font-semibold text-white leading-tight mb-1">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="text-[11px] text-[#888] mb-2">{product.subtitle}</p>
          )}
          <div className="flex justify-center items-center gap-2 text-[11px] text-[#666]">
            <span>{product.weight} {product.weightUnit}</span>
            <span className="text-[#444]">|</span>
            <span>{product.purity}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-[rgba(192,192,192,0.15)] pt-3 mt-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] text-[#666] tracking-[1px]">WE PAY (SPOT {premium})</span>
          </div>
          <div
            className="font-[var(--font-jetbrains)] text-xl font-bold text-center mb-2"
            style={{ color: metalColor, textShadow: `0 0 15px ${metalColor}` }}
          >
            ${wePay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <button
            className="w-full py-2 rounded-lg font-[var(--font-cinzel)] text-[10px] font-bold tracking-[1px] text-black hover:translate-y-[-2px] transition-all bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0]"
            style={{
              boxShadow: '0 3px 12px rgba(192,192,192,0.25)',
            }}
          >
            GET A QUOTE
          </button>
        </div>
      </div>
    </div>
  );
}
