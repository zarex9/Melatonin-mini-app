//
// Tile Data (2048 style game tiles)
// -------------------------------------
export interface TileData {
  /** Unique tile ID */
  id: number;

  /** Tile value (2, 4, , ...) */
  value: number;

  /** Tile row index */
  row: number;

  /** Tile column index */
  col: number;

  /** Marks tile created this turn */
  isNew?: boolean;

  /** Marks tile merged this turn */
  isMerged?: boolean;

  /** Optional: winner player ID */
  winnerId?: number;
}

//
// Grid type (board)
// -------------------------------------
export type Grid = Array<Array<number | null>>;

//
// Leaderboard Entry
// -------------------------------------
export interface LeaderboardEntry {
  rank: number;
  displayName: string;
  fid: number | null;
  score: number;

  /** If this leaderboard entry belongs to current user */
  isCurrentUser?: boolean;
}

//
// Season Info (supports on-chain or off-chain seasons)
// -------------------------------------
export interface SeasonInfo {
  id: string;
  name: string;

  /** If season is active & visible */
  isEnabled: boolean;

  /** If this is the default season */
  isDefault: boolean;

  /** EVM smart contract */
  contractAddress: `0x${string}` | null;

  /** Contract version: e.g., 'v1', 'v2', or custom versions */
  contractVersion: string | null;

  /** Chain info (if on-chain season) */
  chainId: number | null;
  chainName: string | null;

  /** Prize info */
  prizePool: number | null;
  prizeUnit: string | null;

  /** Optional display field for “shares” */
  shareName: string | null;

  /** Season duration (ISO timestamps) */
  startDate: string | null;
  endDate: string | null;

  /** Sorting within UI */
  sortOrder: number;
}
