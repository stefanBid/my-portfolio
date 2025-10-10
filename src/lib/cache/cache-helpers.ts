// src/lib/cache-helpers.ts
import { createCache } from '@/lib/cache/cache';
import {
  CACHE_CMS_NAMESPACE,
  CACHE_GENERAL_NAMESPACE,
  CACHE_VERSION,
  DEFAULT_TTL_SEC,
} from '@/config/cache.config';

export const CACHE_CMS = createCache(CACHE_CMS_NAMESPACE, DEFAULT_TTL_SEC);

export const CACHE_GENERAL = createCache(CACHE_GENERAL_NAMESPACE, DEFAULT_TTL_SEC);

export const makeCacheKey = (
  endpoint: string,
  params?: Record<string, unknown>,
  locale?: string,
): string => {
  const stable = params ? `|params=${JSON.stringify(params, Object.keys(params).sort())}` : '';
  const loc = locale ? `|loc=${locale}` : '';
  // key example: "portfolio|params={"populate":"deep"}|loc=en|v=1"
  // It's important to include all relevant context in the key
  return `${endpoint}${stable}${loc}|v=${CACHE_VERSION}`;
};

export const makeGeneralCacheKey = (value: string): string => {
  return `${value}|v=${CACHE_VERSION}`;
};
