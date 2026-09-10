import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_RPC, 'confirmed');

export const connectWallet = async () => {
  // In a real app, this would use WalletConnect
  // For now, we'll return a mock public key
  return 'YOUR_WALLET_ADDRESS';
};

export const getBalance = async (publicKey: string) => {
  try {
    const pubKey = new PublicKey(publicKey);
    const balance = await connection.getBalance(pubKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
};

export const getTokenAccountBalance = async (tokenMint: string, owner: string) => {
  try {
    const ownerPubkey = new PublicKey(owner);
    const mintPubkey = new PublicKey(tokenMint);
    
    const accounts = await connection.getParsedTokenAccountsByOwner(ownerPubkey, {
      mint: mintPubkey,
    });
    
    if (accounts.value.length > 0) {
      return accounts.value[0].account.data.parsed.info.tokenAmount.uiAmount || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
};
