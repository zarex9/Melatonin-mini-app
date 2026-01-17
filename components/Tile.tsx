import React from 'react';
import type { TileData } from '../types';
import { Theme } from '../constants/themes';

interface TileProps extends TileData {
  theme: Theme;
}

const Tile: React.FC<TileProps> = ({ value, row, col, isNew, isMerged, theme }) => {
  const colorClasses = theme.tileColors[value] || 'bg-black text-white';
  
  let animationClass = '';
  if (isNew) {
    animationClass = 'animate-tile-spawn';
  } else if (isMerged) {
    animationClass = 'animate-tile-merge';
  }

  let textSizeClass;
  if (value >= 100000) { // 6+ digits
    textSizeClass = 'text-lg sm:text-2xl';
  } else if (value >= 10000) { // 5 digits
    textSizeClass = 'text-xl sm:text-3xl';
  } else if (value >= 1000) { // 4 digits
    textSizeClass = 'text-2xl sm:text-4xl';
  } else if (value >= 100) { // 3 digits
    textSizeClass = 'text-3xl sm:text-5xl';
  } else { // 1-2 digits
    textSizeClass = 'text-4xl sm:text-6xl';
  }
  
  // Calculation for responsive positioning and sizing based on the GameBoard's CSS.
  // GameBoard has p-[2%] and gap-[2%].
  // Total width: 100%
  // Padding: 2% on each side (total 4%)
  // Gaps: 3 gaps of 2% each (total 6%)
  // Remaining for cells: 100% - 4% - 6% = 90%
  // Each of 4 cells: 90% / 4 = 22.5%
  const PADDING_PERCENT = 2;
  const GAP_PERCENT = 2;
  const NUM_CELLS = 4;
  const CELL_PERCENT = (100 - (2 * PADDING_PERCENT) - ((NUM_CELLS - 1) * GAP_PERCENT)) / NUM_CELLS;
  
  const style = {
    width: `${CELL_PERCENT}%`,
    height: `${CELL_PERCENT}%`,
    top: `${PADDING_PERCENT + row * (CELL_PERCENT + GAP_PERCENT)}%`,
    left: `${PADDING_PERCENT + col * (CELL_PERCENT + GAP_PERCENT)}%`,
  };
  
  return (
    <div 
      style={style}
      className={`
        rounded-md 
        flex items-center justify-center 
        font-bold select-none
        absolute z-10
        transition-all duration-200 ease-in-out
        ${colorClasses}
        ${animationClass}
      `}
    >
      <div className={`${textSizeClass}`}>{value}</div>
    </div>
  );
};

export default React.memo(Tile);