// src/lib/cache-helpers.ts
import { createCache } from '@/lib/cache/cache';
import { CACHE_NAMESPACE, CACHE_VERSION, DEFAULT_TTL_SEC } from '@/config/cache.config';

export const CACHE = createCache(CACHE_NAMESPACE, DEFAULT_TTL_SEC);

/**
 * Creates a stable cache key based on the endpoint, parameters, locale, and cache version.
 * @param endpoint The API endpoint (e.g., 'portfolio', 'skills').
 * @param params The parameters used in the API request.
 * @param locale The locale string (e.g., 'en', 'fr').
 * @returns A stable string to be used as a cache key.
 */
export const makeCacheKey = (
  endpoint: string,
  params: Record<string, unknown>,
  locale: string,
): string => {
  const stable = JSON.stringify(params, Object.keys(params).sort());
  // key example: "portfolio|params={"populate":"deep"}|loc=en|v=1"
  // It's important to include all relevant context in the key
  return `${endpoint}|params=${stable}|loc=${locale}|v=${CACHE_VERSION}`;
};
