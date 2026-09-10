# Solana DEX Scanner - Mobile (iOS)

🚀 **Native React Native iOS App für Token-Scanning auf Solana DEX**

## Features

✨ **Token-Scanning**
- 🔍 Suche nach Tokens (Symbol & Contract Address)
- 📊 Echtzeit Preise von DEXScreener API
- 📈 24h Price Changes, Liquidity & Market Cap
- 🔥 Trending Tokens Dashboard

🔐 **Phantom Wallet Integration**
- 👛 Wallet verbinden & trennen
- 💰 SOL Balance anzeigen
- 📱 Wallet Address kopieren
- ⚡ Portfolio Management

💼 **Portfolio Tracking**
- 🎯 Deine Token Holdings verwalten
- 📋 Gesamtwert berechnen
- 📈 Performance tracken

## Tech Stack

- **React Native** 0.72.6
- **Expo** 49.0.0 (für easy deployment)
- **Solana Web3.js** - Blockchain Integration
- **WalletConnect** - Phantom Integration
- **React Navigation** - Tab Navigation
- **Zustand** - State Management
- **Tailwind CSS** (React Native Styling)

## Installation

### Prerequisites
- Node.js 18+
- npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Phantom Wallet App auf iPhone

### Setup

```bash
cd mobile
npm install
```

### Starten (iOS)

#### Option 1: Expo App (Schnell & Einfach)
```bash
npm run ios
# oder
npm start
# Dann 'i' drücken
```

Dann Expo App auf iPhone öffnen, QR-Code scannen.

#### Option 2: Simulator
```bash
npm run ios
```

#### Option 3: Build für App Store
```bash
expо build:ios
```

## Struktur

```
mobile/
├── App.tsx                 # Root App & Navigation
├── app.json               # Expo Configuration
├── package.json           # Dependencies
├── screens/
│   ├── HomeScreen.tsx     # Home & Trending Tokens
│   ├── SearchScreen.tsx   # Token Suche
│   ├── PortfolioScreen.tsx# Dein Portfolio
│   └── WalletScreen.tsx   # Wallet Info
├── components/
│   └── TokenCard.tsx      # Token Display Card
├── services/
│   ├── dexscreener.ts     # DEXScreener API
│   └── wallet.ts          # Wallet Services
├── store/
│   └── store.ts           # Zustand Stores
└── utils/
    └── helpers.ts         # Helper Functions
```

## Benutzung

### 1. Wallet Verbinden
- Tippe auf "Home" Tab
- Tippe "Connect Wallet"
- Wähle Phantom
- Bestätige in Phantom App

### 2. Tokens Suchen
- Gehe zu "Search" Tab
- Gib Token Symbol oder Address ein
- Tippe Search
- Sieh Ergebnisse

### 3. Tokens Kaufen
- Wähle einen Token
- Gib Amount ein
- Tippe "Add to Portfolio"
- Token ist in Portfolio

### 4. Portfolio Anschauen
- Gehe zu "Portfolio" Tab
- Sieh deine Holdings
- Sieh Gesamtwert

## Screens

### 🏠 Home Screen
- SOL Balance anzeigen (wenn connected)
- Connect Wallet Button
- Trending Tokens auflisten

### 🔍 Search Screen
- Suchbar für Tokens
- Echtzeit-Suche
- Token-Ergebnisse anzeigen

### 📊 Portfolio Screen
- Gesamtwert anzeigen
- Deine Holdings listed
- Pro Token: Symbol, Amount, Value

### 👛 Wallet Screen
- SOL Balance (mit Refresh)
- Wallet Address (mit Copy-Button)
- Disconnect Button

## API Integration

### DEXScreener API
```
GET https://api.dexscreener.com/latest/dex/search?q={query}
```

### Solana RPC
```
GET https://api.mainnet-beta.solana.com
- getBalance(pubkey)
- getParsedTokenAccountsByOwner()
```

## Environment

```env
# In app.json
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_DEXSCREENER_API=https://api.dexscreener.com/latest/dex
```

## Deployment

### Expo Cloud Build (Einfachste Variante)
```bash
expò build:ios
# Warte auf Build-Email
# Download .ipa
# Öffne in TestFlight
```

### App Store
1. Apple Developer Account ($99/Jahr)
2. `expo build:ios --release-channel production`
3. Upload zu App Store Connect
4. Submit for Review

## Security

⚠️ **WICHTIG:**
- Private Keys werden NICHT gespeichert
- Alles läuft über Phantom Wallet
- Keine Seeds oder Secrets im Code
- Verwende nur auf Mainnet nach gründlichem Testing

## Support

📧 Issues auf GitHub
🤝 Beiträge willkommen!

## Lizenz

MIT

---

**Made with ❤️ for Solana Mobile** 🚀
