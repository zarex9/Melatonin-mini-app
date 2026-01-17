import React from 'react';
import type { TileData } from '../types';
import Tile from './Tile';
import { Theme } from '../constants/themes';

interface GameBoardProps {
  tiles: TileData[];
  theme: Theme;
}

const GameBoard: React.FC<GameBoardProps> = ({ tiles, theme }) => {
  const gridCells = Array.from({ length: 16 }).map((_, index) => (
    <div key={index} className={`${theme.emptyCellBg} rounded-md`}></div>
  ));

  return (
    <div className={`${theme.boardBg} p-[2%] rounded-lg grid grid-cols-4 grid-rows-4 gap-[2%] relative w-full aspect-square transition-colors duration-500`}>
      {gridCells}
      {tiles.map(tile => (
        <Tile key={tile.id} {...tile} theme={theme} />
      ))}
    </div>
  );
};

export default GameBoard;
