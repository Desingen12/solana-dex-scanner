import React, { useState } from 'react';
import styles from '@/styles/TokenSearch.module.css';

interface TokenSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function TokenSearch({ onSearch, isSearching }: TokenSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Search by token symbol or mint address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={isSearching}
          className={styles.button}
        >
          {isSearching ? 'Searching...' : '🔍 Search'}
        </button>
      </div>
    </form>
  );
}
