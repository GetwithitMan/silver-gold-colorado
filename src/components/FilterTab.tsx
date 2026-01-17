import React from 'react';

interface FilterTabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function FilterTab({ active, onClick, children }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-6 py-3 rounded-full font-[var(--font-cinzel)] text-[13px] transition-all flex items-center ${
        active
          ? 'bg-gradient-to-br from-[rgba(255,215,0,0.2)] to-[rgba(192,192,192,0.2)] border border-[rgba(255,215,0,0.5)] text-white'
          : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#888] hover:border-[rgba(255,215,0,0.3)] hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}