import React from 'react';
import TrustItem from './TrustItem';

export default function TrustSection() {
  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] section-padding px-5 sm:px-10 section-divider-strong">
      <div className="container-wide">
        <div className="section-header mb-10">
          <h2 className="font-[var(--font-cinzel)] text-2xl sm:text-3xl font-semibold text-gold-gradient">
            Why Choose Us
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}