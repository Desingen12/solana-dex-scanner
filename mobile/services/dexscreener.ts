import axios from 'axios';

const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex';

export const searchTokens = async (query: string) => {
  try {
    const response = await axios.get(`${DEXSCREENER_API}/search?q=${query}`);
    return response.data.pairs || [];
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
};

export const getTrendingTokens = async () => {
  try {
    // Get trending tokens from Solana
    const response = await axios.get(`${DEXSCREENER_API}/search?q=sol`);
    return response.data.pairs?.slice(0, 20) || [];
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    return [];
  }
};

export const getTokenByAddress = async (address: string) => {
  try {
    const response = await axios.get(`${DEXSCREENER_API}/search?q=${address}`);
    return response.data.pairs?.[0] || null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};
