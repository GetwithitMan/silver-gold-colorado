'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSpotPrices } from '@/hooks/useSpotPrices';
import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SellProductCard from '@/components/SellProductCard';
import BuySellToggle from '@/components/BuySellToggle';
import { getProductsByMetal } from '@/data/products';
import { getSellProductsByMetal } from '@/data/sellPrices';

export default function GoldPage() {
  const { prices, loading } = useSpotPrices(60000);
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const spotPrices = { gold: prices.gold.price, silver: prices.silver.price };
  const spotPricesWithPlatinum = { ...spotPrices, platinum: prices.platinum.price };

  const featuredGold = getProductsByMetal('gold').filter(p => p.isPopular || p.isFeatured).slice(0, 8);
  const sellGoldProducts = getSellProductsByMetal('gold').filter(p => p.isPopular).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SpotPriceTicker prices={prices} loading={loading} />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-5 sm:px-10 overflow-hidden bg-[radial-gradient(ellipse_at_center_top,rgba(255,215,0,0.12)_0%,transparent_50%),linear-gradient(180deg,#0a0a0a_0%,#111_100%)]">
        {/* Gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#FFD700] rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gold-gradient">Invest in Gold</span>
          </h1>
          <p className="font-[var(--font-cormorant)] text-lg sm:text-xl text-[#888] mb-8 max-w-[600px] mx-auto">
            America&apos;s most trusted gold coins and bars at competitive premiums
          </p>

          {/* Live Gold Price Widget */}
          <div className="inline-flex flex-col sm:flex-row gap-4 bg-[rgba(255,215,0,0.05)] border border-[rgba(255,215,0,0.2)] rounded-2xl p-6 mb-8">
            <div className="text-center px-6">
              <div className="text-[11px] text-[#666] tracking-[2px] mb-1">GOLD SPOT</div>
              <div className="font-[var(--font-jetbrains)] text-3xl font-bold text-[#FFD700]">
                ${prices.gold.price.toFixed(2)}
              </div>
              <div className={`text-sm ${prices.gold.change >= 0 ? 'price-positive' : 'price-negative'}`}>
                {prices.gold.change >= 0 ? '+' : ''}${prices.gold.change.toFixed(2)} ({prices.gold.change >= 0 ? '+' : ''}{prices.gold.changePercent.toFixed(2)}%)
              </div>
            </div>
            <div className="hidden sm:block w-px bg-[rgba(255,215,0,0.2)]"></div>
            <div className="text-center px-6">
              <div className="text-[11px] text-[#666] tracking-[2px] mb-1">24H RANGE</div>
              <div className="font-[var(--font-jetbrains)] text-lg text-white">
                ${(prices.gold.price - 20).toFixed(0)} - ${(prices.gold.price + 15).toFixed(0)}
              </div>
              <Link href="/spot-prices" className="text-[#FFD700] text-sm hover:underline">
                View Full Charts →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="section-padding px-5 sm:px-10 section-divider">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            title="GOLD COINS"
            description="Government-minted coins from the US, Canada, South Africa, and more"
            price={`From $${(spotPrices.gold + 3).toFixed(0)}/oz`}
            icon="🦅"
            href="/gold/coins"
            gradient="from-[#FFD700] to-[#FFA500]"
          />
          <CategoryCard
            title="GOLD BARS"
            description="LBMA-approved bars from PAMP, Valcambi, and other trusted refiners"
            price={`From $${(spotPrices.gold + 10).toFixed(0)}/oz`}
            icon="▬"
            href="/gold/bars"
            gradient="from-[#FFA500] to-[#FF8C00]"
          />
          <CategoryCard
            title="FRACTIONAL GOLD"
            description="1/2 oz, 1/4 oz, and 1/10 oz gold for accessible investing"
            price="From $150"
            icon="✨"
            href="/gold/fractional"
            gradient="from-[#FFD700] to-[#FFE55C]"
          />
          </div>
        </div>
      </section>

      {/* Featured Gold Products with Buy/Sell Toggle */}
      <section className="section-padding px-5 sm:px-10">
        <div className="container-full">
          <div className="section-header mb-6">
            <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold mb-3 text-gold-gradient">
              {mode === 'buy' ? 'Popular Gold Products' : 'We Buy Your Gold'}
            </h2>
            <p className="text-[#666] mb-6">
              {mode === 'buy'
                ? 'Our most sought-after gold coins and bars'
                : 'Get competitive prices when you sell your gold to us'}
            </p>
            <BuySellToggle mode={mode} onChange={setMode} />
          </div>

          {mode === 'buy' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredGold.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  spotPrices={spotPrices}
                  delay={index * 80}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sellGoldProducts.map((product, index) => (
                <SellProductCard
                  key={product.id}
                  product={product}
                  spotPrices={spotPricesWithPlatinum}
                  delay={index * 80}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            {mode === 'buy' ? (
              <Link
                href="/gold/coins"
                className="inline-block bg-transparent border border-[rgba(255,215,0,0.5)] text-[#FFD700] px-8 py-3 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] hover:bg-[rgba(255,215,0,0.1)] transition-all"
              >
                View All Gold Products →
              </Link>
            ) : (
              <Link
                href="/quote"
                className="inline-block bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0] text-black px-8 py-3 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] hover:translate-y-[-2px] transition-all"
              >
                Get a Sell Quote →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Why Buy Gold Section */}
      <section className="section-padding px-5 sm:px-10 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] section-divider-strong">
        <div className="container-wide">
          <div className="section-header mb-12">
            <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold text-gold-gradient">
              Why Invest in Gold?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReasonCard
              icon="🛡️"
              title="Hedge Against Inflation"
              description="Gold has maintained purchasing power for thousands of years, protecting wealth during economic uncertainty."
            />
            <ReasonCard
              icon="📈"
              title="Store of Value"
              description="Precious metals preserve wealth across generations, unaffected by currency devaluation."
            />
            <ReasonCard
              icon="🌍"
              title="Globally Recognized"
              description="Gold is liquid and accepted worldwide, making it easy to buy, sell, or trade anywhere."
            />
            <ReasonCard
              icon="💰"
              title="Portfolio Diversification"
              description="Gold typically moves independently of stocks and bonds, reducing overall portfolio risk."
            />
            <ReasonCard
              icon="🔒"
              title="Tangible Asset"
              description="Physical ownership you can hold in your hands - no counterparty risk."
            />
            <ReasonCard
              icon="📊"
              title="Limited Supply"
              description="Gold is finite. Unlike fiat currency, it cannot be printed or created at will."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding px-5 sm:px-10 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)] section-divider">
        <div className="text-center container-narrow mx-auto">
          <h2 className="font-[var(--font-cinzel)] text-3xl mb-4">Ready to Buy Gold?</h2>
          <p className="text-[#888] text-lg mb-8">
            Contact us today for a personalized quote on any gold products
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/quote"
              className="btn-gold px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] transition-all inline-block text-center"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-[rgba(255,215,0,0.5)] text-[#FFD700] px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] hover:bg-[rgba(255,215,0,0.1)] transition-all inline-block text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CategoryCard({
  title,
  description,
  price,
  icon,
  href,
  gradient,
}: {
  title: string;
  description: string;
  price: string;
  icon: string;
  href: string;
  gradient: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="card-dark rounded-2xl p-8 h-full hover:border-[rgba(255,215,0,0.5)] hover:translate-y-[-5px] transition-all duration-300">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-[0_5px_20px_rgba(255,215,0,0.3)]`}>
          {icon}
        </div>
        <h3 className="font-[var(--font-cinzel)] text-lg font-semibold text-[#FFD700] mb-2">
          {title}
        </h3>
        <p className="text-[#888] text-sm mb-4 leading-relaxed">{description}</p>
        <div className="text-white font-[var(--font-jetbrains)] text-sm">
          {price}
        </div>
        <div className="mt-4 text-[#FFD700] text-sm group-hover:translate-x-2 transition-transform">
          Browse →
        </div>
      </div>
    </Link>
  );
}

function ReasonCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,215,0,0.2)] transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-2">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
