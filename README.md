Melatonin Mini App - Complete guide

A fast, modern, and mobile-optimized mini-application built using TypeScript + Vite + React + Wagmi (WalletConnect), with optional Farcaster Mini-App support.

1. Overview

The Melatonin Mini App is designed for:

4

Ultra-fast development using Vite

Native wallet connection (EVM chains)

Mobile-first layout

Optional Farcaster mini-app compatibility

Clean, modular TypeScript architecture

Repository structure is optimized for scalability and custom features.

2. Project Structure

Melatonin-mini-app/

# API helpers

api/

components/

constants/

configs

hooks/

public/

scripts/

# Project Structure 
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

# Static values and chain

App.tex

index.tsx

# Custom React hooks # Icons and static assets # Utility scripts # Helper functions

# Main application # ReactDOM mount point

farcaster.template.json #Template for Farcaster

mini-app

metadata.json

# Mini-app metadata

package.json

wagmiConfig.ts

vite.config.ts

tsconfig.json

# Dependencies

# Wallet config

#Vite config

# TypeScript config
Installation

Clone the repository:

Copy code

git clone https://github.com/zarex9/Melatonin-mini-app.git

Install all dependencies:

npm install

Start the development server

4. Wallet Integration (Wagmi + WalletConnect)

The project includes pre-configured wallet setup using Wagmi.

To add chains:

Ts

Copy code

import { base, arbitrum, polygon } from "wagmi/chains";

export const config = createConfig({ chains: [base, arbitrum, polygon],

});

The connection Ul appears through your components, and state is handled in wagmiConfig.ts.
Farcaster Mini-App Support

Two files make the app compatible with Farcaster:

metadata.json

}

Copy code

{

"name": "Melatonin Mini App", "description": "A lightweight Web3 mini app built by zarex9.",

"icon": "/icon.png",

"screens": [

{ "path": "/", "title": "Home" }

]

farcaster.template.json

Used when packaging the build for Farcaster mini-app deployment.
