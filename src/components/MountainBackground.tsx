export default function MountainBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[400px] pointer-events-none opacity-50">
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222" />
            <stop offset="100%" stopColor="#151515" />
          </linearGradient>
          <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Back mountains */}
        <path
          d="M0,400 L0,250 L200,150 L350,220 L500,100 L650,180 L800,80 L950,160 L1100,60 L1250,140 L1440,50 L1440,400 Z"
          fill="url(#mountainGrad2)"
        />
        {/* Front mountains */}
        <path
          d="M0,400 L0,300 L150,200 L300,260 L450,160 L600,230 L750,140 L900,200 L1050,120 L1200,180 L1350,100 L1440,150 L1440,400 Z"
          fill="url(#mountainGrad1)"
        />
        {/* Snow caps */}
        <path d="M500,100 L520,85 L540,100 Z" fill="url(#snowGrad)" />
        <path d="M800,80 L825,60 L850,80 Z" fill="url(#snowGrad)" />
        <path d="M1100,60 L1130,35 L1160,60 Z" fill="url(#snowGrad)" />
      </svg>
    </div>
  );
}
