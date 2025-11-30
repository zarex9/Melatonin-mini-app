import type { TileData, Grid } from '../types';

const GRID_SIZE = 4;

/**
 * Deterministic seeded PRNG based on LCG.
 */
export class SeededRandom {
  private seed: number;
  private readonly a = 1664525;
  private readonly c = 1013904223;
  private readonly m = 2 ** 32;

  constructor(seedStr: string) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
      hash |= 0;
    }
    this.seed = hash;
  }

  public next(): number {
    this.seed = (this.a * this.seed + this.c) % this.m;
    const result = this.seed / this.m;
    return result < 0 ? result + 1 : result;
  }
}

/**
 * SHA-256 hashing utility.
 */
export const sha256 = async (data: Uint8Array): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Converts hex string to Uint8Array
 */
export const hexToUint8Array = (hexString: string): Uint8Array => {
  if (hexString.startsWith('0x')) hexString = hexString.slice(2);
  if (hexString.length % 2 !== 0) throw new Error("Invalid hex input");
  const out = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
};

/**
 * Converts tiles array to grid.
 */
const tilesToGrid = (tiles: TileData[]): Grid => {
  const grid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  tiles.forEach(tile => {
    if (tile) grid[tile.row][tile.col] = tile.value;
  });
  return grid;
};

const getEmptyCells = (grid: Grid) => {
  const cells: { row: number; col: number }[] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === null) cells.push({ row: r, col: c });
    }
  }
  return cells;
};

/**
 * Adds a deterministic random tile (2 / 4)
 */
export const addRandomTile = (
  tiles: TileData[],
  prng: SeededRandom,
  tileIdCounter: number
) => {
  const grid = tilesToGrid(tiles);
  const empty = getEmptyCells(grid);
  if (empty.length === 0) return { newTiles: tiles, newCounter: tileIdCounter };

  const { row, col } = empty[Math.floor(prng.next() * empty.length)];
  const value = prng.next() < 0.9 ? 2 : 4;
  const newTile: TileData = { id: tileIdCounter, value, row, col, isNew: true };

  return { newTiles: [...tiles, newTile], newCounter: tileIdCounter + 1 };
};

/**
 * Generates first 2 tiles
 */
export const generateInitialTiles = (prng: SeededRandom) => {
  let tiles: TileData[] = [];
  let counter = 1;

  ({ newTiles: tiles, newCounter: counter } = addRandomTile(tiles, prng, counter));
  ({ newTiles: tiles, newCounter: counter } = addRandomTile(tiles, prng, counter));

  return { initialTiles: tiles, newCounter: counter };
};

const rotateGrid = (grid: (TileData | null)[][]): (TileData | null)[][] => {
  const out = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) out[c][GRID_SIZE - 1 - r] = grid[r][c];
  }
  return out;
};

/**
 * Safe merge logic:
 * - No index skipping
 * - Correct repeated merges: [2,2,2,2] => [4,4]
 */
const slideAndMergeRow = (row: (TileData | null)[]) => {
  const filtered = row.filter(Boolean) as TileData[];
  const mergedTiles: TileData[] = [];
  let scoreIncrease = 0;

  for (let i = 0; i < filtered.length - 1; ) {
    if (filtered[i].value === filtered[i + 1].value) {
      const winner = filtered[i];
      const loser = filtered.splice(i + 1, 1)[0];

      winner.value *= 2;
      winner.isMerged = true;
      loser.winnerId = winner.id;

      scoreIncrease += winner.value;
      mergedTiles.push(loser);
    } else {
      i++;
    }
  }

  const newRow = Array(GRID_SIZE).fill(null) as (TileData | null)[];
  filtered.forEach((tile, i) => {
    tile.col = i;
    newRow[i] = tile;
  });

  return { newRow, scoreIncrease, mergedTiles };
};

/**
 * Main movement engine
 */
export const move = (
  tiles: TileData[],
  direction: 'up' | 'down' | 'left' | 'right'
) => {

  const working = tiles.map(t => ({ ...t, isNew: false, isMerged: false, winnerId: undefined }));

  let grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  working.forEach(t => grid[t.row][t.col] = t);

  const before = JSON.stringify(grid.map(r => r.map(t => t?.value ?? null)));

  const rotations = { left: 0, up: 3, right: 2, down: 1 }[direction];
  for (let i = 0; i < rotations; i++) grid = rotateGrid(grid);

  let scoreIncrease = 0;
  const merged: TileData[] = [];

  grid = grid.map((row, r) => {
    row.forEach(t => t && (t.row = r));
    const out = slideAndMergeRow(row);
    scoreIncrease += out.scoreIncrease;
    merged.push(...out.mergedTiles);
    return out.newRow;
  });

  for (let i = 0; i < (4 - rotations) % 4; i++) grid = rotateGrid(grid);

  const finalTiles: TileData[] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const t = grid[r][c];
      if (t) {
        t.row = r; t.col = c;
        finalTiles.push(t);
      }
    }
  }

  merged.forEach(loser => {
    const winner = finalTiles.find(t => t.id === loser.winnerId);
    if (winner) {
      loser.row = winner.row;
      loser.col = winner.col;
    }
  });

  const after = JSON.stringify(grid.map(r => r.map(t => t?.value ?? null)));
  return { newTiles: finalTiles, mergedTiles: merged, scoreIncrease, hasMoved: before !== after };
};

/**
 * Fixed Game Over Logic
 */
export const isGameOver = (tiles: TileData[]) => {
  const grid = tilesToGrid(tiles);
  if (getEmptyCells(grid).length > 0) return false;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const v = grid[r][c];
      if (r < GRID_SIZE - 1 && grid[r + 1][c] === v) return false;
      if (c < GRID_SIZE - 1 && grid[r][c + 1] === v) return false;
    }
  }
  return true;
};

/**
 * Packs board → 80 bits → hex string → EVM-friendly uint128
 */
export const packBoard = (tiles: TileData[]) => {
  const grid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
  tiles.forEach(t => grid[t.row][t.col] = t.value ? Math.log2(t.value) : 0);

  let packed = BigInt(0);
  let pos = 0;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      packed |= BigInt(grid[r][c]) << BigInt(pos);
      pos += 5;
    }
  }
  return '0x' + packed.toString(16);
};
