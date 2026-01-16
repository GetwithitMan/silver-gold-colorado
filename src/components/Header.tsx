'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-[rgba(10,10,10,0.98)] to-[rgba(10,10,10,0.95)] backdrop-blur-[10px] border-b border-[rgba(255,215,0,0.15)] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <span className="absolute w-7 h-7 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full top-0 left-0 shadow-[0_0_15px_rgba(255,215,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-shadow"></span>
            <span className="absolute w-7 h-7 bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] rounded-full bottom-0 right-0 shadow-[0_0_15px_rgba(192,192,192,0.5)] group-hover:shadow-[0_0_25px_rgba(192,192,192,0.7)] transition-shadow"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-[var(--font-cinzel)] text-lg font-bold tracking-[3px] logo-gradient">
              SILVER & GOLD
            </span>
            <span className="font-[var(--font-cinzel)] text-[10px] tracking-[6px] text-[#888]">
              COLORADO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#gold">Gold</NavLink>
          <NavLink href="#silver">Silver</NavLink>
          <NavLink href="#bars">Bars</NavLink>
          <NavLink href="#rounds">Rounds</NavLink>
          <Link
            href="#contact"
            className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black px-6 py-2.5 rounded-full font-[var(--font-cinzel)] text-[13px] font-semibold tracking-[1px] hover:translate-y-[-2px] hover:shadow-[0_5px_20px_rgba(255,215,0,0.4)] transition-all"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[rgba(255,215,0,0.15)] py-4 px-4">
          <nav className="flex flex-col gap-4">
            <MobileNavLink href="#gold" onClick={() => setMobileMenuOpen(false)}>Gold</MobileNavLink>
            <MobileNavLink href="#silver" onClick={() => setMobileMenuOpen(false)}>Silver</MobileNavLink>
            <MobileNavLink href="#bars" onClick={() => setMobileMenuOpen(false)}>Bars</MobileNavLink>
            <MobileNavLink href="#rounds" onClick={() => setMobileMenuOpen(false)}>Rounds</MobileNavLink>
            <Link
              href="#contact"
              className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black px-6 py-3 rounded-full font-[var(--font-cinzel)] text-sm font-semibold tracking-[1px] text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-[var(--font-cinzel)] text-[13px] tracking-[1px] text-[#999] hover:text-[#FFD700] transition-colors relative group"
    >
      {children}
      <span className="absolute bottom-[-5px] left-0 w-0 h-[1px] bg-[#FFD700] group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      className="font-[var(--font-cinzel)] text-base tracking-[1px] text-[#999] hover:text-[#FFD700] transition-colors py-2 border-b border-[rgba(255,255,255,0.05)]"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
