'use client';

import { useState } from 'react';
import { useSpotPrices } from '@/hooks/useSpotPrices';
import SpotPriceTicker from '@/components/SpotPriceTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const { prices, loading } = useSpotPrices(60000);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SpotPriceTicker prices={prices} loading={loading} />
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-5 sm:px-10 text-center bg-[radial-gradient(ellipse_at_center_top,rgba(255,215,0,0.08)_0%,transparent_50%)]">
        <h1 className="font-[var(--font-cinzel)] text-4xl sm:text-5xl font-bold mb-4 text-mixed-gradient">
          Contact Us
        </h1>
        <p className="font-[var(--font-cormorant)] text-xl text-[#888]">
          We&apos;re here to help with any questions about buying gold and silver bullion
        </p>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-5 sm:px-10 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-8 text-gold-gradient">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <ContactMethod
                icon="📞"
                title="Phone"
                primary="(970) 555-GOLD"
                secondary="Mon-Fri 9am-5pm MST"
              />
              <ContactMethod
                icon="✉️"
                title="Email"
                primary="info@silverandgoldcolorado.com"
                secondary="We respond within 2-4 hours"
              />
              <ContactMethod
                icon="📍"
                title="Location"
                primary="Serving All of Colorado"
                secondary="Nationwide shipping available"
              />
            </div>

            <div className="mt-10 p-6 bg-[rgba(255,215,0,0.05)] border border-[rgba(255,215,0,0.2)] rounded-xl">
              <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-3">Response Time</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                We typically respond to all inquiries within 2-4 hours during business hours.
                For urgent matters, please call us directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {isSubmitted ? (
              <div className="card-dark rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-[var(--font-cinzel)] text-2xl text-[#FFD700] mb-3">Message Sent!</h3>
                <p className="text-[#888] mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 2-4 hours during business hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="text-[#FFD700] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-dark rounded-2xl p-8">
                <h2 className="font-[var(--font-cinzel)] text-xl font-semibold mb-6">Send a Message</h2>

                <div className="space-y-5">
                  <FormField
                    label="Name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Phone (Optional)"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                  />

                  <div>
                    <label className="block text-[#888] text-sm mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="quote">Request a Quote</option>
                      <option value="selling">Selling Metals</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#888] text-sm mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold py-4 rounded-lg font-[var(--font-cinzel)] text-sm font-bold tracking-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-5 sm:px-10 max-w-[900px] mx-auto border-t border-[rgba(255,215,0,0.1)]">
        <h2 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <FAQItem
            question="What forms of payment do you accept?"
            answer="We accept bank wire transfers, personal checks (must clear before shipping), money orders, and cash for local pickups. Credit cards are not accepted due to the low-margin nature of bullion sales."
          />
          <FAQItem
            question="How quickly do orders ship?"
            answer="Most orders ship within 1-3 business days. Some items may have slightly longer lead times, which will be noted during the quote process."
          />
          <FAQItem
            question="Is shipping insured?"
            answer="Yes! All shipments are fully insured and require a signature upon delivery. We use discreet packaging with no indication of contents."
          />
          <FAQItem
            question="Do you buy gold and silver?"
            answer="Yes, we purchase gold and silver bullion. Contact us with details about what you're looking to sell, and we'll provide a competitive quote."
          />
          <FAQItem
            question="Can I pick up my order locally?"
            answer="Yes, local pickup is available by appointment. Contact us to arrange a convenient time."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactMethod({
  icon,
  title,
  primary,
  secondary,
}: {
  icon: string;
  title: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-[rgba(255,215,0,0.1)] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[#666] text-sm mb-1">{title}</div>
        <div className="text-white font-semibold">{primary}</div>
        <div className="text-[#888] text-sm">{secondary}</div>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[#888] text-sm mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
      />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <span className="font-semibold text-white">{question}</span>
        <span className={`text-[#FFD700] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-[#888] text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
