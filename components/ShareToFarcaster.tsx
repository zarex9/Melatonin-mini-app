import React, { useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

interface ShareToFarcasterProps {
  score: number;
  isNewBestScore: boolean;
  userRank: number | null;
  seasonName: string;
  onShareSuccess?: () => void;
  onShareError?: (error: string) => void;
}

const ShareToFarcaster: React.FC<ShareToFarcasterProps> = ({
  score,
  isNewBestScore,
  userRank,
  seasonName,
  onShareSuccess,
  onShareError,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const generateScoreCard = (): string => {
    let emoji = '🎮';
    if (isNewBestScore) emoji = '🏆';
    if (score >= 2048) emoji = '👑';

    const rankText = userRank ? `Rank: #${userRank}` : 'Peak Hashrate';
    const bestScoreText = isNewBestScore ? '🌟 NEW BEST SCORE! 🌟' : '';

    return `${emoji} 2048 Mining App

${bestScoreText}
Hashrate: ${score}
${rankText}
Season: ${seasonName}

Can you beat my score? Play now! 🚀`;
  };

  const shareToFarcaster = async () => {
    try {
      setIsSharing(true);
      const shareMessage = generateScoreCard();
      const appUrl = ((import.meta as any).env.VITE_APP_URL as string) || 'https://2048-base.vercel.app/';

      // Use Farcaster SDK to open share dialog
      await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(shareMessage)}&embeds[]=${encodeURIComponent(appUrl)}`);

      onShareSuccess?.();
    } catch (error) {
      console.error('Share error:', error);
      onShareError?.(error instanceof Error ? error.message : 'Failed to share');
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      const shareMessage = generateScoreCard();
      await navigator.clipboard.writeText(shareMessage);
      alert('Score copied to clipboard!');
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  const shareViaWarpcast = () => {
    try {
      const shareMessage = generateScoreCard();
      const appUrl = ((import.meta as any).env.VITE_APP_URL as string) || 'https://2048-base.vercel.app/';
      const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareMessage)}&embeds[]=${encodeURIComponent(appUrl)}`;
      window.open(shareUrl, '_blank');
      onShareSuccess?.();
    } catch (error) {
      console.error('Share error:', error);
      onShareError?.(error instanceof Error ? error.message : 'Failed to share');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Preview of Score Card */}
      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 text-sm text-slate-200 font-mono whitespace-pre-wrap break-words">
        {generateScoreCard()}
      </div>

      {/* Share Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={shareViaWarpcast}
          disabled={isSharing}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          title="Share on Farcaster via Warpcast"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          Share
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          title="Copy to clipboard"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShareToFarcaster;
