import React from 'react';

interface TrustItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function TrustItem({ icon, title, children }: TrustItemProps) {
  return (
    <div className="text-center p-8 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,215,0,0.2)] hover:translate-y-[-5px] transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-[var(--font-cinzel)] text-lg text-[#FFD700] mb-3">{title}</h3>
      <p className="text-[#888] text-sm leading-relaxed">{children}</p>
    </div>
  );
}