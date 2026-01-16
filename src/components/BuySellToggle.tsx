'use client';

interface BuySellToggleProps {
  mode: 'buy' | 'sell';
  onChange: (mode: 'buy' | 'sell') => void;
}

export default function BuySellToggle({ mode, onChange }: BuySellToggleProps) {
  return (
    <div className="inline-flex items-center bg-[#0d0d0d] rounded-2xl p-1.5 border border-[rgba(255,215,0,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <button
        onClick={() => onChange('buy')}
        className={`relative px-8 py-3.5 rounded-xl font-[var(--font-cinzel)] text-sm tracking-[1.5px] transition-all duration-300 ${
          mode === 'buy'
            ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black font-bold shadow-[0_4px_15px_rgba(255,215,0,0.4)]'
            : 'text-[#666] hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className={`text-lg ${mode === 'buy' ? '' : 'opacity-50'}`}>
            {mode === 'buy' ? '$$' : '$'}
          </span>
          <span>Buy from Us</span>
        </span>
      </button>

      <div className="w-px h-8 bg-[rgba(255,255,255,0.1)] mx-1"></div>

      <button
        onClick={() => onChange('sell')}
        className={`relative px-8 py-3.5 rounded-xl font-[var(--font-cinzel)] text-sm tracking-[1.5px] transition-all duration-300 ${
          mode === 'sell'
            ? 'bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] text-black font-bold shadow-[0_4px_15px_rgba(192,192,192,0.4)]'
            : 'text-[#666] hover:text-[#C0C0C0] hover:bg-[rgba(192,192,192,0.05)]'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className={`text-lg ${mode === 'sell' ? '' : 'opacity-50'}`}>
            {mode === 'sell' ? '$$' : '$'}
          </span>
          <span>Sell to Us</span>
        </span>
      </button>
    </div>
  );
}
