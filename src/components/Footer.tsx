import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[rgba(255,215,0,0.1)] pt-16 pb-8 px-5 sm:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <span className="absolute w-7 h-7 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full top-0 left-0 shadow-[0_0_15px_rgba(255,215,0,0.5)]"></span>
                <span className="absolute w-7 h-7 bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] rounded-full bottom-0 right-0 shadow-[0_0_15px_rgba(192,192,192,0.5)]"></span>
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
            <p className="text-[#666] text-sm max-w-[250px] leading-relaxed">
              Your trusted source for precious metals in the Rockies
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 sm:gap-20">
            <FooterColumn title="Products">
              <FooterLink href="#gold">Gold Coins</FooterLink>
              <FooterLink href="#silver">Silver Coins</FooterLink>
              <FooterLink href="#bars">Gold Bars</FooterLink>
              <FooterLink href="#bars">Silver Bars</FooterLink>
            </FooterColumn>
            <FooterColumn title="Information">
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#shipping">Shipping</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-[#555] text-[13px] mb-1">
            © {new Date().getFullYear()} Silver & Gold Colorado. SilverAndGoldColorado.com
          </p>
          <p className="text-[#444] text-[11px]">
            Prices subject to change. Not investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-[var(--font-cinzel)] text-[#FFD700] text-sm tracking-[2px] mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[#888] text-sm hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
