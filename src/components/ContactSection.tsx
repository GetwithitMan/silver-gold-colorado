import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding px-5 sm:px-10 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)] section-divider">
      <div className="text-center container-narrow mx-auto">
        <h2 className="font-[var(--font-cinzel)] text-3xl sm:text-4xl mb-4">
          Ready to Start Your Stack?
        </h2>
        <p className="text-[#888] text-lg mb-8">
          Contact us today for a personalized quote on any gold or silver products
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+19705554653"
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
  );
}