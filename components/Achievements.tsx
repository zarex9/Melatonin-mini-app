import React, { useMemo } from 'react';
import { ACHIEVEMENTS, type GameStats } from '../utils/achievementUtils';

interface AchievementsProps {
  stats: GameStats;
  unlockedAchievements: string[];
}

/* -----------------------------
   Reusable Stat Card Component
-------------------------------- */
interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
  return (
    <div className="bg-slate-700 p-3 rounded-lg">
      <p className="text-slate-400 text-sm">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

/* -----------------------------
   Main Achievements Component
-------------------------------- */
const Achievements: React.FC<AchievementsProps> = ({
  stats,
  unlockedAchievements,
}) => {
  // Faster lookup using Set
  const unlockedSet = useMemo(
    () => new Set(unlockedAchievements),
    [unlockedAchievements]
  );

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in overflow-y-auto max-h-[60vh] p-2">
      {/* ---------------- Stats Section ---------------- */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Your Stats 📊
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <StatCard
            label="Max Tile"
            value={stats.maxTile}
            color="text-orange-400"
          />
          <StatCard
            label="Total Games"
            value={stats.totalGames}
            color="text-blue-400"
          />
          <StatCard
            label="Total Undos"
            value={stats.totalUndos}
            color="text-purple-400"
          />
          <StatCard
            label="Best Score"
            value={stats.bestScore}
            color="text-green-400"
          />
        </div>
      </div>

      {/* ---------------- Achievements Section ---------------- */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold mb-2">Achievements 🏆</h3>

        {ACHIEVEMENTS.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-4">
            No achievements available.
          </p>
        )}

        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = unlockedSet.has(achievement.id);

          return (
            <div
              key={achievement.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                isUnlocked
                  ? 'bg-slate-800 border-orange-500/50 opacity-100'
                  : 'bg-slate-900 border-slate-800 opacity-50 grayscale'
              }`}
            >
              <div
                className="text-4xl"
                aria-label={achievement.title}
                title={achievement.title}
              >
                {achievement.icon}
              </div>

              <div className="flex-1">
                <h4
                  className={`font-bold ${
                    isUnlocked ? 'text-orange-400' : 'text-slate-400'
                  }`}
                >
                  {achievement.title}
                </h4>
                <p className="text-sm text-slate-400">
                  {achievement.description}
                </p>
              </div>

              {isUnlocked && (
                <div className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase">
                  Unlocked
                </div>
              )}
            </div>
          );
        })}

        {unlockedAchievements.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-3">
            No achievements unlocked yet. Keep playing 🎮
          </p>
        )}
      </div>
    </div>
  );
};

export default Achievements;
