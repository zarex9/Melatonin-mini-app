import React, { useState, useEffect, useMemo } from 'react';

interface CountdownTimerProps {
  targetDate?: string;       // e.g. "2025-12-30T18:30:00Z"
  dailyResetUtc?: boolean;   // true = reset every UTC midnight
}

export default function CountdownTimer({ targetDate, dailyResetUtc }: CountdownTimerProp) {
  const getTimeLeft = useMemo(() => {
    if (dailyResetUtc) {
      return () => {
        const now = new Date();
        const tomorrow = Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          0, 0, 0
        );

        const diff = tomorrow - now.getTime();
        if (diff <= 0) return { hours: 0, minutes: 0 };

        return {
          hours: Math.floor(diff / 36e5),
          minutes: Math.floor((diff % 36e5) / 6e4),
        };
      };
    }

    if (targetDate) {
      const target = new Date(targetDate).getTime();
      return () => {
        const diff = target - Date.now();
        if (diff <= 0) return { ended: true };

        return {
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 36e5),
        };
      };
    }

    return () => ({});
  }, [dailyResetUtc, targetDate]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 60 * 1000);
    setTimeLeft(getTimeLeft()); // immediate initial sync
    return () => clearInterval(interval);
  }, [getTimeLeft]);

  /** ---------- RENDER ---------- */

  // DAILY UTC RESET
  if (dailyResetUtc) {
    const h = String(timeLeft.hours ?? 0).padStart(2, '0');
    const m = String(timeLeft.minutes ?? 0).padStart(2, '0');
    return <span>{`${h}h ${m}m`}</span>;
  }

  // FIXED TARGET DATE COUNTDOWN
  if ('ended' in timeLeft) return <span>Ended</span>;

  const parts = [];
  if (timeLeft.days !== undefined) parts.push(`${timeLeft.days}d`);
  if (timeLeft.hours !== undefined) parts.push(`${timeLeft.hours}h`);
  return <span>{parts.join(' ') || 'Ended'}</span>;
}
