// src/config/cache.ts
export const CACHE_NAMESPACE = import.meta.env.VITE_CMS_CACHE_NS ?? 'cms';

export const CACHE_VERSION = import.meta.env.VITE_CMS_CACHE_VER ?? '1';

// Specific TTL (sec)
export const TTL = {
  portfolio: Number(import.meta.env.VITE_TTL_PORTFOLIO ?? 600),
  skills: Number(import.meta.env.VITE_TTL_SKILLS ?? 3600),
  projects: Number(import.meta.env.VITE_TTL_PROJECTS ?? 900),
} as const;

// Default TTL (sec)
export const DEFAULT_TTL_SEC = TTL.portfolio;
