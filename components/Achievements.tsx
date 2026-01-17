
import React from 'react';
import { ACHIEVEMENTS, type GameStats } from '../utils/achievementUtils';

interface AchievementsProps {
  stats: GameStats;
  unlockedAchievements: string[];
}

const Achievements: React.FC<AchievementsProps> = ({ stats, unlockedAchievements }) => {
  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in overflow-y-auto max-h-[60vh] p-2">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          Your Stats 📊
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-slate-400">Max Tile</p>
            <p className="text-2xl font-bold text-orange-400">{stats.maxTile}</p>
          </div>
          <div className="bg-slate-700 p-3 rounded-l">
            <p className="text-slate-400">Total Games</p>
            <p className="text-2xl font-bold text-blue-400">{stats.totalGames}</p>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-slate-400">Total Undos</p>
            <p className="text-2xl font-bold text-purple-400">{stats.totalUndos}</p>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-slate-400">Best Score</p>
            <p className="text-2xl font-bold text-green-400">{stats.bestScore}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold mb-2">Achievements 🏆</h3>
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          return (
            <div 
              key={achievement.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                isUnlocked 
                  ? 'bg-slate-800 border-orange-500/50 opacity-100' 
                  : 'bg-slate-900 border-slate-800 opacity-50 grayscale'
              }`}
            >
              <div className="text-4xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className={`font-bold ${isUnlocked ? 'text-orange-400' : 'text-slate-400'}`}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-slate-400">{achievement.description}</p>
              </div>
              {isUnlocked && (
                <div className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase">
                  Unlocked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
