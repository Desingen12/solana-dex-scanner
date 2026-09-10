'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useWalletStore } from '@/lib/store';
import SearchBar from '@/components/SearchBar';
import TokenGrid from '@/components/TokenGrid';
import Portfolio from '@/components/Portfolio';
import { getTrendingTokens } from '@/lib/dexscreener';
import { useTokenStore } from '@/lib/store';

export default function Home() {
  const wallet = useWallet();
  const { setPublicKey, setConnected } = useWalletStore();
  const { setTokens, setLoading } = useTokenStore();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      setPublicKey(wallet.publicKey.toString());
      setConnected(true);
    } else {
      setPublicKey(null);
      setConnected(false);
    }
  }, [wallet.connected, wallet.publicKey, setPublicKey, setConnected]);

  useEffect(() => {
    const loadTrendingTokens = async () => {
      setLoading(true);
      const tokens = await getTrendingTokens();
      setTokens(tokens);
      setLoading(false);
    };

    loadTrendingTokens();
  }, [setTokens, setLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-solana to-green-400 rounded-lg flex items-center justify-center font-bold">
              SOL
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-solana to-green-400 bg-clip-text text-transparent">
              DEX Scanner
            </h1>
          </div>
          <WalletMultiButton className="!bg-phantom hover:!bg-purple-700 !rounded-lg" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wallet.connected ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Tokens</h2>
              <SearchBar />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Trending Tokens</h2>
                <TokenGrid />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
                <Portfolio />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-solana to-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l6.293 6.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
            <p className="text-slate-400 mb-6">Connect Phantom Wallet to start scanning tokens and making purchases</p>
            <WalletMultiButton className="!bg-solana hover:!bg-green-500 !text-slate-900 !rounded-lg !px-6 !py-3" />
          </div>
        )}
      </div>
    </main>
  );
}