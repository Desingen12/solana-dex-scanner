export const truncateAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const formatPrice = (price: number | string): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (num >= 1) {
    return `$${num.toFixed(2)}`;
  }
  return `$${num.toExponential(2)}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
};

export const calculatePriceChange = (change: number): string => {
  const symbol = change >= 0 ? '+' : '';
  return `${symbol}${change.toFixed(2)}%`;
};