'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { useWalletStore } from '@/lib/store';
import { getSolBalance } from '@/lib/solana';
import { formatPrice, formatNumber } from '@/lib/utils';

export default function Portfolio() {
  const { portfolio, totalValue, setTotalValue } = usePortfolioStore();
  const { publicKey } = useWalletStore();
  const [solBalance, setSolBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance = await getSolBalance(publicKey);
          setSolBalance(balance);
        } catch (error) {
          console.error('Error fetching SOL balance:', error);
        }
      }
      setLoading(false);
    };

    fetchBalance();
  }, [publicKey]);

  const portfolioTotal = portfolio.reduce((sum, token) => sum + (token.totalValue || 0), 0);

  if (loading) {
    return <div className="text-slate-400 text-center py-4">Loading...</div>;
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-4">
      {/* Balances */}
      <div className="space-y-3">
        <div className="bg-slate-700 rounded p-3">
          <p className="text-slate-400 text-sm">SOL Balance</p>
          <p className="text-xl font-semibold text-solana">{solBalance.toFixed(4)} SOL</p>
        </div>
        <div className="bg-slate-700 rounded p-3">
          <p className="text-slate-400 text-sm">Portfolio Value</p>
          <p className="text-xl font-semibold text-green-400">{formatPrice(portfolioTotal)}</p>
        </div>
      </div>

      {/* Tokens */}
      <div className="border-t border-slate-700 pt-4">
        <h4 className="font-semibold mb-3 text-slate-300">Your Tokens</h4>
        {portfolio.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-4">No tokens yet</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {portfolio.map((token, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm bg-slate-700 p-2 rounded">
                <div>
                  <p className="font-semibold">{token.symbol}</p>
                  <p className="text-slate-400">{token.amount.toFixed(4)}</p>
                </div>
                <p className="font-semibold text-right text-green-400">
                  {formatPrice(token.totalValue)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}