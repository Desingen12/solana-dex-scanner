import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_RPC);

export const getTokenAccountBalance = async (
  tokenMint: string,
  walletAddress: string
): Promise<number> => {
  try {
    const mintPublicKey = new PublicKey(tokenMint);
    const walletPublicKey = new PublicKey(walletAddress);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
      mint: mintPublicKey,
    });

    if (tokenAccounts.value.length === 0) return 0;

    const balance =
      tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount || 0;
    return balance;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
};

export const getSolBalance = async (walletAddress: string): Promise<number> => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
};

export const getTokenPrice = async (tokenMint: string): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenMint}`
    );
    const data = await response.json();
    if (data.pairs && data.pairs.length > 0) {
      return parseFloat(data.pairs[0].priceUsd);
    }
    return 0;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return 0;
  }
};