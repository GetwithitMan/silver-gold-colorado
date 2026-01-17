'use client';

import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { useSpotPrices } from '@/hooks/useSpotPrices';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import ProductShowcase from '@/components/ProductShowcase';
import TrustSection from '@/components/TrustSection';

export default function Home(): React.ReactNode {
  // Fetch real prices from Gold-API.com, refresh every 60 seconds
  const { prices, loading } = useSpotPrices(60000);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-[var(--font-cormorant)]">
      {/* Ticker */}
      <SpotPriceTicker prices={prices} loading={loading} />

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero prices={prices} />

      {/* Featured Products Section */}
      <ProductShowcase prices={prices} />

      {/* Trust Section */}
      <TrustSection />

      {/* CTA Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
