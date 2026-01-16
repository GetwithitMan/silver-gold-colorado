'use client';

import { useSpotPrices } from '@/hooks/useSpotPrices';
import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SpotPricesPage() {
  const { prices, loading } = useSpotPrices(30000); // Faster refresh on this page

  const goldSilverRatio = (prices.gold.price / prices.silver.price).toFixed(1);
  const lastUpdated = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  const metals = [
    { key: 'gold' as const, name: 'Gold', color: '#FFD700', symbol: 'XAU' },
    { key: 'silver' as const, name: 'Silver', color: '#C0C0C0', symbol: 'XAG' },
    { key: 'platinum' as const, name: 'Platinum', color: '#E5E4E2', symbol: 'XPT' },
    { key: 'palladium' as const, name: 'Palladium', color: '#CED0DD', symbol: 'XPD' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SpotPriceTicker prices={prices} loading={loading} />
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-5 sm:px-10 text-center bg-[radial-gradient(ellipse_at_center_top,rgba(255,215,0,0.08)_0%,transparent_50%)]">
        <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl font-bold mb-4 text-mixed-gradient">
          Live Precious Metals Spot Prices
        </h1>
        <p className="text-[#888] mb-2">
          Real-time prices powered by Gold-API.com
        </p>
        <p className="text-[#666] text-sm">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* Price Cards Grid */}
      <section className="py-10 px-5 sm:px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metals.map((metal) => (
            <PriceCard
              key={metal.key}
              name={metal.name}
              symbol={metal.symbol}
              price={prices[metal.key].price}
              change={prices[metal.key].change}
              changePercent={prices[metal.key].changePercent}
              color={metal.color}
              loading={loading}
            />
          ))}
        </div>
      </section>

      {/* Gold/Silver Ratio */}
      <section className="py-10 px-5 sm:px-10 max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[rgba(255,215,0,0.05)] to-[rgba(192,192,192,0.05)] border border-[rgba(255,215,0,0.2)] rounded-2xl p-8 text-center">
          <h2 className="font-[var(--font-cinzel)] text-2xl mb-4">Gold/Silver Ratio</h2>
          <div className="font-[var(--font-jetbrains)] text-5xl font-bold mb-4">
            <span className="text-[#FFD700]">{goldSilverRatio}</span>
            <span className="text-[#666] text-2xl">:1</span>
          </div>
          <p className="text-[#888] mb-4">
            It takes <span className="text-white font-semibold">{goldSilverRatio} ounces of silver</span> to buy 1 ounce of gold
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <span className="text-[#666]">Historical Average: </span>
              <span className="text-white">60:1</span>
            </div>
            <div>
              <span className="text-[#666]">20-Year Average: </span>
              <span className="text-white">65:1</span>
            </div>
          </div>
          <p className="text-[#666] text-sm mt-4">
            A ratio above 80 historically suggests silver may be undervalued relative to gold
          </p>
        </div>
      </section>

      {/* Price Comparison Table */}
      <section className="py-10 px-5 sm:px-10 max-w-[1200px] mx-auto">
        <h2 className="font-[var(--font-cinzel)] text-2xl mb-6 text-center">Price Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,215,0,0.2)]">
                <th className="text-left py-4 px-4 font-[var(--font-cinzel)] text-[#888] font-normal">Metal</th>
                <th className="text-right py-4 px-4 font-[var(--font-cinzel)] text-[#888] font-normal">Spot Price</th>
                <th className="text-right py-4 px-4 font-[var(--font-cinzel)] text-[#888] font-normal">Change</th>
                <th className="text-right py-4 px-4 font-[var(--font-cinzel)] text-[#888] font-normal">% Change</th>
                <th className="text-right py-4 px-4 font-[var(--font-cinzel)] text-[#888] font-normal">Per Gram</th>
              </tr>
            </thead>
            <tbody>
              {metals.map((metal) => {
                const pricePerGram = prices[metal.key].price / 31.1035;
                const isPositive = prices[metal.key].change >= 0;
                return (
                  <tr key={metal.key} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metal.color }}></div>
                        <span className="font-semibold text-white">{metal.name}</span>
                        <span className="text-[#666] text-sm">({metal.symbol})</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-[var(--font-jetbrains)] text-white">
                      ${prices[metal.key].price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={`text-right py-4 px-4 font-[var(--font-jetbrains)] ${isPositive ? 'price-positive' : 'price-negative'}`}>
                      {isPositive ? '+' : ''}${prices[metal.key].change.toFixed(2)}
                    </td>
                    <td className={`text-right py-4 px-4 font-[var(--font-jetbrains)] ${isPositive ? 'price-positive' : 'price-negative'}`}>
                      {isPositive ? '+' : ''}{prices[metal.key].changePercent.toFixed(2)}%
                    </td>
                    <td className="text-right py-4 px-4 font-[var(--font-jetbrains)] text-[#888]">
                      ${pricePerGram.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Info */}
      <section className="py-16 px-5 sm:px-10 max-w-[1000px] mx-auto">
        <h2 className="font-[var(--font-cinzel)] text-2xl mb-6 text-center">Understanding Spot Prices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="What is Spot Price?"
            content="The spot price is the current market price at which precious metals can be bought or sold for immediate delivery. It's determined by trading on commodities exchanges worldwide."
          />
          <InfoCard
            title="What are Premiums?"
            content="When you buy physical bullion, you pay the spot price plus a 'premium' - an additional amount that covers manufacturing, distribution, and dealer costs."
          />
          <InfoCard
            title="Why Do Prices Fluctuate?"
            content="Precious metals prices are influenced by supply and demand, economic conditions, currency values, interest rates, and geopolitical events."
          />
          <InfoCard
            title="When Do Markets Trade?"
            content="Precious metals trade nearly 24 hours a day, 5 days a week across global exchanges in New York (COMEX), London (LBMA), and Shanghai."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 sm:px-10 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]">
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="font-[var(--font-cinzel)] text-2xl mb-4">Ready to Buy?</h2>
          <p className="text-[#888] mb-8">
            Lock in today&apos;s prices with a quick quote
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/gold"
              className="btn-gold px-8 py-3 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] inline-block text-center"
            >
              Shop Gold
            </Link>
            <Link
              href="/silver"
              className="bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] text-black px-8 py-3 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] inline-block text-center shadow-[0_4px_15px_rgba(192,192,192,0.3)]"
            >
              Shop Silver
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PriceCard({
  name,
  symbol,
  price,
  change,
  changePercent,
  color,
  loading,
}: {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  color: string;
  loading: boolean;
}) {
  const isPositive = change >= 0;

  return (
    <div className="card-dark rounded-2xl p-6 hover:border-[rgba(255,215,0,0.3)] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-[var(--font-cinzel)] text-lg font-semibold" style={{ color }}>
            {name}
          </h3>
          <span className="text-[#666] text-sm">{symbol}</span>
        </div>
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: loading ? '#ffaa00' : '#00ff88', boxShadow: `0 0 10px ${loading ? '#ffaa00' : '#00ff88'}` }}
        ></div>
      </div>

      <div className="font-[var(--font-jetbrains)] text-3xl font-bold text-white mb-2">
        ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>

      <div className={`font-[var(--font-jetbrains)] text-sm ${isPositive ? 'price-positive' : 'price-negative'}`}>
        {isPositive ? '▲' : '▼'} ${Math.abs(change).toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
      </div>

      {/* Mini chart placeholder */}
      <div className="mt-4 h-12 bg-[rgba(255,255,255,0.02)] rounded-lg flex items-end justify-around px-2 gap-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-full rounded-t"
            style={{
              height: `${20 + Math.random() * 60}%`,
              backgroundColor: isPositive ? 'rgba(0,255,136,0.3)' : 'rgba(255,68,68,0.3)',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-3">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{content}</p>
    </div>
  );
}
