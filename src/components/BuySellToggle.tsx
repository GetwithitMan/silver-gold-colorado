'use client';

interface BuySellToggleProps {
  mode: 'buy' | 'sell';
  onChange: (mode: 'buy' | 'sell') => void;
}

export default function BuySellToggle({ mode, onChange }: BuySellToggleProps) {
  return (
    <div className="inline-flex items-center bg-[#1a1a1a] rounded-full p-1 border border-[rgba(255,215,0,0.2)]">
      <button
        onClick={() => onChange('buy')}
        className={`px-6 py-2.5 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] transition-all ${
          mode === 'buy'
            ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black font-semibold shadow-[0_2px_10px_rgba(255,215,0,0.3)]'
            : 'text-[#888] hover:text-white'
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => onChange('sell')}
        className={`px-6 py-2.5 rounded-full font-[var(--font-cinzel)] text-sm tracking-[1px] transition-all ${
          mode === 'sell'
            ? 'bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0] text-black font-semibold shadow-[0_2px_10px_rgba(192,192,192,0.3)]'
            : 'text-[#888] hover:text-white'
        }`}
      >
        Sell to Us
      </button>
    </div>
  );
}
