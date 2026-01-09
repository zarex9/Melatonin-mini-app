import { http, createConfig, fallback } from 'wagmi';
import { defineChain } from 'viem';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

/* ----------------- CHAINS ----------------- */

export const monad = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MONAD', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://monad-testnet.drpc.org',
        'https://rpc.monad-testnet.io'
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'MonadScan',
      url: 'https://monad-testnet.socialscan.io',
    },
  },
  testnet: true,
});

export const base = defineChain({
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://mainnet.base.org',
        'https://base.publicnode.com'
      ],
    },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://basescan.org' },
  },
});

export const baseSepolia = defineChain({
  id: 84532,
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://sepolia.base.org',
        'https://base-sepolia.publicnode.com'
      ],
    },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
});

export const celo = defineChain({
  id: 42220,
  name: 'Celo',
  nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://forno.celo.org',
        'https://celo.publicnode.com'
      ],
    },
  },
  blockExplorers: {
    default: { name: 'Celoscan', url: 'https://celoscan.io' },
  },
});

/* ----------------- CONFIG ----------------- */

const isProd = process.env.NODE_ENV === 'production';

export const config = createConfig({
  chains: isProd
    ? [base, celo]
    : [monad, baseSepolia, base, celo],

  transports: {
    [monad.id]: fallback([http(), http()]),
    [base.id]: fallback([http(), http()]),
    [baseSepolia.id]: fallback([http(), http()]),
    [celo.id]: fallback([http(), http()]),
  },

  connectors: [
    farcasterMiniApp(),
  ],

  batch: {
    multicall: true,
  },

  pollingInterval: 10_000, // leaderboard-friendly
  ssr: true,
});
