import React from 'react';
import styles from '@/styles/TokenCard.module.css';

interface TokenCardProps {
  token: any;
}

export default function TokenCard({ token }: TokenCardProps) {
  const formatPrice = (price: string | number) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    if (num >= 1) return `$${num.toFixed(2)}`;
    if (num >= 0.01) return `$${num.toFixed(4)}`;
    return `$${num.toFixed(8)}`;
  };

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  const priceChange = parseFloat(token.priceChange?.h24 || '0');
  const priceChangeColor = priceChange >= 0 ? '#14f195' : '#ef4444';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.icon}>
            {token.baseToken?.symbol?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className={styles.symbol}>{token.baseToken?.symbol}</h3>
            <p className={styles.name}>{token.baseToken?.name?.slice(0, 30)}</p>
          </div>
        </div>
        <div className={styles.change} style={{ color: priceChangeColor }}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Price</span>
          <span className={styles.value}>{formatPrice(token.priceUsd)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Liquidity</span>
          <span className={styles.value}>
            {formatNumber(token.liquidity?.usd || 0)}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Market Cap</span>
          <span className={styles.value}>
            {formatNumber(token.marketCap || 0)}
          </span>
        </div>
      </div>

      <a
        href={`https://dexscreener.com/solana/${token.pairAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        View on DEXScreener →
      </a>
    </div>
  );
}
