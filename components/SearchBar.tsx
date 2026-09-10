'use client';

import React, { useState } from 'react';
import { searchTokens } from '@/lib/dexscreener';
import { useTokenStore } from '@/lib/store';
import { formatPrice, formatNumber } from '@/lib/utils';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const { setTokens, setLoading } = useTokenStore();
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setSearching(true);
    setLoading(true);
    try {
      const results = await searchTokens(searchInput);
      setTokens(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex gap-2">
        <input
          type="text"
          placeholder="Search tokens by symbol or contract address..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-solana focus:outline-none text-white placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={searching}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-solana to-green-400 text-slate-900 font-semibold hover:from-green-400 hover:to-solana disabled:opacity-50 transition-all"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}