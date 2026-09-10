'use client';

import React from 'react';
import { useTokenStore } from '@/lib/store';
import TokenCard from './TokenCard';

export default function TokenGrid() {
  const { tokens, loading } = useTokenStore();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>No tokens found. Try searching for something.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tokens.map((token) => (
        <TokenCard key={token.pairAddress} token={token} />
      ))}
    </div>
  );
}