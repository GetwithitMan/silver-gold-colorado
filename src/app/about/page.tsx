import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Server component - prices will be fetched client-side via the ticker
export default function AboutPage() {
  // Default prices for SSR (will be updated client-side)
  const defaultPrices = {
    gold: { price: 4613.60, change: 0, changePercent: 0 },
    silver: { price: 91.06, change: 0, changePercent: 0 },
    platinum: { price: 2347.00, change: 0, changePercent: 0 },
    palladium: { price: 1776.00, change: 0, changePercent: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SpotPriceTicker prices={defaultPrices} loading={false} />
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-5 sm:px-10 text-center bg-[radial-gradient(ellipse_at_center_top,rgba(255,215,0,0.08)_0%,transparent_50%)]">
        <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl font-bold mb-4 text-mixed-gradient">
          About Silver & Gold Colorado
        </h1>
        <p className="font-[var(--font-cormorant)] text-xl text-[#888]">
          Colorado&apos;s Trusted Precious Metals Dealer
        </p>
      </section>

      {/* Our Story */}
      <section className="section-padding px-5 sm:px-10 section-divider">
        <div className="container-medium">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold mb-6 text-gold-gradient">
              Our Story
            </h2>
            <div className="space-y-4 text-[#999] leading-relaxed">
              <p>
                Founded in the heart of Colorado, Silver & Gold Colorado was built on a simple principle:
                make precious metals accessible, affordable, and straightforward for everyone.
              </p>
              <p>
                We believe that buying gold and silver shouldn&apos;t be complicated. No confusing pricing,
                no hidden fees, no high-pressure sales tactics. Just honest pricing at the lowest
                premiums we can offer.
              </p>
              <p>
                Whether you&apos;re a first-time buyer looking to purchase your first silver coin or an
                experienced investor building a substantial portfolio, we&apos;re here to help you navigate
                the world of precious metals with confidence.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[rgba(255,215,0,0.2)] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏔️</div>
                <div className="font-[var(--font-cinzel)] text-[#FFD700] tracking-[2px]">COLORADO</div>
                <div className="text-[#666] text-sm">Est. 2024</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Why Colorado */}
      <section className="section-padding px-5 sm:px-10 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] section-divider-strong">
        <div className="container-medium">
          <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold mb-6 text-center">
            Why Colorado?
          </h2>
          <div className="bg-[rgba(255,215,0,0.02)] border border-[rgba(255,215,0,0.1)] rounded-2xl p-8 mb-8">
            <p className="text-[#999] text-center leading-relaxed max-w-[700px] mx-auto">
              Colorado has a rich mining heritage dating back to the 1859 Pike&apos;s Peak Gold Rush.
              Today, we&apos;re proud to continue that tradition by helping Coloradans—and customers
              nationwide—invest in precious metals.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-4">We Proudly Serve</h3>
            <div className="flex flex-wrap justify-center gap-4 text-[#888]">
              <span className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full">Denver Metro Area</span>
              <span className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full">Colorado Springs</span>
              <span className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full">Fort Collins</span>
              <span className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full">Boulder</span>
              <span className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full">Grand Junction</span>
              <span className="px-4 py-2 bg-[rgba(255,255,255,0.02)] rounded-full text-[#FFD700]">Nationwide Shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="section-padding px-5 sm:px-10">
        <div className="container-wide">
          <div className="section-header mb-12">
            <h2 className="font-[var(--font-cinzel)] text-3xl font-semibold text-gold-gradient">
              Our Promise
            </h2>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PromiseCard
            icon="💰"
            title="Transparent Pricing"
            description="What you see is what you pay. Spot + premium. Period. No hidden fees, no surprises."
          />
          <PromiseCard
            icon="📉"
            title="Competitive Premiums"
            description="We shop the market to bring you the best deals. Some of the lowest premiums in Colorado."
          />
          <PromiseCard
            icon="👤"
            title="Personal Service"
            description="Real people who answer your calls and emails. We're here to help, not to sell."
          />
          <PromiseCard
            icon="🔒"
            title="Secure Shipping"
            description="Fully insured and discreet packaging. Signature required for delivery."
          />
          <PromiseCard
            icon="🚀"
            title="Fast Delivery"
            description="Orders ship within 1-3 business days. We don't sit on your money."
          />
          <PromiseCard
            icon="🤝"
            title="No Pressure Sales"
            description="Take your time. Ask questions. We're here when you're ready."
          />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-5 sm:px-10 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)] section-divider">
        <div className="text-center container-narrow mx-auto">
          <h2 className="font-[var(--font-cinzel)] text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-[#888] text-lg mb-8">
            Browse our collection or reach out with any questions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/gold"
              className="btn-gold px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] transition-all inline-block text-center"
            >
              Browse Products
            </Link>
            <Link
              href="/quote"
              className="bg-transparent border border-[rgba(255,215,0,0.5)] text-[#FFD700] px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] hover:bg-[rgba(255,215,0,0.1)] transition-all inline-block text-center"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-[rgba(255,255,255,0.3)] text-white px-8 py-4 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] hover:border-[#FFD700] hover:text-[#FFD700] transition-all inline-block text-center"
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

function PromiseCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card-dark rounded-2xl p-8 text-center hover:border-[rgba(255,215,0,0.3)] transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-3">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
