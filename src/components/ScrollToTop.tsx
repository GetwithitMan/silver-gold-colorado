'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full text-black text-xl font-bold shadow-[0_5px_20px_rgba(255,215,0,0.4)] hover:translate-y-[-5px] transition-all z-50 animate-fadeIn"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}