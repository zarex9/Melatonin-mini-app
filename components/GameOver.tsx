
import React, { useState } from 'react';
import type { SeasonInfo } from '../types';
import ShareToFarcaster from './ShareToFarcaster';

interface GameOverProps {
  score: number;
  onSubmitScore: () => void;
  isSubmitting: boolean;
  hasSubmittedScore: boolean;
  isNewBestScore: boolean;
  userRank: number | null;
  submissionStatus: string;
  activeSeason: SeasonInfo;
}

const GameOver: React.FC<GameOverProps> = ({ score, onSubmitScore, isSubmitting, hasSubmittedScore, isNewBestScore, userRank, submissionStatus, activeSeason }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const isSeasonEnded = activeSeason.endDate ? new Date(activeSeason.endDate).getTime() < Date.now() : false;

  return (
    <div className="absolute inset-0 bg-slate-800 bg-opacity-70 flex flex-col justify-center items-center rounded-lg animate-fade-in z-30 p-4">
      <h2 className="text-5xl font-extrabold text-white mb-2 text-center">Overload!</h2>
      {isNewBestScore && <p className="text-xl text-orange-400 font-bold mb-1">New Peak Rate!</p>}
      <p className="text-lg text-slate-300 mb-6">Your Hashrate: {score}</p>
      
      {isSeasonEnded && <p className="text-sm text-red-400 font-bold mb-4 uppercase tracking-wide">Season Ended</p>}

      {/* Share Menu for New Best Score */}
      {isNewBestScore && hasSubmittedScore && showShareMenu && (
        <div className="mb-4 w-full max-w-sm">
          <ShareToFarcaster
            score={score}
            isNewBestScore={isNewBestScore}
            userRank={userRank}
            seasonName={activeSeason.shareName || activeSeason.name}
            onShareSuccess={() => setShowShareMenu(false)}
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-4 items-start h-[66px]">
          {/* Show "Follow" instead of the old gray "Try Again" button */}
          {(!isNewBestScore || hasSubmittedScore || isSeasonEnded) && (
            <div className="flex flex-col items-center">
              <a
                href={((import.meta as any).env.VITE_FOLLOW_URL as string) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-lg transition-colors duration-200 text-base whitespace-nowrap"
              >
                Follow
              </a>
              <span className="text-xs text-slate-400 mt-1">latest news</span>
            </div>
          )}
          
          {/* Show "Save Score" or "Share" flow only when it's a new best score. */}
          {isNewBestScore && (
            hasSubmittedScore ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded-lg transition-colors duration-200 text-base whitespace-nowrap"
                >
                  {showShareMenu ? 'Hide' : 'Share'}
                </button>
                <span className="text-xs text-slate-400 mt-1">boost your rewards</span>
              </div>
            ) : (
              !isSeasonEnded && (
                <button
                  onClick={onSubmitScore}
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-lg transition-colors duration-200 text-base whitespace-nowrap disabled:bg-orange-700 disabled:cursor-not-allowed self-center"
                >
                  {isSubmitting ? submissionStatus || 'Saving...' : 'Confirm Blocks'}
                </button>
              )
            )
          )}
        </div>
        
        {isSubmitting && submissionStatus && (
          <p className="text-sm text-slate-300 mt-2 text-center">{submissionStatus}</p>
        )}
      </div>
    </div>
  );
};

export default GameOver;
