import React from 'react';
import TokenCard from './TokenCard';
import styles from '@/styles/TokenList.module.css';

interface TokenListProps {
  tokens: any[];
}

export default function TokenList({ tokens }: TokenListProps) {
  return (
    <div className={styles.grid}>
      {tokens.map((token, index) => (
        <TokenCard key={index} token={token} />
      ))}
    </div>
  );
}
