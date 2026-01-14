import React from 'react';

interface GameControlsProps {
  score: number;
  bestScore: number;
  onNewGame: () => void;
  onUndo?: () => void;
  undoDisabled?: boolean;
  onRedo?: () => void;
  redoDisabled?: boolean;
  moves?: number;
}

const ScoreBox: React.FC<{ title: string; score: number }> = ({ title, score }) => (
  <div className="bg-slate-700 p-2 rounded-lg text-center w-24 h-12 flex flex-col justify-center">
    <div className="text-xs text-slate-400 uppercase tracking-wider">{title}</div>
    <div className="text-xl font-bold">{score}</div>
  </div>
);

const GameControls: React.FC<GameControlsProps> = ({ score, bestScore, onNewGame, onUndo, undoDisabled }) => {
  return (
    <div className="flex justify-end items-center w-full mb-4 px-1 gap-2">
      <button
        disabled
        className="bg-slate-500 text-slate-400 font-bold py-2 px-4 rounded-lg cursor-not-allowed h-12 flex items-center"
      >
        Claim
      </button>
      <ScoreBox title="Hashrate" score={score} />
      <ScoreBox title="Peak Rate" score={bestScore} />
      {typeof moves === 'number' && <ScoreBox title="Moves" score={moves} />}
      <button
        onClick={onUndo}
        disabled={undoDisabled}
        className={undoDisabled ? "bg-slate-500 text-slate-400 font-bold py-2 px-4 rounded-lg cursor-not-allowed h-12 flex items-center" : "bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 h-12 flex items-center"}
      >
        Undo
      </button>
      <button
        onClick={onRedo}
        disabled={redoDisabled}
        className={redoDisabled ? "bg-slate-500 text-slate-400 font-bold py-2 px-4 rounded-lg cursor-not-allowed h-12 flex items-center" : "bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 h-12 flex items-center"}
      >
        Redo
      </button>
      <button
        onClick={() => {
          const text = `My score: ${score}`;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
              // @ts-ignore
              if (typeof (window as any).appShowToast === 'function') (window as any).appShowToast('Score copied to clipboard', 'success');
            }).catch(() => {
              // @ts-ignore
              if (typeof (window as any).appShowToast === 'function') (window as any).appShowToast('Failed to copy', 'error');
            });
          } else {
            // fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
              document.execCommand('copy');
              // @ts-ignore
              if (typeof (window as any).appShowToast === 'function') (window as any).appShowToast('Score copied to clipboard', 'success');
            } catch (e) {
              // @ts-ignore
              if (typeof (window as any).appShowToast === 'function') (window as any).appShowToast('Failed to copy', 'error');
            }
            textarea.remove();
          }
        }}
        className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 h-12 flex items-center"
      >
        Share
      </button>
      <button
        onClick={onNewGame}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 h-12 flex items-center"
      >
        New
      </button>
    </div>
  );
};

export default GameControls;
