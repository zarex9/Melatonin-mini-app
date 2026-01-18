import React from 'react';

/* -----------------------------
   Types
-------------------------------- */
export type TabType = 'mining' | 'stats' | 'achievements';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

/* -----------------------------
   Tabs Component
-------------------------------- */
const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const baseClasses =
    'w-full py-2 px-4 text-center font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400';

  const getButtonClasses = (tab: TabType) =>
    activeTab === tab
      ? `${baseClasses} bg-orange-500 text-white`
      : `${baseClasses} bg-slate-700 hover:bg-slate-600 text-slate-300`;

  return (
    <div
      className="w-full bg-slate-600 p-1 rounded-lg flex justify-center items-center gap-1 mb-4"
      role="tablist"
      aria-label="Main Tabs"
    >
      <button
        role="tab"
        aria-selected={activeTab === 'mining'}
        aria-pressed={activeTab === 'mining'}
        onClick={() => onTabChange('mining')}
        className={getButtonClasses('mining')}
      >
        MINING
      </button>

      <button
        role="tab"
        aria-selected={activeTab === 'stats'}
        aria-pressed={activeTab === 'stats'}
        onClick={() => onTabChange('stats')}
        className={getButtonClasses('stats')}
      >
        STATS
      </button>

      <button
        role="tab"
        aria-selected={activeTab === 'achievements'}
        aria-pressed={activeTab === 'achievements'}
        onClick={() => onTabChange('achievements')}
        className={getButtonClasses('achievements')}
      >
        TROPHIES
      </button>
    </div>
  );
};

export default Tabs;
