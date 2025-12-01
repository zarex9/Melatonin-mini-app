Overview

The Melatonin Mini App is a lightweight yet scalable Web3 front-end designed for seamless wallet connectivity and mobile performance.

Built For

Ultra-fast development using Vit

Native EVM wallet connections

Mobile-first responsive UlI

Optional Farcaster Mini-App compatibility

Clean & modular TypeScript architecture

The repository is structured for scalability, ease of maintenance, and custom feature expansion.

##Project Structure##
Melatonin-mini-app/
│
├── api/                 # API helpers (on-chain/off-chain data)
├── components/          # Reusable UI components
├── constants/           # Static values (addresses, labels)
├── configs/             # App configs (chains, environments)
├── hooks/               # Custom React hooks
├── public/              # Icons, assets, and favicon
├── scripts/             # Utility build/deploy scripts
│
├── App.tsx              # Root application
├── index.tsx            # ReactDOM mount point
│
├── farcaster.template.json   # Farcaster build template
├── metadata.json             # Mini-app metadata (name, icon, screens)
│
├── wagmiConfig.ts        # Wallet connection setup (Wagmi)
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
│
└── package.json          # Dependencies and scripts

Installation

Clone the repository and install dependencies:
git clone https://github.com/zarex9/Melatonin-mini-app.git
cd Melatonin-mini-app
npm install

npm run dev

Wallet Integration (Wagmi + WalletConnect)

The app includes a pre-configured wallet setup using Wagmi and WalletConnect.

To add or modify supported chains, update your config:

// wagmiConfig.ts
import { base, arbitrum, polygon } from "wagmi/chains";
import { createConfig } from "wagmi";

export const config = createConfig({
  chains: [base, arbitrum, polygon],
  // connectors, transports, etc.
});

Farcaster Mini-App Support

The project is Farcaster-ready out of the box. Two key files handle mini-app compatibility:

metadata.json
{
  "name": "Melatonin Mini App",
  "description": "A lightweight Web3 mini app built by zarex9.",
  "icon": "/icon.png",
  "screens": [
    { "path": "/", "title": "Home" }
  ]
}

Developer Notes

Built in TypeScript for type safety and modularity.

Uses Vite for blazing-fast builds.

Integrates Wagmi hooks for wallet + network management.

Structured for multi-chain scalability and Farcaster integration.


Maintained By
zarex9
Full-Stack Web3 Developer
GitHub Farcaster
MIT License 2025 zarex9
