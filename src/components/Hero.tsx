'use client';

import MountainBackground from './MountainBackground';

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

interface HeroProps {
  prices: Prices;
}

export default function Hero({ prices }: HeroProps) {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-5 sm:px-10 py-20 overflow-hidden bg-[radial-gradient(ellipse_at_center_top,rgba(255,215,0,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_center_bottom,rgba(192,192,192,0.05)_0%,transparent_50%),linear-gradient(180deg,#0a0a0a_0%,#111_100%)]">
      <MountainBackground />

      <div className="text-center relative z-10">
        {/* Badge */}
        <div className="inline-block bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] px-5 py-2 rounded-full font-[var(--font-cinzel)] text-[11px] tracking-[3px] text-[#FFD700] mb-6 animate-fadeIn">
          COLORADO&apos;S TRUSTED BULLION DEALER
        </div>

        {/* Title */}
        <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <span className="text-gold-gradient">Gold</span> &{' '}
          <span className="text-silver-gradient">Silver</span>
          <br />
          at Spot + Low Premiums
        </h1>

        {/* Subtitle */}
        <p className="font-[var(--font-cormorant)] text-lg sm:text-xl text-[#888] mb-10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          Simple. Transparent. Delivered to your door.
        </p>

        {/* Live Prices */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 mb-10 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <PriceBox
            label="GOLD SPOT"
            value={prices.gold.price}
            type="gold"
          />
          <PriceBox
            label="SILVER SPOT"
            value={prices.silver.price}
            type="silver"
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={scrollToProducts}
            className="btn-gold px-8 sm:px-10 py-4 font-[var(--font-cinzel)] text-sm font-bold tracking-[2px] rounded-full transition-all"
          >
            Browse Collection
          </button>
          <button
            onClick={scrollToContact}
            className="bg-transparent border border-[rgba(255,255,255,0.3)] text-white px-8 sm:px-10 py-4 font-[var(--font-cinzel)] text-sm font-semibold tracking-[2px] rounded-full hover:border-[#FFD700] hover:text-[#FFD700] transition-all"
          >
            Get a Quote
          </button>
        </div>
      </div>

      {/* Floating Decorations */}
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute text-[80px] opacity-15 animate-float top-[15%] left-[10%]">
          🪙
        </div>
        <div className="absolute text-[80px] opacity-15 animate-float bottom-[20%] right-[10%]" style={{ animationDelay: '3s' }}>
          🥈
        </div>
      </div>
    </section>
  );
}

function PriceBox({ label, value, type }: { label: string; value: number; type: 'gold' | 'silver' }) {
  const isGold = type === 'gold';
  const borderColor = isGold ? 'rgba(255,215,0,0.3)' : 'rgba(192,192,192,0.3)';
  const textColor = isGold ? '#FFD700' : '#C0C0C0';
  const shadowColor = isGold ? 'rgba(255,215,0,0.5)' : 'rgba(192,192,192,0.5)';

  return (
    <div
      className="flex flex-col items-center px-8 sm:px-10 py-5 bg-[rgba(255,255,255,0.03)] rounded-xl backdrop-blur-[10px]"
      style={{ border: `1px solid ${borderColor}` }}
    >
      <span className="font-[var(--font-cinzel)] text-[11px] tracking-[2px] text-[#666] mb-1">
        {label}
      </span>
      <span
        className="font-[var(--font-jetbrains)] text-2xl sm:text-3xl font-bold"
        style={{ color: textColor, textShadow: `0 0 30px ${shadowColor}` }}
      >
        ${value.toFixed(2)}
      </span>
    </div>
  );
}
