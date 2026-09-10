const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex';

export async function fetchTrendingTokens(query?: string) {
  try {
    const searchQuery = query || 'solana';
    const response = await fetch(
      `${DEXSCREENER_API}/search?q=${encodeURIComponent(searchQuery)}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return (data.pairs || []).slice(0, 20);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}

export async function getTokenByAddress(address: string) {
  try {
    const response = await fetch(
      `${DEXSCREENER_API}/search?q=${encodeURIComponent(address)}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.pairs?.[0] || null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}
