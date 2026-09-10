import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import TokenSearch from '@/components/TokenSearch';
import TokenList from '@/components/TokenList';
import { fetchTrendingTokens } from '@/services/api';

export default function Home() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadTrendingTokens();
  }, []);

  const loadTrendingTokens = async () => {
    setLoading(true);
    try {
      const data = await fetchTrendingTokens();
      setTokens(data);
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const data = await fetchTrendingTokens(query);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const displayTokens = isSearching && searchResults.length > 0 ? searchResults : tokens;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🚀 Solana DEX Scanner</h1>
        <p>Find and track Solana tokens in real-time</p>
      </header>

      <TokenSearch onSearch={handleSearch} isSearching={isSearching} />

      <main className={styles.main}>
        {loading && !isSearching ? (
          <div className={styles.loading}>
            <p>Loading trending tokens...</p>
          </div>
        ) : displayTokens.length > 0 ? (
          <TokenList tokens={displayTokens} />
        ) : (
          <div className={styles.empty}>
            <p>{isSearching ? 'No results found' : 'No tokens available'}</p>
          </div>
        )}
      </main>
    </div>
  );
}
