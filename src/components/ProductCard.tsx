'use client';

import { Product, calculatePrice, formatPremium } from '@/data/products';

interface ProductCardProps {
  product: Product;
  spotPrices: { gold: number; silver: number };
  delay?: number;
}

export default function ProductCard({ product, spotPrices, delay = 0 }: ProductCardProps) {
  const totalPrice = calculatePrice(product, spotPrices);
  const premium = formatPremium(product);
  const isGold = product.metalType === 'gold';

  const metalColor = isGold ? '#FFD700' : '#C0C0C0';
  const metalGradient = isGold
    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
    : 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #E8E8E8 100%)';

  return (
    <div
      className="opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative h-full rounded-2xl p-5 flex flex-col card-dark hover:border-[rgba(255,215,0,0.5)] hover:translate-y-[-5px] transition-all duration-300 group">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black text-[9px] font-bold px-2 py-1 rounded-full tracking-[0.5px] z-10">
            {product.badge}
          </div>
        )}
        {product.isPopular && !product.badge && (
          <div className="absolute top-4 right-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black text-[9px] font-bold px-2 py-1 rounded-full tracking-[0.5px] z-10">
            ★ POPULAR
          </div>
        )}

        {/* Product Image */}
        <div className="relative flex justify-center items-center h-[100px] my-3">
          <div
            className="absolute w-[70px] h-[70px] rounded-full blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity"
            style={{ background: metalGradient }}
          ></div>
          <div
            className="w-[70px] h-[70px] rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110"
            style={{
              background: metalGradient,
              boxShadow: '0 6px 20px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
            }}
          >
            <span className="text-[28px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{product.image}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mb-auto">
          <div className="text-[10px] text-[#666] tracking-[1.5px] uppercase mb-1">
            {product.country} • {product.year}
          </div>
          <h3 className="font-[var(--font-cinzel)] text-sm font-semibold text-white leading-tight mb-1">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="text-[11px] text-[#888] mb-2">{product.subtitle}</p>
          )}
          <div className="flex justify-center items-center gap-2 text-[11px] text-[#666]">
            <span>{product.weight} {product.weightUnit}</span>
            <span className="text-[#444]">|</span>
            <span>{product.purity}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-[rgba(255,215,0,0.1)] pt-3 mt-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] text-[#666] tracking-[1px]">SPOT + PREMIUM</span>
            <span className="font-[var(--font-jetbrains)] text-[11px] price-positive">
              {premium}
            </span>
          </div>
          <div
            className="font-[var(--font-jetbrains)] text-xl font-bold text-center mb-2"
            style={{ color: metalColor, textShadow: `0 0 15px ${metalColor}` }}
          >
            ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <button
            className="w-full py-2 rounded-lg font-[var(--font-cinzel)] text-[10px] font-bold tracking-[1px] text-black hover:translate-y-[-2px] transition-all"
            style={{
              background: metalGradient,
              boxShadow: '0 3px 12px rgba(255,215,0,0.25)',
            }}
          >
            INQUIRE NOW
          </button>
        </div>
      </div>
    </div>
  );
}
