
export interface Theme {
  id: string;
  name: string;
  tileColors: { [key: number]: string };
  boardBg: string;
  emptyCellBg: string;
}

export const THEMES: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    boardBg: 'bg-slate-700',
    emptyCellBg: 'bg-slate-600',
    tileColors: {
      2: 'bg-slate-200 text-slate-800',
      4: 'bg-slate-300 text-slate-900',
      8: 'bg-orange-300 text-white',
      16: 'bg-orange-400 text-white',
      32: 'bg-orange-500 text-white',
      64: 'bg-red-500 text-white',
      128: 'bg-yellow-400 text-white font-bold',
      256: 'bg-yellow-500 text-white font-bold',
      512: 'bg-yellow-600 text-white font-bold',
      1024: 'bg-indigo-500 text-white font-extrabold',
      2048: 'bg-indigo-700 text-white font-extrabold',
      4096: 'bg-purple-600 text-white font-extrabold',
      8192: 'bg-purple-800 text-white font-extrabold',
      16384: 'bg-teal-500 text-white font-extrabold',
      32768: 'bg-teal-700 text-white font-extrabold',
      65536: 'bg-lime-500 text-white font-extrabold',
      131072: 'bg-gray-900 text-white font-extrabold',
    }
  },
  {
    id: 'neon',
    name: 'Neon Night',
    boardBg: 'bg-gray-900',
    emptyCellBg: 'bg-gray-800',
    tileColors: {
      2: 'bg-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]',
      4: 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]',
      8: 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      16: 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]',
      32: 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]',
      64: 'bg-lime-500 text-white shadow-[0_0_10px_rgba(132,204,22,0.5)]',
      128: 'bg-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.6)] font-bold',
      256: 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.6)] font-bold',
      512: 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] font-bold',
      1024: 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.7)] font-extrabold',
      2048: 'bg-rose-600 text-white shadow-[0_0_25px_rgba(225,29,72,0.8)] font-extrabold',
    }
  },
  {
    id: 'retro',
    name: 'Retro Terminal',
    boardBg: 'bg-black border border-green-900',
    emptyCellBg: 'bg-black border border-green-900/30',
    tileColors: {
      2: 'bg-black text-green-500 border border-green-500',
      4: 'bg-black text-green-400 border border-green-400',
      8: 'bg-green-900 text-green-100',
      16: 'bg-green-800 text-green-100',
      32: 'bg-green-700 text-green-100',
      64: 'bg-green-600 text-black font-bold',
      128: 'bg-green-500 text-black font-bold',
      256: 'bg-green-400 text-black font-bold',
      512: 'bg-green-300 text-black font-bold',
      1024: 'bg-green-200 text-black font-extrabold',
      2048: 'bg-green-100 text-black font-extrabold',
    }
  }
];
