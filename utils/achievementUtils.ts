
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: GameStats) => boolean;
}

export interface GameStats {
  maxTile: number;
  totalGames: number;
  totalUndos: number;
  bestScore: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    title: 'The Beginning',
    description: 'Reach the 128 tile',
    icon: '🌱',
    condition: (stats) => stats.maxTile >= 128,
  },
  {
    id: 'halfway',
    title: 'Halfway There',
    description: 'Reach the 1024 tile',
    icon: '🏃',
    condition: (stats) => stats.maxTile >= 1024,
  },
  {
    id: 'master',
    title: 'Melatonin Master',
    description: 'Reach the 2048 tile',
    icon: '🏆',
    condition: (stats) => stats.maxTile >= 2048,
  },
  {
    id: 'persistent',
    title: 'Persistence',
    description: 'Play 10 games',
    icon: '🔥',
    condition: (stats) => stats.totalGames >= 10,
  },
  {
    id: 'undo_lover',
    title: 'Time Traveler',
    description: 'Use undo 50 times',
    icon: '⏳',
    condition: (stats) => stats.totalUndos >= 50,
  },
];

export const getUnlockedAchievements = (stats: GameStats, alreadyUnlocked: string[]): Achievement[] => {
  return ACHIEVEMENTS.filter(a => a.condition(stats) && !alreadyUnlocked.includes(a.id));
};
