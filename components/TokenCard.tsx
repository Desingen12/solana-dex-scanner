'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePortfolioStore } from '@/lib/store';
import { formatPrice, formatNumber, calculatePriceChange } from '@/lib/utils';
import { getTokenPrice } from '@/lib/solana';

export default function TokenCard({ token }: { token: any }) {
  const wallet = useWallet();
  const { addToken } = usePortfolioStore();
  const [buying, setBuying] = useState(false);
  const [amount, setAmount] = useState('1');

  const handleBuy = async () => {
    if (!wallet.connected || !wallet.signTransaction) {
      alert('Please connect your Phantom wallet');
      return;
    }

    setBuying(true);
    try {
      // Add token to portfolio
      addToken({
        mint: token.baseToken.address,
        symbol: token.baseToken.symbol,
        name: token.baseToken.name,
        price: token.priceUsd,
        amount: parseFloat(amount),
        totalValue: parseFloat(amount) * parseFloat(token.priceUsd),
      });
      alert(`Successfully added ${amount} ${token.baseToken.symbol} to portfolio!`);
      setAmount('1');
    } catch (error) {
      console.error('Error buying token:', error);
      alert('Error completing transaction');
    } finally {
      setBuying(false);
    }
  };

  const priceChange = token.priceChange?.h24 || 0;
  const priceChangeColor = priceChange >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-solana transition-all">
      {/* Token Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-phantom to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
            {token.baseToken.symbol.slice(0, 2)}
          </div>
          <div>
            <h3 className="font-semibold">{token.baseToken.symbol}</h3>
            <p className="text-sm text-slate-400">{token.baseToken.name.slice(0, 20)}</p>
          </div>
        </div>
      </div>

      {/* Price Info */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Price:</span>
          <span className="font-semibold">{formatPrice(token.priceUsd)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">24h Change:</span>
          <span className={`font-semibold ${priceChangeColor}`}>
            {calculatePriceChange(priceChange)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Liquidity:</span>
          <span className="font-semibold">${formatNumber(token.liquidity?.usd || 0)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Market Cap:</span>
          <span className="font-semibold">${formatNumber(token.marketCap || 0)}</span>
        </div>
      </div>

      {/* Buy Section */}
      <div className="border-t border-slate-700 pt-4">
        <div className="mb-3">
          <label className="text-sm text-slate-400 block mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.1"
            step="0.1"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-solana focus:outline-none"
          />
        </div>
        <button
          onClick={handleBuy}
          disabled={buying}
          className="w-full py-2 rounded bg-gradient-to-r from-solana to-green-400 text-slate-900 font-semibold hover:from-green-400 hover:to-solana disabled:opacity-50 transition-all"
        >
          {buying ? 'Processing...' : `Buy with Phantom`}
        </button>
      </div>
    </div>
  );
}