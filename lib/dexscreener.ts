import axios from 'axios';

const DEXSCREENER_API = process.env.NEXT_PUBLIC_DEXSCREENER_API;

export interface Token {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    symbol: string;
  };
  priceUsd: string;
  priceChange: {
    m5: number;
    h1: number;
    h24: number;
  };
  liquidity: {
    usd: number;
  };
  volume: {
    h24: number;
  };
  fdv: number;
  marketCap: number;
}

export const searchTokens = async (query: string): Promise<Token[]> => {
  try {
    const response = await axios.get(`${DEXSCREENER_API}/search`, {
      params: { q: query },
    });
    return response.data.pairs || [];
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
};

export const getTokenByAddress = async (address: string): Promise<Token | null> => {
  try {
    const response = await axios.get(`${DEXSCREENER_API}/tokens/${address}`);
    return response.data.pairs?.[0] || null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

export const getTrendingTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get(`${DEXSCREENER_API}/search`, {
      params: { q: 'solana', order: 'liquidity', limit: 20 },
    });
    return response.data.pairs || [];
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    return [];
  }
};