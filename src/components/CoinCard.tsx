'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface Coin {
  id: number;
  name: string;
  type: 'gold' | 'silver';
  weight: string;
  purity: string;
  premium: number;
  country: string;
  year: string;
  image: string;
  description: string;
  popular?: boolean;
}

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

interface CoinCardProps {
  coin: Coin;
  spotPrice: Prices;
  delay: number;
}

export default function CoinCard({ coin, spotPrice, delay }: CoinCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const weightMultiplier = parseFloat(coin.weight) || 1;
  const totalPrice = coin.type === 'gold'
    ? spotPrice.gold.price * weightMultiplier + coin.premium
    : spotPrice.silver.price * weightMultiplier + coin.premium;

  const metalColor = coin.type === 'gold' ? '#FFD700' : '#C0C0C0';
  const metalGradient = coin.type === 'gold'
    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
    : 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #E8E8E8 100%)';

  return (
    <div
      className="opacity-0 animate-fadeInUp perspective-[1000px]"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className={`relative w-full h-[420px] transition-transform duration-[600ms] cursor-pointer preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full rounded-2xl p-5 flex flex-col card-dark"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {coin.popular && (
            <div className="absolute top-4 right-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-[1px] z-10">
              ★ POPULAR
            </div>
          )}

          {/* Coin Image Container */}
          <div className="relative flex justify-center items-center h-[140px] my-4">
            <div
              className="absolute w-[100px] h-[100px] rounded-full blur-[30px] opacity-40 animate-glow"
              style={{ background: metalGradient }}
            ></div>
            <div
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center relative transition-transform duration-300 hover:scale-105 hover:rotate-[5deg]"
              style={{
                background: metalGradient,
                boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
              }}
            >
              {coin.image.startsWith('/') ? (
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={60}
                  height={60}
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                />
              ) : (
                <span className="text-[40px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{coin.image}</span>
              )}
            </div>
            <div
              className="absolute w-[100px] h-[100px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)' }}
            ></div>
          </div>

          {/* Coin Info */}
          <div className="text-center mb-auto">
            <div className="text-[11px] text-[#666] tracking-[2px] uppercase mb-1.5">
              {coin.country} • {coin.year}
            </div>
            <h3 className="font-[var(--font-cinzel)] text-base font-semibold text-white leading-tight mb-2">
              {coin.name}
            </h3>
            <div className="flex justify-center items-center gap-2 text-xs text-[#888]">
              <span>{coin.weight}</span>
              <span className="text-[#444]">|</span>
              <span>{coin.purity}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-[rgba(255,215,0,0.15)] pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-[#666] tracking-[1px]">SPOT + PREMIUM</span>
              <span className="font-[var(--font-jetbrains)] text-xs price-positive">
                +${coin.premium.toFixed(2)}
              </span>
            </div>
            <div
              className="font-[var(--font-jetbrains)] text-[28px] font-bold text-center mb-3"
              style={{ color: metalColor, textShadow: `0 0 20px ${metalColor}` }}
            >
              ${totalPrice.toFixed(2)}
            </div>
            <button
              className="w-full py-3 rounded-lg font-[var(--font-cinzel)] text-xs font-bold tracking-[2px] text-black hover:translate-y-[-2px] transition-all"
              style={{
                background: metalGradient,
                boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle inquiry
              }}
            >
              INQUIRE NOW
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full rounded-2xl p-5 flex flex-col justify-center items-center text-center card-dark"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="font-[var(--font-cinzel)] text-[#FFD700] text-lg mb-3">About This Coin</h4>
          <p className="text-[#999] text-sm leading-relaxed mb-5">{coin.description}</p>
          <div className="w-full p-4 bg-[rgba(255,215,0,0.05)] rounded-lg">
            <DetailRow label="Metal" value={coin.type.toUpperCase()} />
            <DetailRow label="Weight" value={coin.weight} />
            <DetailRow label="Purity" value={coin.purity} />
            <DetailRow label="Premium" value={`$${coin.premium.toFixed(2)}`} isLast />
          </div>
          <p className="text-[11px] text-[#555] mt-4">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) {
  return (
    <div className={`flex justify-between py-2 text-[13px] ${!isLast ? 'border-b border-[rgba(255,215,0,0.1)]' : ''}`}>
      <span className="text-[#666]">{label}:</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
