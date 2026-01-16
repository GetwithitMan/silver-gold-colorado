'use client';

import { useState, useEffect } from 'react';
import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CoinCard, { Coin } from '@/components/CoinCard';
import Footer from '@/components/Footer';
import { useSpotPrices } from '@/hooks/useSpotPrices';

// Coin data with premiums over spot
const coins: Coin[] = [
  {
    id: 1,
    name: 'American Silver Eagle',
    type: 'silver',
    weight: '1 oz',
    purity: '.999 Fine Silver',
    premium: 4.99,
    country: 'USA',
    year: '2025',
    image: '🦅',
    description: 'The official silver bullion coin of the United States, featuring Lady Liberty and the American Bald Eagle.',
    popular: true,
  },
  {
    id: 2,
    name: 'American Gold Eagle',
    type: 'gold',
    weight: '1 oz',
    purity: '.9167 Fine Gold',
    premium: 89.99,
    country: 'USA',
    year: '2025',
    image: '🦅',
    description: "America's premier gold bullion coin, backed by the U.S. government for weight and purity.",
    popular: true,
  },
  {
    id: 3,
    name: 'Canadian Maple Leaf',
    type: 'silver',
    weight: '1 oz',
    purity: '.9999 Fine Silver',
    premium: 3.99,
    country: 'Canada',
    year: '2025',
    image: '🍁',
    description: 'One of the purest silver coins in the world with advanced security features.',
  },
  {
    id: 4,
    name: 'Canadian Gold Maple',
    type: 'gold',
    weight: '1 oz',
    purity: '.9999 Fine Gold',
    premium: 79.99,
    country: 'Canada',
    year: '2025',
    image: '🍁',
    description: "The world's purest gold bullion coin, featuring the iconic maple leaf design.",
  },
  {
    id: 5,
    name: 'Silver Buffalo Round',
    type: 'silver',
    weight: '1 oz',
    purity: '.999 Fine Silver',
    premium: 2.49,
    country: 'USA',
    year: '2025',
    image: '🦬',
    description: 'Classic American design at the lowest premiums - perfect for stacking.',
  },
  {
    id: 6,
    name: 'Gold Buffalo',
    type: 'gold',
    weight: '1 oz',
    purity: '.9999 Fine Gold',
    premium: 99.99,
    country: 'USA',
    year: '2025',
    image: '🦬',
    description: 'First .9999 pure gold coin from the U.S. Mint, featuring the iconic Buffalo design.',
    popular: true,
  },
  {
    id: 7,
    name: 'Austrian Philharmonic',
    type: 'silver',
    weight: '1 oz',
    purity: '.999 Fine Silver',
    premium: 3.49,
    country: 'Austria',
    year: '2025',
    image: '🎵',
    description: "Europe's most popular silver bullion coin, honoring the Vienna Philharmonic Orchestra.",
  },
  {
    id: 8,
    name: 'South African Krugerrand',
    type: 'gold',
    weight: '1 oz',
    purity: '.9167 Fine Gold',
    premium: 69.99,
    country: 'South Africa',
    year: '2025',
    image: '🦌',
    description: 'The original gold bullion coin since 1967, highly recognized worldwide.',
  },
  {
    id: 9,
    name: '10 oz Silver Bar',
    type: 'silver',
    weight: '10 oz',
    purity: '.999 Fine Silver',
    premium: 19.99,
    country: 'Various',
    year: '2025',
    image: '▬',
    description: 'Perfect for stacking and storage, from trusted refiners worldwide.',
  },
  {
    id: 10,
    name: '1 oz Gold Bar',
    type: 'gold',
    weight: '1 oz',
    purity: '.9999 Fine Gold',
    premium: 49.99,
    country: 'Various',
    year: '2025',
    image: '▬',
    description: 'PAMP, Credit Suisse, or equivalent - certified and assayed.',
  },
];

export default function Home() {
  // Fetch real prices from Gold-API.com, refresh every 60 seconds
  const { prices, loading } = useSpotPrices(60000);
  const [activeFilter, setActiveFilter] = useState<'all' | 'gold' | 'silver'>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCoins = activeFilter === 'all' ? coins : coins.filter((c) => c.type === activeFilter);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-[var(--font-cormorant)]">
      {/* Ticker */}
      <SpotPriceTicker prices={prices} loading={loading} />

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero prices={prices} />

      {/* Featured Products Section */}
      <section id="products" className="py-20 px-5 sm:px-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl font-semibold mb-3 text-mixed-gradient">
            Today&apos;s Prices
          </h2>
          <p className="text-[#666] text-base mb-8">
            Live spot prices from Gold-API.com • Prices include spot + premium
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-4">
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
        </div>

        {/* Coins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoins.map((coin, index) => (
            <CoinCard key={coin.id} coin={coin} spotPrice={prices} delay={index * 100} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] py-20 px-5 sm:px-10 border-t border-b border-[rgba(255,215,0,0.1)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustItem icon="🏔️" title="Colorado Based">
            Proudly serving the Rocky Mountain region with fast, secure delivery
          </TrustItem>
          <TrustItem icon="💰" title="Best Prices">
            Lowest premiums over spot with no hidden fees or markups
          </TrustItem>
          <TrustItem icon="🔒" title="Secure Shipping">
            Fully insured, discreet packaging with signature required
          </TrustItem>
          <TrustItem icon="⭐" title="Expert Service">
            Personalized guidance from experienced precious metals specialists
          </TrustItem>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-5 sm:px-10 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]">
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl mb-4">
            Ready to Start Your Stack?
          </h2>
          <p className="text-[#888] text-lg mb-8">
            Contact us today for a personalized quote on any gold or silver products
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+19705551234"
              className="btn-gold px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] transition-all inline-flex items-center justify-center gap-2"
            >
              📞 Call (970) 555-GOLD
            </a>
            <a
              href="mailto:info@silverandgoldcolorado.com"
              className="bg-transparent border border-[rgba(192,192,192,0.5)] text-[#C0C0C0] px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] hover:border-[#C0C0C0] hover:text-white hover:translate-y-[-3px] transition-all inline-flex items-center justify-center gap-2"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full text-black text-xl font-bold shadow-[0_5px_20px_rgba(255,215,0,0.4)] hover:translate-y-[-5px] transition-all z-50 animate-fadeIn"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-[var(--font-cinzel)] text-[13px] transition-all flex items-center ${
        active
          ? 'bg-gradient-to-br from-[rgba(255,215,0,0.2)] to-[rgba(192,192,192,0.2)] border border-[rgba(255,215,0,0.5)] text-white'
          : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,215,0,0.3)] hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function TrustItem({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center p-8 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,215,0,0.2)] hover:translate-y-[-5px] transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-3">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{children}</p>
    </div>
  );
}
