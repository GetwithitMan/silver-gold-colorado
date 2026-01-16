'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PriceData {
  price: number;
  change: number;
  changePercent: number;
  updatedAt: string;
}

export interface Prices {
  gold: PriceData;
  silver: PriceData;
  platinum: PriceData;
  palladium: PriceData;
}

const GOLD_API_BASE = 'https://api.gold-api.com/price';

// Default prices as fallback
const defaultPrices: Prices = {
  gold: { price: 4613.60, change: 0, changePercent: 0, updatedAt: '' },
  silver: { price: 91.06, change: 0, changePercent: 0, updatedAt: '' },
  platinum: { price: 2347.00, change: 0, changePercent: 0, updatedAt: '' },
  palladium: { price: 1776.00, change: 0, changePercent: 0, updatedAt: '' },
};

interface GoldAPIResponse {
  name: string;
  price: number;
  symbol: string;
  updatedAt: string;
  updatedAtReadable: string;
}

export function useSpotPrices(refreshInterval = 60000) {
  const [prices, setPrices] = useState<Prices>(defaultPrices);
  const [previousPrices, setPreviousPrices] = useState<Prices>(defaultPrices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async (symbol: string): Promise<GoldAPIResponse | null> => {
    try {
      const response = await fetch(`${GOLD_API_BASE}/${symbol}`);
      if (!response.ok) throw new Error(`Failed to fetch ${symbol}`);
      return await response.json();
    } catch (err) {
      console.error(`Error fetching ${symbol}:`, err);
      return null;
    }
  };

  const fetchAllPrices = useCallback(async () => {
    try {
      const [goldData, silverData, platinumData, palladiumData] = await Promise.all([
        fetchPrice('XAU'),
        fetchPrice('XAG'),
        fetchPrice('XPT'),
        fetchPrice('XPD'),
      ]);

      setPrices((prev) => {
        // Store previous prices for change calculation
        setPreviousPrices(prev);

        const newPrices: Prices = {
          gold: goldData
            ? {
                price: goldData.price,
                change: goldData.price - prev.gold.price,
                changePercent: prev.gold.price > 0
                  ? ((goldData.price - prev.gold.price) / prev.gold.price) * 100
                  : 0,
                updatedAt: goldData.updatedAt,
              }
            : prev.gold,
          silver: silverData
            ? {
                price: silverData.price,
                change: silverData.price - prev.silver.price,
                changePercent: prev.silver.price > 0
                  ? ((silverData.price - prev.silver.price) / prev.silver.price) * 100
                  : 0,
                updatedAt: silverData.updatedAt,
              }
            : prev.silver,
          platinum: platinumData
            ? {
                price: platinumData.price,
                change: platinumData.price - prev.platinum.price,
                changePercent: prev.platinum.price > 0
                  ? ((platinumData.price - prev.platinum.price) / prev.platinum.price) * 100
                  : 0,
                updatedAt: platinumData.updatedAt,
              }
            : prev.platinum,
          palladium: palladiumData
            ? {
                price: palladiumData.price,
                change: palladiumData.price - prev.palladium.price,
                changePercent: prev.palladium.price > 0
                  ? ((palladiumData.price - prev.palladium.price) / prev.palladium.price) * 100
                  : 0,
                updatedAt: palladiumData.updatedAt,
              }
            : prev.palladium,
        };

        return newPrices;
      });

      setError(null);
    } catch (err) {
      setError('Failed to fetch prices');
      console.error('Error fetching prices:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchAllPrices();

    // Set up interval for refreshing prices
    const interval = setInterval(fetchAllPrices, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchAllPrices, refreshInterval]);

  return { prices, loading, error, refetch: fetchAllPrices };
}
