# Solana DEX Scanner

A modern web application for scanning Solana tokens on DEXScreener and purchasing them directly through Phantom Wallet.

## Features

✨ **Token Scanning**
- Search tokens by symbol or contract address
- Real-time price data from DEXScreener API
- View 24h price changes, liquidity, and market cap
- Browse trending tokens on Solana

🔐 **Phantom Wallet Integration**
- Connect your Phantom wallet securely
- View SOL balance and portfolio
- One-click token purchases
- Track your holdings in real-time

💼 **Portfolio Management**
- View all your token holdings
- Track portfolio value
- Monitor individual token performance
- Organize your investments

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Phantom Wallet Adapter
- **API**: DEXScreener API
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Phantom Wallet browser extension

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Desingen12/solana-dex-scanner.git
cd solana-dex-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Connect Wallet
1. Click "Connect Wallet" button
2. Select Phantom Wallet from the modal
3. Approve the connection in your wallet

### Search Tokens
1. Use the search bar to find tokens by:
   - Token symbol (e.g., "SOL", "COPE")
   - Contract address
2. View real-time price data and metrics

### Buy Tokens
1. Select the amount you want to purchase
2. Click "Buy with Phantom"
3. Confirm the transaction in your wallet
4. Token will be added to your portfolio

### View Portfolio
- See all your holdings on the right sidebar
- Monitor your SOL balance
- Track total portfolio value
- View individual token values

## API Endpoints

### GET `/api/tokens`
Search or fetch token data
- Query params: `q` (search query) or `address` (contract address)

### GET `/api/wallet`
Fetch wallet information
- Query params: `action` (price|solBalance|tokenBalance), `wallet`, `tokenMint`

### POST `/api/buy`
Initiate token purchase
- Body: `{ tokenMint, amount, walletAddress }`

## Environment Variables

```env
NEXT_PUBLIC_DEXSCREENER_API=https://api.dexscreener.com/latest/dex
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Project Structure

```
solana-dex-scanner/
├── app/
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── SearchBar.tsx     # Token search
│   ├── TokenGrid.tsx     # Token display grid
│   ├── TokenCard.tsx     # Individual token card
│   └── Portfolio.tsx     # Portfolio display
├── lib/
│   ├── store.ts          # Zustand stores
│   ├── dexscreener.ts    # DEXScreener API client
│   ├── solana.ts         # Solana utilities
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Security Considerations

⚠️ **Important**: This app never stores your private keys or seeds. All transactions are signed directly in your Phantom wallet.

- Never share your seed phrase
- Verify contract addresses before buying
- Test with small amounts first
- Use on mainnet only after thorough testing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Join the Solana developer community

## Disclaimer

This is a development tool. Use at your own risk. Always DYOR (Do Your Own Research) before investing in any token. The authors are not responsible for any losses.

---

**Made with ❤️ for the Solana community**