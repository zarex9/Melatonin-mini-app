import { useState, useEffect, useRef, useCallback } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import type { LeaderboardEntry } from '../types';

/**
 * useLeaderboard
 * - Fetches leaderboard for a given season id when isReady is true.
 * - Uses AbortController to avoid races and an in-memory cache to reduce repeated fetches.
 * - Returns { data, isLoading, error, refetch }.
 *
 * NOTE: Better to pass a full SeasonInfo object instead of guessing whether it's on-chain.
 */

const cache = new Map<string, LeaderboardEntry[]>();

export const useLeaderboard = (isReady: boolean, activeSeasonId: string | null) => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // track last fetch id to avoid stale response setting state
  const controllerRef = useRef<AbortController | null>(null);

  const fetchForSeason = useCallback(
    async (seasonId: string, signal: AbortSignal) => {
      // If cached, return quickly
      if (cache.has(seasonId)) {
        return cache.get(seasonId)!;
      }

      // Determine endpoint (keep your heuristic but consider passing SeasonInfo instead)
      const isOnChain = seasonId !== 'farcaster';
      const url = isOnChain ? `/api/onchain-leaderboard?season=${encodeURIComponent(seasonId)}` : '/api/leaderboard';

      // Auth token
      let headers: HeadersInit = {};

      try {
        // sdk.quickAuth.getToken() might return different shapes; handle defensively
        const authResult: any = await sdk.quickAuth.getToken();

        // Two common patterns: { token: '...' } or a bare string token
        if (!authResult) {
          // no auth provided
        } else if (typeof authResult === 'string') {
          headers.Authorization = `Bearer ${authResult}`;
        } else if ('token' in authResult && typeof authResult.token === 'string') {
          headers.Authorization = `Bearer ${authResult.token}`;
        } else if ('accessToken' in authResult && typeof authResult.accessToken === 'string') {
          headers.Authorization = `Bearer ${authResult.accessToken}`;
        } else {
          // fallback: ignore auth if unknown shape
          console.warn('Unknown authResult shape from quickAuth.getToken()', authResult);
        }
      } catch (authErr: any) {
        console.warn('Failed to get auth token:', authErr?.message ?? authErr);
        // proceed without Authorization header
      }

      const resp = await fetch(url, { headers, signal });

      if (!resp.ok) {
        throw new Error(`Network response was not ok (${resp.status})`);
      }

      // parse JSON safely
      const responseData = (await resp.json()) as LeaderboardEntry[];

      // basic validation (optional)
      if (!Array.isArray(responseData)) {
        throw new Error('Invalid response format: expected an array');
      }

      // cache the result for this session
      cache.set(seasonId, responseData);

      return responseData;
    },
    []
  );

  const doFetch = useCallback(
    async (seasonId: string) => {
      // Cancel previous request if any
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);
      setError(null);
      setData([]);

      try {
        const result = await fetchForSeason(seasonId, controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          // aborted: do nothing
          return;
        }
        console.error(`Failed to fetch leaderboard for season '${seasonId}':`, err);
        if (!controller.signal.aborted) {
          setError(err?.message ?? 'Could not load pool statistics. Please try again later.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [fetchForSeason]
  );

  // Effect to fetch when ready + season changes
  useEffect(() => {
    if (!isReady || !activeSeasonId) {
      // Cancel any in-flight fetch when not ready or no season
      controllerRef.current?.abort();
      controllerRef.current = null;
      setIsLoading(false);
      setData([]);
      setError(null);
      return;
    }

    void doFetch(activeSeasonId);

    // cleanup on unmount
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, [isReady, activeSeasonId, doFetch]);

  // expose refetch for callers to manually refresh
  const refetch = useCallback(() => {
    if (isReady && activeSeasonId) {
      // clear cache to force network
      cache.delete(activeSeasonId);
      void doFetch(activeSeasonId);
    }
  }, [isReady, activeSeasonId, doFetch]);

  return { data, isLoading, error, refetch };
};
