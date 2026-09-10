import create from 'zustand';

interface WalletStore {
  publicKey: string | null;
  connected: boolean;
  setPublicKey: (key: string | null) => void;
  setConnected: (connected: boolean) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  publicKey: null,
  connected: false,
  setPublicKey: (key) => set({ publicKey: key }),
  setConnected: (connected) => set({ connected }),
}));

interface TokenStore {
  tokens: any[];
  selectedToken: any | null;
  loading: boolean;
  setTokens: (tokens: any[]) => void;
  setSelectedToken: (token: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: [],
  selectedToken: null,
  loading: false,
  setTokens: (tokens) => set({ tokens }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setLoading: (loading) => set({ loading }),
}));

interface PortfolioStore {
  portfolio: any[];
  totalValue: number;
  addToken: (token: any) => void;
  removeToken: (mint: string) => void;
  setPortfolio: (portfolio: any[]) => void;
  setTotalValue: (value: number) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolio: [],
  totalValue: 0,
  addToken: (token) => set((state) => ({ portfolio: [...state.portfolio, token] })),
  removeToken: (mint) => set((state) => ({
    portfolio: state.portfolio.filter((t) => t.mint !== mint),
  })),
  setPortfolio: (portfolio) => set({ portfolio }),
  setTotalValue: (value) => set({ totalValue: value }),
}));