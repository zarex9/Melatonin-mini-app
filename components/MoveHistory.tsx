import React from 'react';

const directionMap: Record<number, string> = {
  0: '↑', // up
  1: '→', // right
  2: '↓', // down
  3: '←', // left
};

const MoveHistory: React.FC<{ moves: number[] }> = ({ moves }) => {
  const lastFive = moves.slice(-5).reverse();
  return (
    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-2 rounded-md text-sm">
      <div className="text-xs text-slate-300 mb-1">Moves</div>
      <div className="flex gap-1">
        {lastFive.length === 0 && <div className="text-slate-400">—</div>}
        {lastFive.map((m, i) => (
          <div key={i} className="bg-slate-800 px-2 py-1 rounded-md text-white">{directionMap[m] ?? '?'}</div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;
