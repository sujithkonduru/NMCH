import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic data-fetching hook with loading, error, refetch, and polling.
 *
 * @param {Function} fetchFn   — async function that returns an axios response
 * @param {Object}   options
 *   @param {any[]}    deps        — re-fetch when these change (default [])
 *   @param {any}      fallback    — value used while loading / on error
 *   @param {boolean}  immediate   — fetch on mount (default true)
 *   @param {number}   pollMs      — polling interval in ms (0 = no poll)
 *   @param {Function} transform   — map response.data before storing
 */
export function useApi(fetchFn, {
  deps = [],
  fallback = null,
  immediate = true,
  pollMs = 0,
  transform = d => d,
} = {}) {
  const [data,    setData]    = useState(fallback);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);
  const mounted = useRef(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn();
      if (mounted.current) setData(transform(res.data));
    } catch (err) {
      if (mounted.current) {
        setError(err?.response?.data?.message || err.message || 'Request failed');
        setData(fallback);
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mounted.current = true;
    if (immediate) fetch();
    return () => { mounted.current = false; };
  }, [fetch, immediate]);

  // Polling
  useEffect(() => {
    if (!pollMs) return;
    const id = setInterval(fetch, pollMs);
    return () => clearInterval(id);
  }, [fetch, pollMs]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Mutation hook — for POST / PATCH / DELETE calls.
 * Returns [mutate, { loading, error, data }]
 */
export function useMutation(mutateFn) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [data,    setData]    = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await mutateFn(...args);
      setData(res.data);
      return { ok: true, data: res.data };
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Request failed';
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, [mutateFn]);

  return [mutate, { loading, error, data }];
}
