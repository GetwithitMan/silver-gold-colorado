import type { Metadata } from "next";
import { Cinzel, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Silver & Gold Colorado | Premium Bullion at Spot + Low Premiums",
  description: "Colorado's trusted bullion dealer. Buy gold and silver coins, bars, and rounds at competitive spot prices plus low premiums. American Eagles, Canadian Maple Leafs, Krugerrands, and more.",
  keywords: "gold coins, silver coins, bullion, precious metals, Colorado, American Eagle, Silver Eagle, Canadian Maple Leaf, Krugerrand, gold bars, silver bars",
  authors: [{ name: "Silver & Gold Colorado" }],
  openGraph: {
    title: "Silver & Gold Colorado | Premium Bullion Dealer",
    description: "Colorado's trusted source for gold and silver bullion at competitive prices.",
    url: "https://silverandgoldcolorado.com",
    siteName: "Silver & Gold Colorado",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver & Gold Colorado | Premium Bullion Dealer",
    description: "Colorado's trusted source for gold and silver bullion at competitive prices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${jetbrainsMono.variable} ${cormorant.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
