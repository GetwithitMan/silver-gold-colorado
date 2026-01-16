'use client';

import Link from 'next/link';
import { useSpotPrices } from '@/hooks/useSpotPrices';
import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByMetal } from '@/data/products';

export default function SilverPage() {
  const { prices, loading } = useSpotPrices(60000);
  const spotPrices = { gold: prices.gold.price, silver: prices.silver.price };

  const featuredSilver = getProductsByMetal('silver').filter(p => p.isPopular || p.isFeatured).slice(0, 8);
  const goldSilverRatio = (prices.gold.price / prices.silver.price).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SpotPriceTicker prices={prices} loading={loading} />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-5 sm:px-10 overflow-hidden bg-[radial-gradient(ellipse_at_center_top,rgba(192,192,192,0.12)_0%,transparent_50%),linear-gradient(180deg,#0a0a0a_0%,#111_100%)]">
        {/* Silver particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#C0C0C0] rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-silver-gradient">Stack Silver</span>
          </h1>
          <p className="font-[var(--font-cormorant)] text-lg sm:text-xl text-[#888] mb-8 max-w-[600px] mx-auto">
            Build your silver stack with the lowest premiums in Colorado
          </p>

          {/* Live Silver Price Widget */}
          <div className="inline-flex flex-col sm:flex-row gap-4 bg-[rgba(192,192,192,0.05)] border border-[rgba(192,192,192,0.2)] rounded-2xl p-6 mb-8">
            <div className="text-center px-6">
              <div className="text-[11px] text-[#666] tracking-[2px] mb-1">SILVER SPOT</div>
              <div className="font-[var(--font-jetbrains)] text-3xl font-bold text-[#C0C0C0]">
                ${prices.silver.price.toFixed(2)}
              </div>
              <div className={`text-sm ${prices.silver.change >= 0 ? 'price-positive' : 'price-negative'}`}>
                {prices.silver.change >= 0 ? '+' : ''}${prices.silver.change.toFixed(2)} ({prices.silver.change >= 0 ? '+' : ''}{prices.silver.changePercent.toFixed(2)}%)
              </div>
            </div>
            <div className="hidden sm:block w-px bg-[rgba(192,192,192,0.2)]"></div>
            <div className="text-center px-6">
              <div className="text-[11px] text-[#666] tracking-[2px] mb-1">GOLD/SILVER RATIO</div>
              <div className="font-[var(--font-jetbrains)] text-lg text-white">
                {goldSilverRatio}:1
              </div>
              <div className="text-[#888] text-sm">Historical avg: 60:1</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 px-5 sm:px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            title="SILVER COINS"
            description="Government-minted coins backed by sovereign nations"
            price={`From $${(spotPrices.silver + 5).toFixed(0)}/oz`}
            icon="🦅"
            href="/silver/coins"
            gradient="from-[#E8E8E8] to-[#C0C0C0]"
          />
          <CategoryCard
            title="SILVER BARS"
            description="Best value per ounce for serious stackers"
            price={`From $${(spotPrices.silver + 1).toFixed(0)}/oz`}
            icon="▬"
            href="/silver/bars"
            gradient="from-[#C0C0C0] to-[#A8A8A8]"
          />
          <CategoryCard
            title="SILVER ROUNDS"
            description="Lowest premiums for pure silver content"
            price={`From $${(spotPrices.silver + 1.25).toFixed(0)}/oz`}
            icon="⚪"
            href="/silver/rounds"
            gradient="from-[#D8D8D8] to-[#B8B8B8]"
          />
        </div>
      </section>

      {/* Stacker's Corner */}
      <section className="py-16 px-5 sm:px-10 max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[rgba(192,192,192,0.1)] to-[rgba(192,192,192,0.02)] border border-[rgba(192,192,192,0.2)] rounded-2xl p-8">
          <h2 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-6 text-center text-silver-gradient">
            Stacker&apos;s Corner
          </h2>
          <p className="text-center text-[#888] mb-8">Best value for bulk buyers</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StackerCard
              title="100 oz Silver Bar"
              premium="$1.00/oz over spot"
              savings="Save $4+ per oz vs coins"
              icon="▬"
            />
            <StackerCard
              title="Kilo Silver Bar"
              premium="$1.00/oz over spot"
              savings="32.15 oz of pure silver"
              icon="▬"
            />
            <StackerCard
              title="STM Buffalo Rounds"
              premium="$1.25/oz over spot"
              savings="Lowest premium rounds"
              icon="🦬"
            />
          </div>
        </div>
      </section>

      {/* Featured Silver Products */}
      <section className="py-16 px-5 sm:px-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold mb-3 text-silver-gradient">
            Popular Silver Products
          </h2>
          <p className="text-[#666]">Our most sought-after silver coins, rounds, and bars</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredSilver.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              spotPrices={spotPrices}
              delay={index * 80}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/silver/coins"
            className="inline-block bg-transparent border border-[rgba(192,192,192,0.5)] text-[#C0C0C0] px-8 py-3 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] hover:bg-[rgba(192,192,192,0.1)] transition-all"
          >
            View All Silver Products →
          </Link>
        </div>
      </section>

      {/* Gold/Silver Ratio Explainer */}
      <section className="py-16 px-5 sm:px-10 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] border-t border-[rgba(192,192,192,0.1)]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-4">
            Understanding the Gold/Silver Ratio
          </h2>
          <p className="text-[#888] mb-6 leading-relaxed">
            The gold/silver ratio shows how many ounces of silver it takes to buy one ounce of gold.
            The historical average is around 60:1, but today&apos;s ratio of <span className="text-[#C0C0C0] font-semibold">{goldSilverRatio}:1</span> suggests
            silver may be undervalued relative to gold.
          </p>
          <Link
            href="/resources/gold-silver-ratio"
            className="text-[#C0C0C0] hover:text-white transition-colors"
          >
            Learn more about the Gold/Silver Ratio →
          </Link>
        </div>
      </section>

      {/* Why Silver Section */}
      <section className="py-20 px-5 sm:px-10 border-t border-[rgba(192,192,192,0.1)]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold text-center mb-12 text-silver-gradient">
            Why Stack Silver?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReasonCard
              icon="💵"
              title="Affordable Entry Point"
              description="Start building wealth with much lower capital than gold. Perfect for new investors."
            />
            <ReasonCard
              icon="🏭"
              title="Industrial Demand"
              description="Essential for electronics, solar panels, and medical devices. Demand keeps growing."
            />
            <ReasonCard
              icon="📈"
              title="Upside Potential"
              description="Historically undervalued. Many analysts see significant growth potential."
            />
            <ReasonCard
              icon="🔄"
              title="Easy to Trade"
              description="Divisible into smaller units, making it easy to buy, sell, or barter."
            />
            <ReasonCard
              icon="🛡️"
              title="Same Benefits as Gold"
              description="Inflation hedge, store of value, and portfolio diversification."
            />
            <ReasonCard
              icon="🎁"
              title="Great for Gifts"
              description="Affordable enough to share. Perfect for introducing others to precious metals."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 sm:px-10 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.1)_0%,transparent_70%)]">
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="font-[var(--font-cinzel)] text-3xl mb-4">Ready to Stack Silver?</h2>
          <p className="text-[#888] text-lg mb-8">
            Contact us today for the best prices on silver bullion
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/quote"
              className="bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] text-black px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] hover:translate-y-[-3px] transition-all inline-block text-center shadow-[0_5px_20px_rgba(192,192,192,0.3)]"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-[rgba(192,192,192,0.5)] text-[#C0C0C0] px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] hover:bg-[rgba(192,192,192,0.1)] transition-all inline-block text-center"
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
      <div className="card-dark rounded-2xl p-8 h-full hover:border-[rgba(192,192,192,0.5)] hover:translate-y-[-5px] transition-all duration-300">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-[0_5px_20px_rgba(192,192,192,0.3)]`}>
          <span className="text-[#333]">{icon}</span>
        </div>
        <h3 className="font-[var(--font-cinzel)] text-lg font-semibold text-[#C0C0C0] mb-2">
          {title}
        </h3>
        <p className="text-[#888] text-sm mb-4 leading-relaxed">{description}</p>
        <div className="text-white font-[var(--font-jetbrains)] text-sm">
          {price}
        </div>
        <div className="mt-4 text-[#C0C0C0] text-sm group-hover:translate-x-2 transition-transform">
          Browse →
        </div>
      </div>
    </Link>
  );
}

function StackerCard({ title, premium, savings, icon }: { title: string; premium: string; savings: string; icon: string }) {
  return (
    <div className="bg-[rgba(0,0,0,0.3)] rounded-xl p-6 text-center border border-[rgba(192,192,192,0.1)] hover:border-[rgba(192,192,192,0.3)] transition-colors">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-white mb-2">{title}</h3>
      <div className="font-[var(--font-jetbrains)] text-[#C0C0C0] text-sm mb-1">{premium}</div>
      <div className="text-[#888] text-xs">{savings}</div>
    </div>
  );
}

function ReasonCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(192,192,192,0.2)] transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#C0C0C0] mb-2">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
