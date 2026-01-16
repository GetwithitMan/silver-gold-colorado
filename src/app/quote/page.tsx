'use client';

import { useState } from 'react';
import { useSpotPrices } from '@/hooks/useSpotPrices';
import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QuotePage() {
  const { prices, loading } = useSpotPrices(60000);
  const [formState, setFormState] = useState({
    metalType: '',
    productTypes: [] as string[],
    budget: '',
    specificProducts: '',
    name: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormState(prev => ({
        ...prev,
        productTypes: checkbox.checked
          ? [...prev.productTypes, value]
          : prev.productTypes.filter(t => t !== value),
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SpotPriceTicker prices={prices} loading={loading} />
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-5 sm:px-10 text-center bg-[radial-gradient(ellipse_at_center_top,rgba(255,215,0,0.08)_0%,transparent_50%)]">
        <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl font-bold mb-4 text-gold-gradient">
          Get a Personalized Quote
        </h1>
        <p className="font-[var(--font-cormorant)] text-xl text-[#888] max-w-[600px] mx-auto">
          Tell us what you&apos;re looking for and we&apos;ll provide a custom quote with our best available pricing
        </p>
      </section>

      {/* Quote Form */}
      <section className="py-10 px-5 sm:px-10 max-w-[800px] mx-auto">
        {isSubmitted ? (
          <div className="card-dark rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="font-[var(--font-cinzel)] text-3xl text-[#FFD700] mb-4">Quote Request Received!</h2>
            <p className="text-[#888] text-lg mb-8 max-w-[400px] mx-auto">
              Thank you for your interest. We&apos;ll prepare a personalized quote and get back to you within 2-4 hours during business hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormState({
                  metalType: '',
                  productTypes: [],
                  budget: '',
                  specificProducts: '',
                  name: '',
                  email: '',
                  phone: '',
                  contactMethod: 'email',
                  notes: '',
                });
              }}
              className="text-[#FFD700] hover:underline"
            >
              Request another quote
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-dark rounded-2xl p-8">
            {/* What are you interested in? */}
            <div className="mb-10">
              <h2 className="font-[var(--font-cinzel)] text-xl font-semibold mb-6 text-[#FFD700]">
                What are you interested in?
              </h2>

              {/* Metal Type */}
              <div className="mb-6">
                <label className="block text-[#888] text-sm mb-3">Metal Type</label>
                <div className="flex flex-wrap gap-3">
                  {['Gold', 'Silver', 'Both', 'Other'].map((type) => (
                    <label
                      key={type}
                      className={`px-5 py-2.5 rounded-full border cursor-pointer transition-all ${
                        formState.metalType === type.toLowerCase()
                          ? 'bg-gradient-to-r from-[rgba(255,215,0,0.2)] to-[rgba(192,192,192,0.2)] border-[#FFD700] text-white'
                          : 'border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,215,0,0.3)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="metalType"
                        value={type.toLowerCase()}
                        checked={formState.metalType === type.toLowerCase()}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Type */}
              <div className="mb-6">
                <label className="block text-[#888] text-sm mb-3">Product Type (select all that apply)</label>
                <div className="flex flex-wrap gap-3">
                  {['Coins', 'Bars', 'Rounds', 'Not Sure'].map((type) => (
                    <label
                      key={type}
                      className={`px-5 py-2.5 rounded-full border cursor-pointer transition-all ${
                        formState.productTypes.includes(type.toLowerCase())
                          ? 'bg-gradient-to-r from-[rgba(255,215,0,0.2)] to-[rgba(192,192,192,0.2)] border-[#FFD700] text-white'
                          : 'border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,215,0,0.3)]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="productTypes"
                        value={type.toLowerCase()}
                        checked={formState.productTypes.includes(type.toLowerCase())}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="block text-[#888] text-sm mb-3">Approximate Budget</label>
                <select
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                >
                  <option value="">Select a range</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-25000">$10,000 - $25,000</option>
                  <option value="25000-50000">$25,000 - $50,000</option>
                  <option value="50000+">$50,000+</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>

              {/* Specific Products */}
              <div>
                <label className="block text-[#888] text-sm mb-2">Specific Products (Optional)</label>
                <textarea
                  name="specificProducts"
                  value={formState.specificProducts}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                  placeholder='e.g., "10 American Silver Eagles, 1 oz Gold Bar, 5 Krugerrands"'
                />
              </div>
            </div>

            {/* Your Information */}
            <div className="mb-8 pt-8 border-t border-[rgba(255,255,255,0.1)]">
              <h2 className="font-[var(--font-cinzel)] text-xl font-semibold mb-6 text-[#FFD700]">
                Your Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#888] text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-sm mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-sm mb-3">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    {['Email', 'Phone', 'Either'].map((method) => (
                      <label
                        key={method}
                        className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                          formState.contactMethod === method.toLowerCase()
                            ? 'border-[#FFD700] text-white'
                            : 'border-[rgba(255,255,255,0.1)] text-[#888]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method.toLowerCase()}
                          checked={formState.contactMethod === method.toLowerCase()}
                          onChange={handleChange}
                          className="hidden"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-[#888] text-sm mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formState.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                  placeholder="Any other details or questions?"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-4 rounded-lg font-[var(--font-cinzel)] text-sm font-bold tracking-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Request Quote'}
            </button>

            <p className="text-center text-[#666] text-sm mt-4">
              We typically respond within 2-4 hours during business hours (Mon-Fri 9am-5pm MST)
            </p>
          </form>
        )}
      </section>

      {/* Why Request a Quote */}
      <section className="py-16 px-5 sm:px-10 max-w-[900px] mx-auto">
        <h2 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-8 text-center">
          Why Request a Quote?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BenefitCard
            icon="💰"
            title="Bulk Discounts"
            description="Larger orders may qualify for better pricing. We'll find the best deal for your budget."
          />
          <BenefitCard
            icon="👤"
            title="Personalized Service"
            description="Get expert guidance on product selection tailored to your investment goals."
          />
          <BenefitCard
            icon="🤝"
            title="No Obligation"
            description="We'll send a quote, no strings attached. Take your time to decide."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)]">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-2">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
