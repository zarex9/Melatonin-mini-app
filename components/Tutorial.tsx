import React, { useState } from 'react';

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  tips?: string[];
}

interface TutorialProps {
  onComplete: () => void;
  isVisible: boolean;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: '🎮 Welcome to 2048 Mining App!',
    description: 'This is a strategic puzzle game where you combine tiles to reach 2048 and beyond. Ready to learn the basics?',
    tips: [
      'Each move combines adjacent tiles with the same number',
      'Plan ahead - one wrong move can end the game!',
      'You can undo moves to try different strategies'
    ]
  },
  {
    title: '⬅️ ⬇️ ➡️ ⬆️ How to Play',
    description: 'Use arrow keys on desktop or swipe on mobile to move tiles in any direction. All tiles slide in that direction and combine when they have the same value.',
    tips: [
      'Move left: ← or swipe left',
      'Move right: → or swipe right',
      'Move up: ↑ or swipe up',
      'Move down: ↓ or swipe down'
    ]
  },
  {
    title: '🔄 Combining Tiles',
    description: 'When two tiles with the same number touch, they combine into one tile with their sum. For example: 2+2=4, 4+4=8, etc.',
    tips: [
      'You can only combine tiles that have the same value',
      'A new tile (2 or 4) appears after each move',
      'Plan your moves to create empty spaces'
    ]
  },
  {
    title: '🎯 Reaching 2048',
    description: 'Keep combining tiles to reach the magical 2048 tile! The game doesn\'t end at 2048 - keep going for even higher scores.',
    tips: [
      'Each successful combination gives you points',
      'Your best score is saved and displayed',
      'Try to beat your previous record!'
    ]
  },
  {
    title: '↩️ Undo & Redo',
    description: 'Made a mistake? Use Undo to take back your last move. Use Redo to go forward again. You have limited undo capacity.',
    tips: [
      'Undo: Press Z or click the undo button',
      'Redo: Press X or click the redo button',
      'Use undo strategically to explore different paths'
    ]
  },
  {
    title: '📊 Game Over',
    description: 'The game ends when you can\'t make any more moves. Don\'t worry - you can start a new game anytime!',
    tips: [
      'When game over, you can submit your score',
      'Share your score on Farcaster with one click',
      'Compete with others on the leaderboard'
    ]
  },
  {
    title: '🏆 Tips & Tricks',
    description: 'Master these strategies to dominate the leaderboard!',
    tips: [
      '✓ Keep one corner for large numbers',
      '✓ Plan 2-3 moves ahead',
      '✓ Avoid blocking corners early',
      '✓ Build chains in one direction first',
      '✓ Keep tiles organized in rows or columns'
    ]
  }
];

const Tutorial: React.FC<TutorialProps> = ({ onComplete, isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl max-w-md w-full border border-slate-700 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">{step.title}</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Tips */}
          {step.tips && step.tips.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-bold text-yellow-400 mb-2">💡 Key Points:</h3>
              <ul className="space-y-2">
                {step.tips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-slate-200 flex gap-2">
                    <span className="text-yellow-400 flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress indicator */}
          <div className="flex gap-1 mb-6">
            {TUTORIAL_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  idx === currentStep
                    ? 'bg-purple-500'
                    : idx < currentStep
                    ? 'bg-green-500'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-slate-400 text-center mb-4">
            Step {currentStep + 1} of {TUTORIAL_STEPS.length}
          </p>
        </div>

        {/* Buttons */}
        <div className="border-t border-slate-700 px-6 py-4 flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Skip
          </button>

          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              ← Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? '✓ Start' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
