import React, { useState } from 'react';

interface TipsCategory {
  title: string;
  icon: string;
  tips: string[];
}

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIPS_CATEGORIES: TipsCategory[] = [
  {
    title: 'Basic Strategy',
    icon: '🎯',
    tips: [
      'Build your largest tiles in one corner and work outward',
      'Keep one corner clear for combining larger tiles',
      'Try not to fill all four corners early in the game',
      'Plan at least 2-3 moves ahead before acting',
      'Avoid making moves that waste valuable positions'
    ]
  },
  {
    title: 'Advanced Tactics',
    icon: '⚡',
    tips: [
      'Use the undo feature to explore risky moves without penalty',
      'Create "chains" by aligning tiles in rows or columns',
      'Build high-value tiles on the edges, not the center',
      'Keep tiles sorted: highest on one side, lowest on another',
      'Save undo moves for critical moments'
    ]
  },
  {
    title: 'Keyboard Shortcuts',
    icon: '⌨️',
    tips: [
      '↑ ↓ ← → : Move tiles in any direction',
      'Z : Undo the last move',
      'X : Redo the last undone move',
      'N : Start a new game (in some versions)',
      'Mobile: Swipe to move in any direction'
    ]
  },
  {
    title: 'Scoring Tips',
    icon: '🏆',
    tips: [
      'Each combine action adds to your score',
      'Higher combinations give more points (512+512 > 256+256)',
      'Reaching new tile milestones earns bonuses',
      'Submit high scores to compete globally',
      'Share your achievement on Farcaster for rewards'
    ]
  },
  {
    title: 'Common Mistakes',
    icon: '❌',
    tips: [
      'Don\'t rush - take time to think ahead',
      'Avoid creating unbreakable walls of same-sized tiles',
      'Don\'t forget you have undo - use it strategically',
      'Don\'t ignore the board state after each move',
      'Don\'t try to go straight for 2048 - build carefully'
    ]
  },
  {
    title: 'Pro Tips',
    icon: '👑',
    tips: [
      '★ Watch for cascade opportunities (multiple combines in one move)',
      '★ Keep tiles in ascending order along one axis',
      '★ Use corners as "holding areas" for large numbers',
      '★ Practice move prediction by thinking backwards',
      '★ Learn when to sacrifice small tiles for position'
    ]
  }
];

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (!isOpen) return null;

  const category = TIPS_CATEGORIES[selectedCategory];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 sticky top-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">💡 Tips & Tricks</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-300 text-2xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6 sm:grid-cols-3">
            {TIPS_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`p-3 rounded-lg transition-colors text-center font-semibold text-sm ${
                  selectedCategory === idx
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <div className="text-lg mb-1">{cat.icon}</div>
                <div className="text-xs">{cat.title}</div>
              </button>
            ))}
          </div>

          {/* Tips Content */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {category.title}
            </h3>

            <ul className="space-y-3">
              {category.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-purple-400 flex-shrink-0 font-bold">→</span>
                  <span className="text-slate-200 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer with navigation */}
          <div className="mt-4 flex justify-between items-center text-sm text-slate-400">
            <span>
              Category {selectedCategory + 1} of {TIPS_CATEGORIES.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory > 0 ? selectedCategory - 1 : TIPS_CATEGORIES.length - 1
                  )
                }
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory < TIPS_CATEGORIES.length - 1 ? selectedCategory + 1 : 0
                  )
                }
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="border-t border-slate-700 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsModal;
